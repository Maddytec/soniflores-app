import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResponseApi } from '../../../shared/model/response-api';
import { routerTransition } from '../../../router.animations';
import { User } from '../../../shared/model/user.model';
import { SharedService } from '../../../shared/services/shared.service';
import { UserService } from '../../../shared/services/user.service';
import { Grupo } from '../../../shared/model/grupo.model';
import { element } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [routerTransition()]
})
export class UserComponent implements OnInit {


  @ViewChild("form")
  form: NgForm;

  i: number = 0;
  listaPerfil: Array<Grupo> = new Array<Grupo>();
  user = new User('', '', '', '', new Array());
  grupo: Grupo;
  grupos: Array<Grupo>;

  shared: SharedService;
  message: {};
  classCss: {};

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    let id: string = this.route.snapshot.params['id'];
    if (id != undefined) {
      this.findById(id);
    }
  }

  findById(id: string) {
    this.userService.findById(id).subscribe((responseApi: ResponseApi) => {
      this.user = new User(responseApi['id'], responseApi['nome'], responseApi['email'],'', responseApi['grupos']);
    },
      err => {
        this.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
        });
      });
  }

  register() {
    this.message = {};
    this.listaPerfil;
    this.grupos = new Array();

    this.listaPerfil.forEach(element => {
      this.grupo = new Grupo('','','');
      this.grupo.nome = element.toString();
      this.user.grupos.push(this.grupo);
    });
    this.message = {};
    this.userService.createOrUpdate(this.user).subscribe((responseApi: ResponseApi) => {
      this.user = new User('','','','', new Array());
      let email: string = responseApi['email'];
      this.form.resetForm();
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
