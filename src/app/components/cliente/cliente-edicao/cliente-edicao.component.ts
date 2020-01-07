import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { SharedService } from '../../../shared/services/shared.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../../../shared/services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { ResponseApi } from '../../../shared/model/response-api';
import { Cliente } from '../../../shared/model/cliente.model';
import { TextField } from 'material-ui/TextField';

@Component({
  selector: 'app-cliente-edicao',
  templateUrl: './cliente-edicao.component.html',
  styleUrls: ['./cliente-edicao.component.scss'],
  animations: [routerTransition()]
})
export class ClienteEdicaoComponent implements OnInit {

  shared: SharedService;
  message: {};
  classCss: {};

  cliente: Cliente;

  form: FormGroup;
  submitted = false;

  constructor(
    private formBuider: FormBuilder,
    private clienteService: ClienteService,
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
      nome: ['', Validators.required],
      tipo: ['FISICA', Validators.required],
      documentoReceitaFederal: [],
      foneMovel:['', Validators.required],
      foneFixo:[],
      email: []
    });
  }

  get f() { return this.form.controls; }

  onReset() {
    this.submitted = false;
    this.form.reset();
    this.cliente = null;
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

  messagemRetorno(id: string): string {
    let messagenRetorno = '';
    if (id != null) {
      messagenRetorno = `Cliente atualizado com sucesso`;
    } else {
      messagenRetorno = `Cliente cadastrado com sucesso`;
    }
    return messagenRetorno;
  }

  findById(id: string) {
    this.clienteService.findById(id).subscribe((responseApi: ResponseApi) => {
      this.cliente = new Cliente(
        responseApi['id'],
        responseApi['nome'],
        responseApi['foneMovel'],
        responseApi['foneFixo'],
        responseApi['email'],
        responseApi['documentoReceitaFederal'],
        responseApi['tipo'],
        responseApi['enderecos']
        );
      this.form.patchValue(this.cliente);
    },
      err => {
        this.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
        });
      });
  }

}
