import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { API_SONIFLORES } from '../utils/api.soniflores.constants';
import { Grupo } from '../model/grupo.model';

@Injectable()
export class GrupoService {

  constructor(private http: HttpClient) { }

  createOrUpdate(grupo: Grupo){
    if(grupo.id != null && grupo.id != ''){
      return this.http.put(`${API_SONIFLORES}/grupo/${grupo.id}`, grupo);
    } else {
      grupo.id = null;
      return this.http.post(`${API_SONIFLORES}/grupo`, grupo);
    }
  }

  findAllLazy(page: number, size: number ){
    return this.http.get(`${API_SONIFLORES}/grupo/lazy?page=${page}&size=${size}`)
  }

  findAll(){
    return this.http.get(`${API_SONIFLORES}/grupo`)
  }

  findById(id: string){
    return this.http.get(`${API_SONIFLORES}/grupo/${id}`)
  }

  delete(id: string){
    return this.http.delete(`${API_SONIFLORES}/grupo/${id}`)
  }
}
