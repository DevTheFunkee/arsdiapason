import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { RouteGuardService } from './services/route-guard.service'
import { RouteGuardInstituteService } from './services/route-guard-institute.service'
import { LoginComponent } from './components/login/login.component'
import { CreateAccountComponent } from './components/create-account/create-account.component'
import { InsertChildComponent } from './components/insert-child/insert-child.component'
import { ChildListComponent } from './components/child-list/child-list.component'
import { ChildPageComponent } from './components/child-page/child-page.component'
import { TestBalconiComponent } from './components/test-balconi/test-balconi.component'
import { GestisciIstitutiComponent } from './components/gestisci-istituti/gestisci-istituti.component'
import { TestResultComponent } from './components/test-result/test-result.component'
import { PaginaGraficiComponent } from './components/pagina-grafici/pagina-grafici.component'
import { ConfirmAccountComponent } from './components/confirm-account/confirm-account.component'
import { ResetPasswordComponent } from './components/reset-password/reset-password.component'
import { MailResetPasswordComponent } from './components/mail-reset-password/mail-reset-password.component'
import { ExcelBambiniComponent } from './components/excel-bambini/excel-bambini.component';

const routes: Routes = [
  { path: 'loginPage', component: LoginComponent },
  { path: 'confirmAccount/:email/:temporaryCode', component: ConfirmAccountComponent },
  { path: 'mailResetPassword', component: MailResetPasswordComponent },
  { path: 'resetPassword/:email/:temporaryCode', component: ResetPasswordComponent },
  { path: 'createAccount', component: CreateAccountComponent },
  { path: 'childList', component: ChildListComponent, canActivate: [RouteGuardService] },
  { path: 'insertChild', component: InsertChildComponent, canActivate: [RouteGuardService] },
  { path: 'testBalconi', component: TestBalconiComponent, canActivate: [RouteGuardService] },
  { path: 'testBalconi/:id', component: TestBalconiComponent, canActivate: [RouteGuardService] },
  { path: 'pageChild', component: ChildPageComponent, canActivate: [RouteGuardService] },
  { path: 'pageChild/:id', component: ChildPageComponent, canActivate: [RouteGuardService] },
  { path: 'gestisciIstituti', component: GestisciIstitutiComponent, canActivate: [RouteGuardService] },
  { path: 'testResult/:id', component: TestResultComponent, canActivate: [RouteGuardService] },
  { path: 'paginaGrafici', component: PaginaGraficiComponent, canActivate: [RouteGuardService] },
  { path: 'excelBambini/:code/:idIstituto/:idPsicologo', component: ExcelBambiniComponent, canActivate: [RouteGuardInstituteService] },
  { path: '', redirectTo: 'gestisciIstituti', pathMatch: 'full', canActivate: [RouteGuardService] },
  { path: '**', redirectTo: 'gestisciIstituti', pathMatch: 'full', canActivate: [RouteGuardService] },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RouteGuardService,RouteGuardInstituteService]
})
export class AppRoutingModule { }
