import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Playlist } from '../models/playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private url = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);
  private change_list:Subject<Playlist[]> = new Subject<Playlist[]>();

  constructor() { }

  getAll(): Observable<any> {
    return this.http.get<Playlist[]>(this.url + "/api/playlists");
  }
  getById(id: number): Observable<any> {
    return this.http.get<Playlist[]>(this.url + "/api/playlists/" + id);
  }
  insert(obj: Playlist): Observable<any> {
    return this.http.post(this.url + "/api/playlists", obj);
  }
  update(obj: Playlist): Observable<any> {
    return this.http.put(this.url + "/api/playlists", obj);
  }
  delete(id: number) {
    return this.http.delete(this.url + "/api/playlists/" + id);
  }

  setList(listaNueva:Playlist[]){
    return this.change_list.next(listaNueva);
  }
  getList():Observable<Playlist[]>{
    return this.change_list.asObservable();
  }
}
