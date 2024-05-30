import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth/google'; // Replace with your NestJS API URL

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    window.location.href = 'http://localhost:3000/auth/google/login';
  }
  
  getUser(): any {
    const token = this.cookieService.get('jwt');
    if (token) {
      // Decode the token and extract user data
      // Example:
      // const decodedToken = jwt_decode(token);
      // return decodedToken.user;
    } else {
      return null;
    }
  }
  
  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        localStorage.removeItem('user');
        this.router.navigate(['/']);
      })
    );
  }
  
  
}
