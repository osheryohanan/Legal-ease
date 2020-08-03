import { Component, OnInit, EventEmitter } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';

export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  rtlTitle: string;
  collapse?: string;
  isCollapsed?: boolean;
  isCollapsing?: any;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  smallTitle?: string;
  rtlTitle: string;
  rtlSmallTitle?: string;
  type?: string;
  collapse?: string;
  children?: ChildrenItems2[];
  isCollapsed?: boolean;
}
export interface ChildrenItems2 {
  path?: string;
  smallTitle?: string;
  rtlSmallTitle?: string;
  title?: string;
  rtlTitle: string;
  type?: string;
}

@Component({
  selector: "app-lawyer-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(
    private routeS: RouteService
  ) {

  }

  ngOnInit() {
    this.routeS.Routechange$.subscribe(e => {
      this.menuItems = e.filter(menuItem => menuItem);;
    })
    // this.menuItems = this.routeS.ROUTES.filter(menuItem => menuItem);
  }
}


import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RouteService {
  private ROUTES: RouteInfo[]
  // Routechange: EventEmitter<RouteInfo[]> = new EventEmitter();
  private Routechange: BehaviorSubject<RouteInfo[]>;
  public Routechange$: Observable<RouteInfo[]>;
  constructor(
    public translate: TranslateService

  ) {
    this.loadRoute()
    this.Routechange = new BehaviorSubject<RouteInfo[]>(this.ROUTES)
    this.Routechange$ = this.Routechange.asObservable();
    this.translate.onLangChange.subscribe(
      () => {
        this.loadRoute();
        this.Routechange.next(this.ROUTES);
      }
    )
  }

  loadRoute() {
    this.ROUTES = [
      {
        path: "/lawyer/dashboard",
        title: this.translate.instant('LAWYER.SIDEBAR.DASHBOARD'),
        type: "link",
        icontype: "tim-icons icon-chart-pie-36",
        rtlTitle: "لوحة القيادة"
      },
      {
        path: "/lawyer/mymeetings",
        title: this.translate.instant('LAWYER.SIDEBAR.MYMEETING'),
        type: "link",
        icontype: "tim-icons icon-time-alarm",
        rtlTitle: "המפגשים שלי"
      },
      {
        path: "/lawyer",
        title: this.translate.instant('LAWYER.SIDEBAR.PERSOPREF'),
        type: "sub",
        icontype: "tim-icons icon-image-02",
        collapse: "pages",
        rtlTitle: "صفحات",
        isCollapsed: true,
        children: [

          {
            path: "profile",
            rtlTitle: "ملف تعريفي للمستخدم",
            rtlSmallTitle: " شع",
            title: this.translate.instant('LAWYER.SIDEBAR.USERPR'),
            type: "link",
            smallTitle: "UP"
          },
          {
            path: "availability",
            rtlTitle: "ملف تعريفي للمستخدم",
            rtlSmallTitle: " شع",
            title: this.translate.instant('LAWYER.SIDEBAR.AVA'),
            type: "link",
            smallTitle: "AV"
          }
        ]
      },

    ];
  }

}
