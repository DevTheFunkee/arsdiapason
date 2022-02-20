import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleChartsModule } from 'angular-google-charts';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData, DatePipe } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { LoginComponent } from './components/login/login.component';
import { BasicAuthInterceptor } from './services/basic-auth.interceptor';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from "ngx-spinner";
import { InsertChildComponent } from './components/insert-child/insert-child.component';
import { ChildListComponent } from './components/child-list/child-list.component';

registerLocaleData(localeIt);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    InsertChildComponent,
    ChildListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleChartsModule,
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [
     { provide: LocationStrategy, useClass: HashLocationStrategy },
     { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
     { provide: LOCALE_ID, useValue: 'it-IT' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
