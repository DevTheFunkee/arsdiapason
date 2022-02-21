import { Component, OnInit } from '@angular/core'
import { HttpService } from '../../services/http.service'
import * as moment from 'moment'

@Component({
    selector: 'app-child-list',
    templateUrl: './child-list.component.html',
    styleUrls: ['./child-list.component.css']
})
export class ChildListComponent implements OnInit {

    childList: any = []
    bambino: any

    constructor(private httpService: HttpService) { }

    ngOnInit(): void {
        this.childsList()
    }

    childsList() {
        this.httpService.callPost('childsList', null, "Non è stato possibile reperire la lista").subscribe(
            (data: any) => {
                this.childList = data
            },
            (error: any) => { },
            () => { }
        )
    }

    getChildAge(dataNascita) {
      let monthsTot = moment().diff(dataNascita, 'months')
      let years = Math.floor(monthsTot / 12)
      let months = monthsTot - (years * 12)
      return years + ' anni ' + (months > 0 ? ' e ' + months + ' mesi ' : '')
    }

    lookChild(child){
      this.bambino = child
    }

}
