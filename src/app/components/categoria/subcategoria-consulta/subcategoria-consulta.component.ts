import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { SharedService } from '../../../shared/services/shared.service';
import { PageEvent, MatTableDataSource, MatPaginatorModule, MatPaginator } from '@angular/material';
import { Categoria } from '../../../shared/model/categoria.model';
import { PAGE_SIZE_OPTIONS, PAGE_INDEX, LENGTH, PAGE_SIZE } from '../../../shared/utils/constants';
import { CategoriaService } from '../../../shared/services/categoria.service';
import { DialogService } from '../../../dialog.service';
import { Router } from '@angular/router';
import { ResponseApi } from '../../../shared/model/response-api';
import { TableUtils } from '../../../shared/utils/table-utils';

@Component({
  selector: 'app-subcategoria-consulta',
  templateUrl: './subcategoria-consulta.component.html',
  styleUrls: ['./subcategoria-consulta.component.scss'],
  animations: [routerTransition()]
})
export class SubcategoriaConsultaComponent implements OnInit {

  shared: SharedService;

  message: {};
  classCss: {};

  pageIndex = PAGE_INDEX;
  length = LENGTH;
  pageSize = PAGE_SIZE;
  pageSizeOptions = PAGE_SIZE_OPTIONS;
  pageEvent: PageEvent;
  dataSource: MatTableDataSource<Categoria>;
  categorias: Categoria[] = new Array<Categoria>();
  displayedColumns: string[] = [
    'id',
    'descricao',
    'categoria',
    'editar',
    'delete'
  ]; 

  constructor(
    private categoriaService: CategoriaService,
    private dialogService: DialogService,
    private router: Router
  ) { 
    this.shared = SharedService.getInstance();
  }

  @ViewChild(MatPaginator, { static: true} ) paginator: MatPaginator;

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.categoriaService.findAll().subscribe((responseApi: ResponseApi) => {
      Object.keys(responseApi).forEach(key => {
        this.categorias.push(responseApi[key]);
        this.categorias = this.categorias.filter(categoria => categoria.categoriaPai !== undefined);
      });
      this.dataSource = new MatTableDataSource<Categoria>(this.categorias);
      this.length = this.categorias.length;
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
    }, 8000);
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
    this.router.navigate(['/subcategoria', id]);
  }

  delete(id: string) {
    this.dialogService.confirm('Deseja realmente excluir a subcategoria?')
      .then((canDelete: boolean) => {
        if (canDelete) {
          this.message = {};
          this.categoriaService.delete(id).subscribe((responseApi: ResponseApi) => {
            this.showMessage({
              type: 'success',
              text: 'Subcategoria excluida'
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
