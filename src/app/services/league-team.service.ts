import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeagueTeamService {

  constructor(private _http: HttpClient) { }

  addLeagueTeam(data: any): Observable<any> {
    return this._http.post(environment.apiUrl+`/football/league-teams`, data);
  }

//   updateLeague(id: number, data: any): Observable<any> {
//     return this._http.patch(`http://localhost:3000/football/leagues/${id}`, data);
//   }

  getLeagueTeams(leagueId: number): Observable<any> {
    return this._http.get(environment.apiUrl+`/football/league-teams/${leagueId}`);
  }

//   deleteLeague(id: number): Observable<any> {
//     return this._http.delete(`http://localhost:3000/football/leagues/${id}`)
//   }
}
