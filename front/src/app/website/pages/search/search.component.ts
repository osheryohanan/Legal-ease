import { Component, OnInit } from '@angular/core';
import { LawyerService } from 'src/app/services/api/lawyer.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  category:Array<any>;
  sub:Array<Subscription>=[];
    constructor(private lawyerService:LawyerService,private route: ActivatedRoute,private router: Router) {
    this.sub.push(this.lawyerService.category().subscribe((arg:Array<any>) => {this.category = arg;}));
  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.sub.forEach(x=>x.unsubscribe());

  }
  redirect(id){
    this.router.navigate([`/lawyerList/${id}`]);

  }

}
