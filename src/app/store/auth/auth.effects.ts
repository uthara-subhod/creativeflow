import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../services/auth/auth.service';
// import { AdminService } from 'src/app/services/admin.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';



@Injectable()
export class AuthEffects {


  constructor(private actions$: Actions, private authService: AuthService, private router: Router, private cookie:CookieService) { }

  register$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.registerRequest),
    mergeMap((action) =>
      this.authService.register(action.credentials).pipe(
        map((response) => {
          return AuthActions.loginSuccess({
            loginSuccessResponse: {
              token: response.token,
              user: response.user
            }
          });

        }),
        catchError((error) => of(AuthActions.loginFailure({ error: error.error.error})))
      )
    )

  ))

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      mergeMap((action) =>
        this.authService.login(action.credentials).pipe(
          map((response) => {
            return AuthActions.loginSuccess({
              loginSuccessResponse: {
                token: response.token,
                user: response.user
              }
            });

          }),
          catchError((error) => of(AuthActions.loginFailure({ error: "Incorrect Credentials" })))
        )
      )

    ))

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ loginSuccessResponse }) => {
          this.cookie.set('token',loginSuccessResponse.token)
          localStorage.setItem('token', loginSuccessResponse.token);
          this.authService.setAuthenticated(true);
          const email=loginSuccessResponse.user.email as string
          const username = loginSuccessResponse.user.fullname? loginSuccessResponse.user.fullname :email.split('@')[0]
          this.router.navigateByUrl('/');

          Swal.fire({
            toast: true,
            icon:'success',
            title:`Welcome back, ${username}`,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          })

        })
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(({ error }) => {
          Swal.fire({
            toast: true,
            icon:'error',
            title:`${error}`,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          })
        })
      ),
    { dispatch: false }
  );



  $logout = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logout),
    tap((user) => {
      this.cookie.delete('token')
      localStorage.removeItem('token');
      this.authService.setAuthenticated(false);
      this.router.navigateByUrl('/');
      Swal.fire({
        toast: true,
        icon:'success',
        title:`You have logged out`,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })
    })
  ),
    { dispatch: false }
  )





}
