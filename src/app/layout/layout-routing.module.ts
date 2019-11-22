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
            { path: 'users', loadChildren: './user/user-new/user.module#UserModule' },
            { path: 'users/:id', loadChildren: './user/user-new/user.module#UserModule' },
            { path: 'users-list', loadChildren: './user/user-list/user-list.module#UserListModule' },
            { path: 'produto', loadChildren: '../components/produto/produto-edicao/produto-edicao.module#ProdutoEdicaoModule' },
            { path: 'produto/:id', loadChildren: '../components/produto/produto-edicao/produto-edicao.module#ProdutoEdicaoModule' },
            { path: 'produto-consulta', loadChildren: '../components/produto/produto-consulta/produto-consulta.module#ProdutoConsultaModule' },
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
export class LayoutRoutingModule {}
