import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteEdicaoComponent } from './cliente-edicao.component';

const routes: Routes = [
  {
      path: '', component: ClienteEdicaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteEdicaoRoutingModule { }
