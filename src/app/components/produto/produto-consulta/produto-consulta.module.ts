import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoConsultaRoutingModule } from './produto-consulta-routing.module';
import { PageHeaderModule } from '../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule
} from '@angular/material';
import { ProdutoConsultaComponent } from './produto-consulta.component';

@NgModule({
    imports: [
        CommonModule,
        ProdutoConsultaRoutingModule,
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
    declarations: [ProdutoConsultaComponent]
})
export class ProdutoConsultaModule { }
