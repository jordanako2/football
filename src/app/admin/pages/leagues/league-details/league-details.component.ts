import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LeagueTeamDialogComponent } from './league-team-dialog/league-team-dialog.component';
import { LeagueTeamService } from '../../../../services/league-team.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../services/api.service';

export interface PeriodicElement {
  position: number;
  team_id: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goals_for: number;
  goals_against: number;
  goals_difference: number;
  points: number;
}

@Component({
  selector: 'app-league-details',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterLink, MatTableModule, CommonModule],
  templateUrl: './league-details.component.html',
  styleUrl: './league-details.component.sass'
})

export class LeagueDetailsComponent {

  displayedColumns: string[] = ['position', 'team_id', 'played', 'won', 'drawn', 'lost', 'goals_for', 'goals_against', 'goals_difference', 'points'];
  leagueId: number | null = null;
  dataSource!: MatTableDataSource<any>;
  imagePath: string | null = null;
  
  constructor(
    public dialog: MatDialog, 
    private route: ActivatedRoute,
    private leagueTeamService: LeagueTeamService,
    private _configService: ApiService,
  ) {}

  ngOnInit(): void {
    this.imagePath =`${this._configService.URL_IMAGE}`;
    this.route.params.subscribe(params => {
      this.leagueId = +params['id'];  
      console.log('League ID:', this.leagueId);
      this.getLeagueTeams(this.leagueId);
    });
  }

  getLeagueTeams(leagueId: number) {
    this.leagueTeamService.getLeagueTeams(leagueId).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        console.log(res)
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LeagueTeamDialogComponent, {
      data: { leagueId: this.leagueId }
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val && this.leagueId !== null) {
          this.getLeagueTeams(this.leagueId);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  


}
