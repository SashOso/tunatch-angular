import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Artist } from '../models/artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private url = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);
  private change_list:Subject<Artist[]> = new Subject<Artist[]>();

  constructor() { }

  getAll(): Observable<any> {
    return this.http.get<Artist[]>(this.url + "/api/artists");
  }
  getById(id: number): Observable<any> {
    return this.http.get<Artist[]>(this.url + "/api/artists/" + id);
  }
  insert(obj: Artist): Observable<any> {
    return this.http.post(this.url + "/api/artists", obj);
  }
  update(obj: Artist): Observable<any> {
    return this.http.put(this.url + "/api/artists", obj);
  }
  delete(id: number) {
    return this.http.delete(this.url + "/api/artists/" + id);
  }

  setList(listaNueva:Artist[]){
    return this.change_list.next(listaNueva);
  }
  getList():Observable<Artist[]>{
    return this.change_list.asObservable();
  }
}
