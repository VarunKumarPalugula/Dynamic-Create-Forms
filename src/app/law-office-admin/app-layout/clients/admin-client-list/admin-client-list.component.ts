import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AdminClientService } from '@app/law-office-admin/app-layout/clients/client.service';
import { memberExpression } from 'babel-types';
import { summaryFileName } from '@angular/compiler/src/aot/util';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminpermissionService } from '@app/auth-guard/admin/adminpermission.service';
import { RandomColor } from 'angular-randomcolor';
import { CommonService } from '@app/shared/service/common.service';

@Component({
  selector: 'app-admin-client-list',
  templateUrl: './admin-client-list.component.html',
  styleUrls: ['./admin-client-list.component.scss'],
})
export class AdminClientListComponent implements OnInit {
  registrarModel: any;
  CancelModel: any;
  sentModel: any;
  response: any;
  inviteName: string;
  clientInviteData: any;
  OrgId: any;
  adminClientsListData: any = [];
  DrBit: any;
  term: any;
  adminClientInvitedList: any = [];
  clientInvitedForMelist: any = [];
  adminInvitedForMelist: any = [];
  clientInvitedList: any = [];
  token: any;
  cancelData: any;
  teamMemberModel: any;
  teammemberId: string;
  clientUserName: string;
  clientMemberModel: any;
  loadSubAdminPermissions: any = {};
  isTeamMemberAuthorize = false;
  colors: any = [];
  Subcolors: any = [];
  @ViewChild('t')
  t;
  activeid;
  adminDeclineData: any;
  IncmngConnectionId: any;
  isSubAdminAcess: boolean;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private clientService: AdminClientService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private permissionService: AdminpermissionService,
    private commonService: CommonService
  ) {
    this.OrgId = sessionStorage.getItem('OrganisationID');
  }

  ngOnInit() {
    // here we are getting role team member/primary admin/sub admin
    this.isTeamMemberAuthorize = this.permissionService.isGetAcess();
    this.isSubAdminAcess=this.permissionService.isSubAdminGetAcess();
    this.loadSubAdminPermissions = this.permissionService.GenericPermissions();
    this.adminClientsList();
    this.adminInvitedClientsList();
    this.adminInvitesClientList();
    this.getColor();
    for (var i = 0; i < 100; i++) {
      this.Subcolors.push(this.getsubColor());
    }
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
  }

  ngAfterViewInit() {
    if (this.router.url == '/admin/clients/pendingclientinvitelist') {
      this.activeid = 'pendingConectionTab';
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

  adminClientsList() {
    this.spinner.show();
    this.clientService.adminClientsList(this.OrgId).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.adminClientsListData = data;
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  adminInvitedClientsList() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.clientService.adminInvitedClientsList(this.OrgId, this.token).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.adminClientInvitedList = data;
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }
  adminInvitesClientList() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.clientService.GetIncomingClientList(this.OrgId, this.token).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.adminInvitedForMelist = data;
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }
  resendDelete(EDStatus: any, popup: any, clientinviteinfo?: any) {
    this.spinner.show();
    if (!clientinviteinfo) {
      clientinviteinfo = this.clientInviteData;
    }
    this.OrgId = sessionStorage.getItem('OrganisationID');
    this.clientService.resendAdminClientInvitation(this.OrgId, EDStatus, clientinviteinfo, this.token, this.commonService.getEnvDetails()).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.Status === 1) {
          this.recordDeltedMessage();
        }
        this.response = res;
        this.adminInvitedClientsList();
        if (this.response.Status === 1) {
          this.Close('close click');
        } else if (this.response.Status === 2) {
          this.inviteName = clientinviteinfo.FullName;
          this.Modelsent(popup);
        }
      },
      (err) => {
        this.spinner.hide();
        this.toaster.error('error occured');
      }
    );
  }

  //inactive client member
  inActiveClient() {
    this.spinner.show();
    this.clientService
      .MakeClientInActive(sessionStorage.getItem('OrganisationID'), this.teammemberId, this.token)
      .subscribe(
        (res: any[]) => {
          this.spinner.hide();
          this.response = res;
          if (this.response.Status === 1) {
            this.closeClientModel('close click');
            this.toaster.info('Client is Inactivated');
            this.adminClientsList();
          } else if (this.response.Status === 0) {
            this.toaster.error('failed to inactive');
          }
        },
        (err) => {
          this.toaster.error('error occured');
        }
      );
  }

  activeClient(clientId) {
    this.spinner.show();
    this.clientService
      .MakeClientActive(sessionStorage.getItem('OrganisationID'), clientId, this.token)
      .subscribe((respose: any) => {
        this.spinner.hide();
        if (respose.Status === 1) {
          this.adminClientsList();
          this.toaster.info('Client is Activated');
        } else if (respose.Status === 0) {
          this.toaster.error('failed to active');
        }
      });
  }

  // accept and Decline Invitation
  acceptInvite(ARbitstatus: boolean, data: any, popup: any) {
    this.spinner.show();
    if (!data) {
      this.adminDeclineData = data;
    }
    if (this.adminDeclineData == null) {
      this.IncmngConnectionId = data.IncomingClientId;
    } else {
      this.IncmngConnectionId = this.adminDeclineData.IncomingClientId;
    }
    this.token = sessionStorage.getItem('A_AccessToken');
    this.OrgId = sessionStorage.getItem('OrganisationID');
    // this.IncmngConnectionId = data.IncomingClientId;
    this.clientService
      .acceptRejectIncomingConnection(this.OrgId, this.IncmngConnectionId, ARbitstatus, this.token)
      .subscribe((res: any) => {
        this.response = res;
        this.spinner.hide();
        this.adminInvitesClientList();
        this.adminClientsList();
        if (ARbitstatus == true) {
          this.toaster.success('Success, User is Activated Successfully');
        } else {
          this.toaster.success('Success, User Declain Successfully');
          this.Close('close click');
        }
      });
  }
  recordDeltedMessage() {
    this.toaster.success('Success', 'Record Deleted Successfully');
  }
  deleteModel(content: any, clientinfo: any) {
    this.clientInviteData = clientinfo;
    this.registrarModel = this.modalService.open(content, { centered: true, keyboard: false, backdrop: 'static' });
  }
  declineInvites(declineInvite: any, clientinfo: any) {
    this.adminDeclineData = clientinfo;
    this.registrarModel = this.modalService.open(declineInvite, {
      centered: true,
      keyboard: false,
      backdrop: 'static',
    });
  }
  Close(value: string) {
    this.registrarModel.close(value);
  }
  Modelsent(data: any) {
    this.sentModel = this.modalService.open(data, { centered: true, keyboard: false, backdrop: 'static' });
  }

  Closesent(value: string) {
    this.sentModel.close(value);
  }

  inviteClientMembers(value: any) {
    if (value === 0) {
      this.router.navigate(['/admin/clients/clientinvite']);
    } else {
      this.router.navigate(['/admin/clients/clientimport']);
    }
  }
  inactiveClientMemeber(content: any, client: any) {
    this.teammemberId = client.ClientId;
    this.clientUserName = client.UserName;
    this.clientMemberModel = this.modalService.open(content, { centered: true, keyboard: false, backdrop: 'static' });
  }
  closeClientModel(value: string) {
    this.clientMemberModel.close(value);
  }
  // deleteModel(content: any, client: any) {
  //   this.cancelData = client;
  //   this.registrarModel = this.modalService.open(content, { centered: true });
  // }

  // Close(value: string) {
  //   this.registrarModel.close(value);
  // }

  // ModelCancel(data: any) {
  //   this.CancelModel = this.modalService.open(data, { centered: true });
  // }

  // CloseCancel(value: string) {
  //   this.CancelModel.close(value);
  // }

  // Modelsent(data: any, client: any) {
  //   this.DrBit = 0;
  //   this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
  //   this.clientService.resendAdminClientInvitation(this.OrgId, this.DrBit, client, this.token).subscribe(
  //     (response: any) => {
  //       // this.sentModel = this.modalService.open(data, { centered: true });
  //     },
  //     error => {
  //     }
  //   );
  // }

  // Closesent(value: string) {
  //   this.sentModel.close(value);
  // }
}
