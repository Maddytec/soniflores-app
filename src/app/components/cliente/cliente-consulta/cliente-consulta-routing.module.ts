import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteConsultaComponent } from './cliente-consulta.component';

const routes: Routes = [
  {
    path: '', component: ClienteConsultaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteConsultaRoutingModule { }
