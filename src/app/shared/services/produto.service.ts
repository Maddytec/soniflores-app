import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API } from "../utils/api.constants";

@Injectable()
export class ProdutoService {

  constructor(
    private http: HttpClient) {
  }

  findAllLazy(page: number, size: number) {
    return this.http.get(`${API}/produto?page=${page}&size=${size}`)
  }

  findAll() {
    return this.http.get(`${API}/produto`)
  }

  findById(id: string) {
    return this.http.get(`${API}/produto/${id}`)
  }
}