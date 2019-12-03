import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubcategoriaConsultaComponent } from './subcategoria-consulta.component';

const routes: Routes = [
  {
    path: '', component: SubcategoriaConsultaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubcategoriaConsultaRoutingModule { }
