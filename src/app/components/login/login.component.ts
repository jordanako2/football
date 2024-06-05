declare var google: any;
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
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [GoogleComponent, HeaderComponent, MatFormFieldModule, MatInputModule, MatButtonModule, FacebookComponent, RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent implements OnInit {
  private router = inject(Router)
  loginForm: FormGroup;
  data: User | null = null;
  submitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; }

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '657320183260-g9pe0d04ggrkjn1edct4res49fb223o9.apps.googleusercontent.com',
      callback: (resp: any) => this.handleLogin(resp)
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 350
    })
  }

  private decodeToken(token: string){
    return JSON.parse(atob(token.split(".")[1]))
  }
  handleLogin(resp: any){
    if(resp) {
      this.cookieService.set('key', resp.credential, { secure: true, sameSite: 'Strict' });
      const payLoad = this.decodeToken(resp.credential);
      console.log(payLoad)
      this.data = {
        given_name: payLoad.given_name,
        family_name: payLoad.family_name,
        email: payLoad.email
      };
        
   
      // sessionStorage.setItem("loggedInUser", JSON.stringify(payLoad))
      this.userService.registerUser(this.data).subscribe(
        response => {
          console.log('User registered successfully:', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Registration error:', error);
        }
      );
      this.router.navigate(['home'])
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      () => {
        console.log('Login successful');
        window.location.reload();
      },
      error => {
        console.error('Login failed', error);

        if (error.status === 401 && error.error.message === 'Invalid credentials') {
          this.loginForm.controls['password'].setErrors({ invalidCredentials: true });
        }
      }
    );
  }


  

}
