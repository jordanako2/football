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

  addUser(data: any): Observable<any> {
    return this.http.post(environment.apiUrl+`/users`, data);
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.http.patch(environment.apiUrl+`/users/${id}`, data);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + `/users/${id}`);
  }

  getUsers(): Observable<any> {
    return this.http.get(environment.apiUrl+`/users`, { withCredentials: true });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl+`/users/${id}`)
  }
}
