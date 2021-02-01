import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TeammemberslistComponent } from '@app/shared/businesscontrols/teammemberslist/teammemberslist.component';
import { ClientService } from '@app/law-office-client/law-office-client.service';
import { ToastrService } from 'ngx-toastr';
import { ClientpermissionService } from '@app/auth-guard/client-guard/clientpermission.service';
import { RandomColor } from 'angular-randomcolor';
import { CommonService } from '@app/shared/service/common.service';

@Component({
  selector: 'app-my-team-list',
  templateUrl: './my-team-list.component.html',
  styleUrls: ['./my-team-list.component.scss'],
})
export class MyTeamListComponent implements OnInit {
  // tslint:disable-next-line:typedef-whitespace
  @ViewChild(TeammemberslistComponent)
  childTeamMember: TeammemberslistComponent;
  TeamCount: any;
  searchFilter: string;
  registrarModel: any;
  CancelModel: any;
  sentModel: any;
  roleId: any;
  token: any;
  invitedTeamMembersList: any;
  inviteName: string;
  OrgId: any;
  teamInviteData: any;
  userId: any;
  Inviteresponses: any = [];
  teamMembersList: any = [];
  response: any = [];
  isAuthorize = false;
  loadPermissions: any = {};
  colors: any = [];
  Subcolors: any = [];
  activeid;
  teammemberId: any;
  username: any;
  clientTeamMemberUsername: string;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private clientService: ClientService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private permissionService: ClientpermissionService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.Teamlist();
    this.InvitedTeamlist();
    this.roleId = sessionStorage.getItem('roleId');
    //here we are getting role team member/primary admin/sub admin
    this.isAuthorize = this.permissionService.isGetAcess();
    this.loadPermissions = this.permissionService.GenericPermissions();
    this.getColor();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.username = sessionStorage.getItem('ClientUserName');

    for (var i = 0; i < 100; i++) {
      this.Subcolors.push(this.getsubColor());
    }
  }

  ngAfterViewInit() {
    if (this.router.url == '/client/applayout/team/pendingteammembers') {
      this.activeid = 'pendingTeamMembersTab';
    }
  }

  getColor() {
    for (var i = 0; i < 100; i++) {
      const newColor = RandomColor.generateColor();

      this.colors.push(newColor);
    }
  }
  getsubColor() {
    const zeros = '0000000';
    let color = '#' + Math.floor(Math.random() * 0xffffff).toString(16);
    var colorLength = color.length;

    if (colorLength < 90) {
      color += zeros.substring(0, zeros.length - colorLength);
    }

    return color;
  }

  getShortName(fullName) {
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('');
  }

  // load team members
  InvitedTeamlist() {
    this.spinner.show();
    this.userId = sessionStorage.getItem('ClientOrganisationID');
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    this.clientService.clientOrgInvitedTeamList(this.userId).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.invitedTeamMembersList = res;
        this.TeamCount = this.teamMembersList.length;
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    );
  }

  Teamlist() {
    this.spinner.show();
    this.userId = sessionStorage.getItem('ClientOrganisationID');
    this.clientService.teamlist(this.userId).subscribe(
      (tempdata: any) => {
        this.spinner.hide();
        this.teamMembersList = tempdata;
        this.TeamCount = this.teamMembersList.length;
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    );
  }

  resendDelete(EDStatus: any, popup: any, teamInvieInfo?: any) {
    if (!teamInvieInfo) {
      teamInvieInfo = this.teamInviteData;
    }
    const obj = {
      OrgId: sessionStorage.getItem('ClientOrganisationID'),
      EDStatus: EDStatus,
      TeamInviteID: teamInvieInfo.TemMemberStatus,
      EmailId: teamInvieInfo.EmailId,
      FullName: teamInvieInfo.FullName,
      InvitationId: teamInvieInfo.InvitationId,
    };
    this.spinner.show();

    this.clientService.resendClientAdminTeamInvitation(obj, this.token, this.commonService.getEnvDetails()).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.response = res;
        this.InvitedTeamlist();
        if (this.response.Message === 'successful email resent') {
          this.Modelsent(popup);
          this.inviteName = teamInvieInfo.FullName;
        } else if (this.response.Message === 'successfully record deleted') {
          this.Close('close click');
        }
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    );
  }
  activeTeamMember(TeamMemberId) {
    this.spinner.show();
    this.clientService
      .MakeTeamMemberActive(sessionStorage.getItem('ClientOrganisationID'), TeamMemberId, this.token)
      .subscribe(
        (res: any[]) => {
          this.spinner.hide();
          this.response = res;
          if (this.response.Status === 1) {
            this.Teamlist();
            this.toaster.info('Team member is activated');
          } else if (this.response.Status === 0) {
            this.toaster.error('failed to activate');
          }
        },
        (err) => {
          this.toaster.error('Failed');
        }
      );
  }
  inactiveTeamMember() {
    this.spinner.show();
    this.clientService
      .MakeTeamMemberInActive(sessionStorage.getItem('ClientOrganisationID'), this.teammemberId, this.token)
      .subscribe(
        (res: any[]) => {
          this.spinner.hide();
          this.response = res;
          if (this.response.Status === 1) {
            this.Close('close click');
            this.Teamlist();
            this.toaster.info('Team member is inactivated');
          } else if (this.response.Status === 0) {
            this.toaster.error('failed to delete');
          }
        },
        (err) => {
          this.toaster.error('Failed');
        }
      );
  }

  deleteModel(content: any, teamInfo: any) {
    this.teamInviteData = teamInfo;
    this.registrarModel = this.modalService.open(content, { centered: true });
  }
  inactivateTeamMember(content: any, teamInfo: any) {
    // console.log(teamInfo);
    this.teamInviteData = teamInfo;
    this.teammemberId = teamInfo.TeamMemberId;
    this.clientTeamMemberUsername = teamInfo.UserName;
    this.registrarModel = this.modalService.open(content, { centered: true });
  }
  Close(value: string) {
    this.registrarModel.close(value);
  }

  ModelCancel(data: any) {
    this.CancelModel = this.modalService.open(data, { centered: true });
  }

  CloseCancel(value: string) {
    this.CancelModel.close(value);
  }

  Modelsent(data: any) {
    this.sentModel = this.modalService.open(data, { centered: true });
  }

  Closesent(value: string) {
    this.sentModel.close(value);
  }
}
