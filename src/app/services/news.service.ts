import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Features } from '../client/pages/home/right-content/right-content.component';

@Injectable({
  providedIn: 'root'
})
export class NewsService {


  constructor(private _http: HttpClient) { }

  addContent(data: any): Observable<any> {
    return this._http.post(environment.apiUrl+`/football/content/website/news`, data);
  }

  uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);

    return this._http.post<any>(environment.apiUrl+`/football/content/website/news/upload`, formData);
  }

  getContentById(id: number): Observable<any> {
    return this._http.get(environment.apiUrl + `/football/content/website/news/${id}`);
  }
  
  updateContent(id: number, data: any): Observable<any> {
    return this._http.patch(environment.apiUrl+`/football/content//website/news/${id}`, data);
  }

  getContent(): Observable<any> {
    return this._http.get<Features[]>(environment.apiUrl+`/football/content/website/news`);
  }

  deleteContent(id: number): Observable<any> {
    return this._http.delete(environment.apiUrl+`/football/content//website/news${id}`)
  }
}
