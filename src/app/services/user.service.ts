// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://florify.online/users/register';  
  private apiGoogle = 'https://florify.online/users/google/register';

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  registerGoogleUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiGoogle, user);
  }
}
