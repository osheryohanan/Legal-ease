import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ModalModule } from "ngx-bootstrap/modal";
import { DxVectorMapModule } from "devextreme-angular";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { VectorMapComponent1 } from "./vector-map/vector-map.component";
import { PictureUploadComponent } from "./picture-upload/picture-upload.component";
import { AuthNavbarComponent } from "./auth-navbar/auth-navbar.component";
import { RtlNavbarComponent } from "./rtl-navbar/rtl-navbar.component";
import { RtlSidebarComponent } from "./rtl-sidebar/rtl-sidebar.component";
import { FixedPluginComponent } from "./fixed-plugin/fixed-plugin.component";
import { LawyerService } from 'src/app/services/api/lawyer.service';
import { UserService } from 'src/app/services/api/user.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    JwBootstrapSwitchNg2Module,
    DxVectorMapModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    FontAwesomeModule,
  ],
  declarations: [
    FooterComponent,
    VectorMapComponent1,
    NavbarComponent,
    SidebarComponent,
    PictureUploadComponent,
    AuthNavbarComponent,
    RtlNavbarComponent,
    RtlSidebarComponent,
    FixedPluginComponent
  ],
  exports: [
    FooterComponent,
    VectorMapComponent1,
    NavbarComponent,
    SidebarComponent,
    PictureUploadComponent,
    AuthNavbarComponent,
    RtlNavbarComponent,
    RtlSidebarComponent,
    FixedPluginComponent
  ],
  providers:[LawyerService,UserService]
})
export class ComponentsModule {}
