import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, UserRoutingModule, FormsModule, PageHeaderModule],
    declarations: [UserComponent]
})
export class UserModule {}
