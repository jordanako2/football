import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private _http: HttpClient) { }

  addTeam(data: any): Observable<any> {
    return this._http.post(`https://florify.online/football/teams`, data);
  }

  updateTeam(id: number, data: any): Observable<any> {
    return this._http.patch(`https://florify.online/football/teams/${id}`, data);
  }

  getTeams(): Observable<any> {
    return this._http.get(`https://florify.online/football/teams`);
  }

  deleteTeam(id: number): Observable<any> {
    return this._http.delete(`https://florify.online/football/teams/${id}`)
  }

  uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);

    return this._http.post<any>('https://florify.online/upload/image', formData);
  }
}
