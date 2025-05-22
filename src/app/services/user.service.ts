import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);
  private change_list:Subject<User[]> = new Subject<User[]>();

  constructor() { }

  getAll(): Observable<any> {
    return this.http.get<User[]>(this.url + "/api/users");
  }
  getById(id: number): Observable<any> {
    return this.http.get<User[]>(this.url + "/api/users/" + id);
  }
  insert(obj: User): Observable<any> {
    return this.http.post(this.url + "/api/users", obj);
  }
  update(obj: User): Observable<any> {
    return this.http.put(this.url + "/api/users", obj);
  }
  delete(id: number) {
    return this.http.delete(this.url + "/api/users/" + id);
  }

  setList(listaNueva:User[]){
    return this.change_list.next(listaNueva);
  }
  getList():Observable<User[]>{
    return this.change_list.asObservable();
  }
}
