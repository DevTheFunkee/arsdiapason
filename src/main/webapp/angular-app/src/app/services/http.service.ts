import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs/operators'
import { AlertModalComponent } from '../components/alert-modal/alert-modal.component'
import { BsModalService } from 'ngx-bootstrap/modal'
import { Router } from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner'

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient, private modalService: BsModalService,
        private router: Router, private spinner: NgxSpinnerService) { }

    baseUrl: string = '/api/'
    serverOn: boolean = true

    callGetOutside(url: string) {
        this.spinner.show()
        return this.http.get(url).pipe(tap(
            (data: any) => { },
            (error: any) => { this.spinner.hide() },
            () => { this.spinner.hide() }
        ))
    }

    callGet(url: string, errorMsg: string) {
        this.spinner.show()
        return this.http.get(this.baseUrl + url).pipe(tap(
            (data: any) => { },
            (error: any) => {
                this.spinner.hide()
                if (error.status === 504) {
                    this.openServerOffModal()
                } else if (errorMsg) {
                    this.openModal('Errore', errorMsg, error.error.cause, error.error.message, error.error.intStatus + " - " + error.error.status)
                }
            },
            () => { this.spinner.hide() }
        ))
    }

    callPost(url: string, item: any, errorMsg: string) {
        this.spinner.show()
        return this.http.post(this.baseUrl + url, item).pipe(tap(
            (data: any) => { },
            (error: any) => {
                this.spinner.hide()
                if (error.status === 504) {
                    this.openServerOffModal()
                } else if (errorMsg) {
                    this.openModal('Errore', errorMsg, error.error.cause, error.error.message, error.error.intStatus + " - " + error.error.status)
                }
            },
            () => { this.spinner.hide() }
        ))
    }

    openModal(title: string, errorMsg: string, cause: string, message: string, status: string) {
        const initialState = {
            title: title,
            text: "<h5>" + errorMsg + "</h5>" +
                "<strong>Status:</strong> " + status + "<br>" +
                "<strong>Causa:</strong> " + cause + "<br>" +
                "<strong>Message:</strong> " + message
        }
        this.modalService.show(AlertModalComponent, { initialState })
    }

    openServerOffModal() {
        const initialState = {
            title: "Attenzione",
            text: "<h5>Il server non risponde</h5>"
        }
        this.modalService.show(AlertModalComponent, { initialState })
        this.router.navigate(['loginPage'])
    }

}
