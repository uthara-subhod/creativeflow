import { Injectable, inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute } from '@angular/router';


import { Observable } from 'rxjs';

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

// export const adminGuard = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
//   return inject(AdminGuard).canActivate(next, state);
// }

