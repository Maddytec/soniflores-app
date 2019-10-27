import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseApi } from '../../../shared/model/response-api';
import { routerTransition } from '../../../router.animations';
import { User } from '../../../shared/model/user.model';
import { SharedService } from '../../../shared/services/shared.service';
import { UserService } from '../../../shared/services/user.service';
import { Grupo } from '../../../shared/model/grupo.model';

import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { GrupoService } from '../../../shared/services/grupo.service';

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

  listaPerfil: Array<Grupo> = new Array<Grupo>();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private grupoService: GrupoService,
    private route: ActivatedRoute,
    private router: Router
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

    this.findGrupoAll();
  }

  findById(id: string) {
    this.userService.findById(id).subscribe((responseApi: ResponseApi) => {
      this.user = new User(responseApi['id'], responseApi['nome'], responseApi['email'], '', responseApi['grupos']);
      this.usuarioForm.patchValue(this.user);
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

    if (type === 'error' || type === 'erro' || type === 'errors') {
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

  findGrupoAll() {
    this.grupoService.findAll().subscribe((responseApi: ResponseApi) => {
      Object.keys(responseApi).forEach(key => {
        this.listaPerfil.push(responseApi[key]);
      });
    },
      err => {
        this.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
        });
      });
  }

}
