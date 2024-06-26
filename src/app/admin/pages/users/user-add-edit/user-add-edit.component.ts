import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CoreService } from '../../../../core/core.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/user.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-user-add-edit',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule, MatOptionModule, 
    MatSelectModule,],
  templateUrl: './user-add-edit.component.html',
  styleUrl: './user-add-edit.component.sass'
})
export class UserAddEditComponent {

  selectedImage: File | null = null;
  imagePath: string | null = null;
  userForm: FormGroup;

  constructor(
    private _fb: FormBuilder, 
    private userService: UserService, 
    private _dialogRef: MatDialogRef<UserAddEditComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this._fb.group({
      given_name: '',
      family_name: '',
      email: '',
      password: '',
      role: '',
    })
  }

  ngOnInit(): void {
    this.userForm = this._fb.group({
      given_name: ['', [Validators.required, Validators.minLength(3)]],
      family_name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      role: [''],
    });
    if (this.data) {
      this.userForm.patchValue(this.data);
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userForm.markAllAsTouched();
      if (this.data) {
        this.userService.updateUser(this.data.id, this.userForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('User updated successfully')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      } else {
        this.userForm.markAllAsTouched();
        this.userService.registerUser(this.userForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('User added successfully')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            if (err.status === 400 && err.error.message === 'Email already exists') {
            this.userForm.controls['email'].setErrors({ emailExists: true });
          }
          }
        })
      }
    }
  }

}
