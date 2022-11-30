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
import { AdminIstitutiComponent } from './components/admin-istituti/admin-istituti.component';
import { AdminChildComponent } from './components/admin-child/admin-child.component';
const routes: Routes = [
  { path: 'loginPage', component: LoginComponent ,data: { title: 'Login' }},
  { path: 'confirmAccount/:email/:temporaryCode', component: ConfirmAccountComponent,data: { title: 'Conferma Account' } },
  { path: 'mailResetPassword', component: MailResetPasswordComponent,data: { title: 'Reset Password' } },
  { path: 'resetPassword/:email/:temporaryCode', component: ResetPasswordComponent,data: { title: 'Reset Password' } },
  { path: 'createAccount', component: CreateAccountComponent,data: { title: 'Crea Account' } },
  { path: 'childList', component: ChildListComponent, canActivate: [RouteGuardService],data: { title: 'Lista Bambini' } },
  { path: 'adminIstituti', component: AdminIstitutiComponent, canActivate: [RouteGuardService],data: { title: 'Admin Istituti' } },
  { path: 'adminBambini', component: AdminChildComponent, canActivate: [RouteGuardService],data: { title: 'Admin Bambini' } },
  { path: 'insertChild', component: InsertChildComponent, canActivate: [RouteGuardService],data: { title: 'Inserisci Bambino' } },
  { path: 'testBalconi', component: TestBalconiComponent, canActivate: [RouteGuardService],data: { title: 'Test Balconi' } },
  { path: 'testBalconi/:id', component: TestBalconiComponent, canActivate: [RouteGuardService],data: { title: 'Test Balconi' } },
  { path: 'pageChild', component: ChildPageComponent, canActivate: [RouteGuardService],data: { title: 'Pagina Bambino' } },
  { path: 'pageChild/:id', component: ChildPageComponent, canActivate: [RouteGuardService],data: { title: 'Pagina Bambino' } },
  { path: 'gestisciIstituti', component: GestisciIstitutiComponent, canActivate: [RouteGuardService],data: { title: 'Gestisci Istituti' } },
  { path: 'testResult/:id', component: TestResultComponent, canActivate: [RouteGuardService],data: { title: 'Risultati Test' } },
  { path: 'paginaGrafici', component: PaginaGraficiComponent, canActivate: [RouteGuardService],data: { title: 'Grafico Generale' } },
  { path: 'excelBambini/:code/:idIstituto/:idPsicologo', component: ExcelBambiniComponent, canActivate: [RouteGuardInstituteService] },
  { path: '', redirectTo: 'gestisciIstituti', pathMatch: 'full', canActivate: [RouteGuardService] },
  { path: '**', redirectTo: 'gestisciIstituti', pathMatch: 'full', canActivate: [RouteGuardService] },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
  providers: [RouteGuardService,RouteGuardInstituteService]
})
export class AppRoutingModule { }
