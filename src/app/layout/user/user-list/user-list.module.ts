import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../../shared';
import { UserListRoutingModule } from './user-list-routing.module';
import { UserListComponent } from './user-list.component';

@NgModule({
    imports: [CommonModule, UserListRoutingModule, FormsModule, PageHeaderModule],
    declarations: [UserListComponent]
})
export class UserListModule {}
