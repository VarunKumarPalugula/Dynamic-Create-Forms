import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AdminSignin } from '@app/models/law-office-admin/AdminSignin';
import { AdminService } from '@app/law-office-admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApicallsService } from '@app/shared/service/apicalls.service';
import { StorageService } from '@app/shared/service/storage.service';
import { CommonService } from '@app/shared/service/common.service';
import { ValidationService } from '@app/shared/service/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PasswordValidator } from '@app/shared/helpers/PasswordValidator';
import { ToastrService } from 'ngx-toastr';
import { PlatformLocation } from '@angular/common';
import { HostListener } from '@angular/core';
import { AutotimeoutService } from '@app/shared/service/autotimeout.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  @ViewChild('popTemplate')
  template: TemplateRef<any>;
  // form group declarartion
  loginForm: FormGroup;
  passwordFormGroup: FormGroup;
  // Modal popup
  title = 'Change Password';
  modalRef: BsModalRef;
  closeBtnName: string;
  model: any = {};
  // variable declarations
  passwordCheckbox: boolean;
  passwordmessage: string;
  dataarray: any = {};
  dataarray1: any = {};
  public Error: string;
  public token: string;
  public Message: string;
  statusMessage: string;
  admin: AdminSignin = new AdminSignin();
  organisationlist: any = [];
  fieldTextType: boolean = true;
  constructor(
    private adminservice: AdminService,
    private spinner: NgxSpinnerService,
    private route: Router,
    private commonservice: CommonService,
    private fb: FormBuilder,
    private Valid: ValidationService,
    private store: StorageService,
    private global: ApicallsService,
    private _activatedRoute: ActivatedRoute,
    private toaster: ToastrService,
    private modalService: BsModalService,
    private location: PlatformLocation,
    private autoTimeService: AutotimeoutService
  ) {}



  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.route.navigateByUrl('/signin');
  }

  ngOnInit() {
    this.buildForm();
    this.buildTemplateForm();
  }
  // close the modal
  hideModal() {
    this.modalRef.hide();
    if (sessionStorage.getItem('TempPasswordEnabled') !== 'false') {
      // this.route.navigate(['/accespanel']);
      this.getAdminOrganisationAccessPaneldata();
    }
  }

  showsuccess() {
    this.toaster.success('Success', 'Toaster Implemented');
  }

  buildForm() {
    this.loginForm = this.fb.group({
      Email: this.Valid.validateform.UserNameorEmail,
      Password: this.Valid.validateform.PasswordSignin,
    });
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
  openModal() {
    this.modalRef = this.modalService.show(this.template, { backdrop: 'static', keyboard: false, class: 'modal-md' });
  }
  login() {
    this.spinner.show();
    this.adminservice.Login(this.admin).subscribe(
      (res) => {
        this.dataarray = res;
        if (this.dataarray.access_token != null) {
          this.store.StoreAdminData(this.dataarray);
          if (sessionStorage.getItem('A_AccessToken') != null) {
            this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
            // tslint:disable-next-line:no-sh adowed-variable
            this.adminservice.GetAdminClaimsData(this.token).subscribe(
              (res) => {
                this.spinner.hide();
                this.dataarray1 = res;
                this.store.StotringAdminUserClaims(this.dataarray1);
                if (sessionStorage.getItem('EmailVerificationStatus') !== 'True') {
                  this.commonservice.emailMessage(sessionStorage.getItem('Email'));
                  sessionStorage.setItem('tempEmailRole', '0');
                  this.route.navigate(['/emailverify']);
                } else if (sessionStorage.getItem('AdminUserName') !== null) {
                  if (sessionStorage.getItem('TempPasswordEnabled') !== 'False') {
                    this.openModal();
                  } else if (sessionStorage.getItem('TempPasswordEnabled') === 'False') {
                    // this.route.navigate(['/accespanel']);
                    this.getAdminOrganisationAccessPaneldata();
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

  setActualPassword() {
    this.spinner.show();
    const obj = {
      Password: this.model.password,
    };
    this.adminservice.setActualPassword(obj, this.token).subscribe(
      (res) => {
        this.spinner.hide();
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

  getAdminOrganisationAccessPaneldata() {
    this.spinner.show();
    this.adminservice.getAdminOrganisationAccessPaneldata(this.token).subscribe(
      (res: any) => {
        if (res.length) {
          this.autoTimeService.autoTimeOut();
          this.organisationlist = res;
          this.commonservice.getAllCountries();
          this.commonservice.getCountryStates();
          this.toaster.success('Sucessfully logged in');
          if (this.organisationlist.length > 1) {
            this.commonservice.organisationlist = this.organisationlist;
            this.route.navigate(['accespanel']);
          } else if (this.organisationlist.length === 1) {
            const orglist = this.organisationlist[0];
            sessionStorage.setItem('OrganisationID', orglist.OrgID);
            sessionStorage.setItem('OrganisationName', orglist.OrganisationName);
            sessionStorage.setItem('TeamMemberStatus', orglist.TeamMemberStatus);
            sessionStorage.setItem('TeamMemberId', orglist.TeamMemberId);
            sessionStorage.setItem('IsOwner', orglist.IsOwner);
            this.GetRoleAndPermissionsOfAdmin(orglist.OrgID);
          } else {
            this.toaster.error('no data found', 'Error');
          }
        } else {
          this.spinner.hide();
          sessionStorage.clear();
          this.statusMessage = 'Problem with the service. Please try again after sometime';
          this.toaster.error(this.statusMessage);
        }
      },
      (err) => {
        this.spinner.hide();
        sessionStorage.clear();
        this.statusMessage = 'Problem with the service. Please try again after sometime';
        this.toaster.error(this.statusMessage);
      }
    );
  }
  GetRoleAndPermissionsOfAdmin(OrgID) {
    this.adminservice.GetRoleAndPermissionsOfAdmin(this.token, OrgID).subscribe(
      (res) => {
        this.spinner.hide();
        if (res) {
          sessionStorage.setItem('permissions', JSON.stringify(res));
          this.route.navigate(['admin/fillings']);
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
