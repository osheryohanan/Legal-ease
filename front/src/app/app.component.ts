import { Component } from '@angular/core';
import {  UserService} from "./services/api/user.service";
import { AnthService } from './services/api/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authservice:AnthService){

  }
  ngOnInit(): void {


  }
  title = 'lease-ease';
}
