import { createReducer, on, Action } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Actions,createEffect,ofType,Effect,} from '@ngrx/effects';
import { Router, ActivatedRoute } from '@angular/router';
import {  UserService} from "../../services/api/user.service";
import {   map,switchMap,tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {  logout, setInfo, Login } from "./action.store";


//REDUCER
export const initialState = {
  isAuthentified: false,
  user: null,
}
const _userReducer = createReducer(
  initialState,
  on(logout,()=>(initialState)),
  on(setInfo,(state,{user})=>({...state,user:user,isAuthentified:true})),
);

export function _user_reducer(state, action) {
  return _userReducer(state, action);
}






//Effect
@Injectable()
export class LoginEffects {

  LoginName$: Observable <Action> = createEffect(
    () => this.actions$.pipe(
      ofType(Login),
      switchMap(
        playload => this.userService.getUserInfo().pipe(map(user => setInfo({user})))
      )
    )
  )


  // LoginName$ = createEffect(
  //   ()=>this.actions$.pipe(
  //     ofType(Login),
  //     switchMap(
  //       () => this.userService.getUserInfo().pipe(map(user => setInfo({user})))
  //     )
  //   )
  // )

  LoginSuccess$ = createEffect(() =>
     this.actions$.pipe(
        ofType(setInfo),
        tap(() =>{
          var returnUrl = this.route.snapshot.queryParams['return'] || '/';
          this.router.navigate([returnUrl]);
        }),
    ), { dispatch: false });



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private actions$: Actions,
    private userService: UserService
  ) {}
}
