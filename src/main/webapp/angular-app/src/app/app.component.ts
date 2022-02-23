import { Component } from '@angular/core'
import { HttpService } from './services/http.service'
import { Router, NavigationEnd } from '@angular/router'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private httpService: HttpService, private router: Router) {
        router.events.subscribe((val: any) => {
            if (val instanceof NavigationEnd) {
                this.page = this.pages.find(function (o) { return o.route === "/" + router.url.split("/")[1] }).title
                this.user = JSON.parse(sessionStorage.getItem('user')) || {}
            }
        });
    }

    user: any = {}
    page: string
    pages = [
        { title: 'Login', route: '/loginPage', hidden: true },
        { title: 'Crea Account', route: '/createAccount', hidden: true },
        { title: 'Lista Bambini', route: '/childList' },
        { title: 'Inserisci Dati Bambino', route: '/insertChild' },
        { title: 'Test Balconi', route: '/testBalconi', disabled: 'disabled' }
    ]

    ngOnInit() { }

    logout() {
        sessionStorage.removeItem('auth')
        sessionStorage.removeItem('user')
        this.router.navigate(['loginPage'])
    }

    loggedIn() {
        return !!sessionStorage.getItem('user')
    }

}
