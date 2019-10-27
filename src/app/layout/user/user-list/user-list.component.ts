import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';
import { DialogService } from '../../../dialog.service';
import { UserService } from '../../../shared/services/user.service';
import { Router } from '@angular/router';
import { ResponseApi } from '../../../shared/model/response-api';
import {MatTableDataSource, MatPaginator} from '@angular/material';

export interface Usuario {
  nome: string;
  email: number;
}



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  page: number = 0;
  pageSize: number = 50;
  totalElements: number;
  totalPage: Array<number>;
  shared: SharedService;
  message: {};
  classCss: {};
  displayedColumns: string[] = ['id', 'nome', 'email','editar', 'delete'];
  usuarios: Usuario[];
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private dialogService: DialogService,
    private userService: UserService,
    private router: Router
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAll(this.page, this.pageSize);
  }

  findAll(page: number, pageSize: number) {
    this.userService.findAll(page, pageSize).subscribe((responseApi: ResponseApi) => {
      this.usuarios = responseApi['elements'];
      this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
      this.dataSource.paginator = this.paginator; 
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
            this.findAll(this.page, this.pageSize);
          }, err => {
            this.showMessage({
              type: 'error',
              text: err['error']['errors'][0]
            });
          });
        }
      });
  }

  setNextPage(event: any) {
    event.preventDefault();
    if (this.page + 1 < this.totalPage.length) {
      this.page = this.page + 1;
      this.findAll(this.page, this.pageSize);
    }
  }

  setPreviousPage(event: any) {
    event.preventDefault();
    if (this.page > 0 ) {
      this.page = this.page - 1;
      this.findAll(this.page, this.pageSize);
    }
  }

  setPage(page: number, event: any) {
    event.preventDefault();
    this.page = this.page = page;
    this.findAll(this.page, this.pageSize);
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
    this.classCss['alert-' + type] = true;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
