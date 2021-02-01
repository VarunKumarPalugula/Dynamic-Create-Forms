import { Component, OnInit, Output, Input } from '@angular/core';
import { ClientService } from '@app/law-office-client/law-office-client.service';
import { ClientpermissionService } from '@app/auth-guard/client-guard/clientpermission.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'client-permissions',
  templateUrl: './client-permissions.component.html',
  styleUrls: ['./client-permissions.component.scss'],
})
export class ClientPermissionsComponent implements OnInit {
  @Input()
  isAuthorize = false;
  @Input()
  isSubAdminAuthorize: any = {};

  token: string;
  isTeamMember = false;
  clientMembersRoles = [];
  teamMembersList = [];
  loadPermissions = false;
  selectedRole: string;
  teamMemberPermissions: any = {};
  teamFillingPermission: any = {};
  TemplatePermissions: any = {};
  DocumentLibraryPermissions: any = {};
  AdminID: string;
  sentModel: any;

  constructor(
    private clientService: ClientService,
    private permissionService: ClientpermissionService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.isAuthorize = this.permissionService.isGetAcess();
    this.isSubAdminAuthorize = this.permissionService.isSubAdminGetAcess();
    if (this.isAuthorize) {
      this.GetClientRoles();
    }
  }

  GetClientRoles() {
    // getTeamRoles
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    this.clientService.GetClientRoles().subscribe(
      (res: any[]) => {
        this.spinner.hide();
        let data = res.filter((l) => l.RoleId !== 1);
        if (!this.isSubAdminAuthorize) {
          data = res.filter((l) => l.RoleId !== 4 && l.RoleId !== 1 && l.RoleId !== 2);
        }
        this.clientMembersRoles = data;
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    );
  }
  GetTeambersOnTeamMemberStatus(event) {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    this.clientService
      .GetTeambersOnTeamMemberStatus(sessionStorage.getItem('ClientOrganisationID'), event.target.value, this.token)
      .subscribe(
        (res: any[]) => {
          this.spinner.hide();
          this.teamMembersList = res;
          this.loadPermissions = false;
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }
  //viewTeamMember
  viewTeamMember(AdminID, i, teamStatus) {
    this.AdminID = AdminID;
    if (teamStatus != 3) {
      this.isTeamMember = false;
      this.GetTeamManagementPermissions();
      this.GetTemplatePermissions();
      this.GetDocumentLibraryPermissions();
    } else {
      this.isTeamMember = true;
    }
    this.loadPermissions = true;
    this.getFilingPermissions();
  }
  GetTeamManagementPermissions(ev?: any, id?: any) {
    this.spinner.show();
    if (id) {
      document.getElementById(id).classList.toggle('d-n');
    }
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    this.clientService
      .GetTeamManagementPermissions(sessionStorage.getItem('ClientOrganisationID'), this.AdminID, this.token)
      .subscribe(
        (res: any[]) => {
          this.spinner.hide();
          this.teamMemberPermissions = res;
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }

  GetTemplatePermissions(ev?: any, id?: any) {
    this.spinner.show();
    if (id) {
      document.getElementById(id).classList.toggle('d-n');
    }
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    this.clientService
      .GetTemplatePermissions(sessionStorage.getItem('ClientOrganisationID'), this.AdminID, this.token)
      .subscribe(
        (res: any[]) => {
          this.spinner.hide();
          this.TemplatePermissions = res;
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }

  getFilingPermissions(ev?: any, id?: any) {
    this.spinner.show();
    if (id) {
      document.getElementById(id).classList.toggle('d-n');
    }
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    this.clientService
      .getFilingPermissions(sessionStorage.getItem('ClientOrganisationID'), this.AdminID, this.token)
      .subscribe(
        (res: any[]) => {
          this.spinner.hide();
          this.teamFillingPermission = res;
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }
  GetDocumentLibraryPermissions(ev?: any, id?: any) {
    this.spinner.show();
    if (id) {
      document.getElementById(id).classList.toggle('d-n');
    }
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    this.clientService
      .GetDocumentLibraryPermissions(sessionStorage.getItem('ClientOrganisationID'), this.AdminID, this.token)
      .subscribe(
        (res: any[]) => {
          this.spinner.hide();
          this.DocumentLibraryPermissions = res;
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }

  toggler(ev: any, id: any) {
    document.getElementById(id).classList.toggle('d-n');
  }
  Modelsent(data: any) {
    this.sentModel = this.modalService.open(data, { centered: true });
  }
  Closesent(value: string) {
    this.sentModel.close(value);
  }

  SetTeamManagementPermissions(teamPermissions) {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    this.clientService
      .SetTeamManagementPermissions(
        sessionStorage.getItem('ClientOrganisationID'),
        teamPermissions.LawOfficeClientId,
        teamPermissions,
        this.token
      )
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.Status == 1) {
            this.GetTeamManagementPermissions('', 'one');
          } else if (res.Status == 0) {
            this.toaster.error('Failed to get  Permissions');
          }
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }

  SetFilingPermissions(fillingPermissions) {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    this.clientService
      .SetFilingPermissions(
        sessionStorage.getItem('ClientOrganisationID'),
        fillingPermissions.LawOfficeClientId,
        fillingPermissions,
        this.token
      )
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.Status == 1) {
            this.getFilingPermissions('', '2');
          } else if (res.Status == 0) {
            this.toaster.error('Failed to set  Permissions');
          }
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }
  SetTemplatePermissions(templatePermissions) {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    this.clientService
      .SetTemplatePermissions(
        sessionStorage.getItem('ClientOrganisationID'),
        templatePermissions.LawOfficeClientId,
        templatePermissions,
        this.token
      )
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.Status == 1) {
            this.GetTemplatePermissions('', '4');
          } else if (res.Status == 0) {
            this.toaster.error('Failed to set  Permissions');
          }
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }

  SetDocumentLibraryPermissions(teamMemberDocumentLibraryPermissions) {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    this.clientService
      .SetDocumentLibraryPermissions(
        sessionStorage.getItem('ClientOrganisationID'),
        teamMemberDocumentLibraryPermissions.LawOfficeClientId,
        teamMemberDocumentLibraryPermissions,
        this.token
      )
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.Status == 1) {
            this.GetDocumentLibraryPermissions('', '5');
          } else if (res.Status == 0) {
            this.toaster.error('Failed to set  Permissions');
          }
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }
}
