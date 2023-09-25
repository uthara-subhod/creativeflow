import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as userAuth from './auth/auth.reducer';
// Import other reducers if you have them

export interface AppState {
  auth: userAuth.State;

  // Define other feature state properties here
}

export const reducers: ActionReducerMap<AppState> = {
  auth: userAuth.authReducer,  // Add other feature reducers here
};

export const selectAuthState = createFeatureSelector<AppState>('auth');

