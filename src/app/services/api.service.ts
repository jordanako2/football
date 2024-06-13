import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public readonly URL_IMAGE = environment.apiUrl+`/uploads/`;
}
