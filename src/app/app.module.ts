import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './shared';

import { NgModule, LOCALE_ID } from '@angular/core';
import localept from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { UserService } from './shared/services/user.service';
import { AuthInterceptor } from './login/auth.interceptor';
import { SharedService } from './shared/services/shared.service';
import { DialogService } from './dialog.service';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';  
import { AppComponent } from './app.component'; 

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
  MatSlideToggleModule,
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,  
  MatTableModule,
  MatSortModule,
  MatPaginatorModule
} from '@angular/material';
import { GrupoService } from './shared/services/grupo.service';
import { ProdutoService } from './shared/services/produto.service';
import { CategoriaService } from './shared/services/categoria.service';
import { ClienteService } from './shared/services/cliente.service';
import { NgxMaskModule } from 'ngx-mask';

registerLocaleData(localept, 'pt');

export const createTranslateLoader = (http: HttpClient) => {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        ReactiveFormsModule,  
        BrowserAnimationsModule,
        BrowserModule,  
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
        MatTableModule, 
        MatSortModule, 
        MatSlideToggleModule,
        MatPaginatorModule,
        AppRoutingModule,
        NgxMaskModule.forRoot()
    ],
    exports: [  
        MatButtonModule,  
        MatMenuModule,  
        MatToolbarModule,  
        MatIconModule,  
        MatCardModule,  
        BrowserAnimationsModule,  
        MatFormFieldModule,  
        MatInputModule,  
        MatDatepickerModule,  
        MatNativeDateModule,  
        MatRadioModule,  
        MatSelectModule,  
        MatOptionModule,
        MatTableModule,
        MatSortModule,
        MatSlideToggleModule
      ],
    declarations: [AppComponent],
    providers: [
        UserService,
        ProdutoService,
        GrupoService,
        CategoriaService,
        ClienteService,
        AuthGuard,
        SharedService,
        DialogService,
        {   
            provide: LOCALE_ID, 
            useValue: 'pt' },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {   provide: ErrorStateMatcher,
            useClass: ShowOnDirtyErrorStateMatcher
        } 
    ],
    bootstrap: [AppComponent]

})
export class AppModule { }
