import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { API_SONIFLORES } from '../utils/api.soniflores.constants';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  login(user: User): any {
    return this.http.post(`${API_SONIFLORES}/usuario/login`, user);
  }

  createOrUpdate(user: User){
    if(user.id != null && user.id != ''){
      return this.http.put(`${API_SONIFLORES}/usuario/${user.id}`, user);
    } else {
      user.id = null;
      return this.http.post(`${API_SONIFLORES}/usuario`, user);
    }
  }

  findAll(page: number, size: number ){
    return this.http.get(`${API_SONIFLORES}/usuario/v2?page=${page}&size=${size}`)
  }

  findById(id: string){
    return this.http.get(`${API_SONIFLORES}/usuario/${id}`)
  }

  delete(id: string){
    return this.http.delete(`${API_SONIFLORES}/usuario/${id}`)
  }
}
