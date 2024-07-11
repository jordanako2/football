import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';  // Import MatCardModule
import { TeamService } from '../../../services/team.service';
import { ApiService } from '../../../services/api.service';

interface Player {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  position: string;
  team_id: number;
  birth_date: string | null;
  birth_place: string;
  height: number;
  file_name: string;
  stat: number;
}

@Component({
  selector: 'app-squads',
  standalone: true,
  imports: [MatTableModule, MatTabsModule, CommonModule, MatIconModule, RouterLink, MatButtonModule, MatCardModule],  // Added MatCardModule
  templateUrl: './squads.component.html',
  styleUrls: ['./squads.component.sass']
})
export class SquadsComponent {

  teamId: number | null = null;
  imagePath: string | null = null;
  squadData: Player[] = [];
  playersByPosition: { [key: string]: Player[] } = {};  // Property to hold grouped data
  
  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private _configService: ApiService,
  ) {}

  ngOnInit(): void {
    this.imagePath = `${this._configService.URL_SQUAD_IMAGE}`;
    this.route.params.subscribe(params => {
      this.teamId = +params['id'];  
      this.getSquadByTeamId(this.teamId);
    });
  }

  getSquadByTeamId(teamId: number) {
    this.teamService.getSquadByTeamId(teamId).subscribe({
      next: (res: any) => {
        this.squadData = res.squad;
        this.playersByPosition = this.squadData.reduce((acc: any, player) => {
          if (!acc[player.position]) {
            acc[player.position] = [];
          }
          acc[player.position].push(player);
          return acc;
        }, {});
        console.log(this.playersByPosition);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  getPositions(): string[] {
    return Object.keys(this.playersByPosition);
  }
}
