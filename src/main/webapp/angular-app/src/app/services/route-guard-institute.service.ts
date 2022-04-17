import { Injectable } from '@angular/core'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class RouteGuardInstituteService implements CanActivate {

	constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }



	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		let code = next.paramMap.get('code')
		let idIstituto = next.paramMap.get('idIstituto')
		let idPsicologo = next.paramMap.get('idPsicologo')
		let url = 'api/getCode?idIstituto=' + idIstituto + '&' + 'idPsicologo=' + idPsicologo
		console.log("url: " + url)

		return this.http
			.post(url, null)
			.pipe(map((data: any) => {

				console.log("code: " + code);
				console.log("data: " + data);
				if (code == data) {
					console.log("dentro al true");
					return true;
				} else {
					this.router.navigate(['loginPage']);
					return false;
				}
			}));

	}



}
