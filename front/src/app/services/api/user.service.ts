// Angular Modules
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout, Login } from 'src/app/stores/user/action.store';
import { ApiHttpService } from "./base.services";
import {  map,catchError} from 'rxjs/operators';
@Injectable()
export class UserService {

  constructor( private store:Store<{user:any}>,private api:ApiHttpService ) {

  }
  check(){
    if (localStorage.token)
      {
        this.store.dispatch(Login(null));
      }
  }

  login(email,password,longtime?){
     return this.api.post('user/login',{email:email,password:password,longtime:longtime?1:0})
  }
  logout(){
    this.store.dispatch(logout())
  }

  getUserInfo(token?){
    if(localStorage.getItem('token')){
      return this.api.post('user/me',null).pipe(
        map(
          (user: any) => {
            if (!user.email) {
              localStorage.removeItem('token');
            }
            return user;
          }),
        catchError(error => {
          // handler error
          localStorage.removeItem('token');
          return error;
        })
      )
    }
  }
}
