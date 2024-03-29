import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from './admin.actions';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from 'src/app/services/admin.service';



@Injectable()
export class AdminEffects {


  constructor(private actions$: Actions, private authService: AdminService, private router: Router, private cookie:CookieService) { }


  adminLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.adminLogin),
      mergeMap((action) =>
        this.authService.login(action.admin).pipe(
          map((response) => {
            return AuthActions.adminLoginSuccess({
              loginSuccessResponse: {
                token: response.token,
                admin: response.admin
              }
            });

          }),
          catchError((error) => of(AuthActions.adminLoginFailure({ error: "Incorrect Credentials" })))
        )
      )

    ))

  adminLoginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.adminLoginSuccess),
        tap(({ loginSuccessResponse }) => {
          if(loginSuccessResponse.admin){
            this.cookie.set('admin',loginSuccessResponse.token)
            localStorage.setItem('admin', loginSuccessResponse.token);
            const username=loginSuccessResponse.admin as string
            this.router.navigateByUrl('/behindflow');

            alert(
              'Login Successful! ' +
              'Welcome, ' +
              username
            );
          }else{
            this.cookie.set('mod',loginSuccessResponse.token)
            localStorage.setItem('mod', loginSuccessResponse.token);
            const username=loginSuccessResponse.admin as string
            this.router.navigateByUrl('/moderator');

            alert(
              'Login Successful! ' +
              'Welcome, ' +
              username
            );
          }
        })
      ),
    { dispatch: false }
  );

  adminLoginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.adminLoginFailure),
        tap(({ error }) => {
          alert(error)
        })
      ),
    { dispatch: false }
  );



  $adminLogout = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.adminLogout),
    tap((user) => {
      this.cookie.delete('admin')
      localStorage.removeItem('admin');
      this.router.navigateByUrl('/behindflow/login');
      alert(
        'You have logged out! '
      );
    })
  ),
    { dispatch: false }
  )




}
