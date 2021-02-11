import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { AdminService } from '@app/law-office-admin/admin.service';
import { CommonService } from '@app/shared/service/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidationService } from '@app/shared/service/validation.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientService } from '@app/law-office-client/law-office-client.service';
import { AplicantService } from '@app/lawoffice-applicant/aplicant.service';
import { clientSignupEnum } from '@app/enums/client-signup.config.enum';
@Component({
  selector: 'client-applicant-sponsor-signup',
  templateUrl: './client-applicant-sponsor-signup.component.html',
  styleUrls: ['./client-applicant-sponsor-signup.component.scss'],
})
export class ClientApplicantSponsorSignupComponent implements OnInit {
  signupform: FormGroup;
  client: any = {};
  @Input()
  Role: string;
  selectedRole: string;
  Roles: any = [];
  Tittle: string;
  configClientSetup = true;
  OrgName: string;
  Email: string;
  emailDisabled = false;
  roleType: any;
  fieldTextType: boolean = true;

  constructor(
    private clientService: ClientService,
    private commonservice: CommonService,
    private route: Router,
    private fb: FormBuilder,
    private Valid: ValidationService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private _activatedRoute: ActivatedRoute,
    private appliantService: AplicantService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.buildForm();
    this.loadUserTypes();
  }

  //load user type from backend
  loadUserTypes() {
    this.spinner.show();
    this.commonservice.GetClientRoles().subscribe(
      (res) => {
        this.spinner.hide();
        this.Roles = res;
        this.loadClientData();
      },
      (error) => {
        this.spinner.hide();
        this.toaster.error('Error occered');
      }
    );
  }
  //loading url data
  loadClientData() {
    this.client.EnTypeAdminOrg = this._activatedRoute.snapshot.queryParams['PortOrgId'];
    this.OrgName = this._activatedRoute.snapshot.queryParams['OrgName'];
    this.client.ClientNomeclaturedgeneratedInvite = this._activatedRoute.snapshot.queryParams['PortInvitedId'];
    this.client.Email = this._activatedRoute.snapshot.queryParams['Email'];
    this.Email = this.client.Email;
    this.client.SetType = this._activatedRoute.snapshot.queryParams['SetType'];
    this.roleType = this.client.SetType;
    this.client.FirstName = this._activatedRoute.snapshot.queryParams['FullName'];
    //checking email exist or not in db
    if (this.Email !== '' && this.Email !== undefined) {
      this.CheckEmailExistency(this.Email);
    } else {
      this.configRole();
      this.configValidator();
    }
  }

  //checking email existing
  CheckEmailExistency(organisationEmail: string, inputControl?: ElementRef) {
    if (organisationEmail !== '' && organisationEmail !== undefined) {
      this.spinner.show();
      this.clientService.CheckEmailExistency(organisationEmail).subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.Status === 1) {
            if (this.Email != '' && this.roleType != undefined) {
              this.ClientJoiningAsPerUserExistency();
            } else {
              if (inputControl) {
                this.commonservice.applyRequired(true, inputControl['id']);
              }
              this.toaster.error(organisationEmail, 'already exist');
            }
          } else if (res.Status === 0) {
            if (inputControl) {
              this.commonservice.applyRequired(false, inputControl['id']);
            }
            if (this.Email != '' && this.roleType != undefined) {
              //checking type of user
              this.emailDisabled = true;
              if (this.roleType != 0 && this.OrgName != '') {
                this.configuartionInvities();
                this.configValidatorInvities();
              } else if (this.roleType == 0 && this.OrgName != '') {
                this.OrgName = 'For ' + this.OrgName;
              }
            }
            if (this.signupform.valid) {
              this.Register();
            }
          }
        },
        (error) => {
          this.spinner.hide();
          this.toaster.error('Failed to Check');
        }
      );
    }
  }

  //checking user already register or not if there there connection will establish
  ClientJoiningAsPerUserExistency() {
    const obj = {
      EnTypeAdminOrg: this.client.EnTypeAdminOrg,
      ClientNomInvitationId: this.client.ClientNomeclaturedgeneratedInvite,
    };
    this.adminService.ClientJoiningAsPerUserExistency(obj).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.route.navigate(['client/signin']);
        if (res.Status == 1) {
        } else if (res.Status == 0) {
          this.toaster.error('Client Verifcation Already Completed Please login');
        }
      },
      (error) => {
        this.spinner.hide();
        this.toaster.error('Failed to Check');
      }
    );
  }

  //configuring the roles
  configRole() {
    if (this.Role != undefined && this.Role !== null) {
      if (this.Role === clientSignupEnum.CLIENTROLE) {
        this.selectedRole = this.Roles[0].ClientRoleId;
        this.Tittle = clientSignupEnum.CLIENTTITTLE;
      } else if (this.Role === clientSignupEnum.APPLICANTROLE) {
        this.selectedRole = this.Roles[1].ClientRoleId;
        this.configClientSetup = false;
        this.Tittle = clientSignupEnum.APPLICANTTITTLE;
      }
    }
  }

  //configuration for invited users
  configuartionInvities() {
    if (this.roleType != undefined && this.roleType != null) {
      if (this.roleType === clientSignupEnum.CLIENTROLETYPE) {
        this.selectedRole = this.Roles[0].ClientRoleId;
        this.Tittle = clientSignupEnum.CLIENTTITTLE;
      } else if (this.roleType === clientSignupEnum.APPLICANTROLETYPE) {
        this.selectedRole = this.Roles[1].ClientRoleId;
        this.configClientSetup = false;
        this.Tittle = clientSignupEnum.APPLICANTTITTLE;
      } else if (this.roleType === clientSignupEnum.SPONSORTYPE) {
        this.selectedRole = this.Roles[2].ClientRoleId;
        this.configClientSetup = false;
        this.Tittle = clientSignupEnum.SPONSORTITTLE;
      }
    }
  }

  //config validation based on role
  configValidator() {
    if (this.Role == clientSignupEnum.APPLICANTROLE || this.Role == clientSignupEnum.CLIENTROLE) {
      const orgFormControl = this.signupform.get('OrganisationName');
      const selectedroleControl = this.signupform.get('selectedRole');
      if (this.Role === clientSignupEnum.APPLICANTROLE) {
        orgFormControl.clearValidators();
      }
      selectedroleControl.clearValidators();
      selectedroleControl.updateValueAndValidity();
      orgFormControl.updateValueAndValidity();
    }
  }

  //validations for invited users
  configValidatorInvities() {
    if (this.roleType != undefined && this.roleType != null) {
      if (
        this.roleType == clientSignupEnum.CLIENTROLETYPE ||
        this.roleType == clientSignupEnum.APPLICANTROLETYPE ||
        this.roleType == clientSignupEnum.SPONSORTYPE
      ) {
        const orgFormControl = this.signupform.get('OrganisationName');
        const selectedroleControl = this.signupform.get('selectedRole');
        if (this.roleType === clientSignupEnum.APPLICANTROLETYPE || this.roleType == clientSignupEnum.SPONSORTYPE) {
          orgFormControl.clearValidators();
        }
        selectedroleControl.clearValidators();
        selectedroleControl.updateValueAndValidity();
        orgFormControl.updateValueAndValidity();
      }
    }
  }

  //select dropdown option for usertype
  selectRole(event: any) {
    const val = event.target.value;
    this.roleType = val;
    this.client.SetType = val;
  }

  //signup
  Register() {
    if (this.Role != undefined && this.Role != '') {
      if (this.Role === clientSignupEnum.CLIENTROLE) {
        this.spinner.show();
        this.clientService.Register(this.client, this.commonservice.getEnvDetails()).subscribe(
          (res: any) => {
            this.spinner.hide();
            if (res.Status === 1) {
              this.commonservice.emailMessage(this.client.Email);
              sessionStorage.setItem('tempEmailRole', '1');
              this.route.navigate(['/emailverify']);
            } else {
              this.toaster.error(res.Message);
            }
          },
          (error) => {
            this.spinner.hide();
            this.toaster.error('Failed to register');
          }
        );
      } else if (this.Role == clientSignupEnum.APPLICANTROLE) {
        this.spinner.show();
        this.appliantService.Register(this.client, this.commonservice.getEnvDetails()).subscribe(
          (res: any) => {
            this.spinner.hide();
            if (res.Status === 1) {
              this.commonservice.emailMessage(this.client.Email);
              sessionStorage.setItem('tempEmailRole', '1');
              this.route.navigate(['/emailverify']);
            } else {
              this.toaster.error(res.Message);
            }
          },
          (error) => {
            this.spinner.hide();
            this.toaster.error('failed to register');
          }
        );
      }
    } else if (this.roleType != undefined && this.roleType != '') {
      this.spinner.show();
      this.adminService.ClientSetUpByLawofficeOrgLink(this.client, this.commonservice.getEnvDetails()).subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.Status === 1) {
            this.commonservice.emailMessage(this.client.Email);
            sessionStorage.setItem('tempEmailRole', '1');
            this.route.navigate(['/emailverify']);
          } else {
            this.toaster.error(res.Message);
          }
        },
        (error) => {
          this.spinner.hide();
          this.toaster.error('failed to register');
        }
      );
    }
  }

  //on blur organisation checking
  checkClientOrganisationExistancy(organisationName: string, inputControl: any) {
    this.spinner.show();
    this.clientService.CheckClientOrganationExistency(organisationName).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.Status === 1) {
          this.commonservice.applyRequired(true, inputControl['id']);
          this.toaster.error('Organization name already exist');
        } else {
          if (this.signupform.valid) {
            this.Register();
          }
          this.commonservice.applyRequired(false, inputControl['id']);
        }
      },
      (error) => {
        this.spinner.hide();
        this.toaster.error('Failed to Check');
      }
    );
    // }
  }

  // show and hide password
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  // intialzing form
  buildForm() {
    this.signupform = this.fb.group({
      selectedRole: [],
      OrganisationName: this.Valid.validateform.OrganisationName,
      FirstName: this.Valid.validateform.FirstName,
      LastName: this.Valid.validateform.LastName,
      UserName: this.Valid.validateform.UserName,
      Mobile: this.Valid.validateform.MobileNumber,
      Email: this.Valid.validateform.Email,
      Password: this.Valid.validateform.Password,
      showpass: [],
    });
  }

  //signin link click
  signinAccount() {
    this.route.navigate(['client/signin']);
  }
}
