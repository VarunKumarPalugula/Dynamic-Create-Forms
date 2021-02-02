import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { AdminService } from '@app/law-office-admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApicallsService } from '@app/shared/service/apicalls.service';
import { StorageService } from '@app/shared/service/storage.service';
import { ValidationService } from '@app/shared/service/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientSignin } from '@app/models/law-office-client/ClientSignin';
import { CommonService } from '@app/shared/service/common.service';
import { ClientService } from '@app/law-office-client/law-office-client.service';
import { AutotimeoutService } from '@app/shared/service/autotimeout.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PasswordValidator } from '@app/shared/helpers/PasswordValidator';

@Component({
  selector: 'client-applicant-sponsor-signin',
  templateUrl: './client-applicant-sponsor-signin.component.html',
  styleUrls: ['./client-applicant-sponsor-signin.component.scss'],
})

export class ClientApplicantSponsorSigninComponent implements OnInit {

  @Input()  Role: string;
  
  loginForm: any;
  isLoading: false;
  Error: string;
  organisationlist: any;
  dataarray: any;
  dataarray1: any;
  fieldTextType: boolean = true;

  token: any;
  client: ClientSignin = new ClientSignin();
  @ViewChild('popTemplate')
  template: TemplateRef<any>;
  passwordFormGroup: FormGroup;
  modalRef: BsModalRef;
  model: any = {};

  constructor(
    private spinner: NgxSpinnerService,
    private clientService: ClientService,
    private store: StorageService,
    private commonservice: CommonService,
    private route: Router,
    private fb: FormBuilder,
    private Valid: ValidationService,
    private toaster: ToastrService,
    private autoTimeService: AutotimeoutService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.buildform();
    this.buildTemplateForm();
  }

  buildform() {
    this.loginForm = this.fb.group({
      Email: this.Valid.validateform.UserNameorEmail,
      Password: this.Valid.validateform.PasswordSignin,
    });
  }
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.route.navigateByUrl('/client/signin');
  }
  buildTemplateForm() {
    this.passwordFormGroup = this.fb.group(
      {
        password: this.Valid.validateform.Password,
        confirmPassword: this.Valid.validateform.Password,
      },
      {
        validator: PasswordValidator.validate.bind(this),
      }
    );
  }


  login() {
    sessionStorage.clear();
    this.spinner.show();
    this.clientService.Login(this.client).subscribe(
      (res) => {
        this.dataarray = res;
        if (this.dataarray.access_token != null) {
          this.store.StoreClientAdminData(this.dataarray);
          if (sessionStorage.getItem('C_AccessToken') != null) {
            this.token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
            this.clientService.GetClientClaimsData(this.token).subscribe(
              (res) => {
                this.dataarray1 = res;
                this.store.StotringClientAdminUserClaims(this.dataarray1);
                if (sessionStorage.getItem('EmailVerificationStatus') !== 'True') {
                  this.commonservice.emailMessage(sessionStorage.getItem('Email'));
                  sessionStorage.setItem('tempEmailRole', '0');
                  this.route.navigate(['/emailverify']);
                  this.spinner.hide();
                } else if (sessionStorage.getItem('ClientAdminUserName') !== null) {
                  if (sessionStorage.getItem('TempPasswordEnabled') !== 'False') {
                    this.openModal();
                    this.spinner.hide();
                  } else if (sessionStorage.getItem('TempPasswordEnabled') === 'False') {
                    this.autoTimeService.autoTimeOut();
                    this.getRole();
                  }
                }
              },
              (err) => {
                this.spinner.hide();
                sessionStorage.clear();
                this.toaster.error('Invalid Username Or Password');
              }
            );
          }
        } else {
          this.spinner.hide();
          sessionStorage.clear();
          this.toaster.error('Invalid Username Or Password');
        }
      },
      (err) => {
        this.spinner.hide();
        sessionStorage.clear();
        this.toaster.error('Invalid Username Or Password');
      }
    );
  }

  getRole() {
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    return this.clientService.getRoles(this.token).subscribe(
      (res: any) => {
        this.commonservice.getAllCountries();
        this.commonservice.getCountryStates();
        sessionStorage.setItem('role', res.Role);
        sessionStorage.setItem('roleId', res.RoleId);
        //inv app role id :1 // sposor :2 // role:7 business applicant
        if (res.RoleId == '1' || res.RoleId == '2' || res.RoleId == 7) {
          // this.route.navigate(['client/applayout/fillings']);
          this.IndividalBusineesApplicantAndSponsererDefaultPermissions(res.RoleId);
          //this.spinner.hide();
        } else {
          this.getAdminOrganisationAccessPaneldata();
        }
      },
      (error) => {}
    );
  }

  getAdminOrganisationAccessPaneldata() {
    this.spinner.show();
    this.clientService.getAdminOrganisationAccessPaneldata(this.token).subscribe(
      (res: any) => {
        if (res.length) {
          this.organisationlist = res;
          if (this.organisationlist.length > 1) {
            this.commonservice.organisationlist = this.organisationlist;
            this.route.navigate(['accespanel']);
            this.spinner.hide();
          } else if (this.organisationlist.length === 1) {
            const orglist = this.organisationlist[0];
            sessionStorage.setItem('ClientOrganisationID', orglist.OrgID);
            sessionStorage.setItem('OrganisationName', orglist.OrganisationName);
            sessionStorage.setItem('TeamMemberStatus', orglist.TeamMemberStatus);
            sessionStorage.setItem('TeamMemberId', orglist.TeamMemberId);
            sessionStorage.setItem('IsOwner', orglist.IsOwner);
            this.GetRoleAndPermissionsOfAdmin(orglist.OrgID);
          } else {
            this.toaster.error('no data found');
          }
        } else {
          this.spinner.hide();
          sessionStorage.clear();
          this.toaster.error('Problem with the service. Please try again after sometime');
        }
      },
      (err) => {
        this.spinner.hide();
        sessionStorage.clear();
        this.toaster.error('Problem with the service. Please try again after sometime');
      }
    );
  }

  createAccount() {
    if (this.Role == 'CLIENT') {
      const clientSignUpRoute = 'client/signup';
      this.route.navigate([clientSignUpRoute]);
    } else if (this.Role == 'APPLICANT') {
      const applicantSignUpRoute = 'applicant/signup';
      this.route.navigate([applicantSignUpRoute]);
    }
  }
  forgotPassword() {
    if (this.Role === 'CLIENT') {
      const clientForgotPasswordRoute = 'client/forgotpassword';
      this.route.navigate([clientForgotPasswordRoute]);
    } else if (this.Role === 'APPLICANT') {
      const applicantForgotPasswordRoute = 'applicant/forgotpassword';
      this.route.navigate([applicantForgotPasswordRoute]);
    }
  }

  GetRoleAndPermissionsOfAdmin(OrgID) {
    this.clientService.GetRoleAndPermissionsOfClient(this.token, OrgID).subscribe(
      (res) => {
        this.spinner.hide();
        if (res) {
          sessionStorage.setItem('clientpermissions', JSON.stringify(res));
          this.route.navigate(['client/applayout/fillings']);
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  IndividalBusineesApplicantAndSponsererDefaultPermissions(RoleId) {
    this.clientService.IndividalBusineesApplicantAndSponsererDefaultPermissions(this.token, RoleId).subscribe(
      (res) => {
        this.spinner.hide();
        if (res) {
          sessionStorage.setItem('clientpermissions', JSON.stringify(res));
          this.route.navigate(['client/applayout/fillings']);
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  openModal() {
    this.modalRef = this.modalService.show(this.template, { backdrop: 'static', keyboard: false, class: 'modal-md' });
  }
  setActualPassword() {
    this.spinner.show();
    const obj = {
      Password: this.model.password,
    };
    this.clientService.setActualPassword(obj, this.token).subscribe(
      (res) => {
        this.dataarray = res;
        if (this.dataarray.Status === 1) {
          this.hideModal();
        } else {
          this.spinner.hide();
          this.Error = this.dataarray.Message;
          this.toaster.error(this.Error, 'Error');
        }
      },
      (error) => {
        this.spinner.hide();
        this.Error = 'Failed to set password';
        this.toaster.error(this.Error, 'Error');
      }
    );
  }
  // close the modal
  hideModal() {
    this.modalRef.hide();
    if (sessionStorage.getItem('TempPasswordEnabled') !== 'false') {
      // if (sessionStorage.getItem('roleId') == '1' || sessionStorage.getItem('roleId') == '2' ||  sessionStorage.getItem('roleId') == '7') {
      //   this.IndividalBusineesApplicantAndSponsererDefaultPermissions(sessionStorage.getItem('roleId'));
      // } else {
      //   this.getAdminOrganisationAccessPaneldata();
      // }
      this.getRole();
    }
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
