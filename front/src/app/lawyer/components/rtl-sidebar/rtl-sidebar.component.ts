import { Component, OnInit } from "@angular/core";
import { RouteService } from "../sidebar/sidebar.component";

@Component({
  selector: "app-rtl-sidebar",
  templateUrl: "./rtl-sidebar.component.html",
  styleUrls: ["./rtl-sidebar.component.scss"]
})
export class RtlSidebarComponent implements OnInit {
  menuItems: any[];

  constructor(
    private routeS:RouteService

  ) {}

  ngOnInit() {
    this.routeS.Routechange$.subscribe(e => {
      this.menuItems = e.filter(menuItem => menuItem);;
    })
    // this.menuItems = this.routeS.ROUTES.filter(menuItem => menuItem);
  }
}
