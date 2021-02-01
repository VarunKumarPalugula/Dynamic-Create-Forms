import { Component, OnInit } from '@angular/core';
import { ClientpermissionService } from '@app/auth-guard/client-guard/clientpermission.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  isAuthorize = false;
  isSubAdminAuthorize: any = {};
  isOnlyForApplicant = false;
  title = 'Organization Details';

  constructor(private permissionService: ClientpermissionService) {}

  ngOnInit() {
    //here we are getting role team member/primary admin/sub admin
    this.isAuthorize = this.permissionService.isGetAcess();
    this.isSubAdminAuthorize = this.permissionService.isSubAdminGetAcess();
    this.isOnlyForApplicant = this.permissionService.isOnlyForApplicant();
    if (this.isOnlyForApplicant) {
      this.title = 'Personal Details';
    }
  }
}
