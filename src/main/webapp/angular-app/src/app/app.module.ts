import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
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
import { MemoService } from './services/memo.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from "ngx-spinner";
import { InsertChildComponent } from './components/insert-child/insert-child.component';
import { ChildListComponent } from './components/child-list/child-list.component';
import { TestBalconiComponent } from './components/test-balconi/test-balconi.component';
import { GestisciIstitutiComponent } from './components/gestisci-istituti/gestisci-istituti.component';
import { TestResultComponent } from './components/test-result/test-result.component';
import { SpecchiettoBambinoComponent } from './components/specchietto-bambino/specchietto-bambino.component';
import { PaginaGraficiComponent } from './components/pagina-grafici/pagina-grafici.component';
import { SessoPipe } from './pipes/sesso.pipe';
import { EtaPipe } from './pipes/eta.pipe';
import { TestFinitoPipe } from './pipes/test-finito.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { ConfirmAccountComponent } from './components/confirm-account/confirm-account.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { MailResetPasswordComponent } from './components/mail-reset-password/mail-reset-password.component';
import { ExcelBambiniComponent } from './components/excel-bambini/excel-bambini.component';

registerLocaleData(localeIt);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    InsertChildComponent,
    ChildListComponent,
    TestBalconiComponent,
    GestisciIstitutiComponent,
    TestResultComponent,
    SpecchiettoBambinoComponent,
    PaginaGraficiComponent,
    SessoPipe,
    EtaPipe,
    TestFinitoPipe,
    CapitalizePipe,
    ConfirmAccountComponent,
    ResetPasswordComponent,
    MailResetPasswordComponent,
    ExcelBambiniComponent
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
    { provide: LOCALE_ID, useValue: 'it-IT' },
    { provide: APP_INITIALIZER, multi: true, deps: [MemoService], useFactory: (memoService: MemoService) => () => memoService.initRegex() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
