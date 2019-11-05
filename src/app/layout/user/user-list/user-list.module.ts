import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../../shared';
import { UserListRoutingModule } from './user-list-routing.module';
import { UserListComponent } from './user-list.component';
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
        UserListRoutingModule, 
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
    declarations: [
        UserListComponent
    ]
})
export class UserListModule {}
