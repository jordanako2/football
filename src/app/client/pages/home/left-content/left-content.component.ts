import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { LeaguesComponent } from '../../../components/leagues/leagues.component';
import { MatchesComponent } from '../../../components/matches/matches.component';
import { CommonModule } from '@angular/common';
import { LeagueService } from '../../../../services/league.service';

export interface PeriodicElement {
  team: string;
  position: number;
  played: number;
  gd: number;
  points: number;
}

@Component({
  selector: 'app-left-content',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatTableModule, LeaguesComponent, MatchesComponent, CommonModule],
  templateUrl: './left-content.component.html',
  styleUrl: './left-content.component.sass'
})

export class LeftContentComponent {
  leagues: any[] = [];
  displayedColumns: string[] = ['position', 'team', 'played', 'gd', 'points'];

  constructor (
    private leagueService: LeagueService
  ) {

  }

  ngOnInit(): void {
    this.getLeagueTeams();
  }

  getLeagueTeams() {
    this.leagueService.getPostedLeagues().subscribe({
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
