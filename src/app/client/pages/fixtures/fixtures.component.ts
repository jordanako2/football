import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../../../services/league.service';
import { ApiService } from '../../../services/api.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog} from '@angular/material/dialog';
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-fixtures',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './fixtures.component.html',
  styleUrl: './fixtures.component.sass'
})
export class FixturesComponent implements OnInit{

  leagueMatches: any[] = [];
  imagePath: string | null = null;
  constructor(
    private leagueService: LeagueService,
    private configService: ApiService,
    private _dialog: MatDialog,
    private _titleService: Title
  )
  {}
  ngOnInit(): void {
    this.setTitle('Fixtures');
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

  setTitle(newTitle: string) {
    this._titleService.setTitle(newTitle);
  }

  // quickview(){
  //   const dialogRef = this._dialog.open(QuickviewComponent);
  //   dialogRef.afterClosed().subscribe({
  //     next: (val) => {
  //       if (val) {
  //         // this.getLeagueMatches()();
  //       }
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   })
  // }
}
