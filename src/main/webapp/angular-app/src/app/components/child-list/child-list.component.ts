import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { HttpService } from '../../services/http.service'
import * as moment from 'moment'

@Component({
    selector: 'app-child-list',
    templateUrl: './child-list.component.html',
    styleUrls: ['./child-list.component.css']
})
export class ChildListComponent implements OnInit {

    childList: any = []
    bambino: any = null
    comboItem: any = { istituto: {}, classe: {} }
    comboList: any = { istituti: ['Rignon', 'Meucci', 'scuola piccola sant\'anna'], classi: [] }
    combos: any = [{ label: 'Istituto scolastico', list: 'istituti', item: 'istituto' },
        { label: 'Classe', list: 'classi', item: 'classe' }]

    constructor(private httpService: HttpService, private router: Router) { }

    ngOnInit(): void {
        this.childsList()
    }

    childsList() {
        this.httpService.callPost('childsList', null).subscribe(
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

    lookChild(child: any) {
        this.bambino = child
    }

    goToTest(childId: number) {
        this.router.navigate(['testBalconi', childId])
    }

    comboChanged(item){
      if(item === 'istituto'){
        this.comboList.classi = ['A', 'B', 'F']
      }
    }
}
