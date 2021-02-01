import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ClientpermissionService {
  constructor(private myRoute: Router) {}

  // default permissions for team member
  isGetAcess() {
    const permissiondata = sessionStorage.getItem('clientpermissions');
    if (permissiondata) {
      const permission = JSON.parse(permissiondata);
      if (permission[0].Role.RoleName === 'OrganisationOwner' || permission[0].Role.RoleName === 'SubAdmin') {
        return true;
      } else if (permission[0].Role.RoleName === 'TeamMember') {
        return false;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // default permissions for sub admin
  isSubAdminGetAcess() {
    const permissiondata = sessionStorage.getItem('clientpermissions');
    if (permissiondata) {
      const permission = JSON.parse(permissiondata);
      if (permission[0].Role.RoleName === 'OrganisationOwner' || permission[0].Role.RoleName === 'SubAdmin') {
        if (permission[0].Role.RoleName === 'SubAdmin') {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isOnlyForApplicant() {
    const permissiondata = sessionStorage.getItem('clientpermissions');
    const permission = JSON.parse(permissiondata);
    if (permissiondata) {
      if (
        permission[0].Role.RoleName === 'BusinessClient_Applicant' ||
        sessionStorage.getItem('roleId') == '1' ||
        sessionStorage.getItem('roleId') == '7'
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  GenericPermissions() {
    const permissiondata = sessionStorage.getItem('clientpermissions');
    const permission = JSON.parse(permissiondata);
    if (permissiondata) {
      if (permission[0].Role.RoleName === 'SubAdmin') {
        const Permissions = permission[1].Permissions;
        if (Permissions) {
          let GenericPermissions: any = {};
          return (GenericPermissions = Permissions.TeamManagementPermissions);
        }
      } else if (permission[0].Role.RoleName === 'OrganisationOwner') {
        return;
      } else {
        return false;
      }
    } else {
      return false;
    }
    return;
  }

  FillingPermissions() {
    const permissiondata = sessionStorage.getItem('clientpermissions');
    const permission = JSON.parse(permissiondata);
    if (permissiondata) {
      if (
        permission[0].Role.RoleName === 'SubAdmin' ||
        permission[0].Role.RoleName === 'TeamMember' ||
        permission[0].Role.RoleName === 'BusinessClient_Applicant' ||
        sessionStorage.getItem('roleId') == '1' ||
        sessionStorage.getItem('roleId') == '2' ||
        sessionStorage.getItem('roleId') == '7'
      ) {
        const Permissions = permission[1].Permissions;
        if (Permissions) {
          let FilingPermissions: any = {};
          return (FilingPermissions = Permissions.FilingPermissions);
        }
      } else if (permission[0].Role.RoleName === 'OrganisationOwner') {
        return;
      } else {
        return false;
      }
    } else {
      return false;
    }
    return;
  }

  teamMemberFillingPermissions() {
    const permissiondata = sessionStorage.getItem('clientpermissions');
    const permission = JSON.parse(permissiondata);
    if (permissiondata) {
      if (permission[0].Role.RoleName === 'TeamMember') {
        const Permissions = permission[1].Permissions;
        if (Permissions) {
          let FilingPermissions: any = {};
          return (FilingPermissions = Permissions.FilingPermissions);
        }
      } else if (permission[0].Role.RoleName === 'OrganisationOwner') {
        return;
      } else {
        return false;
      }
    } else {
      return false;
    }
    return;
  }
}
