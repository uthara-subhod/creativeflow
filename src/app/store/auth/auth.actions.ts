import { props, createAction } from '@ngrx/store';
import { User } from 'src/app/models/user';



export const registerRequest = createAction(
  '[Auth] Register Request',
   props<{ credentials: { fullname: string; email: string; password:string;banner:string }}>()
)

export const loginRequest = createAction(
  '[Auth] Login Request',
  props<{ credentials: { email: string; password: string } }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ loginSuccessResponse: {  token: string, user: User } }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const getUserRequest = createAction(
  '[Auth] Get User Request',
  props<{id:string}>()
)

export const adminLogin = createAction('[Auth] Admin Login',
  props<{ admin: { email: string; password: string; } }>()
)
export const adminLoginSuccess = createAction(
  '[Auth] Admin Login Success',
  props<{ loginSuccessResponse: { status: boolean, token: string, admin: User } }>()
);

export const adminLoginFailure = createAction(
  '[Auth] Admin Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const adminLogout = createAction('[Auth] Admin Logout');
