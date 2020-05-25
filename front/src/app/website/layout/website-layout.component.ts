import { Component, OnInit, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-website-layout',
  templateUrl: './website-layout.component.html',
  styleUrls: ['./website-layout.component.scss',"../../../../node_modules/bootstrap/scss/bootstrap.scss"],
  encapsulation: ViewEncapsulation.None
})
export class WebsiteLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
