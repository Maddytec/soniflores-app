import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';
import { Produto } from '../../../shared/model/produto.model';
import { ProdutoService } from '../../../shared/services/produto.service';
import { ResponseApi } from '../../../shared/model/response-api';
import { MatTableDataSource, MatPaginator, PageEvent } from '@angular/material';
import { routerTransition } from '../../../router.animations';
import { DialogService } from '../../../dialog.service';
import { Router } from '@angular/router';
import { TableUtils } from '../../../shared/utils/table-utils';

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
  selector: 'app-produto-cosulta',
  templateUrl: './produto-consulta.component.html',
  styleUrls: ['./produto-consulta.component.scss'],
  animations: [routerTransition()]
})
export class ProdutoConsultaComponent implements OnInit {
  
  shared: SharedService;
  
  message: {};
  classCss: {};
  
  pageIndex: number = 0;
  length: number = 0;
  pageSize: number = 5;
  pageSizeOptions = ['5', '10', '30', '50', '100'];
  pageEvent: PageEvent;
  dataSource: MatTableDataSource<Produto>;
  produtos: Produto[] = new Array<Produto>();
  displayedColumns: string[] = [
    'id',
    'sku', 
    'nome', 
    'subcategoria', 
    'categoria', 
    'quantidadeEstoque', 
    'valorUnitario',
    'editar',
    'delete'
  ];

  constructor(
    private produtoService: ProdutoService,
    private dialogService: DialogService,
    private router: Router
  ) {
    this.shared = SharedService.getInstance();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.produtoService.findAll().subscribe((responseApi: ResponseApi) => {
      Object.keys(responseApi).forEach(key => {
        this.produtos.push(responseApi[key]);
      });
      this.dataSource = new MatTableDataSource<Produto>(this.produtos);
      this.length = this.produtos.length;
      this.dataSource.paginator = this.paginator;
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  private showMessage(message: { type: string, text: string }): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 5000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    }

    if (type === 'error' || type === 'erro' || type === 'errors') {
      type = 'danger'
    }

    this.classCss['alert-' + type] = true;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  edit(id: string) {
    this.router.navigate(['/produto', id]);
  }

  delete(id: string) {
    this.dialogService.confirm('Deseja realmente excluir o produto?')
      .then((canDelete: boolean) => {
        if (canDelete) {
          this.message = {};
          this.produtoService.delete(id).subscribe((responseApi: ResponseApi) => {
            this.showMessage({
              type: 'success',
              text: 'Produto excluido'
            });
            TableUtils.deleteRowDataTable(id, this.dataSource, this.paginator);
          }, err => {
            this.showMessage({
              type: 'error',
              text: err['error']['message']
            });
          });
        }
      });
  }

}
