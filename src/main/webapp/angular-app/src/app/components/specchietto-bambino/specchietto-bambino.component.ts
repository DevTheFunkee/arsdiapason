import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-specchietto-bambino',
  templateUrl: './specchietto-bambino.component.html',
  styleUrls: ['./specchietto-bambino.component.css']
})
export class SpecchiettoBambinoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  @Input() bambino: any

}
