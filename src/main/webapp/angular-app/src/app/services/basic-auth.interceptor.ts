import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'
import { AlertModalComponent } from '../components/alert-modal/alert-modal.component'
import { Observable } from 'rxjs'
import { catchError, finalize  } from 'rxjs/operators'
import { BsModalService } from 'ngx-bootstrap/modal'
import { Router } from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner'

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

    constructor(private modalService: BsModalService, private router: Router, private spinner: NgxSpinnerService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show()
        if (request.url.startsWith("/api/")) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Basic ' + sessionStorage.getItem('auth')
                }
            })
        }
        return next.handle(request).pipe(
            catchError((error: { status: number; error: { cause: string } }) => {
                if (error.status === 401) {
                    sessionStorage.removeItem('auth')
                    sessionStorage.removeItem('user')
                    this.router.navigate(['loginPage'])
                    this.openErrorModal("Utente non più presente in sessione, è necessario riautenticarsi")
                } else if (error.status === 504) {
                    this.openServerOffModal()
                } else {
                    this.openErrorModal(error.error.cause)
                }
                return next.handle(request)
            }),
            finalize(() => {
                this.spinner.hide()
            })
        )
    }

    hideSpinner(request: HttpRequest<any>) {
        this.spinner.hide()
        return request
    }

    openErrorModal(cause: string) {
        const initialState = {
            title: "Si è verificato un errore",
            text: "<strong>" + cause + "</strong>"
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
