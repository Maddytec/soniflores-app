import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteEdicaoComponent } from './cliente-edicao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../../shared';
import { ClienteEdicaoRoutingModule } from './cliente-edicao-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { 
  MatTableModule,
  MatSortModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatPaginatorModule, 
  MatIconModule } from '@angular/material';

@NgModule({
  imports: [
      FormsModule, 
      ReactiveFormsModule,
      CommonModule,
      ClienteEdicaoRoutingModule,
      PageHeaderModule,
      CommonModule,
      PageHeaderModule,
      MatTableModule,
      MatSortModule,
      MatFormFieldModule,
      MatInputModule,
      MatPaginatorModule,
      MatIconModule,
      NgxMaskModule.forChild()
  ],
  declarations: [ClienteEdicaoComponent]
})
export class ClienteEdicaoModule { }
