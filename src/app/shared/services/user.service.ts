import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { API } from '../utils/api.constants';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  login(user: User): any {
    return this.http.post(`${API}/usuario/login`, user);
  }

  createOrUpdate(user: User){
    if(user.id != null && user.id != ''){
      return this.http.put(`${API}/usuario/${user.id}`, user);
    } else {
      user.id = null;
      return this.http.post(`${API}/usuario`, user);
    }
  }

  findAllLazy(page: number, size: number ){
    return this.http.get(`${API}/usuario/v2?page=${page}&size=${size}`)
  }

  findAll(){
    return this.http.get(`${API}/usuario`)
  }

  findById(id: string){
    return this.http.get(`${API}/usuario/${id}`)
  }

  delete(id: string){
    return this.http.delete(`${API}/usuario/${id}`)
  }
}
