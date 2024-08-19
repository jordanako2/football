import { Component } from '@angular/core';
import { LeagueService } from '../../../services/league.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.sass'
})
export class MatchesComponent {

  leagueMatches: any[] = [];
  imagePath: string | null = null;

  constructor(
    private leagueService: LeagueService,
    private configService: ApiService,
  ) {}

  ngOnInit(): void {
    this.imagePath = `${this.configService.URL_IMAGE}`;
    this.getLeagueTeams();
  }

  // getLeagueTeams() {
  //   this.leagueService.getLeagueMatches().subscribe({
  //     next: (res) => {
  //       this.leagueMatches = res;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   })
  // }

  getLeagueTeams() {
    this.leagueService.getLeagueMatches().subscribe({
      next: (res: any[]) => {
        this.leagueMatches = res.map((league: any) => {
          return {
            ...league,
            matches: league.matches.map((matchDay: any) => {
              return {
                ...matchDay,
                matches: matchDay.matches.filter((match: any) => match.status === 'Posted').slice(0, 5) 
              };
            })
          };
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
