import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuardService } from './services/route-guard.service'
import { HttpService } from './services/http.service'

import { LoginComponent } from './components/login/login.component'
import { CreateAccountComponent } from './components/create-account/create-account.component'
import { InsertChildComponent } from './components/insert-child/insert-child.component'
import { ChildListComponent } from './components/child-list/child-list.component'
import { TestBalconiComponent } from './components/test-balconi/test-balconi.component';

const routes: Routes = [
  { path: 'loginPage', component: LoginComponent },
  { path: 'createAccount', component: CreateAccountComponent },
  { path: 'childList', component: ChildListComponent, canActivate: [RouteGuardService] },
  { path: 'insertChild', component: InsertChildComponent, canActivate: [RouteGuardService] },
  { path: 'testBalconi', component: TestBalconiComponent, canActivate: [RouteGuardService] },
  { path: 'testBalconi/:id', component: TestBalconiComponent, canActivate: [RouteGuardService] },
  { path: '', redirectTo: 'childList', pathMatch: 'full', canActivate: [RouteGuardService] },
  { path: '**', redirectTo: 'childList' , pathMatch: 'full', canActivate: [RouteGuardService] }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RouteGuardService]
})
export class AppRoutingModule { }
