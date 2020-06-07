import { createAction, props } from '@ngrx/store';

//ACTION
export const authentifiedUser = createAction('[User Store] Authentification User');
export const LoginUser = createAction('[User Store] Login User',props<{user?}>());
export const setInfoUser = createAction('[User Store] Info loader User',props<{user}>());

export const authentifiedLawyer = createAction('[User Store] Authentification Lawyer');
export const reloadData = createAction('[User Store] Reload Lawyer');
export const LoginLawyer = createAction('[User Store] Login Lawyer',props<{user?}>());
export const setInfoLawyer = createAction('[User Store] Info loader Lawyer',props<{user}>());


export const logout= createAction('[All Store] Logout');
