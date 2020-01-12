import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { SharedService } from '../../../shared/services/shared.service';
import { CategoriaService } from '../../../shared/services/categoria.service';
import { ResponseApi } from '../../../shared/model/response-api';
import { Categoria } from '../../../shared/model/categoria.model';
import { ProdutoService } from '../../../shared/services/produto.service';
import { Produto } from '../../../shared/model/produto.model';
import { ActivatedRoute } from '@angular/router';

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
  produto: Produto;

  form: FormGroup;
  submitted = false;

  constructor(
    private formBuider: FormBuilder,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.inicializarFormulario();
    this.findCategoriaAll();
    this.findSubcategoriaAll();

    let sku: string = this.route.snapshot.params['id'];
    if (sku != undefined) {
      this.findBySku(sku);
    }
  }

  inicializarFormulario() {
    this.form = this.formBuider.group({
      id: [null],
      sku: [null, Validators.required],
      nome: ['', Validators.required],
      categoria: [null, Validators.required],
      subcategoria: [null, Validators.required],
      quantidadeEstoque: ['', Validators.required],
      valorUnitario: ['']
    });
  }

  get f() { return this.form.controls; }

  onReset() {
    this.submitted = false;
    this.form.reset();
    this.produto = null
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
    if(this.f.sku.value != null){
     this.findBySku(this.f.sku.value);
    }
    let id = this.produto != undefined ? this.produto.id : null;
    this.produto = new Produto(
      id,
      this.f.nome.value,
      this.f.sku.value,
      this.f.valorUnitario.value,
      this.f.quantidadeEstoque.value,
      this.f.subcategoria.value
    );
    this.produtoService.createOrUpdate(this.produto).subscribe((responseApi: ResponseApi) => {
      this.produto = null;
      this.inicializarFormulario();
      this.showMessage({
        type: 'success',
        text: `Produto cadastrado com sucesso`
      });
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });

  }

  findBySku(sku: string) {
    this.produtoService.findBySku(sku).subscribe((responseApi: ResponseApi) => {
      this.produto = new Produto(responseApi['id'], responseApi['nome'], responseApi['sku'], responseApi['valorUnitario'], responseApi['quantidadeEstoque'], responseApi['categoria']);
      this.form.patchValue(this.produto);

      this.form.get('categoria').setValue(this.produto.categoria.categoriaPai);

      this.categoriaService.findAll().subscribe(() => {
        this.findSubcategoriaFiltradas();
      });
      
      this.form.get('subcategoria').setValue(this.produto.categoria);
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
