import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select-hour-meeting',
  templateUrl: './select-hour-meeting.component.html',
  styleUrls: ['./select-hour-meeting.component.scss']
})
export class SelectHourMeetingComponent implements OnInit {
  selectedValues: string[] = [];
  @Input() availability;
  @Input() priceHourly:number;
  constructor() { }

  ngOnInit(): void {
  }

  change(event, item) {
    if (event.checked === false) {
      this.selectedValues=this.selectedValues.filter((value)=>{
        let CurrentSplit = value.split(':');
        let DeletedItemSplit = item.split(':');
        let CurrentSplitInt: number = (parseInt(CurrentSplit[0]) * 60) + parseInt(CurrentSplit[1]);
        let DeletedItemInt: number = (parseInt(DeletedItemSplit[0]) * 60) + parseInt(DeletedItemSplit[1]);
        return CurrentSplitInt<DeletedItemInt;
      })


    }
  }

  total(){
    return this.selectedValues.length*(this.priceHourly/2);
  }
  readOnly(item: string) {
    if (this.selectedValues.includes(item)) return false;
    if (this.selectedValues.length > 0) {
      let lastItem = this.selectedValues.slice(-1)[0];
      let itemSplit = item.split(':')
      let lastItemSplit = lastItem.split(':')
      let itemtoInt: number = (parseInt(itemSplit[0]) * 60) + parseInt(itemSplit[1]);
      let lastItemInt: number = ((parseInt(lastItemSplit[0]) * 60) + parseInt(lastItemSplit[1])) + 30;

      return !(itemtoInt === lastItemInt);
    };
    return false;
  }
}
