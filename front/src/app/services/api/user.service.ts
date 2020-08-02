// Angular Modules
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout, LoginUser } from 'src/app/stores/user/action.store';
import { ApiHttpService } from "./base.services";
import {  map,catchError} from 'rxjs/operators';
@Injectable()
export class UserService {

  constructor( private store:Store<{user:any}>,private api:ApiHttpService ) {

  }
  check(){

    if (localStorage.token)
      {
        this.store.dispatch(LoginUser(null));
      }
  }

  GenerateResetPassword(email){
    return this.api.post(`user/GenerateResetPassword`,{email})
  }
  ResetPassword(password,token){
    return this.api.post(`user/resetPassword`,{password,token})
  }
  login(email,password,longtime?){
     return this.api.post('user/login',{email:email,password:password,longtime:longtime?1:0})
  }
  loginG(token){
    return this.api.post('user/loginG',{tokenid:token})
  }
  register(data){
    return this.api.post('user/create',data)
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
  saveMeeting(data){
    return this.api.post('meeting/addMeeting',data)
  }
  getMeeting(userID){
    return this.api.post('meeting/getMeetingsForUser',{userID})
  }
  deleteMeeting(meetingID){
    return this.api.delete(`meeting/remove/${meetingID}`)
  }
}
