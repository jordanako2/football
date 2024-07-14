import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { QuillModule } from 'ngx-quill';
import { TeamAboutService } from '../../../services/team-about.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [QuillModule, CommonModule, MatSelectModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.sass'
})
export class OverviewComponent {

  teamId: number | null = null;
  aboutData: any | null = null;
  content: SafeHtml  | null = null;

  constructor (
    private route: ActivatedRoute,
    private teamAboutService: TeamAboutService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teamId = +params['id'];
      if (this.teamId) {
        this.getTeamAboutByTeamId(this.teamId);
      }
    });
  }

  getTeamAboutByTeamId(teamId: number) {
    this.teamAboutService.getTeamAboutByTeamId(teamId).subscribe({
      next: (res) => {
        this.aboutData = res;
        this.content = this.sanitizer.bypassSecurityTrustHtml(res.desktop_content);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
