import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { Router } from '@angular/router';


import { CookieService } from 'ngx-cookie-service';
import { AdminService } from 'src/app/services/admin.service';
import * as AuthActions from '../store/auth/admin.actions'
import { Store } from '@ngrx/store';


@Injectable({
  providedIn: 'root'
})
export class AdminInterceptor implements HttpInterceptor {

  constructor(private injector: Injector, private auth: AdminService, private cookie:CookieService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.url.includes('/admin')){
      this.auth = this.injector.get(AdminService);
      const token: string = this.auth.getToken();
      if(token){
        request = request.clone({
          setHeaders: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json'
          }
        })
      }
    }

    return next.handle(request);
  }
}

@Injectable()
export class AErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private store:Store, private cookie:CookieService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError((error: any) => {

          if (error instanceof HttpErrorResponse && error.status === 401  && request.url.includes('/behindflow') ) {
            if(!request.url.includes('/behindflow/login')){

              localStorage.removeItem('admin');
              this.store.dispatch(AuthActions.adminLoginFailure({ error: 'Session Expired' }));
              this.router.navigateByUrl('/behindflow/login');
            }
          }



        return throwError(error);
      }));
  }
}
