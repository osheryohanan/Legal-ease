import { createReducer, on, Action } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Actions,createEffect,ofType,Effect,} from '@ngrx/effects';
import { Router, ActivatedRoute } from '@angular/router';
import {  UserService} from "../../services/api/user.service";
import {   map,switchMap,tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {  logout, setInfoUser, LoginUser, setInfoLawyer, LoginLawyer } from "./action.store";
import { LawyerService } from './../../services/api/lawyer.service';


//REDUCER
export const initialState = {
  isAuthentified: false,
  user: null,
  type: null,

}
const _userReducer = createReducer(
  initialState,
  on(logout,()=>(initialState)),
  on(setInfoUser,(state,{user})=>({...state,user:user,isAuthentified:true,type:'user'})),
  on(setInfoLawyer,(state,{user})=>({...state,user:user,isAuthentified:true,type:'lawyer'})),
);

export function _user_reducer(state, action) {
  return _userReducer(state, action);
}






//Effect
@Injectable()
export class LoginEffects {

  LoginNameUser$: Observable <Action> = createEffect(
    () => this.actions$.pipe(
      ofType(LoginUser),
      switchMap(
        playload => this.userService.getUserInfo().pipe(map(user => setInfoUser({user})))
      )
    )
  )
  LoginNameLawyer$: Observable <Action> = createEffect(
    () => this.actions$.pipe(
      ofType(LoginLawyer),
      switchMap(
        playload => this.lawyerService.getLwaerInfo().pipe(map(user => setInfoLawyer({user})))
      )
    )
  )

  LoginSuccessUser$ = createEffect(() =>
     this.actions$.pipe(
        ofType(setInfoUser),
        tap(() =>{
          if (this.router.url=='/login') {
          var returnUrl = this.route.snapshot.queryParams['return'] || '/';
          this.router.navigate([returnUrl]);
        }
        }),
    ), { dispatch: false });


    LoginSuccessLawyer$ = createEffect(() =>
    this.actions$.pipe(
       ofType(setInfoLawyer),
       tap(() =>{
         if (this.router.url=='/login') {
         this.router.navigate(['/lawyer']);
       }
       }),
   ), { dispatch: false });






    Logout$ = createEffect(() =>
     this.actions$.pipe(
        ofType(logout),
        tap(() =>{
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        }),
    ), { dispatch: false });




  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private actions$: Actions,
    private userService: UserService,
    private lawyerService: LawyerService
  ) {}
}
