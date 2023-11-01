import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../services/auth/auth.service';
// import { AdminService } from 'src/app/services/admin.service';
import { CookieService } from 'ngx-cookie-service';



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

          alert(
            'Login Successful! ' +
            'Welcome, ' +
            username
          );
        })
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(({ error }) => {
          alert(error)
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
      alert(
        "you have logged out"
      );
    })
  ),
    { dispatch: false }
  )

  // getUser$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.getUserRequest),
  //     switchMap(() =>
  //       this.authService.getUser().pipe(
  //         map((res) =>{}),
  //         catchError(() => of(AuthActions.getUserFailure()))
  //       )
  //     )
  //   )
  // );

  // adminLogin$ = createEffect(()=>
  // this.actions$.pipe(
  //   ofType(AuthActions.adminLogin),
  //   mergeMap((action) =>
  //     this.adminService.login(action.admin).pipe(
  //       map((response) => {
  //         if(response.status){

  //           return AuthActions.adminLoginSuccess({
  //             loginSuccessResponse: {
  //               status: response.status,
  //               token: response.token,
  //               admin: response.user
  //             }
  //           });
  //         }else{
  //           return AuthActions.adminLoginFailure({ error: "Incorrect Credentials" })
  //         }

  //       }),
  //       catchError((error) => of(AuthActions.adminLoginFailure({ error: "Incorrect Credentials" })))
  //     )
  //   )

  // ))

  // adminLoginSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(AuthActions.adminLoginSuccess),
  //       tap(({ loginSuccessResponse }) => {
  //         localStorage.setItem('admin', loginSuccessResponse.token);
  //         this.router.navigateByUrl('/admin');
  //         alert(
  //           'Login Successful! ' +
  //           'Welcome, ' +
  //           loginSuccessResponse.admin.firstname
  //         );
  //       })
  //     ),
  //   { dispatch: false }
  // );

  // adminLoginFailure$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(AuthActions.adminLoginFailure),
  //       tap(({ error }) => {
  //         alert(error)
  //       })
  //     ),
  //   { dispatch: false }
  // );

  // $adminLogout = createEffect(() => this.actions$.pipe(
  //   ofType(AuthActions.adminLogout),
  //   tap((user) => {
  //     localStorage.removeItem('admin');
  //     this.router.navigateByUrl('/admin/login');
  //     alert(
  //       'You have logged out! '
  //     );
  //   })
  // ),
  //   { dispatch: false }
  // )


}
