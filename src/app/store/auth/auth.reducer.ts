
import { Action, createReducer, on } from '@ngrx/store';
import {  loginFailure, loginSuccess, logout} from './auth.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from 'src/app/models/user';

export interface State {
  token: string | null;
  admin?: User | null;
  user: User | null;
  loginError?: string;
}

export const initialState: State = {
  token: localStorage.getItem('token')? localStorage.getItem('token') : null,
  user: null,
};

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { loginSuccessResponse }) => {
    return {
      ...state,
      token: loginSuccessResponse.token,
      user: loginSuccessResponse.user,
    };
  }),
  on(loginFailure, (state, { error }) => {
    return {
      ...state,
      loginError: error,
      token: null,
      user: null,
    };
  }),
  on(logout, (state) => {
    return {
      ...state,
      token: null,
      user: null,
    };
  }),
  


);

export function authReducer(state: State | undefined, action: Action) {
  return _authReducer(state, action);
}


