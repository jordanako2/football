import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CoreService } from '../../../../../core/core.service';
import { PlayerScoreService } from '../../../../../services/player-score.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@Component({
  selector: 'app-player-score-add',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule, 
    CommonModule, 
    NgxMaterialTimepickerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './player-score-add.component.html',
  styleUrl: './player-score-add.component.sass'
})
export class PlayerScoreAddComponent {
  playerScoreForm: FormGroup;
  players: any[] = [];
  selectedTime: Date | null = null;


  constructor(
    private _fb: FormBuilder, 
    private _coreService: CoreService,
    private _playerScoreService: PlayerScoreService,
    private _dialogRef: MatDialogRef<PlayerScoreAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.playerScoreForm = this._fb.group({
      player_id: ['', [Validators.required]],
      minutes: ['', [Validators.required]],
      seconds: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.players = this.data.players;
    if (this.data) {
      this.playerScoreForm.patchValue(this.data.playerData);
    }
  }

  onSubmit() {
    if (this.playerScoreForm.valid) {
      this.playerScoreForm.markAllAsTouched();
      const formData = {
        ...this.playerScoreForm.value,
        score_id: this.data.scoreId,
        league_id: this.data.leagueId,
        match_id: this.data.matchId,
        team_id: this.data.teamId
      };
      if (this.data.playerData) {
        this._playerScoreService.updatePlayerScores(this.data.playerData.id, formData).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Player score updated successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            this._coreService.openSnackBar(err);
          }
        });
      } else {
        this._playerScoreService.addPlayerScore(formData).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Player score added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            this._coreService.openSnackBar(err);
          }
        });
      }
    }
  }
}
