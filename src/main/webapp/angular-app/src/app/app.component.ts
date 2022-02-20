import { Component } from '@angular/core'
import { HttpService } from './services/http.service'
import { Router, NavigationEnd } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private httpService:HttpService, private router: Router){
   router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        this.page = this.pages.find(function (o) { return o.route == router.url }).title
        this.role = sessionStorage.getItem('userRole')
      }
    });
  }

  role: string
  page: string
  pages = [
    {title: 'Login', route: '/loginPage', hidden: true},
    {title: 'Crea Account', route: '/createAccount', hidden: true},
    {title: 'Inserisci Dati Bambino', route: '/insertChild'}
  ]

  ngOnInit(){}

  logout(){
    sessionStorage.removeItem('auth')
    sessionStorage.removeItem('userRole')
    this.router.navigate(['loginPage'])
  }

  hideLogout(){
    return this.page === 'Login' || this.page === 'Crea Account'
  }

}


