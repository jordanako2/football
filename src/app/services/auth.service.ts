import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth/google'; // Replace with your NestJS API URL

  constructor(
    private http: HttpClient, 
    private router: Router,
    private cookieService: CookieService
  ) {}

  login(): void {
    window.location.href = 'http://localhost:3000/auth/google/login';
  }
  
  getUser(): any {
    const token = this.cookieService.get('jwt');
    if (token) {
      const decodedToken = jwtDecode(token) as { [key: string]: any };
      console.log(decodedToken)
      return decodedToken;
    } else {
      return null;
    }
  }
  
  // logout(): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
  //     tap(() => {
  //       localStorage.removeItem('user');
  //       this.router.navigate(['/']);
  //     })
  //   );
  // }

  logout() {
    this.http.get('http://localhost:3000/auth/google/logout', { withCredentials: true })
      .subscribe(
        () => {
          // Clear local JWT token if stored
          // localStorage.removeItem('jwt'); // Uncomment if you use localStorage
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error during logout:', error);
        }
      );
  }
  
  
}
