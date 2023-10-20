import { props, createAction } from '@ngrx/store';




export const adminLogin = createAction('[Admin] Login Request',
  props<{ admin: { username: string; password: string; } }>()
)
export const adminLoginSuccess = createAction(
  '[Admin] Login Success',
  props<{ loginSuccessResponse: { token: string, admin?: string, mod?:string} }>()
);

export const adminLoginFailure = createAction(
  '[Admin] Login Failure',
  props<{ error: string }>()
);


export const adminLogout = createAction('[Admin] Admin Logout');
