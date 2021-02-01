import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminauthService } from './adminauth.service';
import { AdminpermissionService } from './adminpermission.service';

@Injectable({ providedIn: 'root' })
export class AdminauthGuard implements CanActivate, CanActivateChild {
  constructor(
    private auth: AdminauthService,
    private permissionService: AdminpermissionService,
    private myRoute: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isLoggednIn()) {
      return true;
    } else {
      this.myRoute.navigate(['/']);
      return false;
    }
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.permissionService.isGetAcess() === true) {
      return true;
    } else {
      this.myRoute.navigate(['admin']);
      return false;
    }
  }
}
