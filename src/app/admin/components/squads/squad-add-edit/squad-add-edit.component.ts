import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TeamService } from '../../../../services/team.service';
import { CoreService } from '../../../../core/core.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../services/api.service';
import { MatSelectModule } from '@angular/material/select';
import { SquadService } from '../../../../services/squad.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-squad-add-edit',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule, MatSelectModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './squad-add-edit.component.html',
  styleUrl: './squad-add-edit.component.sass'
})
export class SquadAddEditComponent {

  selectedImage: File | null = null;
  imagePath: string | null = null;
  squadForm: FormGroup;
  teamId: number | null = null;

  constructor(
    private _fb: FormBuilder, 
    private _teamService: TeamService, 
    private _dialogRef: MatDialogRef<SquadAddEditComponent>,
    private _coreService: CoreService,
    private squadService: SquadService,
    private _configService: ApiService,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.teamId = data.teamId;
    this.squadForm = this._fb.group({
      team_id: 0,
      file_name: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      birth_date: '',
      birth_place: '',
      height: 0,
      position: '',
      jersey_no: 0,
      stat: 0,
    })
  }

  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const randomFileName = this.generateRandomString(10) + this.getFileExtension(file.name);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePath = e.target.result;
        this.squadForm.patchValue({
          file_name: randomFileName
        });
        this.cdr.markForCheck(); 
      };
      reader.readAsDataURL(file);
    }
  }

  getFileExtension(fileName: string): string {
    return fileName.substring(fileName.lastIndexOf('.'));
  }

  onUpload() {
    if (this.selectedImage) {
      const fileName = this.squadForm.get('file_name')?.value;
      this.squadService.uploadImage(this.selectedImage, fileName).subscribe({
        next: (res) => {
          this.imagePath = `${this._configService.URL_IMAGE}${res.imagePath}`;
          this.squadForm.patchValue({
            file_name: res.imagePath 
          });
        },
        error: (err) => {
          console.error(err);
        }
      })
    }
  }

  ngOnInit(): void {
    this.squadForm = this._fb.group({
      file_name: '',
      first_name: ['', [Validators.required]],
      middle_name: [''],
      last_name: ['', [Validators.required]],
      birth_date: [''],
      birth_place: [''],
      height: 0,
      position: ['', [Validators.required]],
      jersey_no: 0,
      stat: 1,
      team_id: [this.teamId],
    });

    if (!this.teamId) {
      this.squadForm.patchValue(this.data);
      if (this.data.file_name) {
        this.imagePath =`${this._configService.URL_SQUAD_IMAGE}${this.data.file_name}`;
      } else {
        this.imagePath = `${this._configService.URL_LOGO_IMAGE}squad_no_image.jpg`;
      }
    } else {
      this.imagePath = `${this._configService.URL_LOGO_IMAGE}squad_no_image.jpg`;
    }
  }

  onSubmit() {
    if (this.squadForm.valid) {
      this.squadForm.markAllAsTouched();
      if (!this.teamId) {
        this.squadService.updateSquad(this.data.id, this.squadForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Squad updated successfully')
            this.onUpload(); 
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      } else {
        this.squadForm.markAllAsTouched();
        this.squadService.addSquad(this.squadForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Squad added successfully')
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
