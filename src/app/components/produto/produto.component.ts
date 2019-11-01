import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { Produto } from '../../shared/model/produto.model';
import { ProdutoService } from '../../shared/services/produto.service';
import { ResponseApi } from '../../shared/model/response-api';
import { Message } from '../../shared/utils/message';
import { MatTableDataSource, MatPaginator, PageEvent } from '@angular/material';
import { routerTransition } from '../../router.animations';

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
  styleUrls: ['./produto.component.scss'],
  animations: [routerTransition()]
})
export class ProdutoComponent {

  pageIndex: number = 0;
  length: number = 0;
  pageSize: number = 5;
  pageSizeOptions = ['5', '10', '30', '50'];

  shared: SharedService;

  message: Message = new Message();
  classCss: {};

  displayedColumns: string[] = ['id', 'sku', 'nome', 'subcategoria', 'categoria', 'quantidadeEstoque', 'valorUnitario',];
  produtos: Produto[];
  dataSource: MatTableDataSource<Produto>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageEvent: PageEvent;

  constructor(
    private produtoService: ProdutoService
  ) {
    this.shared = SharedService.getInstance();
    this.findAll();
  }

  findAll() {
    this.produtoService.findAll(this.pageIndex, this.pageSize).subscribe((responseApi: ResponseApi) => {
      this.produtos = responseApi['elements'];
      this.length = responseApi['totalElements'];
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

  public getServerData(event?: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.findAll(this.pageIndex, this.pageSize);
    return event;
  }

}
