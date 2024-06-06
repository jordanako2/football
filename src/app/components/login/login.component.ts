declare var google: any;
import { Component, OnInit, Inject, NgZone, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { GoogleComponent } from './google/google.component';
import { HeaderComponent } from '../../client/components/header/header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FacebookComponent } from './facebook/facebook.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../user/user.interface';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
import { environment } from '../../environments/environment';

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
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    if (this.facebookService.accountValue) {
            this.router.navigate(['/']);
        }
  }

  get f() { return this.loginForm.controls; }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadGoogleScript().then(() => {
        google.accounts.id.initialize({
          client_id: environment.googleClientId,
          callback: (resp: any) => this.handleGoogleLogin(resp)
        });

        google.accounts.id.renderButton(document.getElementById("google-btn"), {
          theme: 'filled_blue',
          size: 'large',
          shape: 'rectangle',
          width: 350
        });
      }).catch((error) => {
        console.error('Error loading Google script:', error);
      });
    }
  }

  private loadGoogleScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = (error) => reject(error);
      document.head.appendChild(script);
    });
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleGoogleLogin(resp: any) {
    if (resp) {
      this.cookieService.set('key', resp.credential, { secure: true, sameSite: 'Strict' });
      const payLoad = this.decodeToken(resp.credential);
      console.log(payLoad);
      this.data = {
        given_name: payLoad.given_name,
        family_name: payLoad.family_name,
        email: payLoad.email,
        socialId: payLoad.sub
      };
      console.log(this.data);
      this.userService.registerGoogleUser(this.data).subscribe(
        response => {
          console.log('User login successfully:', response);
          this.router.navigate(['/login']);
          window.location.reload();
          setTimeout(() => {
              this.router.navigate(['home']);
          }, 2000);
        },
        error => {
          console.error('Login error:', error);
        }
      );
      this.router.navigate(['home']);
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