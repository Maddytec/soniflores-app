import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API } from "../utils/api.constants";
import { Produto } from "../model/produto.model";
import { Cliente } from "../model/cliente.model";

@Injectable()
export class ClienteService {

  constructor(
    private http: HttpClient) {
  }

  createOrUpdate(cliente: Cliente){
    if(cliente.id != null && cliente.id != null){
      return this.http.put(`${API}/cliente/${cliente.id}`, cliente);
    } else {
      cliente.id = null;
      return this.http.post(`${API}/cliente`, cliente);
    }
  }

  findAllLazy(page: number, size: number) {
    return this.http.get(`${API}/cliente?page=${page}&size=${size}`)
  }

  findAll() {
    return this.http.get(`${API}/cliente`)
  }

  findById(id: string) {
    return this.http.get(`${API}/cliente/${id}`)
  }

  findByEmail(email: string) {
    return this.http.get(`${API}/cliente/email/${email}`)
  }

  delete(id: string){
    return this.http.delete(`${API}/cliente/${id}`)
  }
}