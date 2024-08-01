import { Injectable, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { User } from '../user/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';

declare var google: any

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(
    private cookieService: CookieService,
    private userService: UserService,
    private router: Router,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  initializeGoogleLogin() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadGoogleScript().then(() => {
        google.accounts.id.initialize({
          client_id: environment.googleClientId,
          callback: (resp: any) => this.handleGoogleLogin(resp)
        });

        google.accounts.id.renderButton(document.getElementById("google-btn"), {
          size: 'large',
          shape: 'rectangle',
          width: 300
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

  handleGoogleLogin(resp: any): void {
    if (resp) {
      this.cookieService.set('key', resp.credential, { secure: true, sameSite: 'Strict' });
      const payLoad = this.decodeToken(resp.credential);
      const data: User = {
        given_name: payLoad.given_name,
        family_name: payLoad.family_name,
        email: payLoad.email,
        socialId: payLoad.sub
      };
      this.userService.registerGoogleUser(data).subscribe(
        response => {
          this.userSubject.next(payLoad);
          this.isAuthenticatedSubject.next(true);
          this.ngZone.run(() => {
            this.router.navigate(['/']);
          });
        },
        error => {
          console.error('Login error:', error);
        }
      );
    }
  }

  isAuthenticated(): boolean {
    return !!this.cookieService.get('key');
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}
