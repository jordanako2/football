import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  loginfb(): void {
    window.location.href = environment.apiUrl+'/auth/facebook';
  }
  
  getUser(): any {
    const token = this.cookieService.get('key');
    if (token) {
      this.router.navigate(['/home']);
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
    this.http.get(environment.apiUrl+'/auth/logout', { withCredentials: true })
      .subscribe(
        () => {
          this.cookieService.delete('key');
          this.router.navigate(['/home']);
          window.location.reload();
          setTimeout(() => {
              this.router.navigate(['/login']);
          }, 2000);
        },
        (error) => {
          console.error('Error during logout:', error);
        }
      );
  }
}
