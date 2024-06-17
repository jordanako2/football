import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { LeagueService } from '../../../../../services/league.service';
import { CoreService } from '../../../../../core/core.service';
import { ApiService } from '../../../../../services/api.service';
import { LeagueTeamService } from '../../../../../services/league-team.service';

@Component({
  selector: 'app-team-add-edit',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule, MatSelectModule],
  templateUrl: './league-team-update.component.html',
  styleUrl: './league-team-update.component.sass'
})
export class LeagueTeamUpdateComponent {

  selectedImage: File | null = null;
  imagePath: string | null = null;
  leagueForm: FormGroup;

  constructor(
    private _fb: FormBuilder, 
    private leagueTeamService: LeagueTeamService, 
    private _dialogRef: MatDialogRef<LeagueTeamUpdateComponent>,
    private _coreService: CoreService,
    private _configService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.leagueForm = this._fb.group({
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goals_for: 0,
      goals_against: 0,
      goals_difference: [{ value: 0, disabled: true }, Validators.required],
      points: 0,
      stat: 0,
      status: '',
    })
  }

  ngOnInit(): void {
    this.imagePath = `${this._configService.URL_IMAGE}`;

    if (this.data) {
      this.leagueForm.patchValue(this.data);
    } 

    this.leagueForm.get('goals_for')?.valueChanges.subscribe(() => this.updateGoalDifference());
    this.leagueForm.get('goals_against')?.valueChanges.subscribe(() => this.updateGoalDifference());
  }

  updateGoalDifference() {
    const goalsFor = this.leagueForm.get('goals_for')?.value || 0;
    const goalsAgainst = this.leagueForm.get('goals_against')?.value || 0;
    const goalDifference = goalsFor - goalsAgainst;
    this.leagueForm.get('goals_difference')?.setValue(goalDifference);
  }

  onSubmit() {
    if (this.leagueForm.valid) {
      const formValue = this.leagueForm.getRawValue(); // getRawValue to include disabled controls
      if (this.data) {
        this.leagueTeamService.updateLeagueTeams(this.data.id, formValue).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('League Team updated successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
    }
  }

}
