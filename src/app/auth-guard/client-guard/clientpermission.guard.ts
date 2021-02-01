import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientauthService } from './clientauth.service';
import { ClientpermissionService } from './clientpermission.service';

@Injectable({
  providedIn: 'root',
})
export class ClientpermissionGuard implements CanActivate {
  constructor(
    private auth: ClientauthService,
    private permissionService: ClientpermissionService,
    private myRoute: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const permissiondata = sessionStorage.getItem('clientpermissions');
    const permission = JSON.parse(permissiondata);
    if (permissiondata) {
      if (permission[0].Role.RoleName === 'OrganisationOwner') {
        return true;
      } else if (next.data.role && permission[0].Role.RoleName === next.data.role) {
        if (permission[0].Role.RoleName === next.data.role) {
          this.myRoute.navigate(['client/applayout/team']);
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
         
        if (permission[0].Role.RoleName === 'SubAdmin') {
          if (
            state.url === '/client/applayout/team/teaminvite' ||
            state.url === '/client/applayout/team/teaminviteconfirm' ||
            state.url === '/client/applayout/team/invitesuccess'
          ) {
            let GenericPermissions: any = {};
            GenericPermissions = this.permissionService.GenericPermissions();
            if (GenericPermissions) {
              if (GenericPermissions.CanInviteTeamMembers) {
                return true;
              } else {
                this.myRoute.navigate(['client/applayout/team']);
                return false;
              }
            }
          } else if (
            state.url === '/client/applayout/connections/invite' ||
            state.url === '/client/applayout/connections/empty' ||
            state.url === '/client/applayout/connections/invite' ||
            state.url === '/client/applayout/connections/import' ||
            state.url === '/client/applayout/connections/connectionimportmatch' ||
            state.url === '/client/applayout/connections/connectionimportcopy' ||
            state.url === '/client/applayout/connections/connectionimportinvite'
            || state.url === '/client/applayout/connections/inviteslist'
          ) {
            let GenericPermissions: any = {};
            GenericPermissions = this.permissionService.GenericPermissions();
            if (GenericPermissions) {
              if (GenericPermissions.CanInviteConnections) {
                return true;
              } else if(state.url === '/client/applayout/connections/inviteslist') {
                return true;
              } 
            }
          }
        } else if (state.url === '/client/applayout/connections/inviteslist') {
          return true;
        }
      }
      this.myRoute.navigate(['/client/applayout']);
      return false;
    }
  }
}
