import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from "../../material.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [NavbarComponent, FooterComponent, LoaderComponent],
  imports: [
    MaterialModule,
    CommonModule,
    NgbModule,
    RouterModule
  ],
  exports:[NavbarComponent, FooterComponent,LoaderComponent],
})
export class SharedModule { }
