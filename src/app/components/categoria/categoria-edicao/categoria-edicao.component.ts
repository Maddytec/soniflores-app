import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { SharedService } from '../../../shared/services/shared.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { CategoriaService } from '../../../shared/services/categoria.service';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../../../shared/model/categoria.model';
import { ResponseApi } from '../../../shared/model/response-api';

@Component({
  selector: 'app-categoria-edicao',
  templateUrl: './categoria-edicao.component.html',
  styleUrls: ['./categoria-edicao.component.scss'],
  animations: [routerTransition()]
})
export class CategoriaEdicaoComponent implements OnInit {

  shared: SharedService;
  message: {};
  classCss: {};

  categoria: Categoria;

  form: FormGroup;
  submitted = false;

  constructor(
    private formBuider: FormBuilder,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.inicializarFormulario();

    let id: string = this.route.snapshot.params['id'];
    if (id != undefined) {
      this.findById(id);
    }
  }

  inicializarFormulario() {
    this.form = this.formBuider.group({
      id: [null],
      descricao: ['', Validators.required],
    });
  }

  get f() { return this.form.controls; }

  onReset() {
    this.submitted = false;
    this.form.reset();
    this.categoria = null;
    this.inicializarFormulario();
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

  salvar(form: NgForm) {
    this.message = {};
    let id = this.categoria != undefined ? this.categoria.id : null;
    this.categoria = new Categoria(
      id,
      this.f.descricao.value,
      null
    );
    this.categoriaService.createOrUpdate(this.categoria).subscribe((responseApi: ResponseApi) => {
      this.categoria = null;
      this.inicializarFormulario();
      this.showMessage({
        type: 'success',
        text: this.messagemRetorno(id)
      });
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });

  }

  messagemRetorno(id: string): string {
    let messagenRetorno = '';
    if (id != null) {
      messagenRetorno = `Categoria atualizada com sucesso`;
    } else {
      messagenRetorno = `Categoria cadastrada com sucesso`;
    }
    return messagenRetorno;
  }

  findById(id: string) {
    this.categoriaService.findById(id).subscribe((responseApi: ResponseApi) => {
      this.categoria = new Categoria(responseApi['id'], responseApi['descricao'], null);
      this.form.patchValue(this.categoria);
    },
      err => {
        this.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
        });
      });
  }

}
