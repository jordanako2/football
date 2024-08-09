import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { GoogleComponent } from './google/google.component';
import { HeaderComponent } from '../../client/components/header/header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FacebookComponent } from './facebook/facebook.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../user/user.interface';
import { GoogleService } from '../../services/google.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    GoogleComponent,
    HeaderComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FacebookComponent,
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  loginForm: FormGroup;
  data: User | null = null;
  submitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private googleService: GoogleService,
    private _titleService: Title
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });


  }
  get f() { return this.loginForm.controls; }

  ngOnInit(): void {
    this.setTitle('User Portal');
    this.googleService.initializeGoogleLogin();
  }

  setTitle(newTitle: string) {
    this._titleService.setTitle(newTitle);
  }



  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => {
       
      },
      error: (error) => {
        console.error('Login failed', error);
        if (error.status === 401 && error.error.message === 'Invalid credentials') {
          this.loginForm.controls['password'].setErrors({ invalidCredentials: true });
        }
      }
    });
  }
}