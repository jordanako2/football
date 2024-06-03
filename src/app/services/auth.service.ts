import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiGoogleUrl = 'http://localhost:3000/auth/google'; 
  private apiUrl = 'http://localhost:3000/auth/login';

  constructor(
    private http: HttpClient, 
    private router: Router,
    private cookieService: CookieService
  ) {}

  login(email: string, password: string): Observable<void> {
    return this.http.post<{ accessToken: string }>(this.apiUrl, { email, password })
      .pipe(
        map(response => {
          const token = response.accessToken;
          this.cookieService.set('key', token, { secure: true, sameSite: 'Strict' });
          const decodedToken = jwtDecode(token);
          this.router.navigate(['/']);
          console.log(decodedToken);
        })
      );
  }

  logingoogle(): void {
    window.location.href = 'http://localhost:3000/auth/google/login';
  }

  loginfb(): void {
    window.location.href = 'http://localhost:3000/auth/facebook';
  }
  
  getUser(): any {
    const token = this.cookieService.get('key');
    if (token) {
      const decodedToken = jwtDecode(token) as { [key: string]: any };
      console.log(decodedToken)
      return decodedToken;
    } else {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.cookieService.get('key');
  }
  
  logout() {
    this.http.get('http://localhost:3000/auth/google/logout', { withCredentials: true })
      .subscribe(
        () => {
          // Clear local JWT token if stored
          // localStorage.removeItem('jwt'); // Uncomment if you use localStorage
          this.cookieService.delete('key');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error during logout:', error);
        }
      );
  }
  
  
}
