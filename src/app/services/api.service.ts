import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public readonly URL_IMAGE = `https://apii.florify.online/uploads/`;
  public readonly URL_CONTENT_IMAGE = `https://apii.florify.online/uploads/content/`;
}
