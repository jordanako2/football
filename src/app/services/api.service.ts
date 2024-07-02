import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // public readonly URL_IMAGE = `https://apii.florify.online/uploads/`;
  // public readonly URL_CONTENT_IMAGE = `https://apii.florify.online/uploads/content/`;

  public readonly URL_IMAGE = `https://api.bfl.ph/uploads/`;
  public readonly URL_CONTENT_IMAGE = `https://api.bfl.ph/uploads/content/`;
}
