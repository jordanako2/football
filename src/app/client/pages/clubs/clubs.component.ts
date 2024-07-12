import { Component } from '@angular/core';
import { TeamService } from '../../../services/team.service';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SquadsComponent } from '../../components/squads/squads.component';

@Component({
  selector: 'app-clubs',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatTabsModule, SquadsComponent],
  templateUrl: './clubs.component.html',
  styleUrl: './clubs.component.sass'
})
export class ClubsComponent {

  data: any | null = null;
  imagePath: string | null = null;
  teamId: number | null = null;

  constructor(
    private _teamService: TeamService,
    private _configService: ApiService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teamId = +params['id'];  
      this.getTeamById(this.teamId);
    });
  }

  getTeamById(teamId: number) {
    this._teamService.getTeamById(teamId).subscribe({
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
