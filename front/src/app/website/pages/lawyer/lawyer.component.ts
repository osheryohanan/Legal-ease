import { Component, OnInit } from '@angular/core';
import { LawyerService } from 'src/app/services/api/lawyer.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-lawyer',
  templateUrl: './lawyer.component.html',
  styleUrls: ['./lawyer.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('1s ease-out',style({ height: 300, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 300, opacity: 1 }),
            animate('1s ease-in',style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class LawyerComponent implements OnInit {
  subs: Subscription[] = [];
  loading: boolean = false;
  lawyer = null;
  error: Array<string> = [];
  dispo:boolean=false;
  constructor(private lawyerService: LawyerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getlawyerinfo();
  }

  getlawyerinfo() {
    this.error = new Array();
    this.loading = true;
    this.subs.push(this.route.params.subscribe(params => {
      this.subs.push(this.lawyerService.getLawyerInfoUser(params['id']).pipe(finalize(() => { setTimeout(() => { this.loading = false; }, 2000); }))
        .subscribe(
          lawyer => {
            this.lawyer = lawyer;
          },
          (error: HttpErrorResponse) => {
            this.error.push(error.error.message);
          },
          () => { }
        ))
    }))

  }


}
