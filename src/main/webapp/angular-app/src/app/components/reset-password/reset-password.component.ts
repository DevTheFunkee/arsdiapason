import { Component, OnInit } from '@angular/core'
import { HttpService } from '../../services/http.service'
import { MemoService } from '../../services/memo.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private httpService: HttpService, private memoService: MemoService, private router: Router, private activedRoute: ActivatedRoute) { }

  ngOnInit(): void { }

  temporaryCode: string = this.activedRoute.snapshot.paramMap.get("temporaryCode")
  email: string = this.activedRoute.snapshot.paramMap.get("email")
  password: string
  password2: string
  successMsg: string
  errMsg: string
  patternPassword: string = this.memoService.passwordRegex

  resetPassword() {
    let payload = { email: this.email, password: this.password, temporaryCode: this.temporaryCode }
    this.httpService.callPost('resetPassword', payload).subscribe(
      (data: any) => {
        sessionStorage.setItem('auth', window.btoa(this.email + ":" + this.password))
        sessionStorage.setItem('user', JSON.stringify(data))
        this.router.navigate(['gestisciIstituti'])
      },
      (error: any) => { },
      () => { }
    )
  }

  checkPassword() {
    if (this.password && this.password2) {
      if (!this.password.match(this.patternPassword)) {
        this.errMsg = 'La Password non rispetta i requisiti richiesti'
      } else if (this.password !== this.password2) {
        this.errMsg = 'Password e Conferma Password non coincidono'
      } else {
        return true
      }
    }
    return false
  }

  goToLogin() {
    this.router.navigate(['loginPage'])
  }

}
