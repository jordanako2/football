import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LeagueService } from '../../../../services/league.service';
import { ApiService } from '../../../../services/api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-quickview',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './quickview.component.html',
  styleUrl: './quickview.component.sass'
})
export class QuickviewComponent {

  leagueMatches: any[] = [];
  imagePath: string | null = null;
  constructor(
    private leagueService: LeagueService,
    private configService: ApiService,
    private _titleService: Title
  )
  {}
  ngOnInit(): void {
    this.setTitle('Fixtures');
  }

  setTitle(newTitle: string) {
    this._titleService.setTitle(newTitle);
  }

  getLeagueById(leagueId: number) {
    this.leagueService.getLeagueById(leagueId).subscribe({
      next: (res) => {
        this.leagueMatches = res;
      },
      error: (err) => {
        console.error('Error fetching team:', err);
      }
    });
  }

}
