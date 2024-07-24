import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TeamService } from '../../../../../../services/team.service';
import { CoreService } from '../../../../../../core/core.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../../../services/api.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatchService } from '../../../../../../services/match.service';
import { MatSelectModule } from '@angular/material/select';
import { ScoreService } from '../../../../../../services/score.service';
import { LeagueTeamService } from '../../../../../../services/league-team.service';

@Component({
  selector: 'app-team-score',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule, 
    CommonModule, 
    MatSelectModule
  ],
  templateUrl: './team-score.component.html',
  styleUrl: './team-score.component.sass'
})
export class TeamScoreComponent {

  teams: any[] = [];
  selectedImage: File | null = null;
  imagePath: string | null = null;
  teamForm: FormGroup;
  leagueId: number | null = null;
  matchId: number | null = null;
  teamName: string | null = null;
  teamId: any;

  constructor(
    private _fb: FormBuilder, 
    private _dialogRef: MatDialogRef<TeamScoreComponent>,
    private _coreService: CoreService,
    private _configService: ApiService,
    private teamService: TeamService,
    private leagueTeamService: LeagueTeamService,
    private scoreService: ScoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.matchId = data.matchId;
    this.leagueId = data.leagueId;
    this.teamForm = this._fb.group({
      points: 0,
      result: ''
    })
  }

  ngOnInit(): void {
    this.teamForm.patchValue(this.data);
    this.imagePath =`${this._configService.URL_IMAGE}`;
    this.getTeams()
    this.getTeambyId()
  }

  getTeams() {
    this.teamService.getTeams().subscribe({
      next: (res) => {
        this.teams = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getTeambyId() {
    this.teamService.getTeamById(this.data.team_id).subscribe({
      next: (res: any) => {
        this.teamId = res
      },
      error: (err: any) => {
        console.log(err)
      }
    }
    );
  }

  onSubmit() {
    if (this.teamForm.valid) {
      this.teamForm.markAllAsTouched();
      const formData = {
        ...this.teamForm.value,
        league_id: this.leagueId,
        match_id: this.matchId
      };
      if (this.data.score_id) {
        this.scoreService.updateScore(this.data.score_id, formData, this.data.leagueId).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Team score updated successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            const errorMessage = err?.error?.message || 'Error updating team score';
            this._coreService.openSnackBar(errorMessage);
          }
        });
      } 
    }
  }

}
