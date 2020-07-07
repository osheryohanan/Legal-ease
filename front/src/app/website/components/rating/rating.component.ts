import { Component, OnInit, Input } from '@angular/core';
import { Rating } from 'src/app/interfaces/lawyer.interface';
import { faStar } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  faStar=faStar;
  @Input()rating:Rating;
  constructor() { }

  ngOnInit(): void {
  }

}
