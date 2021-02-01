import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '@app/law-office-admin/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-teammember-invitation-signup',
  templateUrl: './admin-teammember-invitation-signup.component.html',
  styleUrls: ['./admin-teammember-invitation-signup.component.scss'],
})
export class AdminTeammemberInvitationSignupComponent implements OnInit {
  OrgName: string;
  admin: any = {};
  emailDisabled: boolean;
  orgDisabled: boolean;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private route: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.OrgName = this._activatedRoute.snapshot.queryParams['OrgName'];
    if (this.OrgName) {
      this.nonregistereduserinadminrole();
    } else if (
      this._activatedRoute.snapshot.queryParams['portfolioId'] &&
      this._activatedRoute.snapshot.queryParams['InvitationId'] &&
      this._activatedRoute.snapshot.queryParams['TStatus']
    ) {
      this.teamClearance(
        this._activatedRoute.snapshot.queryParams['portfolioId'],
        this._activatedRoute.snapshot.queryParams['InvitationId'],
        this._activatedRoute.snapshot.queryParams['TStatus']
      );
    } else {
      this.toaster.error('Something went wrong please contact support team');
      this.route.navigate(['signin']);
    }
  }

  //new invities for admin
  nonregistereduserinadminrole() {
    if (this.OrgName) {
      this.admin.NomClaturedOrgID = this._activatedRoute.snapshot.queryParams['PortOrgId'];
      this.admin.PortInvitedId = this._activatedRoute.snapshot.queryParams['PortInvitedId'];
      this.admin.Email = this._activatedRoute.snapshot.queryParams['Email'];
      this.admin.OrganisationName = this._activatedRoute.snapshot.queryParams['OrgName'];
      this.emailDisabled = true;
      this.orgDisabled = true;
      this.admin.TStatus = this._activatedRoute.snapshot.queryParams['TStatus'];
    }
  }

  //exisiting admin invite
  teamClearance(id, code, TStatus) {
    this.adminService.TeamClearance(id, code, TStatus).subscribe((data: any) => {
      if (data.Status === 1) {
      } else {
        this.toaster.error(data.Message);
      }
      this.route.navigate(['signin']);
    });
  }
}
