import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ModeratorService } from 'src/app/services/moderator.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private auth:ModeratorService,private admin:AdminService, private router:Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    
    if (this.auth.getToken()||this.admin.getToken()) {
      return true;
    }
    this.router.navigateByUrl('/behindflow/login');
    return false;

  }

}
export const AuthGuard = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(GuardService).canActivate(next, state);
}
