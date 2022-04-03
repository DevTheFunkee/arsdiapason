import { Injectable } from '@angular/core'
import { HttpService } from '../services/http.service'

@Injectable({
  providedIn: 'root'
})
export class MemoService {

  emailRegex: string
  passwordRegex: string

  constructor(private httpService: HttpService) { }

  initRegex() {
    return new Promise<void>((resolve) => {
      this.httpService.callGet('getRegex').subscribe(data => {
        this.emailRegex = data['email']
        this.passwordRegex = data['password']
        resolve()
      })
    })
  }

}
