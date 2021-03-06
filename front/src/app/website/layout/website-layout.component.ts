import { Component, OnInit,ViewEncapsulation, ViewChild, Renderer2,Inject } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
// import { routerTransition } from '../route-animation';
import { DOCUMENT } from '@angular/common';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-website-layout',
  templateUrl: './website-layout.component.html',
  styleUrls: ['./website-layout.component.scss',],
  encapsulation: ViewEncapsulation.None
})
export class WebsiteLayoutComponent implements OnInit {
  lang:string='';

  @ViewChild(NavbarComponent) navbar: NavbarComponent;
  constructor(private renderer : Renderer2,  @Inject(DOCUMENT) document,public translate: TranslateService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang=event.lang;
    });
  }
  listenerFn: () => void;
  ngOnInit(){

    // var navbar : HTMLElement = this.element.nativeElement.children[0].children[0];
    this.listenerFn= this.renderer.listen('window', 'scroll', (event) => {
     var navbar=document.getElementById('navbar');
      const number = window.scrollY;


      if (number > 150 || window.pageYOffset > 150) {
          navbar.classList.remove('navbar-transparent');
          navbar.classList.add('bg-primary-legal');
      } else if (  'login' ) {
          // remove logic
          navbar.classList.add('navbar-transparent');
          navbar.classList.remove('bg-primary-legal');
      }
  });

  }
  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
  ngOnDestroy() {
    if (this.listenerFn) {
      this.listenerFn();
    }
  }
}
