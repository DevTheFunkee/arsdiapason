import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { HttpService } from '../../services/http.service'
import { MemoService } from '../../services/memo.service'
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private httpService: HttpService, private memoService: MemoService, private router: Router, private route: ActivatedRoute) { }

    errMsg: string = ""
    model: any = {}
    patternEmail: string = this.memoService.emailRegex
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
