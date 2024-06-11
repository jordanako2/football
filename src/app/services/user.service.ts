import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user/user.interface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(environment.apiUrl+`/users/register`, user);
  }

  registerGoogleUser(user: User): Observable<User> {
    return this.http.post<User>(environment.apiUrl+`/users/google/register`, user);
  }

  registerFacebookUser(user: User): Observable<User> {
    return this.http.post<User>(environment.apiUrl+`/users/facebook/register`, user);
  }
}
