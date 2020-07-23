import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";

import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
import { ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LawyerService } from 'src/app/services/api/lawyer.service';
import { Imeeting, CalendarEvent } from 'src/app/interfaces/meeting.interface';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnInit {
  subs: Subscription[] = [];
  meetings: Imeeting[] = []
  events: CalendarEvent[] = [];
  eventTitle = undefined;
  today = new Date();
  y = this.today.getFullYear();
  m = this.today.getMonth();
  d = this.today.getDate();
  calendar:any;

  constructor(
    private confirmationService: ConfirmationService,
    public translate: TranslateService,
    private lawyerService: LawyerService,

  ) { }
  ngOnInit() {
    this.loadData();
    var calendarEl = document.getElementById("calendar");
    this.calendar = new Calendar(calendarEl, {
      plugins: [interaction, dayGridPlugin],
      header: {
        left: "title",
        center: "dayGridMonth,dayGridWeek,dayGridDay",
        right: "prev,next,today"
      },
      selectable: true,
      droppable: true,
      defaultView: "dayGridMonth",
      editable: true,
      events: this.events,
      views: {
        month: {
          titleFormat: { month: "long", year: "numeric" }
        },
        agendaWeek: {
          titleFormat: { month: "long", year: "numeric", day: "numeric" }
        },
        agendaDay: {
          titleFormat: { month: "short", year: "numeric", day: "numeric" }
        }
      },
    });
    this.calendar.render();
  }
  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }

  calculePrice(lawyer, hour: []): string {
    if (!lawyer.priceHourly)
      return `The lawyer didn't specify his price.`
    let price: number = (hour.length) * (lawyer.priceHourly / 2);

    return `&#8362;  ${price}`;
  }
  paymentConfirmation(_paymentDetails): number {
    if (!_paymentDetails) return 0;
    //Complete here with de payment information of the סליקה
  }
  updateStatus(id,status){
   this.subs.push(this.lawyerService.updateMeetingsStatus(id,status).subscribe(
     x=>this.loadData()
   ))
  }
  loadData() {
    this.calendar?this.calendar.removeAllEvents():undefined;
    this.subs.push(this.lawyerService.getMeetingsForLawyer().subscribe(
      (x: any) => {
        this.events = x.calendarEvent;
        this.meetings = x.meetings;
        this.calendar.addEventSource(this.events);
      },
      err => {

        swal.fire({
          title: 'Oops...',
          text: 'Something went wrong!',

        })
      }

    ));
  }

  //   confirmDelete(_id) {
  //     this.confirmationService.confirm({
  //         message: this.translate.instant('WEBSITE.MYMEETING.TSDELETEMESS'),
  //         header:`${this.translate.instant('WEBSITE.MYMEETING.TSDELETEHEAD')} ${_id}`,
  //         icon: 'pi pi-info-circle',
  //         accept: () => {
  //           this.subs.push(this.lawyerService.deleteMeeting(_id).subscribe(
  //             data=>{this.messageService.add({ severity: 'danger', summary: 'Removed', detail: 'Item was successfuly removed' });this.loadData()}
  //           ))
  //         },
  //         reject:() => {
  //           this.messageService.add({ severity: 'info', summary: 'Info', detail: `We didn't removed the meeting` });

  //         },
  //     });
  // }

}
