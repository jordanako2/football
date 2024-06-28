import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl+'/auth/login';
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(
    private http: HttpClient, 
    private router: Router,
    private cookieService: CookieService,
  ) {}

  login(email: string, password: string): Observable<void> {
    return this.http.post<{ accessToken: string }>(this.apiUrl, { email, password })
      .pipe(
        map(response => {
          const token = response.accessToken;
          this.cookieService.set('key', token, { secure: true, sameSite: 'Strict' });
          const decodedToken = jwtDecode(token);
          this.userSubject.next(decodedToken); 
          this.isAuthenticatedSubject.next(true); 
          this.router.navigate(['/']);
        })
      );
  }

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
          this.cookieService.delete('key');
          this.userSubject.next(null);
          this.isAuthenticatedSubject.next(false); 
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error during logout:', error);
        }
      });
  }

}
