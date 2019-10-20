import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { PageHeaderModule } from '../../../shared';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';  
import {  
  MatButtonModule,  
  MatMenuModule,  
  MatToolbarModule,  
  MatIconModule,  
  MatCardModule,  
  MatFormFieldModule,  
  MatInputModule,  
  MatDatepickerModule,  
  MatDatepicker,  
  MatNativeDateModule,  
  MatRadioModule,  
  MatSelectModule,  
  MatOptionModule,  
  MatSlideToggleModule,ErrorStateMatcher,ShowOnDirtyErrorStateMatcher  
} from '@angular/material';  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule,
        ReactiveFormsModule, 
        PageHeaderModule,
        MatButtonModule,
        FormsModule,  
        MatButtonModule,  
        MatMenuModule,  
        MatToolbarModule,  
        MatIconModule,  
        MatCardModule,  
        MatFormFieldModule,  
        MatInputModule,  
        MatDatepickerModule,  
        MatNativeDateModule,  
        MatRadioModule,  
        MatSelectModule,  
        MatOptionModule,  
        MatSlideToggleModule
    ],
    exports: [  
        MatButtonModule,  
        MatMenuModule,  
        MatToolbarModule,  
        MatIconModule,  
        MatCardModule,  
        MatFormFieldModule,  
        MatInputModule,  
        MatDatepickerModule,  
        MatNativeDateModule,  
        MatRadioModule,  
        MatSelectModule,  
        MatOptionModule,  
        MatSlideToggleModule  
      ],
      providers: [  
        {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}  
      ],  
    declarations: [UserComponent]
})
export class UserModule {}
