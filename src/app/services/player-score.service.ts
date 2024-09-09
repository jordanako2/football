import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerScoreService {

    constructor(private _http: HttpClient) { }

    addPlayerScore(data: any): Observable<any> {
        return this._http.post(environment.apiUrl+`/football/player-scores`, data);
    }

    getPlayerScores(): Observable<any> {
        return this._http.get(environment.apiUrl+`/football/player-scores`,);
    }

    getPlayerScoresbyTeamIdandMatchId(teamId: number, matchId: number): Observable<any> {
        return this._http.get(environment.apiUrl + `/football/player-scores/team/${teamId}/match/${matchId}`);
    }

    updatePlayerScores(id: number, data: any): Observable<any> {
        return this._http.patch(environment.apiUrl+`/football/player-scores/${id}`, data);
    }

    deletePlayerScore(id: number): Observable<any> {
        return this._http.delete(environment.apiUrl+`/football/player-scores/${id}`)
    }






}