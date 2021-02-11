import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '@app/law-office-admin/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FilingsService } from '../../filings.service';
import { RandomColor } from 'angular-randomcolor';
import { CommonService } from '@app/shared/service/common.service';

@Component({
  selector: 'app-casesubmissions',
  templateUrl: './casesubmissions.component.html',
  styleUrls: ['./casesubmissions.component.scss'],
})
export class CasesubmissionsComponent implements OnInit {
  addNewCaseSubModal: any;
  caseSubprivacyModel: any;
  delCaseSubModal: any;
  token: string = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
  orgId: any = sessionStorage.getItem('OrganisationID');
  filingId: any = sessionStorage.getItem('FillingId');
  filingTpe: string = 'H1';
  caseSubmissionForm: FormGroup;
  adminclientTeammembersList: any;
  clientclientTeammembersList: any;
  getCaseSubmissionsData = [];
  caseforms: any = [];
  deletedCaseSubmissionData: any;
  allClients = false;
  colors: any = [];
  Subcolors: any = [];
  allTeam: boolean = false;
  username: any = '';
  caseSubmissionsDataForPrivacy: any;
  members: any = [];
  selectedClientUserIds: any = [];
  caseActionTitle: string = 'Add New';
  constructor(
    private modalService: NgbModal,
    private route: Router,
    private filingService: FilingsService,
    private fb: FormBuilder,
    private adminService: AdminService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private commonService: CommonService
  ) {
    this.username = sessionStorage.getItem('AdminUserName');
  }

  ngOnInit(): void {
    this.getFilingAdminTeammembers();
    this.getFilingClientTeammembers();
    this.getSubmissionsData();
    this.addCaseSubmissionsFormValidation();
    this.username = sessionStorage.getItem('AdminUserName');
    this.getColor();
    for (var i = 0; i < 100; i++) {
      this.Subcolors.push(this.getsubColor());
    }
  }

  addCaseSubmissionsFormValidation() {
    this.caseSubmissionForm = this.fb.group({
      CaseId: [''],
      CaseTitle: ['', Validators.required],
      CaseDescription: ['', Validators.required],
      FilingType: [],
      FilingId: [],
      PrimaryAttorneyId: ['', Validators.required],
      CreatedById: [],
    });
  }
  // add new case submission
  addNewCaseSubmission(data: any) {
    // this.caseSubmissionForm.reset();
    this.addNewCaseSubModal = this.modalService.open(data, { centered: true, keyboard: false, backdrop: 'static' });
  }
  postCaseSubmission() {
    this.caseSubmissionForm.get('FilingType').patchValue('H1');
    this.caseSubmissionForm.get('FilingId').patchValue(sessionStorage.getItem('FillingId'));
    this.caseSubmissionForm.get('CreatedById').patchValue(sessionStorage.getItem('LoguserId'));

    if (!this.caseSubmissionForm.value.CaseId) {
      this.spinner.show();
      this.filingService.postCaseSubmissions(this.orgId, this.caseSubmissionForm.value).subscribe((res: any) => {
        this.spinner.hide();
        this.modalService.dismissAll();
        this.toaster.info(res['Message']);
        this.getSubmissionsData();
        this.caseSubmissionForm.reset();
        this.addCaseSubmissionsFormValidation();
      });
    } else {
      this.filingService
        .editIndividualCaseSubmission(this.orgId, this.caseSubmissionForm.value)
        .subscribe((res: any) => {
          this.modalService.dismissAll();
          this.toaster.info('Case submission updated successfully');
          this.getSubmissionsData();
          this.caseSubmissionForm.reset();
          this.addCaseSubmissionsFormValidation();
        });
    }
  }
  // get case submissionsData
  getSubmissionsData() {
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.filingTpe = 'H1';
    this.spinner.show();
    this.filingService
      .getCaseSubmissionsList(this.orgId, this.filingId, this.filingTpe, this.token)
      .subscribe((res: any) => {
        this.spinner.hide();
        if (res != null && res.length >= 0) {
          this.getCaseSubmissionsData = res;
        } else {
          this.getCaseSubmissionsData = [];
          this.toaster.info('Failed to load case submissions data');
        }
      });
  }
  // edit Single case
  editCaseSubmission(data: any, specificCaseData?) {
    this.caseActionTitle = 'Edit';
    this.caseSubmissionForm.patchValue(specificCaseData);
    this.addNewCaseSubModal = this.modalService.open(data, { centered: true, keyboard: false, backdrop: 'static' });
  }
  // get admin filing team memmbers
  getFilingAdminTeammembers() {
    let clientobj = {
      FilingId: sessionStorage.getItem('FillingId'),
      AdminOrgId: sessionStorage.getItem('OrganisationID'),
    };
    this.adminService.GetFilingAdminTeammembers(clientobj, this.token).subscribe(
      (res: any[]) => {
        if (res != null && res != undefined) {
          let clientTeammembersList = res;
          this.adminclientTeammembersList = clientTeammembersList.filter((s) => s.Status == true);
        }
      },
      (err) => {
        this.toaster.error('error occured');
      }
    );
  }
  getFilingClientTeammembers() {
    let teamobj = {
      FilingId: sessionStorage.getItem('FillingId'),
      AdminOrgId: sessionStorage.getItem('OrganisationID'),
    };
    this.adminService.GetFilingClientTeammembers(teamobj).subscribe(
      (res: any[]) => {
        this.spinner.hide();
        //console.log('client', res)
        if (res != null && res != undefined) {
          this.clientclientTeammembersList = res;
        }
      },
      (err) => {
        this.toaster.error('error occured');
      }
    );
  }
  caseSubPrivacy(data: any, caseSubmission: any) {
    if (
      !this.commonService.checkNullorUndefined(caseSubmission.CaseAccessClientMemberIds) &&
      caseSubmission.CaseAccessClientMemberIds
    ) {
      caseSubmission.CaseAccessClientMemberIds.forEach((element) => {
        let index = this.clientclientTeammembersList.findIndex((c) => c.LawOfficeClientID == element);
        if (index != -1) {
          this.clientclientTeammembersList[index].selected = true;
        }
      });
      if (caseSubmission.CaseAccessClientMemberIds.length == this.clientclientTeammembersList.length) {
        this.allClients = true;
      }
    }
    // if (!this.commonService.checkNullorUndefined(caseSubmission.CaseAccesAdminMemeberIds) && caseSubmission.CaseAccesAdminMemeberIds.length) {
    //   caseSubmission.CaseAccesAdminMemeberIds.forEach(element => {
    //     let index = this.adminclientTeammembersList.findIndex(c => c.AdminID == element);
    //     if (index != -1) {
    //       this.adminclientTeammembersList[index].selected = true;
    //     }
    //   });
    //   if (caseSubmission.CaseAccesAdminMemeberIds.length == this.adminclientTeammembersList.length) {
    //     this.allTeam = true;
    //   }
    // }
    this.caseSubmissionsDataForPrivacy = caseSubmission;
    this.caseSubprivacyModel = this.modalService.open(data, { size: 'lg' });
  }

  caseSubmissionsPrivacy(caseId: any) {
    this.members = [];
    this.clientclientTeammembersList.forEach((element, index) => {
      if (this.clientclientTeammembersList[index].selected == true) {
        this.selectedClientMembers(index, caseId);
      }
    });

    this.adminclientTeammembersList.forEach((element, index) => {
      if (this.adminclientTeammembersList[index].selected == true) {
        this.selectedTeamMembers(index, caseId);
      }
    });
    setTimeout(() => {
      this.modalService.dismissAll();
    }, 2000);
    this.spinner.show();
    this.filingService.caseSubmissionPrivacy(this.members).subscribe((res: any) => {
      this.modalService.dismissAll();
      this.spinner.hide();
      this.toaster.info('Permission given successfully selected members');
    });
  }
  closeCSPrivacyModal(value: string) {
    this.caseSubprivacyModel.close(value);
  }
  viewCaseSubmissionDetails() {
    this.route.navigate(['casesubmissions/']);
  }
  closeConfirmDelete(value: string) {
    this.addNewCaseSubModal.close(value);
    this.caseSubmissionForm.reset();
  }
  delCaseSubmission(data: any, caseId: any, caseSubmissions?) {
    this.spinner.show();
    this.deletedCaseSubmissionData = caseSubmissions;
    this.caseforms = [];
    var tokenid = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.filingService.GetCaseForms(this.orgId, this.filingId, caseId, tokenid, 'H1').subscribe(
      (res) => {
        this.spinner.hide();
        if (res == null) {
          this.caseforms = [];
        } else {
          this.caseforms = JSON.parse(JSON.stringify(res));
          // console.log('forms', this.caseforms.length);
        }
      },
      (err) => {
        // console.log(JSON.stringify(err));
        this.spinner.hide();
      }
    );
    this.delCaseSubModal = this.modalService.open(data, { centered: true, keyboard: false, backdrop: 'static' });
  }
  closeConfirmArchive(value: string) {
    this.delCaseSubModal.close(value);
  }
  deleteCaseSubmission() {
    this.filingService.deleteCaseSubmission(this.orgId, this.deletedCaseSubmissionData).subscribe((res: any) => {
      this.modalService.dismissAll();
      this.toaster.info('Case submission deleted successfully');
      this.getSubmissionsData();
    });
  }
  toggler(ev: any, id: any) {
    document.getElementById(id).classList.toggle('d-n');
  }
  selectAllClientMembers(event: any, userType: number) {
    if (event.target.checked === true) {
      this.clientclientTeammembersList.forEach((element, index) => {
        this.clientclientTeammembersList[index].selected = true;
      });
    } else {
      this.clientclientTeammembersList.forEach((element, index) => {
        this.clientclientTeammembersList[index].selected = false;
      });
    }
  }
  selectClientMembers(event: any, index: any) {
    if (event.target.checked === true) {
      this.clientclientTeammembersList[index].selected = true;
    } else {
      this.clientclientTeammembersList[index].selected = false;
    }
    const selectedClient = this.clientclientTeammembersList.filter((i) => i.selected == true);
    if (selectedClient.length == this.clientclientTeammembersList.length) {
      this.allClients = true;
    } else {
      this.allClients = false;
    }
  }

  selectAllTeamMembers(event: any, userType: number) {
    if (event.target.checked === true) {
      this.adminclientTeammembersList.forEach((element, index) => {
        this.adminclientTeammembersList[index].selected = true;
        console.log((this.adminclientTeammembersList[index].selected = true));
      });
    } else {
      this.adminclientTeammembersList.forEach((element, index) => {
        this.adminclientTeammembersList[index].selected = false;
      });
    }
  }

  selectTeamMembers(event: any, index: any) {
    if (event.target.checked === true) {
      this.adminclientTeammembersList[index].selected = true;
    } else {
      this.adminclientTeammembersList[index].selected = false;
    }
    const selectedTeamList = this.adminclientTeammembersList.filter((i) => i.selected == true);
    this.adminclientTeammembersList = this.adminclientTeammembersList.filter((j) => j.TeamMemId != 0);
    if (selectedTeamList.length == this.adminclientTeammembersList.length) {
      this.allTeam = true;
    } else {
      this.allTeam = false;
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

  private selectedTeamMembers(index: any, caseId) {
    this.members.push({
      CaseId: caseId,
      FilingType: 'H1',
      FilingId: this.filingId,
      ViewerId: this.adminclientTeammembersList[index].AdminID,
      UserType: '1',
      CanViewCaseDetails: true,
      OrganisationID: this.orgId,
    });
  }
  private selectedClientMembers(index: any, caseId) {
    this.members.push({
      CaseId: caseId,
      FilingType: 'H1',
      FilingId: this.filingId,
      ViewerId: this.clientclientTeammembersList[index].LawOfficeClientID,
      UserType: '2',
      CanViewCaseDetails: true,
      OrganisationID: this.orgId,
    });
  }
}
