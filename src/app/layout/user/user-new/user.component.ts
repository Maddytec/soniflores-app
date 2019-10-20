import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResponseApi } from '../../../shared/model/response-api';
import { routerTransition } from '../../../router.animations';
import { User } from '../../../shared/model/user.model';
import { SharedService } from '../../../shared/services/shared.service';
import { UserService } from '../../../shared/services/user.service';
import { Grupo } from '../../../shared/model/grupo.model';

import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [routerTransition()]
})
export class UserComponent implements OnInit {

  usuarioForm: FormGroup;
  user = new User('', '', '', '', new Array());

  shared: SharedService;
  message: {};
  classCss: {};

  listaPerfil: Array<Grupo> = [
    { id: '2', nome: 'ADMINISTRADORES', descricao: 'ADMINISTRADOR DO SISTEMA' },
    { id: '3', nome: 'VENDEDORES', descricao: 'VENDEDORES' },
    { id: '4', nome: 'VENDAS-CONSULTA', descricao: 'VENDAS CONSULTA' }
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.usuarioForm = this.fb.group({
      nome: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      senha: [null, Validators.required],
      grupos: [null, Validators.required]
    });

    let id: string = this.route.snapshot.params['id'];
    if (id != undefined) {
      this.findById(id);
    }
  }

  findById(id: string) {
    this.userService.findById(id).subscribe((responseApi: ResponseApi) => {
      this.user = new User(responseApi['id'], responseApi['nome'], responseApi['email'], '', responseApi['grupos']);
    },
      err => {
        this.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
        });
      });
  }

  register(form: NgForm) {
    this.message = {};
    this.findById(form['email']);
    this.user = new User(this.user.id !== null ? this.user.id : null, form['nome'], form['email'], form['senha'], form['grupos']);
    this.userService.createOrUpdate(this.user).subscribe((responseApi: ResponseApi) => {
      this.user = new User('', '', '', '', new Array());
      let email: string = responseApi['email'];
      this.usuarioForm.reset();
      this.showMessage({
        type: 'success',
        text: `Usuário ${email} cadastrado com sucesso`
      });
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

    if(type === 'error' || type === 'erro' || type === 'errors'){
      type = 'danger'
    }

    this.classCss['alert-' + type] = true;
  }

  getFormGroupClass(isInvalid: boolean, isDirty): {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    };
  }

}
