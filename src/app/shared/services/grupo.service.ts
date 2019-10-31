import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../utils/api.constants';
import { Grupo } from '../model/grupo.model';

@Injectable()
export class GrupoService {

  constructor(private http: HttpClient) { }

  createOrUpdate(grupo: Grupo){
    if(grupo.id != null && grupo.id != ''){
      return this.http.put(`${API}/grupo/${grupo.id}`, grupo);
    } else {
      grupo.id = null;
      return this.http.post(`${API}/grupo`, grupo);
    }
  }

  findAllLazy(page: number, size: number ){
    return this.http.get(`${API}/grupo/lazy?page=${page}&size=${size}`)
  }

  findAll(){
    return this.http.get(`${API}/grupo`)
  }

  findById(id: string){
    return this.http.get(`${API}/grupo/${id}`)
  }

  delete(id: string){
    return this.http.delete(`${API}/grupo/${id}`)
  }
}
