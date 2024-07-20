import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private _http: HttpClient) { }

  addTeam(data: any): Observable<any> {
    return this._http.post(environment.apiUrl+`/football/teams`, data);
  }

  updateTeam(id: number, data: any): Observable<any> {
    return this._http.patch(environment.apiUrl+`/football/teams/${id}`, data);
  }

  getTeamById(id: number): Observable<any> {
    return this._http.get(environment.apiUrl + `/football/teams/${id}`);
  }

  getTeams(): Observable<any> {
    return this._http.get(environment.apiUrl+`/football/teams`, { withCredentials: true });
  }

  deleteTeam(id: number): Observable<any> {
    return this._http.delete(environment.apiUrl+`/football/teams/${id}`)
  }

  uploadImage(image: File, fileName: string) {
    const formData = new FormData();
    formData.append('image', image, fileName);

    return this._http.post<any>(environment.apiUrl+`/upload/image`, formData);
  }

  getSquadByTeamId(id: number): Observable<any> {
    return this._http.get(environment.apiUrl + `/football/teams/${id}/squad`);
  }

  getTeamFixures(leagueId: number, teamId: number): Observable<any> {
    return this._http.get(environment.apiUrl + `/football/matches/league/${leagueId}/team/${teamId}/scores`);
  }

  getTeambySlug(slug: string): Observable<any> {
    return this._http.get(environment.apiUrl + `/football/teams/slug/${slug}`);
  }
}
