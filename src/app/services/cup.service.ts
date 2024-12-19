import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CupService {

  constructor(private _http: HttpClient) { }

  addCup(data: any): Observable<any> {
    return this._http.post(environment.apiUrl+`/football/cups`, data);
  }

  getCupById(id: number): Observable<any> {
    return this._http.get(environment.apiUrl + `/football/cups/${id}`);
  }

  updateCup(id: number, data: any): Observable<any> {
    return this._http.patch(environment.apiUrl+`/football/cups/${id}`, data);
  }

  getCups(): Observable<any> {
    return this._http.get(environment.apiUrl+`/football/cups`);
  }

  getPostedCups(): Observable<any> {
    return this._http.get(environment.apiUrl+`/football/cups/website/cups`);
  }

  getCupTeams(): Observable<any> {
    return this._http.get<any>(`${environment.apiUrl}/football/cups/website/cup-teams`).pipe(
      map((cups) => {
        return cups.map((cup: any) => ({
          id: cup.id,
          title: cup.title,
          teams: cup.teams
            .map((team: any) => ({
              team: team.team.team,
              file_name: team.team.file_name,
              played: team.played,
              won: team.won,
              drawn: team.drawn,
              lost: team.lost,
              gf: team.goals_for,
              ga: team.goals_against,
              gd: team.goals_difference,
              points: team.points,
            }))
            .sort((a: any, b: any) => {
              if (b.points !== a.points) {
                return b.points - a.points; 
              } else if (b.gd !== a.gd) {
                return b.gd - a.gd; 
              } else {
                return b.gf - a.gf;
              }
            })
            // .slice(0, 10),
        }));
      })
    );
  }

  getCupMatches(): Observable<any> {
    return this._http.get(environment.apiUrl+`/football/cups/website/cup-match`);
  }

  deleteCup(id: number): Observable<any> {
    return this._http.delete(environment.apiUrl+`/football/cups/${id}`)
  }
}
