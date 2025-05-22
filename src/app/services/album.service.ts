import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Album } from '../models/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
    private url = environment.apiUrl;
    private http: HttpClient = inject(HttpClient);
    private change_list:Subject<Album[]> = new Subject<Album[]>();

    constructor() { }

    getAll(): Observable<any> {
        return this.http.get<Album[]>(this.url + "/api/albums");
    }
    getById(id: number): Observable<any> {
        return this.http.get<Album[]>(this.url + "/api/albums/" + id);
    }
    insert(obj: Album): Observable<any> {
        return this.http.post(this.url + "/api/albums", obj);
    }
    update(obj: Album): Observable<any> {
        return this.http.put(this.url + "/api/albums", obj);
    }
    delete(id: number) {
        return this.http.delete(this.url + "/api/albums/" + id);
    }

    setList(listaNueva:Album[]){
        return this.change_list.next(listaNueva);
    }
    getList():Observable<Album[]>{
        return this.change_list.asObservable();
    }
}
