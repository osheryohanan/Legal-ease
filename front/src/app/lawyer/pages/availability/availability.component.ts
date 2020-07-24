import { Component, OnInit } from '@angular/core';
import { race, Subscription } from 'rxjs';
import { availability_default } from './default.availability';
import { Store, select } from '@ngrx/store';
import { LawyerService } from 'src/app/services/api/lawyer.service';
import swal from "sweetalert2";
import { reloadData } from 'src/app/stores/user/action.store';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent implements OnInit {
  date = new Date()
  public availability;
  iconOff: string = '<i class="tim-icons icon-simple-remove"></i>';
  iconOn: string = '<i class="tim-icons icon-check-2"></i>';
  daysInWeek = [{ name: "Sunday", key: "sun" }, { name: "Monday", key: "mon" }, { name: "Tuesday", key: "the" }, { name: "Wednesday", key: "wed" }, { name: "Thursday", key: "thu" }, { name: "Friday", key: "fri" }, { name: "Saturday", key: "sat" }];
  subs: Subscription[] = [];
  constructor(
    private store: Store<{ user: any }>,
    public lawyer_Service: LawyerService
  ) {


  }

  ngOnInit(): void {
    this.getdata()


  }


  getDay(date) {

    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    return this.daysInWeek.filter(x=>x.name==weekday[date.getDay()])[0].key
  }

  gethour(index) {
    var result: string = "";
    var decimalTime = (index * 30) / 60;
    decimalTime = decimalTime * 60 * 60;
    var hours = Math.floor((decimalTime / (60 * 60)));
    decimalTime = decimalTime - (hours * 60 * 60);
    var minutes = Math.floor((decimalTime / 60));
    if (hours < 10) {
      result += "0";
    }
    result += hours + ':';
    if (minutes < 10) {
      result += "0";
    }
    result += minutes;

    return result;

  }
  ngOnDestroy() {

    this.subs.forEach(elem => elem.unsubscribe());
  }
  update() {

    let sub: Subscription = this.lawyer_Service.update({ availability: this.availability }).subscribe(x => {
      swal.fire({
        title: "Saved!",
        text: "We saved the changes!",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        type: "success"
      });
      this.store.dispatch(reloadData())
    })
    console.log(this.availability);

  }
  activate_all(day, periode) {
    for (let index = periode[0] * 2; index < periode[1] * 2; index++) {
      this.availability[day][index] = true;
    }
  }
  getdata() {
    this.subs.push(this.store.pipe(select('user')).subscribe(
      ((state) => {
        if (state && state.isAuthentified) {
          this.availability = state.user.availability ? JSON.parse(JSON.stringify(state.user.availability)) : availability_default;
          this.ps()
        }
      })));
  }
  onChange(state) {
    // saving
  }

  changeState(day,index){
    this.availability[day][index]=!this.availability[day][index];

  }
  ps() {
    setTimeout(() => {
      var table_responsive: any = document.getElementsByClassName("table-responsive")[0];
      var ps = new PerfectScrollbar(table_responsive);
    }, 1000);


  }
  arrayFor(n: number): any[] {
    return Array(n);
  }

}
