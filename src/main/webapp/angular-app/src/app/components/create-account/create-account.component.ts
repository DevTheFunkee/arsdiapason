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
      if (this.model.password === this.model.password2) {
        this.errMsg = ''
        return true
      }
      this.errMsg = 'Le password devonno essere uguali'
      return false
    }
    return false
  }

  register() {
      this.httpService.callPost('createAccount', this.model, "Non è stato possibile creare l'account").subscribe(
        data => {
          this.router.navigate(['loginPage'])
        },
        error => {
          this.errMsg = "Errore in fase di registrazione"
        },
        () => { }
      )
  }

  goToLogin() {
    this.router.navigate(['loginPage'])
  }

}
