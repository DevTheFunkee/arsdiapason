import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service'
import { ActivatedRoute, Router } from '@angular/router'
import * as _ from 'lodash'

@Component({
	selector: 'app-child-page',
	templateUrl: './child-page.component.html',
	styleUrls: ['./child-page.component.css']
})
export class ChildPageComponent implements OnInit {

	constructor(private httpService: HttpService, private activedRoute: ActivatedRoute) { }

	idBambino: string = this.activedRoute.snapshot.paramMap.get("id")

	child: any = {}
	istituti: any = []

	ngOnInit(): void {
		this.getChild()
		this.getListaIstituti()
	}

	getChild() {
		let url = 'child?idBambino=' + this.idBambino
		this.httpService.callPost(url, null).subscribe(
			(data: any) => {
				this.child = data
			},
			(error: any) => { },
			() => { }
		)
	}

	getListaIstituti() {
		this.httpService.callPost('getListaIstituti', null).subscribe(
			(data: any) => {
				this.istituti = data
			},
			(error: any) => { },
			() => { }
		)
	}

	getNomeIstituto(idIstituto: number) {
		let inst = _.find(this.istituti, ['id', idIstituto])
		if (inst) return inst.nome
	}
}
