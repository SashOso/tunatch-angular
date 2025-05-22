import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private url = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);
  private change_list:Subject<Song[]> = new Subject<Song[]>();

  constructor() { }

  getAll(): Observable<any> {
    return this.http.get<Song[]>(this.url + "/api/songs");
  }
  getById(id: number): Observable<any> {
    return this.http.get<Song[]>(this.url + "/api/songs/" + id);
  }
  insert(obj: Song): Observable<any> {
    return this.http.post(this.url + "/api/songs", obj);
  }
  update(obj: Song): Observable<any> {
    return this.http.put(this.url + "/api/songs", obj);
  }
  delete(id: number) {
    return this.http.delete(this.url + "/api/songs/" + id);
  }

  setList(listaNueva:Song[]){
    return this.change_list.next(listaNueva);
  }
  getList():Observable<Song[]>{
    return this.change_list.asObservable();
  }
}
