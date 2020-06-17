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
import { MeetingsComponent } from './pages/meetings/meetings.component';
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { AvailabilityComponent } from './pages/availability/availability.component';

@NgModule({
  declarations: [DashboardComponent, ProfileComponent, MeetingsComponent, AvailabilityComponent],
  imports: [
    CommonModule,
    PrimeNGModule,
    LawyerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
    AngularMultiSelectModule


  ],
  providers:[MessageService]
})
export class LawyerModule { }
