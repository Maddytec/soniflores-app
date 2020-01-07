import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from '../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClienteConsultaComponent } from './cliente-consulta.component';
import { ClienteConsultaRoutingModule } from './cliente-consulta-routing.module';
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
    CommonModule,
    ClienteConsultaRoutingModule,
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
  declarations: [ClienteConsultaComponent]
})
export class ClienteConsultaModule { }
