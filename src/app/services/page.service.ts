import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private _http: HttpClient) { }

  addPage(data: any): Observable<any> {
    return this._http.post(environment.apiUrl+`/football/pages`, data);
  }

  updatePage(id: number, data: any): Observable<any> {
    return this._http.patch(environment.apiUrl+`/football/pages/${id}`, data);
  }

  getPageById(id: number): Observable<any> {
    return this._http.get(environment.apiUrl + `/football/pages/${id}`);
  }

  getPages(): Observable<any> {
    return this._http.get(environment.apiUrl+`/football/pages`, { withCredentials: true });
  }

  deletePage(id: number): Observable<any> {
    return this._http.delete(environment.apiUrl+`/football/pages/${id}`)
  }

  getPagebySlug(slug: string): Observable<any> {
    return this._http.get(environment.apiUrl + `/football/pages/slug/${slug}`);
  }
}
