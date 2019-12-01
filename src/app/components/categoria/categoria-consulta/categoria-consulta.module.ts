import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaConsultaRoutingModule } from './categoria-consulta-routing.module';
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
import { CategoriaConsultaComponent } from './categoria-consulta.component';

@NgModule({
  imports: [
    CommonModule,
    CategoriaConsultaRoutingModule,
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
  declarations: [CategoriaConsultaComponent]
})
export class CategoriaConsultaModule { }
