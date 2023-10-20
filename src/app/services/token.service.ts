import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { Router } from '@angular/router';


import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth/auth.service';
import * as AuthActions from '../store/auth/auth.actions'
import { Store } from '@ngrx/store';
import { AdminService } from './admin.service';


@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor {

  constructor(private injector: Injector, private auth: AuthService, private cookie:CookieService, private admin:AdminService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isAdmin= request.url.includes('admin')
    if(request.url.includes('admin')){
      this.admin = this.injector.get(AdminService);
      const token: string = this.admin.getToken();
        request = request.clone({
          setHeaders: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json'
          }
        })
    }else{
      this.auth = this.injector.get(AuthService);
      const usertoken: string = this.auth.getToken();
      request = request.clone({
        setHeaders: {
          'Authorization': `${usertoken}`,
          'Content-Type': 'application/json'
        }
      })
    }
    return next.handle(request);
  }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private store:Store, private cookie:CookieService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError((error: any) => {
        if(!request.url.includes('admin')){

          if (error instanceof HttpErrorResponse && error.status === 401 && !request.url.includes('/login') && !request.url.includes('/') && !request.url.includes('/register') ) {
            localStorage.removeItem('token');
            this.store.dispatch(AuthActions.loginFailure({ error: 'Session Expired' }));
            this.router.navigateByUrl('/login');
          }
        }else{
          if (error instanceof HttpErrorResponse && error.status === 401 && !request.url.includes('/behindflow/login') ) {
            localStorage.removeItem('admin');
            this.store.dispatch(AuthActions.loginFailure({ error: 'Session Expired' }));
            this.router.navigateByUrl('/behindflow/login');
          }
        }



        return throwError(error);
      }));
  }
}
