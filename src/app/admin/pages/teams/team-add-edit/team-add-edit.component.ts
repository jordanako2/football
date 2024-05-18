import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TeamService } from '../../../../services/team.service';
import { CoreService } from '../../../../core/core.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-team-add-edit',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule],
  templateUrl: './team-add-edit.component.html',
  styleUrl: './team-add-edit.component.sass'
})
export class TeamAddEditComponent implements OnInit {
  selectedImage: File | null = null;
  imagePath: string | null = null;
  teamForm: FormGroup;

  constructor(
    private _fb: FormBuilder, 
    private _teamService: TeamService, 
    private _dialogRef: MatDialogRef<TeamAddEditComponent>,
    private _coreService: CoreService,
    private _configService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.teamForm = this._fb.group({
      file_name: '',
      team: '',
      coach: '',
      place: '',
    })
  }

  onFileSelected(event: any) {
    this.selectedImage = <File>event.target.files[0];
    if (this.selectedImage) {
      this.teamForm.patchValue({
        file_name: this.selectedImage.name 
      });
    }
  }

  onUpload() {
    if (this.selectedImage) {
      this._teamService.uploadImage(this.selectedImage).subscribe(res => {
        this.imagePath = `${this._configService.URL_IMAGE}${res.imagePath}`;
        this.teamForm.patchValue({
          file_name: res.imagePath // Update image name in the form
        });
      }, err => {
        console.error(err);
      });
    }
  }

  ngOnInit(): void {
    this.teamForm = this._fb.group({
      file_name: '',
      team: ['', [Validators.required, Validators.minLength(3)]],
      coach: ['', [Validators.required, Validators.minLength(3)]],
      place: ['', [Validators.required, Validators.minLength(3)]]
    });
    if (this.data) {
      this.teamForm.patchValue(this.data);
      if (this.data.file_name) {
        this.imagePath =`${this._configService.URL_IMAGE}${this.data.file_name}`;
      } else {
        this.imagePath = `${this._configService.URL_IMAGE}no_image.jpg`;
      }
    } else {
      this.imagePath = `${this._configService.URL_IMAGE}no_image.jpg`;
    }
  }

  onSubmit() {
    if (this.teamForm.valid) {
      this.teamForm.markAllAsTouched();
      if (this.data) {
        this._teamService.updateTeam(this.data.id, this.teamForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Team updated successfully')
            this.onUpload(); 
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      } else {
        this.teamForm.markAllAsTouched();
        this._teamService.addTeam(this.teamForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Team added successfully')
            this.onUpload()
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
