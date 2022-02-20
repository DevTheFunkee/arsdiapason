import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service'
import * as $ from 'jquery'

@Component({
    selector: 'app-insert-child',
    templateUrl: './insert-child.component.html',
    styleUrls: ['./insert-child.component.css']
})
export class InsertChildComponent implements OnInit {

    msg: string
    model: any = {}
    SiNo: any = ['No', 'Si']
    alert: string

    constructor(private httpService: HttpService) { }

    ngOnInit(): void { }

    insertChild() {
        this.httpService.callPost('insertChild', this.model, '').subscribe(
            (data: any) => {
                this.msg = "Inserimento avvenuto con successo"
                this.alert = "alert-success"
                setTimeout(() => {
                    $("#alert").fadeOut(500);
                }, 2500);
            },
            (error: any) => {
                this.msg = "Errore in fase di inserimento"
                this.alert = "alert-danger"
            },
            () => { }
        )
    }

}
