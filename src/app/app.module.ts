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
import { GrupoComponent } from './components/grupo/grupo.component';  
import { GrupoService } from './shared/services/grupo.service';
import { ProdutoService } from './shared/services/produto.service';

registerLocaleData(localept, 'pt');


// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-angular/SB-Admin-BS4-Angular-6/master/dist/assets/i18n/',
        '.json'
    ); */
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
        BrowserAnimationsModule,
        BrowserModule,  
        FormsModule,  
        ReactiveFormsModule,  
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
    declarations: [AppComponent, GrupoComponent],
    providers: [
        UserService,
        ProdutoService,
        GrupoService,
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
