import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/api/user.service';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Iuser } from 'src/app/interfaces/user.interface';
import { MessageService, ConfirmationService } from 'primeng/api/';
import { Imeeting } from 'src/app/interfaces/meeting.interface';
import { finalize } from 'rxjs/operators';
import { Ilawyer } from 'src/app/interfaces/lawyer.interface';

@Component({
  selector: 'app-mymeeting',
  templateUrl: './mymeeting.component.html',
  styleUrls: ['./mymeeting.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class MymeetingComponent implements OnInit {

  /**
   * Declaration
   */
  subs: Subscription[] = [];
  currentUser: Iuser = null;
  meetings: Imeeting[] = []
  loading: boolean = true;

  /**
  * Class MymeetingComponent constructor
  * @constructor
  * @param {Store} store
  * @param {MessageService} messageService
  * @param {UserService} userService
  */

  constructor(
    private store: Store<{ user: any }>,
    private messageService: MessageService,
    private userService: UserService,
    private confirmationService: ConfirmationService
  ) {
    this.subs.push(this.store.pipe(select('user')).subscribe(
      ((state) => {
        if (state) {
          this.currentUser = state.user;
          this.loadData();
        }
      }))
    )
  }

  ngOnInit(): void {

  }
  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }

  private loadData() {
    this.subs.push(this.userService.getMeeting(this.currentUser._id).pipe(finalize(() => { setTimeout(() => { this.loading = false; }, 500); })).subscribe(
      (data: Imeeting[]) => {
        this.meetings = data;
        console.log(this.meetings);

      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
      }
    ))

  }


  calculePrice(lawyer,hour:[]):string{
    if (!lawyer.priceHourly)
      return `The lawyer didn't specify his price.`
    let price:number=(hour.length)*(lawyer.priceHourly/2);

    return `&#8362;  ${price}`;
  }
  paymentConfirmation(_paymentDetails):number{
    if(!_paymentDetails)return 0;
    //Complete here with de payment information of the סליקה
  }

  confirmDelete(_id) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to delete this meetting(You will not be refunded)?',
        header:`Delete the meetting ${_id}`,
        icon: 'pi pi-info-circle',
        accept: () => {
          this.subs.push(this.userService.deleteMeeting(_id).subscribe(
            data=>{this.messageService.add({ severity: 'danger', summary: 'Removed', detail: 'Item was successfuly removed' });this.loadData()}
          ))
        },
        reject:() => {
          this.messageService.add({ severity: 'info', summary: 'Info', detail: `We didn't removed the meeting` });

        },
    });
}

}
