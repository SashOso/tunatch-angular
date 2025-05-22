import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private url = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);
  private change_list:Subject<Role[]> = new Subject<Role[]>();

  constructor() { }

  getAll(): Observable<any> {
    return this.http.get<Role[]>(this.url + "/api/roles");
  }
  getById(id: number): Observable<any> {
    return this.http.get<Role[]>(this.url + "/api/roles/" + id);
  }
  insert(obj: Role): Observable<any> {
    return this.http.post(this.url + "/api/roles", obj);
  }
  update(obj: Role): Observable<any> {
    return this.http.put(this.url + "/api/roles", obj);
  }
  delete(id: number) {
    return this.http.delete(this.url + "/api/roles/" + id);
  }

  setList(listaNueva:Role[]){
    return this.change_list.next(listaNueva);
  }
  getList():Observable<Role[]>{
    return this.change_list.asObservable();
  }
}
