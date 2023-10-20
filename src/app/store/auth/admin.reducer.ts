
import { Action, createReducer, on } from '@ngrx/store';
import { adminLoginSuccess,adminLoginFailure,adminLogout } from './admin.actions';


export interface AdminState {
  token: string | null;
  admin?: string | null;
  mod?: string | null;
  loginError?: string;
}

export const initialState: AdminState = {
  token: localStorage.getItem('admin')? localStorage.getItem('admin') : null,
  admin: null,
};

const _adminReducer = createReducer(
  initialState,
  on(adminLoginSuccess, (state, { loginSuccessResponse }) => {
    return {
      ...state,
      token: loginSuccessResponse.token,
      admin: loginSuccessResponse.admin,
    };
  }),
  on(adminLoginFailure, (state, { error }) => {
    return {
      ...state,
      loginError: error,
      token: null,
      admin: null,
    };
  }),
  on(adminLogout, (state) => {
    return {
      ...state,
      token: null,
      admin: null,
    };
  }),



);

export function adminReducer(state: AdminState | undefined, action: Action) {
  return _adminReducer(state, action);
}
