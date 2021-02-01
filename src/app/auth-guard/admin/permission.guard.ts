import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminauthService } from './adminauth.service';
import { AdminpermissionService } from './adminpermission.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(
    private auth: AdminauthService,
    private permissionService: AdminpermissionService,
    private myRoute: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const permissiondata = sessionStorage.getItem('permissions');
    const permission = JSON.parse(permissiondata);
    if (permissiondata) {
      if (permission[0].Role.RoleName === 'OrganisationOwner') {
        return true;
      } else if (next.data.role && permission[0].Role.RoleName === next.data.role) {
        if (permission[0].Role.RoleName === next.data.role) {
          this.myRoute.navigate(['admin/team']);
          return false;
        }
      } else if (permission[0].Role.RoleName === 'SubAdmin' || permission[0].Role.RoleName === 'TeamMember') {
        if (state.url === '/admin/fillings/newfilling') {
          let FillingPermissions: any = {};
          FillingPermissions = this.permissionService.FillingPermissions();
          if (FillingPermissions) {
            if (FillingPermissions.CanCreateNewFilings) {
              return true;
            } else {
              this.myRoute.navigate(['admin/fillings']);
              return false;
            }
          }
        }
        if (permission[0].Role.RoleName === 'TeamMember') {
          if (state.url === '/admin/clients') {
            return true;
          }
        }
        if (permission[0].Role.RoleName === 'SubAdmin') {
          if (
            state.url === '/admin/team/teaminvite' ||
            state.url === '/admin/team/teaminviteconfirm' ||
            state.url === '/admin/team/invitesuccess'
          ) {
            let GenericPermissions: any = {};
            GenericPermissions = this.permissionService.GenericPermissions();
            if (GenericPermissions) {
              if (GenericPermissions.CanInviteTeamMembers) {
                return true;
              } else {
                this.myRoute.navigate(['admin/team']);
                return false;
              }
            }
          } else if (
            state.url === '/admin/clients/clientinvite' ||
            state.url === '/admin/clients/clientinvitesuccess' ||
            state.url === '/admin/clients/clientimport' ||
            state.url === '/admin/clients/clientimportmatch' ||
            state.url === '/admin/clients/clientimportfinsih' ||
            state.url === '/admin/clients/clientimportinviteconfirm'
          ) {
            let GenericPermissions: any = {};
            GenericPermissions = this.permissionService.GenericPermissions();
            if (GenericPermissions) {
              if (GenericPermissions.CanInviteClients) {
                return true;
              } else {
                this.myRoute.navigate(['admin/clients']);
                return false;
              }
            }
          }
        }
      }
      this.myRoute.navigate(['admin']);
      return false;
    }
  }
}
