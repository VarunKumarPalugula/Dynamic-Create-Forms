import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AdminService } from '@app/law-office-admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminpermissionService } from '@app/auth-guard/admin/adminpermission.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-team-list',
  templateUrl: './my-team-list.component.html',
  styleUrls: ['./my-team-list.component.scss'],
})
export class MyTeamListComponent implements OnInit {
  token: any;
  teamInvitersList: any = [];
  teamMembersList: any = [];
  response: any = [];
  isAuthorize = false;
  loadPermissions: any = {};
  @ViewChild('t')
  t;
  activeid;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    public permissionService: AdminpermissionService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.loadTeamList();
    this.teamInvitataionList();
    //here we are getting role team member/primary admin/sub admin
    this.isAuthorize = this.permissionService.isGetAcess();
    this.loadPermissions = this.permissionService.GenericPermissions();
  }

  ngAfterViewInit() {
    if (this.router.url == '/admin/team/pendingteammembers') {
      this.activeid = 'pendingTeamMembersTab';
    }
  }
  // load team members
  loadTeamList() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService.OrgTeamMembersList(sessionStorage.getItem('OrganisationID'), this.token).subscribe(
      (res: any[]) => {
        this.spinner.hide();
        this.teamMembersList = res;
      },
      (err) => {
        this.spinner.hide();
        this.toaster.error('error occured');
      }
    );
  }
  // load team invite list
  teamInvitataionList() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService.TeamInviteesList(sessionStorage.getItem('OrganisationID'), this.token).subscribe(
      (res: any[]) => {
        this.spinner.hide();
        this.teamInvitersList = res;
      },
      (err) => {
        this.spinner.hide();
        this.toaster.error('error occured');
      }
    );
  }
}
