import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LawyerService } from 'src/app/services/api/lawyer.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-lawyers-list',
  templateUrl: './lawyers-list.component.html',
  styleUrls: ['./lawyers-list.component.scss']
})
export class LawyersListComponent implements OnInit {
  lawyers;
  subs: Subscription[]=[];

  constructor(private route: ActivatedRoute,private location: Location,private lawyerService:LawyerService) {

  }

  ngOnInit(): void {
     this.subs.push(this.route.params.subscribe(params => {
      this.subs.push(this.lawyerService.getbycategory(params['id']).subscribe(
        lawyer=>this.lawyers=lawyer,
        error => {
          this.location.back()



        }
      ))
    }));
  }



}
