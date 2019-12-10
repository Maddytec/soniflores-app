import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API } from "../utils/api.constants";
import { Produto } from "../model/produto.model";

@Injectable()
export class ProdutoService {

  constructor(
    private http: HttpClient) {
  }

  createOrUpdate(produto: Produto){
    if(produto.id != null && produto.id != null){
      return this.http.put(`${API}/produto/${produto.id}`, produto);
    } else {
      produto.id = null;
      return this.http.post(`${API}/produto`, produto);
    }
  }

  findAllLazy(page: number, size: number) {
    return this.http.get(`${API}/produto?page=${page}&size=${size}`)
  }

  findAll() {
    return this.http.get(`${API}/produto`)
  }

  findBySku(sku: string) {
    return this.http.get(`${API}/produto/${sku}`)
  }

  delete(id: string){
    return this.http.delete(`${API}/produto/${id}`)
  }
}