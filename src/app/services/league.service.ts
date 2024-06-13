import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  deleteLeague(id: number): Observable<any> {
    return this._http.delete(environment.apiUrl+`/football/leagues/${id}`)
  }
}
