import { Component } from '@angular/core';
import {  UserService} from "./services/api/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private userservice:UserService){

  }
  ngOnInit(): void {
    this.userservice.check();

  }
  title = 'lease-ease';
}
