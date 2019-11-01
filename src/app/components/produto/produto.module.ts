import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoComponent } from './produto.component';
import { PageHeaderModule } from '../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { 
    MatTableModule, 
    MatSortModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatPaginatorModule, 
    MatIconModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        ProdutoRoutingModule,
        PageHeaderModule,
        CommonModule,
        FormsModule, 
        PageHeaderModule,
        ReactiveFormsModule,
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatIconModule,
        NgbModule
    ],
    declarations: [ProdutoComponent]
})
export class ProdutoModule {}
