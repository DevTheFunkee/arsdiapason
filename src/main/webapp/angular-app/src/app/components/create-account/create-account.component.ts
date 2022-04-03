import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HttpService } from '../../services/http.service'
import { MemoService } from '../../services/memo.service'

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

    constructor(private httpService: HttpService, private memoService: MemoService, private router: Router) { }

    errMsg: string = ''
    model: any = {}
    showSuccessMsg: boolean = false
    patternEmail = this.memoService.emailRegex
    patternPassword = this.memoService.passwordRegex

    ngOnInit(): void { }

    checkPassword() {
        if (this.model.password && this.model.password2) {
            if (!this.model.password.match(this.patternPassword)) {
                this.errMsg = 'La Password non rispetta i requisiti richiesti'
            } else if (this.model.password !== this.model.password2) {
                this.errMsg = 'Password e Conferma Password non coincidono'
            } else {
                return true
            }
        }
        return false
    }

    register() {
        this.model.appUrl = window.location.origin
        this.httpService.callPost('createAccount', this.model).subscribe(
            (data: any) => {
                this.errMsg = ''
                this.showSuccessMsg = true
            },
            (error: any) => {
                this.errMsg = "Errore in fase di registrazione"
            },
            () => { }
        )
    }

    goToLogin() {
        this.router.navigate(['loginPage'])
    }

}
