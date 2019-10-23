import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { GrupoService } from '../../shared/services/grupo.service';
import { ResponseApi } from '../../shared/model/response-api';
import { Grupo } from '../../shared/model/grupo.model';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss']
})
export class GrupoComponent implements OnInit {

  shared: SharedService;
  listaGrupo: Array<Grupo>;
  message: {};
  classCss: {};

  constructor(
    private grupoService: GrupoService
  ) { 
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
  }

  findAll() {
    this.grupoService.findAll().subscribe((responseApi: ResponseApi) => {
      this.listaGrupo = new responseApi.data; 
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

}
