import { createAction, props } from '@ngrx/store';

//ACTION
export const authentifiedUser = createAction('[User Store] Authentification');
export const logout = createAction('[User Store] Logout');
export const Login = createAction('[User Store] Login',props<{user?}>());
export const setInfo = createAction('[User Store] Info loader',props<{user}>());

