import { Component, OnInit } from '@angular/core'
import { HttpService } from '../../services/http.service'
import { BsModalService } from 'ngx-bootstrap/modal'
import { AlertModalComponent } from '../alert-modal/alert-modal.component'
import * as moment from 'moment'

@Component({
    selector: 'app-insert-child',
    templateUrl: './insert-child.component.html',
    styleUrls: ['./insert-child.component.css']
})
export class InsertChildComponent implements OnInit {

    constructor(private httpService: HttpService, private modalService: BsModalService) { }

    ngOnInit(): void {
        this.getListaIstituti()
    }

    newChild: any = {note: ''}
    siNo: any = ['No', 'Si']
    sexList: any = [{ label: 'Maschio', db: 'M' }, { label: 'Femmina', db: 'F' }]
    today: string = moment().format('YYYY-MM-DD')
    istituti: any = []
    sezioni: any = []
    textAreaMaxLength: number = 300

    getListaIstituti() {
        this.httpService.callPost('getListaIstituti', null).subscribe(
            (data: any) => {
                this.istituti = data
            },
            (error: any) => { },
            () => { }
        )
    }

    insertChild() {
        this.httpService.callPost('insertChild', this.newChild).subscribe(
            (data: any) => {
                this.openModal("Inserimento avvenuto con successo")
                this.newChild = {note: ''}
            },
            (error: any) => { },
            () => { }
        )
    }

    findSezioni() {
        if (this.newChild.idIstituto && this.newChild.idIstituto != 1) {
            let url = 'findSezioni?idIstituto=' + this.newChild.idIstituto
            this.httpService.callPost(url, null).subscribe(
                (data: any) => {
                    this.sezioni = data
                },
                (error: any) => { },
                () => { }
            )
        }
    }

    openModal(text: string) {
        const initialState = {
            textColor: 'text-success',
            title: "Ben fatto!",
            text: text
        }
        this.modalService.show(AlertModalComponent, { initialState })
    }

}
