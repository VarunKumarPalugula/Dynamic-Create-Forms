import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '@app/law-office-admin/admin.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr';
import { ConnectionService } from '../../connections/connection.service';
import { ClientFilingsService } from '../filings.service';
import { ClientService } from '@app/law-office-client/law-office-client.service';
import { ClientpermissionService } from '@app/auth-guard/client-guard/clientpermission.service';

@Component({
  selector: 'app-newfilling',
  templateUrl: './newfilling.component.html',
  styleUrls: ['./newfilling.component.scss'],
})
export class NewfillingComponent implements OnInit {
  sponsorPopup: any;
  applicantPopup: any;
  connectionPopup: any;
  teamMemberPopup: any;

  fillingTypes: any = [];
  isConnectionDisabled = true;
  isApplicantDisabled = true;
  selectedFillingDisabled = false;
  isTeamMemberDisabled = true;
  isCreatedFillingDisabled = true;
  isClearDisabled = true;

  selectedFilling: string;
  adminClientsListData: any = [];
  teamMembersList: any = [];
  selectedApplicant: string;
  selectedTeamMembers: any = [];
  applicants: any = [];

  fillingData: any = {};
  selectedFillingType: string;
  TeamMembers = [];
  ApplicantsListData: any = [];
  successPopupModel: any;
  tittle: string;
  confirmData: any;
  clientsConnections = [];
  selectedConnection: any;
  teamMembersDropsownSettings = {};
  applicantDropDownSettings = {
    singleSelection: true,
    idField: 'LawOfficeClientID',
    textField: 'Email',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };
  connectionDropsownSettings = {};
  //permissions
  loadSubAdminPermissions: any = {};
  isAuthorize = false;
  isSubAdminAcess = true;

  constructor(
    private modalService: NgbModal,
    private adminService: AdminService,
    private route: Router,
    private clientService: ClientService,
    private clientFilingService: ClientFilingsService,
    private connectionService: ConnectionService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private permissionService: ClientpermissionService
  ) {}

  ngOnInit() {
    this.GetFillingTypes();
    this.ConnectionsList();
    this.ClientTeamlist();
    this.clientApplicants();
    this.isAuthorize = this.permissionService.isGetAcess();
    this.loadSubAdminPermissions = this.permissionService.GenericPermissions();
    this.isSubAdminAcess = this.permissionService.isSubAdminGetAcess();
  }

  ConnectionsList() {
    this.connectionService.connectionsList(sessionStorage.getItem('ClientOrganisationID')).subscribe(
      (res: any) => {
        this.clientsConnections = res;
        this.connectionDropsownSettings = {
          singleSelection: true,
          idField: 'AdminOrgId',
          textField: 'Email',
          // selectAllText: 'Select All',
          // unSelectAllText: 'UnSelect All',
          closeDropDownOnSelection: true,
          itemsShowLimit: 3,
          allowSearchFilter: true,
        };
      },
      (error) => {}
    );
  }

  //Get Fillings
  GetFillingTypes() {
    this.spinner.show();
    this.adminService.GetFilings().subscribe(
      (res: any[]) => {
        this.spinner.hide();
        this.fillingTypes = res;
      },
      (err) => {
        this.spinner.hide();
        this.toaster.error('Error Occured');
      }
    );
  }

  // choose filling
  selectFillingType(event: any) {
    this.selectedFilling = event.target.value;
    this.selectedFillingType = event.target.options[event.target.selectedIndex].text;
    this.isClearDisabled = false;
    this.isConnectionDisabled = false;
    this.selectedFillingDisabled = true;
  }

  //Applicant List
  applicantSponsorsList() {
    this.applicants = this.adminClientsListData.filter((a) => a.SetType == 2);
    this.clientsConnections = this.adminClientsListData.filter((c) => c.SetType != 2);
  }

  //applicant selection
  applicantOnSelect(event: TypeaheadMatch): void {
    let applicant = this.ApplicantsListData.find((a) => a.Email == this.selectedApplicant);
    if (applicant != undefined) {
      this.fillingData.ApplicantLawOfficeClientId = applicant.LawOfficeClientID;
    }
    this.isApplicantDisabled = true;
    this.isTeamMemberDisabled = false;
  }

  ClientTeamlist() {
    this.spinner.show();
    this.clientService.teamlist(sessionStorage.getItem('ClientOrganisationID')).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res == null || res.length == 0) {
        } else {
          this.teamMembersList = res.filter((item) => item.TeamMemberStatus != 4 && item.Status == true);
        }
        this.teamMembersDropsownSettings = {
          singleSelection: false,
          idField: 'LawOfficeClientID',
          textField: 'Email',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
        };
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    );
  }
  onConnectionSelect(event: any) {
    this.fillingData.AdminOrgId = event.AdminOrgId;
    if (this.selectedConnection.length <=0 ) {
      this.isCreatedFillingDisabled = true;
    } 
    else if(this.isCreatedFillingDisabled && this.selectedTeamMembers.length) {
      this.isCreatedFillingDisabled = false;
    }
    this.isConnectionDisabled = false;
    this.isApplicantDisabled = false;
  }


  clientApplicants() {
    this.spinner.show();
    this.clientService.teamlist(sessionStorage.getItem('ClientOrganisationID')).subscribe(
      (tempdata: any) => {
        this.spinner.hide();
        for (let i = 0; i < tempdata.length; i++) {
          if (tempdata[i].TeamMemberStatus == 4 && tempdata[i].Status == true) {
            this.ApplicantsListData.push(tempdata[i]);
          }
        }
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    );
  }
  //team member selection
  onTeamMemberSelect(item: any) {
    if (this.selectedTeamMembers.length) {
      this.isCreatedFillingDisabled = false;
    } else {
      this.isCreatedFillingDisabled = true;
    }
  }
  onTeamMemberSelectAll(items: any) {
    if (items.length) {
      this.isCreatedFillingDisabled = false;
    } else {
      this.isCreatedFillingDisabled = true;
    }
  }
  //create filling
  CreateFilling() {
    this.spinner.show();
    this.fillingData.FilingType = this.selectedFillingType;
    this.selectedTeamMembers.forEach((element) => {
      this.TeamMembers.push(element.LawOfficeClientID);
    });
    this.fillingData.TeamLawOfficeClientIdCSV = this.TeamMembers.toString();
    this.clientFilingService.createFiling(sessionStorage.getItem('ClientOrganisationID'), this.fillingData).subscribe(
      (data: any) => {
        this.spinner.hide();
        if (data.Status == 1) {
          this.route.navigate(['/client/applayout/fillings']);
          this.Clear();
        } else if (data.Status == 0) {
          this.toaster.error('Failed to Create');
        }
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  //Clear
  Clear() {
    this.selectedFillingDisabled = false;
    this.isConnectionDisabled = true;
    this.isApplicantDisabled = true;
    this.isTeamMemberDisabled = true;
    this.isCreatedFillingDisabled = true;
    this.selectedFilling = '';
    this.isApplicantDisabled = true;
    this.isClearDisabled = true;
    this.selectedApplicant = '';
    this.selectedTeamMembers = [];
    this.selectedConnection = '';
  }

  sponsorInvite(data: any) {
    this.sponsorPopup = this.modalService.open(data, { centered: true, keyboard: false, backdrop: 'static' });
  }
  closeConnectionInvite(value) {
    if (this.sponsorPopup != undefined) {
      this.sponsorPopup.close(value);
    }
  }
  applicantInvite(data: any) {
    this.applicantPopup = this.modalService.open(data, { centered: true, keyboard: false, backdrop: 'static' });
  }
  closeApplicantInvite(value) {
    if (this.applicantPopup != undefined) {
      this.applicantPopup.close(value);
    }
  }
  connectionInvite(data: any) {
    this.connectionPopup = this.modalService.open(data, { centered: true, keyboard: false, backdrop: 'static' });
  }
  closeSponsorInvite(data: any) {
    this.connectionPopup.close(data);
  }

  teamInvite(data: any) {
    this.teamMemberPopup = this.modalService.open(data, { centered: true, keyboard: false, backdrop: 'static' });
  }
  closeTeamInvite(value) {
    if (this.teamMemberPopup != undefined) {
      this.teamMemberPopup.close(value);
    }
  }

  confirmationSuccessPopup(data, tempref: any) {
    this.successPopupModel = this.modalService.open(tempref, { centered: true, keyboard: false, backdrop: 'static' });
    this.confirmData = data;
  }
  closeConfirmSuccess(value) {
    this.modalService.dismissAll();
  }
}
