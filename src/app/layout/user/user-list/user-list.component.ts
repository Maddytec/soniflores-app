import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';
import { DialogService } from '../../../dialog.service';
import { UserService } from '../../../shared/services/user.service';
import { Router } from '@angular/router';
import { ResponseApi } from '../../../shared/model/response-api';
import {MatTableDataSource, MatPaginator, PageEvent} from '@angular/material';
import { routerTransition } from '../../../router.animations';

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
  pageSizeOptions = ['5','10','30','50'];
  shared: SharedService;
  message: {};
  classCss: {};
  displayedColumns: string[] = ['id', 'nome', 'email','editar', 'delete'];
  usuarios: Usuario[];
  dataSource: MatTableDataSource<Usuario>;
 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageEvent: PageEvent;

  constructor(
    private dialogService: DialogService,
    private userService: UserService,
    private router: Router
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAll(this.pageIndex, this.pageSize);
  }

  findAll(pageIndex: number, pageSize: number) {
    this.userService.findAll(pageIndex, pageSize).subscribe((responseApi: ResponseApi) => {
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
            this.findAll(this.pageIndex, this.pageSize);
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

  public getServerData(event?:PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.findAll(this.pageIndex, this.pageSize);
 return event;
  }
}
