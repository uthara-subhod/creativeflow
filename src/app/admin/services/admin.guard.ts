import { Injectable, inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute } from '@angular/router';


import { Observable, map } from 'rxjs';

import { AdminService } from 'src/app/services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService  {

  constructor(private auth:AdminService, private router:Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.auth.getToken()) {
      this.router.navigateByUrl('/behindflow/login');
      return false;
    }
    return true;
  }
}

@Injectable({
  providedIn: 'root'
})
export class IsLoggedIn  {

  constructor(private auth:AdminService, private router:Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.auth.getToken()) {
      this.router.navigate(['/behindflow'])
      return false;
  }else {
    return true;
  }
}
}

export const AuthGuard = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(RouteGuardService).canActivate(next, state);
}

export const loggedIn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(IsLoggedIn).canActivate(next, state);
}
