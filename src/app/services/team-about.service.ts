import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamAboutService {

  constructor(private _http: HttpClient) { }

  addTeamAbout(data: any): Observable<any> {
    return this._http.post(environment.apiUrl+`/football/team-about`, data);
  }

  updateTeamAbout(id: number, data: any): Observable<any> {
    return this._http.patch(environment.apiUrl+`/football/team-about/${id}`, data);
  }

  getTeamAboutById(id: number): Observable<any> {
    return this._http.get(environment.apiUrl + `/football/team-about/${id}`);
  }

  getTeamAboutByTeamId(id: number): Observable<any> {
    return this._http.get(environment.apiUrl + `/football/team-about/team/${id}`);
  }

  getTeamAbout(): Observable<any> {
    return this._http.get(environment.apiUrl+`/football/team-about`, { withCredentials: true });
  }

  deleteTeamAbout(id: number): Observable<any> {
    return this._http.delete(environment.apiUrl+`/football/team-about/${id}`)
  }
}
