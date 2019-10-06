import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { API_SONIFLORES } from '../utils/api.soniflores.constants';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  login(user: User): any {
    return this.http.post(`${API_SONIFLORES}/users/login`, user);
  }

  createOrUpdate(user: User){
    if(user.id != null && user.id != ''){
      return this.http.put(`${API_SONIFLORES}/users`, user);
    } else {
      user.id = null;
      return this.http.post(`${API_SONIFLORES}/users`, user);
    }
  }

  findAll(page: number, size: number ){
    return this.http.get(`${API_SONIFLORES}/users/v2/${page}/${size}`)
  }

  findById(id: string){
    return this.http.get(`${API_SONIFLORES}/users/${id}`)
  }

  delete(id: string){
    return this.http.delete(`${API_SONIFLORES}/users/${id}`)
  }
}
