import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Features } from '../client/pages/home/right-content/right-content.component';

@Injectable({
  providedIn: 'root'
})
export class ContentsService {

  constructor(private _http: HttpClient) { }

  addContent(data: any): Observable<any> {
    return this._http.post(environment.apiUrl+`/football/content`, data);
  }

  uploadFile(file: File, fileName: string) {
    const formData = new FormData();
    formData.append('image', file, fileName);

    return this._http.post<any>(environment.apiUrl+`/football/content/upload`, formData);
  }

  uploadImage(image: File, fileName: string) {
    const formData = new FormData();
    formData.append('image', image, fileName);

    return this._http.post<any>(environment.apiUrl+`/football/content/upload`, formData);
  }

  getContentById(id: number): Observable<any> {
    return this._http.get(environment.apiUrl + `/football/content/${id}`);
  }
  
  updateContent(id: number, data: any): Observable<any> {
    return this._http.patch(environment.apiUrl+`/football/content/${id}`, data);
  }

  getContent(): Observable<any> {
    return this._http.get<Features[]>(environment.apiUrl+`/football/content`);
  }

  deleteContent(id: number): Observable<any> {
    return this._http.delete(environment.apiUrl+`/football/content/${id}`)
  }

  getContentByTeamId(teamId: number): Observable<any> {
    return this._http.get(environment.apiUrl + `/football/content/website/clubs/${teamId}`);
  }
}
