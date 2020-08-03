import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { faCog, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: "app-fixed-lawyer-plugin",
  templateUrl: "./fixed-plugin.component.html",
  styleUrls: ["./fixed-plugin.component.scss"]
})
export class FixedPluginComponent implements OnInit {
  public faCog:IconDefinition=faCog;
  public sidebarColor: string = "red";
  public state: boolean = true;
  public dashboardColor: boolean = false;
  currentL:boolean=true;
  constructor(public toastr: ToastrService,public translate: TranslateService) {
    this.currentL=this.translate.currentLang=='en'?true:false;
    this.onChangeDashboardColor(null);
    setTimeout(() => {
      this.changeSidebarColor('green')
    }, 100);
  }
  onChangeSwitchLanguage(event){
    this.translate.use(this.currentL?'en':'he');
    if (this.currentL === false) {
      this.changeRTL("rtl");
    } else {
      this.changeRTL("");
    }
  }
  changeSidebarColor(color) {
    var sidebar = document.getElementsByClassName("sidebar")[0];
    var mainPanel = document.getElementsByClassName("main-panel")[0];

    this.sidebarColor = color;

    if (sidebar != undefined) {
      sidebar.setAttribute("data", color);
    }
    if (mainPanel != undefined) {
      mainPanel.setAttribute("data", color);
    }
  }
  changeRTL(rtl) {
    var body = document.getElementsByTagName("body")[0];
    if (body && rtl === "rtl") {
      body.classList.add(rtl);
    } else if (body.classList.contains("rtl")) {
      body.classList.remove("rtl");
    }
  }
  changeDashboardColor(color) {
    var body = document.getElementsByTagName("body")[0];
    if (body && color === "white-content") {
      body.classList.add(color);
    } else if (body.classList.contains("white-content")) {
      body.classList.remove("white-content");
    }
  }
  ngOnInit() {}
  onChangeDashboardColor(event) {
    const body = document.getElementsByTagName("body")[0];
    if (this.dashboardColor === true) {
      this.changeDashboardColor("");
    } else {
      this.changeDashboardColor("white-content");
    }
    // we simulate the window Resize so the charts will get updated in realtime.
    var simulateWindowResize = setInterval(function() {
      window.dispatchEvent(new Event("resize"));
    }, 180);

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(function() {
      clearInterval(simulateWindowResize);
    }, 1000);
  }
  onChange(event) {
    const body = document.getElementsByTagName("body")[0];
    if (this.state === true) {
      body.classList.remove("sidebar-mini");
      this.showSidebarMessage("Sidebar mini deactivated...");
    } else {
      body.classList.add("sidebar-mini");
      this.showSidebarMessage("Sidebar mini activated...");
    }
    // we simulate the window Resize so the charts will get updated in realtime.
    var simulateWindowResize = setInterval(function() {
      window.dispatchEvent(new Event("resize"));
    }, 180);

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(function() {
      clearInterval(simulateWindowResize);
    }, 1000);
  }
  showSidebarMessage(message) {
    this.toastr.show(
      '<span class="now-ui-icons ui-1_bell-53"></span>',
      message,
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: "toast-top-right"
      }
    );
  }
}
