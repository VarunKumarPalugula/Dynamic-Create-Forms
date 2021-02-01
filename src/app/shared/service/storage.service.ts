import { Injectable } from '@angular/core';
import { TokenParams } from '@app/models/common/TokenParams';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  getImage() {
    return sessionStorage.getItem('Image');
  }

  //code for admin session storage
  StoreAdminData(Tempdata: TokenParams) {
    if (Tempdata != null) {
      sessionStorage.setItem('A_AccessToken', Tempdata.access_token);
      sessionStorage.setItem('A_TokenType', Tempdata.token_type);
      sessionStorage.setItem('Login_User', 'Admin');
      sessionStorage.setItem('A_IsActive', '1');
    }
  }

  // code for user session storage
  StoreClientAdminData(Tempdata: TokenParams) {
    if (Tempdata != null) {
      sessionStorage.setItem('C_AccessToken', Tempdata.access_token);
      sessionStorage.setItem('C_TokenType', Tempdata.token_type);
      sessionStorage.setItem('Login_User', 'Client');
      sessionStorage.setItem('C_IsActive', '1');
    }
  }

  StotringAdminUserClaims(ClaimData: any) {
    if (ClaimData != null) {
      for (let i = 0; i < ClaimData.length; i++) {
        if (i === 0) {
          sessionStorage.setItem('AdminUserName', ClaimData[i].subject);
          sessionStorage.setItem('Role', ClaimData[i].value);
        } else if (i === 1) {
          sessionStorage.setItem('LoguserId', ClaimData[i].value);
        } else {
          sessionStorage.setItem(ClaimData[i].type, ClaimData[i].value);
        }
      }
    }
  }

  //Code for storing the admin claims Data Goes Here
  StotringClientAdminUserClaims(ClaimData: any) {
    if (ClaimData != null) {
      for (let i = 0; i < ClaimData.length; i++) {
        if (i == 0) {
          sessionStorage.setItem('ClientAdminUserName', ClaimData[i].subject);
        } else {
          sessionStorage.setItem(ClaimData[i].type, ClaimData[i].value);
        }
      }
    }
  }

  //code for storing primary Team Member F permissions

  StoringPrimaryTeamMemberFilingsPermission(PermissionData: any) {
    if (PermissionData != null) {
      for (let obj of PermissionData) {
        for (let key in obj) {
          sessionStorage.setItem('PTMFP' + key, obj[key]);
        }
      }
    }
  }

  //code for storing  TeamMember Filing Permissions

  storingTeamMemberFilingPermissions(TeamMemberPermission: any) {
    if (TeamMemberPermission != null) {
      if (TeamMemberPermission != null) {
        for (let obj of TeamMemberPermission) {
          for (let key in obj) {
            sessionStorage.setItem('TMPF' + key, obj[key]);
          }
        }
      }
    }
  }

  //code for storing  Seleted Filing Data

  selectedFilingData(seletedfiling: any) {
    if (seletedfiling != null) {
      sessionStorage.setItem('A_FName', seletedfiling.FName);
      sessionStorage.setItem('A_FType', seletedfiling.FType);
      sessionStorage.setItem('A_CreatedByTeamMemId', seletedfiling.CreatedByTeamMemId);
      sessionStorage.setItem('A_CreatedOn', seletedfiling.CreatedOn);
      sessionStorage.setItem('A_Status', seletedfiling.Status);
      sessionStorage.setItem('A_FillingId', seletedfiling.FillingId);
      sessionStorage.setItem('A_CreatedByAdminId', seletedfiling.CreatedByAdminId);
    }
  }
}
