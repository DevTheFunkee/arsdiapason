import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { HttpService } from '../../services/http.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    errMsg: string = ""
    model: any = {}
    patternEmail = '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$'

    constructor(private httpService: HttpService, private router: Router) { }

    ngOnInit(): void { }

    login() {
        if (this.model.email && this.model.password) {
            sessionStorage.setItem('auth', window.btoa(this.model.email + ":" + this.model.password))
            this.httpService.callGet('login').subscribe(
                (data: any) => {
                    sessionStorage.setItem('user', JSON.stringify(data))
                    this.router.navigate(['gestisciIstituti'])
                },
                (error: any) => {
                    this.errMsg = "Email e Password non corretti"
                },
                () => { }
            )
        } else {
            this.errMsg = "Immettere Utente e Password"
        }
    }

    goToRegister() {
        this.router.navigate(['createAccount'])
    }

    goToResetPassword() {
        this.router.navigate(['mailResetPassword'])
    }

}
