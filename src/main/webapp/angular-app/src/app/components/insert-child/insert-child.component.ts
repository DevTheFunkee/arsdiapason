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

    model: any = {}
    siNo: any = ['No', 'Si']
    sexList: any = [{ label: 'Maschio', db: 'M' }, { label: 'Femmina', db: 'F' }]
    today: string = moment().format('YYYY-MM-DD')
    istituti: any = []
    classi: any = []

    constructor(private httpService: HttpService, private modalService: BsModalService) { }

    ngOnInit(): void { }

    insertChild() {
        this.httpService.callPost('insertChild', this.model).subscribe(
            (data: any) => {
                this.openModal("Inserimento avvenuto con successo")
                this.model = {}
            },
            (error: any) => { },
            () => { }
        )
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
