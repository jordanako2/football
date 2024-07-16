import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Features } from '../client/pages/home/right-content/right-content.component';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private _http: HttpClient) { }

  uploadImages(formData: FormData, teamId: number): Observable<any> {
    formData.append('team_id', teamId.toString());  // Append the team ID to FormData

    return this._http.post<any>(`${environment.apiUrl}/football/gallery/upload`, formData);  // Make sure to include formData in the POST request
  }

  getGalleryByTeamId(teamId: number): Observable<any> {
    return this._http.get(environment.apiUrl + `/football/gallery/team/${teamId}`);
  }

  deleteGallery(id: number): Observable<any> {
    return this._http.delete(environment.apiUrl+`/football/gallery/${id}`)
  }


//   uploadImages(files: File[], teamId: number): Observable<any> {
//     const formData = new FormData();
//     files.forEach(file => formData.append('images', file, file.name));
//     formData.append('team_id', teamId.toString());

//     return this._http.post<any>(environment.apiUrl+`/football/gallery/upload`, formData);
//   }

//   uploadImage(image: File, fileName: string) {
//     const formData = new FormData();
//     formData.append('image', image, fileName);

//     return this._http.post<any>(environment.apiUrl+`/football/gallery/upload`, formData);
//   }
}
