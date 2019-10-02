import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';

import { NgModule, LOCALE_ID } from '@angular/core';
import localept from '@angular/common/locales/pt';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { UserService } from './shared/services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './login/auth.interceptor';
import { SharedService } from './shared/services/shared.service';
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
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule,
    ],
    declarations: [AppComponent],
    providers: [
        UserService,
        AuthGuard,
        SharedService,
        { provide: LOCALE_ID, useValue: 'pt' },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]

})
export class AppModule { }
