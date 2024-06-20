import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TeamMatchAddEditComponent } from './team-match-add-edit/team-match-add-edit.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from '../../../../../services/match.service';
import { CommonModule } from '@angular/common';
import { TeamSelectComponent } from './team-select/team-select.component';
import { ApiService } from '../../../../../services/api.service';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TeamScoreComponent } from './team-score/team-score.component';

interface Match {
  id: number;
  match_time: string;
  
}

@Component({
  selector: 'app-league-team-match',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, CommonModule, MatIconModule, MatTooltipModule],
  providers: [
    DatePipe 
  ],
  templateUrl: './league-team-match.component.html',
  styleUrl: './league-team-match.component.sass'
})
export class LeagueTeamMatchComponent {

  leagueId: number | null = null;
  displayedColumns: string[] = ['match_date', 'match_time', 'location', 'for', 'result', 'against', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;
  imagePath: string | null = null;

  constructor(
    private dialog: MatDialog, 
    private route: ActivatedRoute,
    private matchesService: MatchService,
    private _configService: ApiService,
    private _fb: FormBuilder, 
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getMatches();
    this.route.params.subscribe(params => {
      this.leagueId = +params['id'];  
    });
    this.imagePath =`${this._configService.URL_IMAGE}`;
  }

  getMatches() {
    this.matchesService.getMatches().subscribe({
      next: (res: Match[]) => {
        res.forEach(match => {
          // Parse match_time string into a Date object
          const matchTime = new Date(`2000-01-01T${match.match_time}`);
          match.match_time = this.datePipe.transform(matchTime, 'h:mm a') || '';
        });
        this.dataSource = new MatTableDataSource(res);
        console.log(res)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateScore(element: any, index: number, id: number, team_id: number) {
    console.log(`Update team for match ID ${element.id} at index ${index}`);
    const dialogRef = this.dialog.open(TeamScoreComponent, {
        data: { 
          score_id: id,
          team_id: team_id,
          leagueId: this.leagueId, 
          matchId: element.id 
        }
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getMatches()
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  updateTeam(element: any, index: number, id: number, team_id: number) {
    console.log(`Update team for match ID ${element.id} at index ${index}`);
    const dialogRef = this.dialog.open(TeamSelectComponent, {
        data: { 
          score_id: id,
          team_id: team_id,
          leagueId: this.leagueId, 
          matchId: element.id 
        }
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getMatches()
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addTeam(element: any, index: number) {
    console.log(`Add team for match ID ${element.id} at index ${index}`);
    const dialogRef = this.dialog.open(TeamSelectComponent, {
        data: { 
          leagueId: this.leagueId, 
          matchId: element.id 
        }
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getMatches()
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  

  openEditAddMatch() {
      const dialogRef = this.dialog.open(TeamMatchAddEditComponent, {
        data: { leagueId: this.leagueId }
      });
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getMatches()
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

}
