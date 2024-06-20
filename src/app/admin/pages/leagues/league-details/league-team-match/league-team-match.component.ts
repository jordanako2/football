import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TeamMatchAddEditComponent } from './team-match-add-edit/team-match-add-edit.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from '../../../../../services/match.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-league-team-match',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, CommonModule],
  templateUrl: './league-team-match.component.html',
  styleUrl: './league-team-match.component.sass'
})
export class LeagueTeamMatchComponent {

  leagueId: number | null = null;
  displayedColumns: string[] = ['day', 'match_date', 'match_time', 'location', 'for', 'result', 'against', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;

  constructor(
    private dialog: MatDialog, 
    private route: ActivatedRoute,
    private matchesService: MatchService,
    private _fb: FormBuilder, 
  ) {}

  ngOnInit(): void {
    this.getMatches();
    this.route.params.subscribe(params => {
      this.leagueId = +params['id'];  
    });
  }

  getMatches() {
    this.matchesService.getMatches().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        console.log(res)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addTeam(element: any, index: number) {
    // Logic to add a team to the match's scores array
    console.log(`Add team for match ID ${element.id} at index ${index}`);
    // Here you would typically open a dialog or prompt to select and add a team
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
