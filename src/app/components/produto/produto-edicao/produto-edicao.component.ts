import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../../shared/services/shared.service';
import { CategoriaService } from '../../../shared/services/categoria.service';
import { ResponseApi } from '../../../shared/model/response-api';
import { Categoria } from '../../../shared/model/categoria.model';

@Component({
  selector: 'app-produto-edicao',
  templateUrl: './produto-edicao.component.html',
  styleUrls: ['./produto-edicao.component.scss'],
  animations: [routerTransition()]
})
export class ProdutoEdicaoComponent implements OnInit {

  shared: SharedService;
  message: {};
  classCss: {};
  categorias: Categoria[] = new Array<Categoria>();
  subcategorias: Categoria[] = new Array<Categoria>();
  subcategoriasFiltradas: Categoria[] = new Array<Categoria>();

  @Input()
  categoria: Categoria;

  @Input()
  subcategoria: Categoria;

  formProduto: FormGroup;
  submitted = false;

  constructor(
              private formBuider: FormBuilder,
              private categoriaService: CategoriaService
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.form();
    this.findCategoriaAll();
    this.findSubcategoriaAll();
  }

  form() {
    this.formProduto = this.formBuider.group({
      sku: [''],
      nome: ['', Validators.required],
      categoria: ['', Validators.required],
      subcategoria: ['', Validators.required],
      estoque: ['', Validators.required],
      valor: ['']
    });
  }

  get f() { return this.formProduto.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.formProduto.invalid) {
      return;
    }

    alert('Sucesso!!! \n\n' + JSON.stringify(this.formProduto.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.formProduto.reset();
  }

  findSubcategoriaFiltradas(){
    this.subcategoriasFiltradas = this.subcategorias.filter(
      subcategoria => 
        subcategoria.categoriaPai !== undefined 
        && subcategoria.categoriaPai.id === this.f.categoria.value.id
      );
  }

  findSubcategoriaAll() {
    this.categoriaService.findAll().subscribe((responseApi: ResponseApi) => {
      Object.keys(responseApi).forEach(key => {
        this.subcategorias.push(responseApi[key]);
      });
    },
      err => {
        this.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
        });
      });
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

  filtrarSubcategoriaPorId(id) {
    this.findSubcategoriaAll();
    this.subcategorias = this.subcategorias.filter(categoria => categoria.categoriaPai.id === id);
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
