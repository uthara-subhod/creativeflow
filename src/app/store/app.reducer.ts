import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as userAuth from './auth/auth.reducer';
import * as adminAuth from './auth/admin.reducer'
// Import other reducers if you have them

export interface AppState {
  auth: userAuth.State;
  admin:adminAuth.AdminState
  // Define other feature state properties here
}

export const reducers: ActionReducerMap<AppState> = {
  auth: userAuth.authReducer,  // Add other feature reducers here
  admin:adminAuth.adminReducer
};

export const selectAuthState = createFeatureSelector<AppState>('auth');

export const selectAdminState = createFeatureSelector<AppState>('admin');

