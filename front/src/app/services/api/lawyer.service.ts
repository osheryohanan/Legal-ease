import { LoginLawyer,logout } from './../../stores/user/action.store';
// Angular Modules
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ApiHttpService } from "./base.services";
import {  map,catchError} from 'rxjs/operators';


@Injectable()
export class LawyerService {

  constructor( private store:Store<{user:any}>,private api:ApiHttpService ) {

  }
  check(){
    if (localStorage.token)
      {
        this.store.dispatch(LoginLawyer(null));
      }
  }

  login(email,password,longtime?){
     return this.api.post('lawyer/login',{email:email,password:password,longtime:longtime?1:0})
  }
  loginG(token){
    return this.api.post('lawyer/loginG',{tokenid:token})
  }
  register(data){
    return this.api.post('lawyer/create',data)
  }
  update(data){
    return this.api.put('lawyer/update',data)
  }
  logout(){
    this.store.dispatch(logout())
  }
  category(){
    return this.api.get('lawyer/category')
  }
  getbycategory(id){
    return this.api.get(`lawyer/bycategory?id=${id}`);
  }

  getLawyerInfoUser(id){
    return this.api.get(`lawyer/getinfo/${id}`);
  }
  getAvailability(laywerId,date){
    return this.api.post(`meeting/checkLawyerAvability`,{date,laywerId})
  }
  getMeetingsForLawyer(){
    return this.api.post(`meeting/getMeetingsForLawyer`,{})
  }
  updateMeetingsStatus(id,status){
    return this.api.put(`meeting/confirmRejectMeeting/${id}`,{status})
  }
  updateZoomUrl(id,url){
    return this.api.put(`meeting/updateZoomURL/${id}`,{url})
  }

  updateImage(image){
    return this.api.putFD(`lawyer/profileImageUpdate`,image);
  }



  getLwaerInfo(token?){
    if(localStorage.getItem('token')){
      return this.api.post('lawyer/me',null).pipe(
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
