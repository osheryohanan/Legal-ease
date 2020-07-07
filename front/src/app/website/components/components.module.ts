import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './rating/rating.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScheduleMeetingComponent } from './schedule-meeting/schedule-meeting.component';
import { PrimeNGModule } from 'src/app/prime-ng.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectHourMeetingComponent } from './select-hour-meeting/select-hour-meeting.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [RatingComponent, ScheduleMeetingComponent, SelectHourMeetingComponent],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    PrimeNGModule,
    NgbModule,
  ],
  exports:[
    RatingComponent,
    ScheduleMeetingComponent,
    SelectHourMeetingComponent
  ]
})
export class ComponentsModule { }
