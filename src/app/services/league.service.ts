import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  constructor(private _http: HttpClient) { }

  addLeague(data: any): Observable<any> {
    return this._http.post(environment.apiUrl+`/football/leagues`, data);
  }

  getLeagueById(id: number): Observable<any> {
    return this._http.get(environment.apiUrl + `/football/leagues/${id}`);
  }

  updateLeague(id: number, data: any): Observable<any> {
    return this._http.patch(environment.apiUrl+`/football/leagues/${id}`, data);
  }

  getLeagues(): Observable<any> {
    return this._http.get(environment.apiUrl+`/football/leagues`);
  }

  getLeagueTeams(): Observable<any> {
    return this._http.get<any>(`${environment.apiUrl}/football/leagues/league-teams`).pipe(
      map((leagues) => {
        return leagues.map((league: any) => ({
          id: league.id,
          title: league.title,
          teams: league.teams
            .map((team: any) => ({
              team: team.team.team,
              played: team.played,
              gd: team.goals_difference,
              points: team.points,
            }))
            .sort((a: any, b: any) => b.points - a.points)
            .slice(0, 10),
        }));
      })
    );
  }

  deleteLeague(id: number): Observable<any> {
    return this._http.delete(environment.apiUrl+`/football/leagues/${id}`)
  }
}
