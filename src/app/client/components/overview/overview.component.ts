import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { QuillModule } from 'ngx-quill';
import { TeamAboutService } from '../../../services/team-about.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ContentsService } from '../../../services/contents.service';
import { ApiService } from '../../../services/api.service';

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
  contentData: any[] | null = null;
  content: SafeHtml  | null = null;
  imagePath: string | null = null;

  constructor (
    private route: ActivatedRoute,
    private teamAboutService: TeamAboutService,
    private contentService: ContentsService,
    private _configService: ApiService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.imagePath = `${this._configService.URL_CONTENT_IMAGE}`;
    this.route.params.subscribe(params => {
      this.teamId = +params['id'];
      if (this.teamId) {
        this.getTeamAboutByTeamId(this.teamId);
        this.getContentByTeamId(this.teamId);
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

  getContentByTeamId(teamId: number) {
    this.contentService.getContentByTeamId(teamId).subscribe({
      next: (res) => {
        this.contentData = res
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
