import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Genre } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private url = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);
  private change_list:Subject<Genre[]> = new Subject<Genre[]>();

  constructor() { }

  getAll(): Observable<any> {
    return this.http.get<Genre[]>(this.url + "/api/genres");
  }
  getById(id: number): Observable<any> {
    return this.http.get<Genre[]>(this.url + "/api/genres/" + id);
  }
  insert(obj: Genre): Observable<any> {
    return this.http.post(this.url + "/api/genres", obj);
  }
  update(obj: Genre): Observable<any> {
    return this.http.put(this.url + "/api/genres", obj);
  }
  delete(id: number) {
    return this.http.delete(this.url + "/api/genres/" + id);
  }

  setList(listaNueva:Genre[]){
    return this.change_list.next(listaNueva);
  }
  getList():Observable<Genre[]>{
    return this.change_list.asObservable();
  }
}
