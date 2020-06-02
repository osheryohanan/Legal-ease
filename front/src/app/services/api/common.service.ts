
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout, LoginLawyer } from 'src/app/stores/user/action.store';
import { ApiHttpService } from "./base.services";
import * as jwt_decode from "jwt-decode";
import { UserService } from 'src/app/services/api/user.service';
import { LawyerService } from './lawyer.service';
@Injectable({ providedIn: 'root' })
export class AnthService {
  type: string;
  userID: string;
  constructor(private api: ApiHttpService, private userservice: UserService, private lawyerservice: LawyerService) {
    this.init();

  }
  init() {

    if (localStorage.token) {
      try {
        var decode = jwt_decode(localStorage.token);
        this.type = decode.user.type
        if (this.type == "user") return this.userservice.check()
        if (this.type == "lawyer") return this.lawyerservice.check()
        throw 'error';
      } catch (error) {
        localStorage.removeItem('token')
      }

    }
  }

}
