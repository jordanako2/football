import { Component } from '@angular/core';
import { TeamService } from '../../../services/team.service';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SquadsComponent } from '../../components/squads/squads.component';
import { FixuresComponent } from '../../components/fixures/fixures.component';
import { OverviewComponent } from '../../components/overview/overview.component';

@Component({
  selector: 'app-clubs',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatTabsModule, SquadsComponent, FixuresComponent, OverviewComponent],
  templateUrl: './clubs.component.html',
  styleUrl: './clubs.component.sass'
})
export class ClubsComponent {

  data: any | null = null;
  imagePath: string | null = null;
  slug: string | null = null;

  constructor(
    private _teamService: TeamService,
    private _configService: ApiService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.slug = params['params'];  
      if (this.slug) {
        this.getTeamBySlug(this.slug);
      }
    });
  }

  getTeamBySlug(slug: string) {
    this._teamService.getTeambySlug(slug).subscribe({
      next: (res) => {
        this.data = res;
        this.imagePath =`${this._configService.URL_IMAGE}`;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
