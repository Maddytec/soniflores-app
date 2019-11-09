import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';
import { DialogService } from '../../../dialog.service';
import { UserService } from '../../../shared/services/user.service';
import { Router } from '@angular/router';
import { ResponseApi } from '../../../shared/model/response-api';
import { MatTableDataSource, MatPaginator, PageEvent } from '@angular/material';
import { routerTransition } from '../../../router.animations';
import { User } from '../../../shared/model/user.model';
import { TableUtils } from '../../../shared/utils/table-utils';

export interface Usuario {
  nome: string;
  email: number;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  animations: [routerTransition()]
})
export class UserListComponent implements OnInit {

  pageIndex: number = 0;
  length: number = 0;

  pageSize: number = 5;
  pageSizeOptions = ['5', '10', '30', '50'];
  shared: SharedService;
  message: {};
  classCss: {};
  displayedColumns: string[] = ['id', 'nome', 'email', 'editar', 'delete'];
  usuarios: Usuario[] = new Array<Usuario>();
  usuario: Usuario;
  dataSource: MatTableDataSource<Usuario>;
  filtroEncontrado: boolean = false;

  pageEvent: PageEvent;
  filtroInicializado: boolean = false;

  constructor(
    private dialogService: DialogService,
    private userService: UserService,
    private router: Router
  ) {
    this.shared = SharedService.getInstance();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.userService.findAll().subscribe((responseApi: ResponseApi) => {
      Object.keys(responseApi).forEach(key => {
        this.usuarios.push(responseApi[key]);
      });
      this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
      this.length = this.usuarios.length;
      this.dataSource.paginator = this.paginator;
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  findAllLazy(pageIndex: number, pageSize: number) {
    this.userService.findAllLazy(pageIndex, pageSize).subscribe((responseApi: ResponseApi) => {
      this.usuarios = responseApi['elements'];
      this.length = responseApi['totalElements'];
      this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  edit(id: string) {
    this.router.navigate(['/users', id]);
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  delete(id: string) {
    this.dialogService.confirm('Deseja realmente excluir o usuario?')
      .then((canDelete: boolean) => {
        if (canDelete) {
          this.message = {};
          this.userService.delete(id).subscribe((responseApi: ResponseApi) => {
            this.showMessage({
              type: 'success',
              text: 'Usuario excluido'
            });
            TableUtils.deleteRowDataTable(id, this.dataSource, this.paginator);
          }, err => {
            this.showMessage({
              type: 'error',
              text: err['error']['errors'][0]
            });
          });
        }
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

}
