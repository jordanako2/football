import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private _http: HttpClient) { }

  addTeam(data: any): Observable<any> {
    return this._http.post(`http://localhost:3000/football/teams`, data);
  }

  updateTeam(id: number, data: any): Observable<any> {
    return this._http.patch(`http://localhost:3000/football/teams/${id}`, data);
  }

  getTeams(): Observable<any> {
    return this._http.get(`http://localhost:3000/football/teams`);
  }

  deleteTeam(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/football/teams/${id}`)
  }
}
