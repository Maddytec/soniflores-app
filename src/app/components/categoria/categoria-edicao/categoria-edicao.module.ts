import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderModule } from '../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriaEdicaoRoutingModule } from './categoria-edicao-routing.module';
import { CategoriaEdicaoComponent } from './categoria-edicao.component';
import {
  MatTableModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CategoriaEdicaoRoutingModule,
    PageHeaderModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule
  ],
  declarations: [CategoriaEdicaoComponent]
})
export class CategoriaEdicaoModule { }
