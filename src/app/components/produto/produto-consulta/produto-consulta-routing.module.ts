import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoConsultaComponent } from './produto-consulta.component';

const routes: Routes = [
    {
        path: '', component: ProdutoConsultaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProdutoConsultaRoutingModule { }
