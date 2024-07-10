import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SquadService {

  constructor(private _http: HttpClient) { }

  addSquad(data: any): Observable<any> {
    return this._http.post(environment.apiUrl+`/football/squads`, data);
  }

  updateSquad(id: number, data: any): Observable<any> {
    return this._http.patch(environment.apiUrl+`/football/squads/${id}`, data);
  }

  getSquadById(id: number): Observable<any> {
    return this._http.get(environment.apiUrl + `/football/squads/${id}`);
  }

  getSquads(): Observable<any> {
    return this._http.get(environment.apiUrl+`/football/squads`);
  }

  deleteSquad(id: number): Observable<any> {
    return this._http.delete(environment.apiUrl+`/football/squads/${id}`)
  }

  uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);

    return this._http.post<any>(environment.apiUrl+`/upload/image`, formData);
  }
}
