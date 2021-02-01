import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientpermissionService } from '@app/auth-guard/client-guard/clientpermission.service';
import { ConnectionService } from '../connection.service';
import { RandomColor } from 'angular-randomcolor';

@Component({
  selector: 'app-client-connections-list',
  templateUrl: './connections-list.component.html',
  styleUrls: ['./connections-list.component.scss'],
})
export class ConnectionListComponent implements OnInit {
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
  token: any;
  cancelData: any;
  loadSubAdminPermissions: any = {};
  isTeamMemberAuthorize = false;
  adminInvitedForMelist: any = [];
  colors: any = [];
  Subcolors: any = [];
  IncmngConnectionId: any;
  userDeclineData: any;
  acceptInviteData: any;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private connectionService: ConnectionService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private permissionService: ClientpermissionService
  ) {
    this.OrgId = sessionStorage.getItem('ClientOrganisationID');
  }

  ngOnInit() {
    this.adminConnectionsList();
    this.adminInvitedConnectionsList();
    this.invitedForMeConnections();
    this.isTeamMemberAuthorize = this.permissionService.isGetAcess();
    this.loadSubAdminPermissions = this.permissionService.GenericPermissions();
    this.getColor();

    for (var i = 0; i < 100; i++) {
      this.Subcolors.push(this.getsubColor());
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

  adminConnectionsList() {
    this.spinner.show();
    this.connectionService.connectionsList(this.OrgId).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.adminClientsListData = data;
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  adminInvitedConnectionsList() {
    this.spinner.show();
    this.connectionService.invitedByMeConnections(this.OrgId).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.adminClientInvitedList = data;
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  invitedForMeConnections() {
    this.connectionService.invitedForMe(this.OrgId).subscribe(
      (res: any) => {
        //console.log('for me', res)
        if (res == null || res == '') {
          this.adminInvitedForMelist = [];
        } else {
          this.adminInvitedForMelist = res;
        }
      },
      (error) => {}
    );
  }

  resendDelete(EDStatus: any, popup: any, clientinviteinfo?: any) {
    this.spinner.show();
    if (!clientinviteinfo) {
      clientinviteinfo = this.clientInviteData;
    }
    this.OrgId = sessionStorage.getItem('ClientOrganisationID');
    this.connectionService.resendConnectionInvitation(this.OrgId, EDStatus, clientinviteinfo, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.response = res;
        this.adminInvitedConnectionsList();
        if (this.response.Message === 'successfully record deleted') {
          this.recordDeltedMessage();
          this.Close('close click');
        } else if (this.response.Message === 'Successfully Invitation Mail Sent') {
          this.inviteName = clientinviteinfo.FullName;
          this.Modelsent(popup);
        }
      },
      (err) => {
        this.spinner.hide();
        this.toaster.error('Error Occured');
      }
    );
  }
  acceptInvite(ARbitstatus: boolean, data: any, popup: any) {
    this.spinner.show();
    if (!data) {
      this.userDeclineData = data;
    }
    if (this.userDeclineData == null) {
      this.IncmngConnectionId = data.IncomingConnectionId;
    } else {
      this.IncmngConnectionId = this.userDeclineData.IncomingConnectionId;
    }
    this.token = sessionStorage.getItem('C_AccessToken');
    this.OrgId = sessionStorage.getItem('ClientOrganisationID');
    this.connectionService
      .acceptRejectIncomingConnection(this.OrgId, this.IncmngConnectionId, ARbitstatus, this.token)
      .subscribe((res: any) => {
        this.response = res;
        if (ARbitstatus == true) {
          this.toaster.success('Success, User is Activated Successfully');
          this.spinner.hide();
          this.invitedForMeConnections();
          this.adminConnectionsList();
          this.adminInvitedConnectionsList();
        } else {
          this.toaster.success('Success, User Declain Successfully');
          this.spinner.hide();
          this.Close('close click');
          this.invitedForMeConnections();
        }
      });
  }
  recordDeltedMessage() {
    this.toaster.success('Success', 'Record Deleted Successfully');
  }
  deleteModel(content: any, clientinfo: any) {
    this.clientInviteData = clientinfo;
    this.registrarModel = this.modalService.open(content, { centered: true });
  }
  declineInviteModel(content: any, data: any) {
    this.userDeclineData = data;
    this.registrarModel = this.modalService.open(content, { centered: true });
  }
  Close(value: string) {
    this.registrarModel.close(value);
  }
  Modelsent(data: any) {
    this.sentModel = this.modalService.open(data, { centered: true });
  }

  Closesent(value: string) {
    this.sentModel.close(value);
  }

  inviteClientMembers(value: any) {
    if (value === 0) {
      this.router.navigate(['/client/applayout/connections/invite']);
    } else {
      this.router.navigate(['/client/applayout/connections/import']);
    }
  }
}
