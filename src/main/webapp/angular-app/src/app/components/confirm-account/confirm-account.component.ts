import { Component, OnInit } from '@angular/core'
import { HttpService } from '../../services/http.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
    selector: 'app-confirm-account',
    templateUrl: './confirm-account.component.html',
    styleUrls: ['./confirm-account.component.css']
})
export class ConfirmAccountComponent implements OnInit {

    constructor(private httpService: HttpService, private router: Router, private activedRoute: ActivatedRoute) { }

    ngOnInit(): void { }

    temporaryCode: string = this.activedRoute.snapshot.paramMap.get("temporaryCode")
    email: string = this.activedRoute.snapshot.paramMap.get("email")
    password: string

    confirmAccount() {
        if (this.temporaryCode && this.email && this.password) {
            let params = { email: this.email, password: this.password, temporaryCode: this.temporaryCode }
            this.httpService.callPost('confirmAccount', params).subscribe(
                (data: any) => {
                    sessionStorage.setItem('auth', window.btoa(this.email + ":" + this.password))
                    sessionStorage.setItem('user', JSON.stringify(data))
                    this.router.navigate(['gestisciIstituti'])
                },
                (error: any) => { },
                () => { }
            )
        }
    }

}
