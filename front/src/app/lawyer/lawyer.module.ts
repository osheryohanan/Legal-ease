import { MessageService } from 'primeng/api';
import { PrimeNGModule } from './../prime-ng.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LawyerRoutingModule } from './lawyer-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { AvailabilityComponent } from './pages/availability/availability.component';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslationModule } from '../moduleTranslation.module';



@NgModule({
  declarations: [DashboardComponent, ProfileComponent, AvailabilityComponent],
  imports: [
    CommonModule,
    PrimeNGModule,
    LawyerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule,
    BsDatepickerModule.forRoot(),
    AngularMultiSelectModule,
    JwBootstrapSwitchNg2Module,
    ProgressbarModule.forRoot(),
    TranslationModule

  ],
  providers:[MessageService]
})
export class LawyerModule { }
