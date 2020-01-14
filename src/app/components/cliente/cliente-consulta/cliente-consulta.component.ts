import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';
import { PAGE_INDEX, LENGTH, PAGE_SIZE, PAGE_SIZE_OPTIONS } from '../../../shared/utils/constants';
import { PageEvent, MatTableDataSource, MatPaginator } from '@angular/material';
import { Cliente } from '../../../shared/model/cliente.model';
import { ClienteService } from '../../../shared/services/cliente.service';
import { DialogService } from '../../../dialog.service';
import { Router } from '@angular/router';
import { ResponseApi } from '../../../shared/model/response-api';
import { Categoria } from '../../../shared/model/categoria.model';
import { TableUtils } from '../../../shared/utils/table-utils';
import { routerTransition } from '../../../router.animations';

@Component({
  selector: 'app-cliente-consulta',
  templateUrl: './cliente-consulta.component.html',
  styleUrls: ['./cliente-consulta.component.scss'],
  animations: [routerTransition()]
})
export class ClienteConsultaComponent implements OnInit {

  shared: SharedService;

  message: {};
  classCss: {};

  pageIndex = PAGE_INDEX;
  length = LENGTH;
  pageSize = PAGE_SIZE;
  pageSizeOptions = PAGE_SIZE_OPTIONS;
  pageEvent: PageEvent;
  dataSource: MatTableDataSource<Cliente>;
  clientes: Cliente[] = new Array<Cliente>();
  displayedColumns: string[] = [
    'documentoReceitaFederal',
		'nome',
		'foneMovel',
		'foneFixo',
		'email',
    'editar',
    'delete'
  ]; 
  constructor(
    private clienteService: ClienteService,
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
    this.clienteService.findAll().subscribe((responseApi: ResponseApi) => {
      Object.keys(responseApi).forEach(key => {
        this.clientes.push(responseApi[key]);
      });
      this.dataSource = new MatTableDataSource<Cliente>(this.clientes);
      this.length = this.clientes.length;
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
    this.router.navigate(['/cliente', id]);
  }

  delete(id: string) {
    this.dialogService.confirm('Deseja realmente excluir cliente?')
      .then((canDelete: boolean) => {
        if (canDelete) {
          this.message = {};
          this.clienteService.delete(id).subscribe((responseApi: ResponseApi) => {
            this.showMessage({
              type: 'success',
              text: 'Cliente excluido'
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
