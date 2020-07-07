import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-schedule-meeting',
  templateUrl: './schedule-meeting.component.html',
  styleUrls: ['./schedule-meeting.component.scss']
})
export class ScheduleMeetingComponent implements OnInit {

  // date14: Date;
  // en:object = { closeText: 'סגור', prevText: 'הקודם', nextText: 'הבא', monthNames: ['ינואר','פברואר','מרץ','אפריל','מאי','יוני', 'יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'], monthNamesShort: ['1','2','3','4','5','6', '7','8','9','10','11','12'], dayNames: ['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת'], dayNamesShort: ['א\'','ב\'','ג\'','ד\'','ה\'','ו\'','שבת'], dayNamesMin: ['א\'','ב\'','ג\'','ד\'','ה\'','ו\'','שבת'], weekHeader: 'שבוע', firstDay: 0, isRTL: true, showMonthAfterYear: false, yearSuffix: '', timeOnlyTitle: 'זמן בלבד', timeText: 'זמן', hourText: 'שעה', minuteText: 'דקה', secondText: 'שניה', currentText: 'היום', ampm: false, month: 'חודש', week: 'שבוע', day: 'יום', allDayText: 'כל היום' };
  constructor(private modalService: NgbModal) { }


  // openModal(ModalId) {

  //   this.modalService.open(ModalId, {backdrop:'static', backdropClass: 'light-blue-backdrop', windowClass: 'easeModal', });
  // }
  // closeModal(modal){
  //   modal.dismiss('Cross click')
  // }
  ngOnInit(): void {
  }

}
