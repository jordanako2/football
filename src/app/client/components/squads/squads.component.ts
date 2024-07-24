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
  slug: string | null = null;
  imagePath: string | null = null;
  imageLogoPath: string | null = null;
  squadData: Player[] = [];
  playersByPosition: { [key: string]: Player[] } = {};  // Property to hold grouped data
  
  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private _configService: ApiService,
  ) {}

  ngOnInit(): void {
    this.imagePath = `${this._configService.URL_SQUAD_IMAGE}`;
    this.imageLogoPath = `${this._configService.URL_LOGO_IMAGE}`;
    this.route.params.subscribe(params => {
      this.slug = params['params'];
      if (this.slug) {
        this.getTeambySlug(this.slug);
      } else if (this.teamId) {
        this.loadTeamData(this.teamId);
      }
    });
  }

  getTeambySlug(slug: string) {
    this.teamService.getTeambySlug(slug).subscribe({
      next: (res) => {
        this.teamId = res.id;
        if (this.teamId) {
          this.loadTeamData(this.teamId);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadTeamData(teamId: number) {
    this.getSquadByTeamId(teamId);
  }

  getSquadByTeamId(teamId: number) {
    this.teamService.getSquadByTeamId(teamId).subscribe({
      next: (res: any) => {
        this.squadData = res.squad.filter((player: Player) => player.stat === 1);
        this.playersByPosition = this.squadData.reduce((acc: any, player) => {
          if (!acc[player.position]) {
            acc[player.position] = [];
          }
          acc[player.position].push(player);
          return acc;
        }, {});
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
