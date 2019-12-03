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
import { SubcategoriaEdicaoComponent } from './subcategoria-edicao.component';
import { SubcategoriaEdicaoRoutingModule } from './subcategoria-edicao-routing.module';

@NgModule({
    imports: [
        FormsModule, 
        ReactiveFormsModule,
        CommonModule,
        SubcategoriaEdicaoRoutingModule,
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
    declarations: [SubcategoriaEdicaoComponent]
})
export class SubcategoriaEdicaoModule {}
