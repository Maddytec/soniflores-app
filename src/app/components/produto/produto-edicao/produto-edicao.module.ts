import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderModule } from '../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
    MatTableModule, 
    MatSortModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatPaginatorModule, 
    MatIconModule } from '@angular/material';
import { ProdutoEdicaoRoutingModule } from './produto-edicao-routing.module';
import { ProdutoEdicaoComponent } from './produto-edicao.component';

@NgModule({
    imports: [
        FormsModule, 
        ReactiveFormsModule,
        CommonModule,
        ProdutoEdicaoRoutingModule,
        PageHeaderModule,
        CommonModule,
        PageHeaderModule,
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatIconModule
    ],
    declarations: [ProdutoEdicaoComponent]
})
export class ProdutoEdicaoModule {}
