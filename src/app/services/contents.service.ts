import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentsService {

  constructor(private _http: HttpClient) { }

  addContent(data: any): Observable<any> {
    return this._http.post(environment.apiUrl+`/football/news`, data);
  }

  getContentById(id: number): Observable<any> {
    return this._http.get(environment.apiUrl + `/football/news/${id}`);
  }

  updateContent(id: number, data: any): Observable<any> {
    return this._http.patch(environment.apiUrl+`/football/news/${id}`, data);
  }

  getContent(): Observable<any> {
    return this._http.get(environment.apiUrl+`/football/news`);
  }

  deleteContent(id: number): Observable<any> {
    return this._http.delete(environment.apiUrl+`/football/news/${id}`)
  }
}
