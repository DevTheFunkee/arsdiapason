import { Component, OnInit } from '@angular/core'
import { HttpService } from '../../services/http.service'

@Component({
  selector: 'app-gestisci-istituti',
  templateUrl: './gestisci-istituti.component.html',
  styleUrls: ['./gestisci-istituti.component.css']
})
export class GestisciIstitutiComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getListaIstituti()
  }

  istituti: any = []
  newIstituto: any = {}

  getListaIstituti() {
    this.httpService.callPost('getListaIstituti', null).subscribe(
      (data: any) => {
        this.istituti = data
      },
      (error: any) => { },
      () => { }
    )
  }

  inserisciIstituto() {
    this.httpService.callPost('inserisciIstituto', this.newIstituto).subscribe(
      (data: any) => {
        this.istituti.push(data)
      },
      (error: any) => { },
      () => { }
    )
  }

}
