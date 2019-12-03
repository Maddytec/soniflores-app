import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { SubcategoriaConsultaComponent } from './subcategoria-consulta.component';
import { SubcategoriaConsultaRoutingModule } from './subcategoria-consulta-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SubcategoriaConsultaRoutingModule,
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
  declarations: [SubcategoriaConsultaComponent]
})
export class SubcategoriaConsultaModule { }
