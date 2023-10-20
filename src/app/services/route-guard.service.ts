import { Injectable, inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute, CanDeactivate } from '@angular/router';


import { Observable, map } from 'rxjs';

import { AuthService } from './auth/auth.service';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService  {

  constructor(private auth:AuthService, private router:Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.auth.getToken()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}

@Injectable({
  providedIn: 'root'
})
export class IsLoggedIn  {

  constructor(private auth:AuthService, private router:Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.auth.getToken()) {
      this.router.navigate(['/'])
      return false;
  }else {
    return true;
  }
}
}

@Injectable({
  providedIn: 'root'
})
export class CreateGuard  {

  constructor(private user:ProfileService, private router:Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.user.getUser().pipe(
      map((res)=>{
        if(!res.user.plan||res.user.plan==''){
          this.router.navigate(['/create/plans']);
          return false;
        }else if(!res.user.artist&&!res.user.author){
          this.router.navigate(['/create/roles']);
          return false;
        }else{
          return true
        }
      }))
}
}
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate>
{
  canDeactivate(
    component: CanComponentDeactivate
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}



// @Injectable({
//   providedIn: 'root'
// })
// export class NotFound {
//   constructor(private router:Router, private route: ActivatedRoute, private profile:ProfileService) { }
//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): boolean {
//     let userId
//     this.route.params.subscribe(params => {
//       userId = params['id'];
//     });

//     // Use a service method to check if the ID exists in the database
//     if (this.profile.isValid()) {
//       return true; // ID exists, allow access to the route
//     } else {
//       // ID doesn't exist, navigate to the 404 page
//       this.router.navigate(['/404']);
//       return false;
//     }
//   }
// }



export const AuthGuard = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(RouteGuardService).canActivate(next, state);
}

export const loggedIn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(IsLoggedIn).canActivate(next, state);
}


export const isCreator = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>  => {
  return inject(CreateGuard).canActivate(next, state);
}
// export const adminGuard = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
//   return inject(AdminGuard).canActivate(next, state);
// }

