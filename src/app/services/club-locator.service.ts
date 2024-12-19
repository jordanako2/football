import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClubLocatorService {

  constructor(private _http: HttpClient) { }

  addClubLocator(data: any): Observable<any> {
    return this._http.post(environment.apiUrl+`/football/club-locators`, data);
  }

  updateClubLocator(id: number, data: any): Observable<any> {
    return this._http.patch(environment.apiUrl+`/football/club-locators/${id}`, data);
  }

  getClubLocatorById(id: number): Observable<any> {
    return this._http.get(environment.apiUrl + `/football/club-locators/${id}`);
  }

  getClubLocators(): Observable<any> {
    return this._http.get(environment.apiUrl+`/football/club-locators`, { withCredentials: true });
  }

  deleteClubLocator(id: number): Observable<any> {
    return this._http.delete(environment.apiUrl+`/football/club-locators/${id}`)
  }
}
