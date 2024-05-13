import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TeamService } from '../../../services/team.service';
import { CoreService } from '../../../core/core.service';

@Component({
  selector: 'app-team-add-edit',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './team-add-edit.component.html',
  styleUrl: './team-add-edit.component.sass'
})
export class TeamAddEditComponent implements OnInit {

  teamForm: FormGroup;

  constructor(
    private _fb: FormBuilder, 
    private _teamService: TeamService, 
    private _dialogRef: MatDialogRef<TeamAddEditComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.teamForm = this._fb.group({
      team: '',
      coach: '',
      place: '',
    })
  }

  ngOnInit(): void {
    this.teamForm.patchValue(this.data)
  }

  onSubmit() {
    if (this.teamForm.valid) {
      if (this.data) {
        this._teamService.updateTeam(this.data.id, this.teamForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Team updated successfully')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      } else {
        this._teamService.addTeam(this.teamForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Team added successfully')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      }
      
    }
  }
}
