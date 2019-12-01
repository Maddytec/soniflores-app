import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaConsultaComponent } from './categoria-consulta.component';

const routes: Routes = [
  {
    path: '', component: CategoriaConsultaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaConsultaRoutingModule { }
