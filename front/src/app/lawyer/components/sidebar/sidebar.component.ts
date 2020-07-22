import { Component, OnInit } from "@angular/core";

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
//Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: "/lawyer/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "tim-icons icon-chart-pie-36",
    rtlTitle: "لوحة القيادة"
  },
  {
    path: "/lawyer/mymeetings",
    title: "My Meetings",
    type: "link",
    icontype: "tim-icons icon-chart-pie-36",
    rtlTitle: "המפגשים שלי"
  },
  {
    path: "/lawyer",
    title: "Personal preference",
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
        title: "User Profile",
        type: "link",
        smallTitle: "UP"
      },
      {
        path: "availability",
        rtlTitle: "ملف تعريفي للمستخدم",
        rtlSmallTitle: " شع",
        title: "Availability",
        type: "link",
        smallTitle: "AV"
      }
    ]
  },

];

@Component({
  selector: "app-lawyer-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
