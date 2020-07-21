import { Imeeting } from './../../../interfaces/meeting.interface';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LawyerService } from 'src/app/services/api/lawyer.service';
import { Location } from '@angular/common';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ilawyer } from 'src/app/interfaces/lawyer.interface';
import PerfectScrollbar from "perfect-scrollbar";
import { finalize } from 'rxjs/operators';
import { UserService } from '../../../services/api/user.service';
import { MessageService } from 'primeng/api/';
import { Iuser } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-lawyers-list',
  templateUrl: './lawyers-list.component.html',
  styleUrls: ['./lawyers-list.component.scss'],
  providers:[MessageService]
})

export class LawyersListComponent implements OnInit {
  lawyers: Ilawyer[];
  currentUser:Iuser = null;
  subs: Subscription[] = [];
  faEllipsisH = faEllipsisH;
  currentLawyer: Ilawyer = null;
  loading: boolean = false;
  selectedP: boolean = true;
  minDate: Date;
  maxDate: Date;
  date14: Date;
  yesterday: Date = new Date();
  selectedValues: string[] = [];
  disponibility: [] = null;

  en: object = { closeText: 'סגור', prevText: 'הקודם', nextText: 'הבא', monthNames: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'], monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], dayNames: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'], dayNamesShort: ['א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'שבת'], dayNamesMin: ['א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'שבת'], weekHeader: 'שבוע', firstDay: 0, isRTL: true, showMonthAfterYear: false, yearSuffix: '', timeOnlyTitle: 'זמן בלבד', timeText: 'זמן', hourText: 'שעה', minuteText: 'דקה', secondText: 'שניה', currentText: 'היום', ampm: false, month: 'חודש', week: 'שבוע', day: 'יום', allDayText: 'כל היום' };
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private lawyerService: LawyerService,
    private router: Router,
    private userService: UserService,
    private modalService: NgbModal,
    private messageService: MessageService,
    private store: Store<{ user: any }>
  ) {
    this.subs.push(this.store.pipe(select('user')).subscribe(
      ((state) => {
        if (state) {
          this.currentUser = state.user;
        }
      }))
    )
  }
  getAvailability(event: Date) {
    this.loading=true;
    if (this.currentLawyer) {
      // let date=this.getDay(event);
      this.disponibility = null;
      this.lawyerService.getAvailability(this.currentLawyer._id, event).pipe(finalize(() => { setTimeout(() => { this.loading = false; }, 500); })).subscribe(
        (dispo: []) => this.disponibility = dispo,
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
          console.error(error);

        });
      // this.disponibility=this.currentLawyer.availability[date];
    }
  }

  getDay(date: Date) {
    var weekday = new Array(7);
    weekday[0] = "sun";
    weekday[1] = "mon";
    weekday[2] = "the";
    weekday[3] = "wed";
    weekday[4] = "thu";
    weekday[5] = "fri";
    weekday[6] = "sat";
    return weekday[date.getDay()];
  }

  ngOnInit(): void {
    this.setMinMax()

    this.loadData();

  }

  private setMinMax() {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = year + 2;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);
    console.log(this.maxDate.toString())
    console.log(this.minDate.toString())
  }

  psScroll() {

    setTimeout(() => {
      var mainPanel: any = document.getElementsByClassName("decal")[0];
      if (navigator.platform.indexOf("Win") > -1 && mainPanel) {
        document.documentElement.className += " perfect-scrollbar-on";
        document.documentElement.classList.remove("perfect-scrollbar-off");
        var ps = new PerfectScrollbar(mainPanel);

      }
    }, 1000);

  }


  loadData() {
    this.loading = true;

    this.subs.push(this.route.params.subscribe(params => {
      this.subs.push(this.lawyerService.getbycategory(params['id']).pipe(finalize(() => { setTimeout(() => { this.loading = false; }, 500); })).subscribe(
        (lawyer: Ilawyer[]) => { this.lawyers = lawyer; this.psScroll() },
        error => {
          this.location.back()



        }
      ))
    }));

  }
  get yearsRange(): string {
    return '' + new Date().getFullYear() + ':' + (new Date().getFullYear() + 1)
  }
  openModal(ModalId, lawyer) {
    if (!lawyer) return;
    this.currentLawyer = lawyer;
    this.modalService.open(ModalId, { backdrop: 'static', backdropClass: 'light-blue-backdrop', windowClass: 'easeModal', });
  }
  closeModal(modal) {
    modal.dismiss('Cross click')
    this.currentLawyer = null; this.selectedP = false;
  }
  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }
  receiveSelectedValue(_selectedValues) {
this.loading=true;
    this.selectedValues = _selectedValues;
    let meeting: Imeeting = {
      lawyerID: this.currentLawyer._id,
      userID: this.currentUser._id,
      date: this.date14,
      hour: this.selectedValues,
      confirmed: 0,
    }
    this.subs.push(
      this.userService.saveMeeting(meeting).pipe(finalize(() => { setTimeout(() => { this.loading = false; }, 500); })).subscribe(
        (data:any) => {
          this.messageService.add({ severity: 'success', summary: data.type, detail: data.message });
          this.router.navigate(['/mymeeting']);

        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
          // console.error(error);
          this.router.navigate(['/']);

        }
      )
    )


  }

}
