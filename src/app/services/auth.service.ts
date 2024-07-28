import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl+'/auth/login';
  private apiRefreshUrl = environment.apiUrl+'/auth/refresh';
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(
    private http: HttpClient, 
    private router: Router,
    private cookieService: CookieService,
  ) {}

  login(email: string, password: string): Observable<void> {
    return this.http.post<{ accessToken: string, refreshToken: string }>(this.apiUrl, { email, password })
      .pipe(
        map(response => {
          const { accessToken, refreshToken } = response;
          this.cookieService.set('key', accessToken, { secure: true, sameSite: 'Strict', path: '/' });
          this.cookieService.set('refreshToken', refreshToken, { secure: true, sameSite: 'Strict', path: '/' });
          const decodedToken = jwtDecode(accessToken);
          this.userSubject.next(decodedToken);
          this.isAuthenticatedSubject.next(true);
          this.router.navigate(['/']);
        })
      );
  }

  refreshToken(): Observable<void> {
    const refreshToken = this.cookieService.get('refreshToken');
    return this.http.post<{ accessToken: string }>(this.apiRefreshUrl, { refreshToken })
      .pipe(
        map(response => {
          const { accessToken } = response;
          this.cookieService.set('key', accessToken, { secure: true, sameSite: 'Strict', path: '/' });
          const decodedToken = jwtDecode(accessToken);
          this.userSubject.next(decodedToken);
        }),
        catchError(error => {
          this.logout();
          return throwError(() => new Error(error.message));
        })
      );
  }

  // login(email: string, password: string): Observable<void> {
  //   return this.http.post<{ accessToken: string }>(this.apiUrl, { email, password })
  //     .pipe(
  //       map(response => {
  //         const token = response.accessToken;
  //         this.cookieService.set('key', token, { secure: true, sameSite: 'Strict', path: '/' });
  //         const decodedToken = jwtDecode(token);
  //         this.userSubject.next(decodedToken); 
  //         this.isAuthenticatedSubject.next(true); 
  //         this.router.navigate(['/']);
  //       })
  //     );
  // }



  loginfb(): void {
    window.location.href = environment.apiUrl+'/auth/facebook';
  }

  getToken(): string {
    const token = this.cookieService.get('key');
    return token
  }
  
  getUser(): any {
    const token = this.cookieService.get('key');
    if (token) {
      const decodedToken = jwtDecode(token) as { [key: string]: any };
      return decodedToken;
    } else {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.cookieService.get('key');
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
  
  logout(): void {
    this.http.get(environment.apiUrl + '/auth/logout')
      .subscribe({
        next: () => {
          this.cookieService.delete('key', '/');
          this.cookieService.delete('refreshToken', '/');
          this.userSubject.next(null);
          this.isAuthenticatedSubject.next(false);
          this.router.navigate(['/login']);
          console.log('Logout successful, deleting cookies...');
        },
        error: (error) => {
          console.error('Error during logout:', error);
        }
      });
  }

}
