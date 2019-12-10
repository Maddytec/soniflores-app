import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { SharedService } from '../../../shared/services/shared.service';
import { CategoriaService } from '../../../shared/services/categoria.service';
import { ResponseApi } from '../../../shared/model/response-api';
import { Categoria } from '../../../shared/model/categoria.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subcategoria-edicao',
  templateUrl: './subcategoria-edicao.component.html',
  styleUrls: ['./subcategoria-edicao.component.scss'],
  animations: [routerTransition()]
})

export class SubcategoriaEdicaoComponent implements OnInit {
  shared: SharedService;
  message: {};
  classCss: {};
  categorias: Categoria[] = new Array<Categoria>();
  subcategorias: Categoria[] = new Array<Categoria>();
  subcategoriasFiltradas: Categoria[] = new Array<Categoria>();
  subcategoria: Categoria;

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
    this.findCategoriaAll();

    let id: string = this.route.snapshot.params['id'];
    if (id != undefined) {
      this.findById(id);
    }
  }

  inicializarFormulario() {
    this.form = this.formBuider.group({
      id: [null],
      descricao: ['', Validators.required],
      categoria: [null, Validators.required]
    });
  }

  get f() { return this.form.controls; }

  onReset() {
    this.submitted = false;
    this.form.reset();
    this.subcategoria = null;
    this.inicializarFormulario();
    this.findCategoriaAll();
  }

  findSubcategoriaFiltradas() {
    this.subcategoriasFiltradas = this.subcategorias.filter(
      subcategoria =>
        subcategoria.categoriaPai !== undefined
        && subcategoria.categoriaPai.id === this.f.categoria.value.id
    );
  }

  findCategoriaAll() {
    this.categoriaService.findAll().subscribe((responseApi: ResponseApi) => {
      Object.keys(responseApi).forEach(key => {
        this.categorias.push(responseApi[key]);
        this.categorias = this.categorias.filter(categoria => categoria.categoriaPai === undefined);
      });
    },
      err => {
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

  salvar(form: NgForm) {
    this.message = {};
    let id = this.subcategoria != undefined ? this.subcategoria.id : null;
    this.subcategoria = new Categoria(
      id,
      this.f.descricao.value,
      this.f.categoria.value
    );
    this.categoriaService.createOrUpdate(this.subcategoria).subscribe((responseApi: ResponseApi) => {
      this.subcategoria = null;
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
      messagenRetorno = `Subcategoria atualizada com sucesso`;
    } else {
      messagenRetorno = `Subcategoria cadastrada com sucesso`;
    }
    return messagenRetorno;
  }

  findById(id: string) {
    this.categoriaService.findById(id).subscribe((responseApi: ResponseApi) => {
      this.subcategoria = new Categoria(responseApi['id'], responseApi['descricao'], responseApi['categoriaPai']);
      this.form.patchValue(this.subcategoria);

      this.form.get('categoria').setValue(this.subcategoria.categoriaPai);

    },
      err => {
        this.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
        });
      });
  }

  compararCategorias(objeto1, objeto2): boolean {
    return objeto1 && objeto2 ? objeto1.descricao === objeto2.descricao : objeto1 === objeto2;
  }

}
