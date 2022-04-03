import { Component, OnInit } from '@angular/core'
import { HttpService } from '../../services/http.service'
import { MemoService } from '../../services/memo.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-mail-reset-password',
  templateUrl: './mail-reset-password.component.html',
  styleUrls: ['./mail-reset-password.component.css']
})
export class MailResetPasswordComponent implements OnInit {

  constructor(private httpService: HttpService, private memoService: MemoService, private router: Router) { }

  ngOnInit(): void { }

  patternEmail: string = this.memoService.emailRegex
  model: any = {}
  successMsg: string

  sendResetPasswordEmail() {
    this.model.appUrl = window.location.origin
    this.httpService.callPost('sendResetPasswordEmail', this.model).subscribe(
      (data: any) => {
        this.successMsg = "Ti è stata inviata una mail per reimpostare la password"
      },
      (error: any) => { },
      () => { }
    )
  }

  goToLogin() {
    this.router.navigate(['loginPage'])
  }

}
