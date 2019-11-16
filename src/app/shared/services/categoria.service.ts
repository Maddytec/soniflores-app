import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../utils/api.constants';
import { Categoria } from '../model/categoria.model';

@Injectable()
export class CategoriaService {

  constructor(private http: HttpClient) { }

  createOrUpdate(categoria: Categoria) {
    if (categoria.id != null && categoria.id != '') {
      return this.http.put(`${API}/categoria/${categoria.id}`, categoria);
    } else {
      categoria.id = null;
      return this.http.post(`${API}/categoria`, categoria);
    }
  }

  findAllLazy(page: number, size: number) {
    return this.http.get(`${API}/categoria/lazy?page=${page}&size=${size}`)
  }

  findAll() {
    return this.http.get(`${API}/categoria`)
  }

  findById(id: string) {
    return this.http.get(`${API}/categoria/${id}`)
  }

  delete(id: string) {
    return this.http.delete(`${API}/categoria/${id}`)
  }
}
