import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HttpService } from '../../services/http.service'

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

    constructor(private httpService: HttpService, private router: Router) { }

    errMsg = ""
    model: any = {}

    ngOnInit(): void { }

    checkPassword() {
        if (this.model.password && this.model.password2) {
            let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!=%*?^&+#])[A-Za-z\d@$!=%*?^&+#]{8,20}$/
            if (!this.model.password.match(pattern)) {
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
        this.httpService.callPost('createAccount', this.model).subscribe(
            (data: any) => {
                this.router.navigate(['loginPage'])
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
