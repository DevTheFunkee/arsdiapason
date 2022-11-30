import { HttpService } from './services/http.service'
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	user: any = {}
	pageTitle: string
	constructor(private httpService: HttpService, private router: Router) {
	}


	ngOnInit(): void {
		this.user = JSON.parse(sessionStorage.getItem('user')) || {}
		this.router.events
			.pipe(
				filter((event) => event instanceof NavigationEnd),
				map(() => {
					let route: ActivatedRoute = this.router.routerState.root;
					let routeTitle = '';
					while (route!.firstChild) {
						route = route.firstChild;
					}
					if (route.snapshot.data['title']) {
						routeTitle = route!.snapshot.data['title'];
					}
					return routeTitle;
				})
			)
			.subscribe((title: string) => {
				if (title) {
					this.pageTitle = title
				}
			});
	}
	pages = [
		{ title: 'Login', route: '/loginPage', hidden: true },
		{ title: 'Crea Account', route: '/createAccount', hidden: true },
		{ title: 'Conferma Account', route: '/confirmAccount', hidden: true },
		{ title: 'Reimposta Password', route: '/mailResetPassword', hidden: true },
		{ title: 'Reimposta Password', route: '/resetPassword', hidden: true },
		{ title: 'Gestione Istituti', route: '/gestisciIstituti' },
		{ title: 'Lista Bambini', route: '/childList' },
		{ title: 'Pagina Bambino', route: '/pageChild', hidden: true },
		{ title: 'Inserisci Bambino', route: '/insertChild' },
		{ title: 'Admin Istituti', route: '/adminIstituti' },
		{ title: 'Admin Bambini', route: '/adminBambini' },
		{ title: 'Test Balconi', route: '/testBalconi' },
		{ title: 'Risultato del Test', route: '/testResult', class: 'disabled' },
		{ title: 'Grafico', route: '/paginaGrafici' },
		{ title: 'Excel Bambini', route: '/excelBambini', hidden: true }
	]



	logout() {
		sessionStorage.removeItem('auth')
		sessionStorage.removeItem('user')
		this.router.navigate(['loginPage'])
	}

	loggedIn() {
		return !!sessionStorage.getItem('user')
	}

}
