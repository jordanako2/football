import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LeagueService } from '../../../services/league.service';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';




@Component({
  selector: 'app-leagues',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatIconModule],
  templateUrl: './leagues.component.html',
  styleUrl: './leagues.component.sass'
})
export class LeaguesComponent {
  leagues: any[] = [];
  imagePath: string | null = null;
  displayedColumns: string[] = ['position', 'team', 'played', 'gd', 'points'];

  constructor(
    private leagueService: LeagueService,
    private _configService: ApiService,
  ) {}

  ngOnInit(): void {
    this.imagePath = `${this._configService.URL_IMAGE}`;
    this.getLeagueTeams();
  }

  getLeagueTeams() {
    this.leagueService.getLeagueTeams().subscribe({
      next: (res) => {
        this.leagues = res;
        console.log(res)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
