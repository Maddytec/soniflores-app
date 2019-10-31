import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { Produto } from '../../shared/model/produto.model';
import { ProdutoService } from '../../shared/services/produto.service';
import { ResponseApi } from '../../shared/model/response-api';
import { Message } from '../../shared/utils/message';
import { MatTableDataSource } from '@angular/material';

export interface Produto {
  id: string;
  nome: string;
  sku: string;
  valorUnitario: number;
  quantidadeEstoque: number;
  categoria: {
    id: string
    descricao: string,
    categoriaPai: {
      id: string,
      descricao: string
    }
  }
}


@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent {

  page: number = 0;
  pageSize: number = 5;
  shared: SharedService;
  listaProduto: Array<Produto>;
  displayedColumns: string[] = ['id', 'sku', 'nome', 'subcategoria', 'categoria', 'quantidadeEstoque',  'valorUnitario',];
  dataSource: MatTableDataSource<Produto>;
  produtos: Produto[];
  message: Message = new Message();

  constructor(
    private produtoService: ProdutoService
  ) {
    this.shared = SharedService.getInstance();
    this.findAll();
  }

  findAll() {
    this.produtoService.findAll(this.page, this.pageSize).subscribe((responseApi: ResponseApi) => {
      this.produtos = responseApi['elements'];
      this.dataSource = new MatTableDataSource<Produto>(this.produtos);
    },
      err => {
        this.message.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
        });
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
