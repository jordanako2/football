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
    return this._http.post(`http://localhost:3000/football/leagues`, data);
  }

  updateLeague(id: number, data: any): Observable<any> {
    return this._http.patch(`http://localhost:3000/football/leagues/${id}`, data);
  }

  getLeagues(): Observable<any> {
    return this._http.get(`http://localhost:3000/football/leagues`);
  }

  deleteLeague(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/football/leagues/${id}`)
  }
}
