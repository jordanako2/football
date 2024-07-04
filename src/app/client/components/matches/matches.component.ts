import { Component } from '@angular/core';
import { LeagueService } from '../../../services/league.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule, MatIconModule],
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


  getLeagueTeams() {
    this.leagueService.getLeagueMatches().subscribe({
      next: (res) => {
        this.leagueMatches = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
