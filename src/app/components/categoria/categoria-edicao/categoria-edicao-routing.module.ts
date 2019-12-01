import { NgModule } from '@angular/core';
import { CategoriaEdicaoComponent } from './categoria-edicao.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: CategoriaEdicaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaEdicaoRoutingModule { }
