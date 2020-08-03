
import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { logout } from 'src/app/stores/user/action.store';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  // faCoffee = faCoffee; faShoppingCart = faShoppingCart;

  isCollapsed = true;
  // mode: ProgressBarMode = 'determinate';
  private toggleButton: any;
  private sidebarVisible: boolean;
  user: any = null;
  auth: Subscription;


  constructor(public location: Location, private element: ElementRef, private router: Router, private store: Store<{ user: any }>, public translate: TranslateService) {
    this.sidebarVisible = false;

    this.auth = this.store.pipe(select('user')).subscribe(
      ((state) => {
        if (state) {
          this.user = state.user;

        }
      }));

  }
  logout() {
    this.store.dispatch(logout())

  }
  public setLanguage = (language) => {

    this.translate.use(language);
  }
  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];

  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);
    html.classList.add('nav-open');

    this.sidebarVisible = true;
  };
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    // console.log(html);
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  };
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  };

}
