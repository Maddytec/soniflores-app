import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoComponent } from './produto.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, ProdutoRoutingModule, PageHeaderModule],
    declarations: [ProdutoComponent]
})
export class ProdutoModule {}
