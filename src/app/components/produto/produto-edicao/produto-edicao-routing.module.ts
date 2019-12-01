import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoEdicaoComponent } from './produto-edicao.component';

const routes: Routes = [
    {
        path: '', component: ProdutoEdicaoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProdutoEdicaoRoutingModule {
}
