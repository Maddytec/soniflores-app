import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'cliente', loadChildren: '../components/cliente/cliente-edicao/cliente-edicao.module#ClienteEdicaoModule' },
            { path: 'cliente/:id', loadChildren: '../components/cliente/cliente-edicao/cliente-edicao.module#ClienteEdicaoModule' },
            { path: 'cliente-consulta', loadChildren: '../components/cliente/cliente-consulta/cliente-consulta.module#ClienteConsultaModule' },
            { path: 'users', loadChildren: './user/user-new/user.module#UserModule' },
            { path: 'users/:id', loadChildren: './user/user-new/user.module#UserModule' },
            { path: 'users-list', loadChildren: './user/user-list/user-list.module#UserListModule' },
            { path: 'produto', loadChildren: '../components/produto/produto-edicao/produto-edicao.module#ProdutoEdicaoModule' },
            { path: 'produto/:id', loadChildren: '../components/produto/produto-edicao/produto-edicao.module#ProdutoEdicaoModule' },
            { path: 'produto-consulta', loadChildren: '../components/produto/produto-consulta/produto-consulta.module#ProdutoConsultaModule' },
            { path: 'categoria', loadChildren: '../components/categoria/categoria-edicao/categoria-edicao.module#CategoriaEdicaoModule' },
            { path: 'categoria/:id', loadChildren: '../components/categoria/categoria-edicao/categoria-edicao.module#CategoriaEdicaoModule' },
            { path: 'categoria-consulta', loadChildren: '../components/categoria/categoria-consulta/categoria-consulta.module#CategoriaConsultaModule' },
            { path: 'subcategoria', loadChildren: '../components/categoria/subcategoria-edicao/subcategoria-edicao.module#SubcategoriaEdicaoModule' },
            { path: 'subcategoria/:id', loadChildren: '../components/categoria/subcategoria-edicao/subcategoria-edicao.module#SubcategoriaEdicaoModule' },
            { path: 'subcategoria-consulta', loadChildren: '../components/categoria/subcategoria-consulta/subcategoria-consulta.module#SubcategoriaConsultaModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
