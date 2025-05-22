import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private url = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);

  constructor() { }

}
