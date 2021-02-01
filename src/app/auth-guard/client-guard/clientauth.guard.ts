import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientauthService } from './clientauth.service';
import { ClientpermissionService } from './clientpermission.service';

@Injectable({
  providedIn: 'root',
})
export class ClientauthGuard implements CanActivate {
  constructor(
    private auth: ClientauthService,
    private permissionService: ClientpermissionService,
    private myRoute: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isLoggednIn()) {
      return true;
    } else {
      this.myRoute.navigate(['/client/signin']);
      return false;
    }
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.permissionService.isOnlyForApplicant()) {
      return true;
    } else {
      this.myRoute.navigate(['/client/applayout']);
      return false;
    }
  }
}
