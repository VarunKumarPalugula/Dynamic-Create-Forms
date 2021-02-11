import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '@app/shared/service/validation.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '@app/law-office-admin/admin.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

import { AdminClientService } from '../../clients/client.service';
import { AdminpermissionService } from '@app/auth-guard/admin/adminpermission.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '@app/shared/service/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-newfilling',
  templateUrl: './newfilling.component.html',
  styleUrls: ['./newfilling.component.scss'],
})
export class NewfillingComponent implements OnInit {
  sponsorPopup: any;
  applicantPopup: any;
  token: any;
  sponserShipTypes: any = [];
  fillingTypes: any = [];
  selectedSponsor: any;
  isSponsorDisabled = true;
  isApplicantDisabled = true;
  isTeamMemberDisabled = true;
  isCreatedFillingDisabled = true;
  isSponsorshipTypesDisabled = true;
  isClearDisabled = true;
  selectedFilling: string;
  sponsorType: string;
  selectedClient: string;
  adminClientsListData: any = [];
  applicantSection = false;
  sponsorSection = false;
  applicantTypeCheck: any;
  teamMembersList: any = [];
  templateList: any = [];
  selectedApplicant: string;
  selectedTeamMembers: any = [];
  selectedTemplate: any;
  applicants: any = [];
  clientChoiceSection = false;
  teamMembersDropsownSettings = {};
  templateDropsownSettings = {
    singleSelection: true,
    idField: 'DisplayTemplateTitle',
    textField: 'DisplayTemplateTitle',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };
  fillingData: any = {};
  fillingResponse: any;
  selectedFillingType: string;
  ClientId: string;
  ApplicantId: string;
  TeamMembers = [];
  teamMemberPopup: any;
  successPopupModel: any;
  fillingTypePoppup: any;
  tittle: string;
  confirmData: any;
  clientsSponsors = [];
  indivualApplicantId = '';
  isAuthorize = true;
  loadSubAdminPermissions: any = {};
  isSubAdminAcess = true;
  fillingBuildForm: FormGroup;
  isTemplateDisabled = false;
  emitGetUITemplateResults: Subscription;
  constructor(
    private modalService: NgbModal,
    private Valid: ValidationService,
    private fb: FormBuilder,
    private adminService: AdminService,
    private route: Router,
    private spinner: NgxSpinnerService,
    private clientService: AdminClientService,
    private permissionService: AdminpermissionService,
    private toaster: ToastrService,
    public commonService: CommonService
  ) {
    this.emitGetUITemplateResults = this.commonService.emitGetUITemplateResults.subscribe((res) => {
      if (!commonService.checkNullorUndefined(res)) {
        this.templateList = res['Templates'];
      }
    });
  }

  ngOnInit() {
    this.GetSponserShipTypes();
    this.loadTeamMembersList();
    this.GetFillingTypes();
    this.adminClientsList();
    this.fillingFormBuild();
    this.isSubAdminAcess = this.permissionService.isSubAdminGetAcess();
    this.isAuthorize = this.permissionService.isGetAcess();
    this.loadSubAdminPermissions = this.permissionService.GenericPermissions();
  }
  fillingFormBuild() {
    this.fillingBuildForm = this.fb.group({
      fillingType: this.Valid.TeamInvite.role,
    });
  }

  //Get Fillings
  GetFillingTypes() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService.GetFilings().subscribe(
      (res: any[]) => {
        this.spinner.hide();
        this.fillingTypes = res;
        if (this.fillingTypes.length == 1) {
          this.commonService.getFilingTemplates(
            this.fillingTypes[0].FilingName,
            sessionStorage.getItem('LoguserId'),
            sessionStorage.getItem('OrganisationID')
          );
        }
      },
      (err) => {
        this.spinner.hide();
        this.toaster.error('error occured');
      }
    );
  }

  // choose filling
  selectFillingType(event: any) {
    this.selectedFilling = event.target.value;
    this.selectedFillingType = event.target.options[event.target.selectedIndex].text;
    this.isSponsorshipTypesDisabled = false;
    this.isClearDisabled = false;
    this.commonService.getFilingTemplates(
      this.selectedFillingType,
      sessionStorage.getItem('LoguserId'),
      sessionStorage.getItem('OrganisationID')
    );
  }

  selectTemplateType(event) {
    this.selectedTemplate = event.target.value;
  }

  onTemplateSelect(templateList) {
    if (templateList.length == 0) {
      this.isCreatedFillingDisabled = true;
    }
  }

  //get Sponsortypes radio buttons
  GetSponserShipTypes() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService.GetSponserShipTypes().subscribe(
      (res: any[]) => {
        this.spinner.hide();
        this.sponserShipTypes = res;
      },
      (err) => {
        this.spinner.hide();
        this.toaster.error('error occured');
      }
    );
  }

  //onSponsortype radio button chnage
  onSponsorTypeChange(sponsor: any) {
    //this.selectedSponsor = Object.assign({}, this.selectedSponsor, sponsor);
    this.isSponsorDisabled = false;
    this.sponsorSection = true;
    this.applicantSection = false;
    this.clientChoiceSection = false;
    this.selectedClient = '';
    this.applicantTypeCheck = false;
    this.selectedApplicant = '';
    this.selectedTeamMembers = [];
    this.isTeamMemberDisabled = true;
    this.isCreatedFillingDisabled = true;
    if (this.sponsorType == '3') {
      this.clientChoiceSection = false;
      this.applicantSection = true;
      this.isApplicantDisabled = false;
      this.sponsorSection = false;
    } else if (this.sponsorType == '2') {
      this.tittle = 'Invite New Individual Sponser';
      this.clientsSponsors = this.adminClientsListData.filter((c) => c.SetType == 3);
    } else if (this.sponsorType == '1') {
      this.tittle = 'Invite New Individual Client';
      this.clientsSponsors = this.adminClientsListData.filter((c) => c.SetType == 1);
    }
  }

  //AdminClient/Applicants/Sponsors list
  adminClientsList() {
    this.spinner.show();
    this.clientService.adminClientsList(sessionStorage.getItem('OrganisationID')).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.adminClientsListData = data.filter((c) => c.Status == true);
        this.applicantSponsorsList();
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  //Applicant List
  applicantSponsorsList() {
    this.applicants = this.adminClientsListData.filter((a) => a.SetType == 2);
    this.clientsSponsors = this.adminClientsListData.filter((c) => c.SetType != 2);
  }

  //client/Applicant/Sponsor select
  sponsorOnSelect(event: TypeaheadMatch): void {
    this.selectedSponsor = event.item;
    this.isSponsorDisabled = true;
    let client = this.adminClientsListData.find((c) => c.Email == event);
    if (client != undefined) {
      this.ClientId = client.ClientId;
    }
    if (this.sponsorType == '1') {
      this.clientChoiceSection = true;
      this.applicantSection = true;
      this.isApplicantDisabled = false;
    } else if (this.sponsorType == '2') {
      this.clientChoiceSection = false;
      this.applicantSection = true;
      this.isApplicantDisabled = false;
    } else if (this.sponsorType == '3') {
      this.clientChoiceSection = false;
      this.applicantSection = false;
      this.isApplicantDisabled = true;
      this.isTeamMemberDisabled = false;
    }
  }

  //checkbox applicant Type checking client can invite or not
  applicantTypeChecking() {
    if (this.applicantTypeCheck == true) {
      this.applicantSection = false;
      this.isTeamMemberDisabled = false;
      this.selectedApplicant = '';
    } else {
      this.applicantSection = true;
      this.isApplicantDisabled = false;
      this.selectedTeamMembers = '';

      this.isTeamMemberDisabled = true;
    }
  }

  //applicant selection
  applicantOnSelect(event: TypeaheadMatch): void {
    this.isTeamMemberDisabled = false;
    this.isApplicantDisabled = true;
    let applicant = this.applicants.find((a) => a.Email == event);
    if (applicant != undefined) {
      this.ApplicantId = applicant.LawOfficeClientID;
      this.indivualApplicantId = applicant.ClientId;
    }
  }

  // load team members
  loadTeamMembersList() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService.OrgTeamMembersList(sessionStorage.getItem('OrganisationID'), this.token).subscribe(
      (res: any[]) => {
        this.spinner.hide();
        if (res == null || res.length == 0) {
        } else {
          this.teamMembersList = res.filter(
            (item) =>
              item.TeamMemberStatus != 4 &&
              item.Status == true &&
              item.UserName != sessionStorage.getItem('AdminUserName')
          );
        }
        // this.teamMembersList = res;
        this.teamMembersDropsownSettings = {
          singleSelection: false,
          idField: 'AdminID',
          textField: 'Email',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
        };
      },
      (err) => {
        this.toaster.error('error occured');
      }
    );
  }

  //team member selection
  onTeamMemberSelect(teamMemberList: any) {
    if (teamMemberList.length == 0) {
      this.isCreatedFillingDisabled = true;
      return;
    }
    this.isCreatedFillingDisabled = false;
  }
  onTeamMemberSelectAll(items: any) {
    this.isTeamMemberDisabled = false;
    this.isCreatedFillingDisabled = false;
  }
  onTeamMemberClose() {
    if (this.selectedTeamMembers.length > 0) {
      this.isTeamMemberDisabled = true;
      this.isCreatedFillingDisabled = false;
    }
  }
  //create filling
  CreateFilling() {
    if (!this.selectedTemplate) {
      this.toaster.error('Please select template before creating filing');
      return;
    }
    this.fillingData.Templates = this.templateList.filter((res) => res.DisplayTemplateTitle == this.selectedTemplate);
    this.spinner.show();
    //this.fillingData.Templates = this.selectedTeamplate;
    let OrgId = sessionStorage.getItem('OrganisationID');
    this.fillingData.FilingType = this.selectedFillingType;
    this.fillingData.SponserShipType = this.sponsorType;
    this.fillingData.ClientId = this.ClientId;
    this.selectedTeamMembers.forEach((element) => {
      this.TeamMembers.push(element.AdminID);
    });
    let TeamMembers = this.TeamMembers.toString();
    this.fillingData.TeamMembersId = TeamMembers;
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    if (this.sponsorType == '1' && this.applicantTypeCheck == true) {
      this.fillingData.LetClientInviteApplicant = this.applicantTypeCheck;
      this.adminService.AddFilingWithOrganisationalSponserShip(OrgId, this.fillingData, this.token).subscribe(
        (data: any) => {
          this.spinner.hide();
          this.fillingResponse = data;
          if (this.fillingResponse.Status == 1) {
            this.route.navigate(['/admin/fillings']);
            this.Clear();
          } else if (this.fillingResponse.Status == 0) {
            this.toaster.error('Failed To Create Filling, Filling Name Already Exist ');
          }
        },
        (error) => {
          this.spinner.hide();
        }
      );
    } else if (this.sponsorType == '1' && this.applicantTypeCheck == false) {
      this.fillingData.LawOfficeClientIDForApplicant = this.ApplicantId;
      this.adminService.AddFilingWithOrganisationalSponserShip(OrgId, this.fillingData, this.token).subscribe(
        (data: any) => {
          this.spinner.hide();
          this.fillingResponse = data;
          if (this.fillingResponse.Status == 1) {
            this.route.navigate(['/admin/fillings']);
            this.Clear();
          } else if (this.fillingResponse.Status == 0) {
            this.toaster.error('Failed To Create Filling, Filling Name Already Exist ');
          }
        },
        (error) => {
          this.spinner.hide();
        }
      );
    } else if (this.sponsorType == '2') {
      this.fillingData.LawOfficeClientIDForApplicant = this.ApplicantId;
      this.adminService
        .AddFilingWithGuardianOrOtherIndividualSponsership(OrgId, this.fillingData, this.token)
        .subscribe(
          (data: any) => {
            this.spinner.hide();
            this.fillingResponse = data;
            if (this.fillingResponse.Status == 1) {
              this.route.navigate(['/admin/fillings']);
              this.Clear();
            } else if (this.fillingResponse.Status == 0) {
              this.toaster.error('Failed To Create Filling, Filling Name Already Exist ');
            }
          },
          (error) => {
            this.spinner.hide();
          }
        );
    } else if (this.sponsorType == '3') {
      this.fillingData.ClientId = this.indivualApplicantId;
      this.adminService.AddFilingWithApplicantAsSponserShip(OrgId, this.fillingData, this.token).subscribe(
        (data: any) => {
          this.spinner.hide();
          this.fillingResponse = data;
          if (this.fillingResponse.Status == 1) {
            this.route.navigate(['/admin/fillings']);
            this.Clear();
          } else if (this.fillingResponse.Status == 0) {
            this.toaster.error('Failed To Create Filling, Filling Name Already Exist ');
          }
        },
        (error) => {
          this.spinner.hide();
        }
      );
    } else {
      this.spinner.hide();
    }
  }

  //Clear
  Clear() {
    this.selectedFilling = '';
    this.sponsorType = '';
    this.isCreatedFillingDisabled = true;
    this.sponsorSection = false;
    this.isSponsorDisabled = true;
    this.isApplicantDisabled = true;
    this.isSponsorshipTypesDisabled = true;
    this.isTeamMemberDisabled = true;
    this.isClearDisabled = true;
    this.applicantSection = false;
    this.clientChoiceSection = false;
    this.selectedClient = '';
    this.applicantTypeCheck = false;
    this.selectedApplicant = '';
    this.selectedTeamMembers = [];
  }

  sponsorInvite(data: any) {
    this.sponsorPopup = this.modalService.open(data, { centered: true, keyboard: false, backdrop: 'static' });
  }
  closeSponsorInvite(value) {
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
    if (this.successPopupModel != undefined) {
      this.successPopupModel.close(value);
      this.closeSponsorInvite(value);
      this.closeApplicantInvite(value);
      this.closeTeamInvite(value);
    }
  }
  requestForFillingPopUp(data: any) {
    this.fillingTypePoppup = this.modalService.open(data, { centered: true, keyboard: false, backdrop: 'static' });
  }
  closerequestForFilling(value) {
    if (this.fillingTypePoppup != undefined) {
      this.fillingTypePoppup.close(value);
    }
    this.fillingBuildForm.reset();
  }

  requestForFilling() {
    this.spinner.show();
    let data: any = {};
    data.message = this.fillingBuildForm.value.fillingType;
    this.adminService.requestfiling(data).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.Status == 1) {
          this.toaster.success(res.Message);
        }
        this.fillingBuildForm.reset();
        this.closerequestForFilling('close click');
      },
      (err) => {
        this.spinner.hide();
        this.toaster.error('error occured');
      }
    );
  }

  ngOnDestroy() {
    this.emitGetUITemplateResults.unsubscribe();
    this.commonService.clearCommonEmitters();
    this.commonService.closeModel('close click');
  }
}
