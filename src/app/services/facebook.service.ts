import { Injectable, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, from, of, EMPTY } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './user.service';

declare var FB: any;

export interface Account {
    id: string;
    facebookId: string;
    name: string;
    extraInfo: string;
    token?: string;
}

@Injectable({ providedIn: 'root' })
export class FacebookService {
    private accountSubject: BehaviorSubject<Account | null>;
    public account: Observable<Account | null>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private cookieService: CookieService,
        private userService: UserService,
        private ngZone: NgZone,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.accountSubject = new BehaviorSubject<Account | null>(null);
        this.account = this.accountSubject.asObservable();
        
        if (isPlatformBrowser(this.platformId)) {
            this.initializeFacebookSDK();
        }
    }

    public get accountValue() {
        return this.accountSubject.value;
    }

    private initializeFacebookSDK() {
        return new Promise<void>((resolve) => {
            (window as any).fbAsyncInit = () => {
                FB.init({
                    appId: environment.facebookAppId,
                    cookie: true,
                    xfbml: true,
                    version: 'v12.0'
                });

                FB.getLoginStatus(({ authResponse }: any) => {
                    if (authResponse) {
                        this.loginFacebook().subscribe(
                            fbData => {
                                console.log('Facebook login data:', fbData);
                            },
                            error => {
                                console.error('Facebook login error:', error);
                            }
                        );
                    }
                    resolve();
                });
            };

            (function (d, s, id) {
                var js: any;
                var fjs: any = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) { return; }
                js = d.createElement(s); 
                js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        });
    }

    private createJWTToken(payload: any): string {
        return btoa(JSON.stringify(payload));
    }

    login() {
        this.loginFacebook().subscribe(
          fbData => {
            const data = {
              given_name: fbData.first_name,
              family_name: fbData.last_name,
              email: fbData.email ?? null,
              socialId: fbData.id
            };
            this.userService.registerFacebookUser(data).subscribe(
              response => {
                console.log('User login successfully:', response);
                // Display token and userData in your Angular application
                console.log('User Data:', response);
                this.router.navigate(['/home']);
              },
              error => {
                console.error('Login error:', error);
              }
            );
          },
          error => {
            console.error('Facebook login error:', error);
          }
        );
      }

    loginFacebook() {
        const fbLoginPromise = new Promise<any>(resolve => FB.login(resolve));
        return from(fbLoginPromise).pipe(
            concatMap(({ authResponse }) => {
                if (authResponse) {
                    return new Promise<any>(resolve => {
                        FB.api('/me', { fields: 'id,name,email,first_name,last_name,gender,picture' }, resolve);
                    });
                } else {
                    return EMPTY;
                }
            })
        );
    }

    logout() {
        if (isPlatformBrowser(this.platformId)) {
            FB.logout();
        }
        this.accountSubject.next(null);
        this.router.navigate(['/login']);
    }

    getAccount() {
        return of(this.accountSubject.value); // Return the current account as observable
    }
    
    updateAccount(params: any) {
        return of({ ...this.accountValue, ...params }).pipe(
            map(account => {
                this.accountSubject.next(account as Account);
                return account;
            })
        );
    }

    deleteAccount() {
        this.logout();
        return EMPTY; // Simulate account deletion
    }
}
