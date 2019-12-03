import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubcategoriaEdicaoComponent } from './subcategoria-edicao.component';

const routes: Routes = [
    {
        path: '', component: SubcategoriaEdicaoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SubcategoriaEdicaoRoutingModule {
}
