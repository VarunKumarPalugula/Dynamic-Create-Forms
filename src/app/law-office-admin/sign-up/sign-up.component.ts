import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Input } from '@angular/core';
import { AdminService } from '@app/law-office-admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from '@app/shared/service/common.service';
import { ValidationService } from '@app/shared/service/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  @ViewChild('nameInput')
  nameInput: ElementRef;
  @ViewChild('orgNameInput')
  orgNameInput: ElementRef;
  @ViewChild('passwordInput')
  passwordInput: ElementRef;
  @ViewChild('mobileInput')
  mobileInput: ElementRef;

  @Input()
  OrgName: string;
  @Input()
  admin: any = {};
  @Input()
  emailDisabled = false;
  @Input()
  orgDisabled = false;

  isValidFullName: boolean;
  signupform: FormGroup;
  Error: string = '';
  Status: string = '';
  isWhiteSpace: boolean;
  fieldTextType: boolean = true;
  isValidLastname: boolean;

  constructor(
    private adminservice: AdminService,
    private commonservice: CommonService,
    private route: Router,
    private fb: FormBuilder,
    private Valid: ValidationService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.buildForm();
    console.log(this.admin.LastName);
    console.log(this.admin.FirstName)
  }

  // intialzing form
  buildForm() {
    this.signupform = this.fb.group({
      OrganisationName: this.Valid.validateform.OrganisationName,
      FirstName: this.Valid.validateform.FirstName,
      LastName: this.Valid.validateform.LastName,
      UserName: this.Valid.validateform.UserName,
      Mobile: this.Valid.validateform.MobileNumber,
      Email: this.Valid.validateform.Email,
      Password: this.Valid.validateform.Password,
    });
  }
  //checkAdminOrganisation
  checkAdminOrganisation(organisationName: string, inputControl: ElementRef) {
    if (organisationName !== '' && organisationName !== undefined) {
      this.spinner.show();
      this.adminservice.checkAdminOrganisation(organisationName).subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.Status === 1) {
            this.toaster.error('Organization Name Already Exists');
            this.commonservice.applyRequired(true, inputControl['id']);
          } else {
            this.Register();
            this.nameInput.nativeElement.focus();
            this.commonservice.applyRequired(false, inputControl['id']);
          }
        },
        (error) => {
          this.spinner.hide();
          this.Error = 'Failed to Check';
        }
      );
    }
  }
  // checkAdminOrganisationEmailExistency
  checkAdminOrganisationEmailExistency(username: string, inputControl: ElementRef) {
    if (username !== '') {
      this.spinner.show();
      this.adminservice.checkAdminOrganisationEmailExistency(username).subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.Status === 1) {
            this.toaster.error('Email Already Exists');
            this.commonservice.applyRequired(true, inputControl['id']);
          } else {
            this.Register();
            this.passwordInput.nativeElement.focus();
            this.commonservice.applyRequired(false, inputControl['id']);
          }
        },
        (error) => {
          this.spinner.hide();
          this.Error = 'Failed to Check';
        }
      );
    }
  }

  // checkAdminOrganisationEmailExistency
  checkAdminUsernameExistency(username: string, inputControl: ElementRef) {
    if (username !== '') {
      this.spinner.show();
      this.adminservice.checkAdminUsernameExistency(username).subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.Status === 1) {
            this.toaster.error('Username Already Exists');
            this.commonservice.applyRequired(true, inputControl['id']);
          } else {
            this.Register();
            this.mobileInput.nativeElement.focus();
            this.commonservice.applyRequired(false, inputControl['id']);
          }
        },
        (error) => {
          this.spinner.hide();
          this.Error = 'Failed to Check';
        }
      );
    }
  }

  // Register
  Register() {
    if (this.signupform.valid) {
      this.spinner.show();
      if (this.OrgName) {
        this.unregisterInvitedMembers();
      } else {
        this.newRegisterMembers();
      }
    }
  }

  newRegisterMembers() {
    this.adminservice.Register(this.admin, this.commonservice.getEnvDetails()).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.Status === 1) {
          this.commonservice.emailMessage(this.admin.Email);
          sessionStorage.setItem('tempEmailRole', '0');
          this.route.navigate(['/emailverify']);
        } else {
          this.toaster.error(res.Message);
        }
      },
      (error) => {
        this.spinner.hide();
        this.toaster.error('Failed to Register');
        this.Error = 'Failed to Register';
      }
    );
  }

  //team invitations
  unregisterInvitedMembers() {
    this.adminservice.UnregisteredTeamMember(this.admin, this.commonservice.getEnvDetails()).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.Status === 1) {
          this.commonservice.emailMessage(this.admin.Email);
          sessionStorage.setItem('tempEmailRole', '0');
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

  // show and hide password
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  validateFirstname(event: any) {
    const value = event.target.value.indexOf(' ');
    if (value == 0) {
      this.isValidFullName = true;
    } else {
      this.isValidFullName = false;
    }
  }

  validateLastname(event: any) {
    const value = event.target.value.indexOf(' ');
    if (value == 0) {
      this.isValidLastname = true;
    } else {
      this.isValidLastname = false;
    }
  }

  whiteSpaceValidator(event: any) {
    if (event.target.value.indexOf(' ') >= 0) {
      this.isWhiteSpace = true;
    }
  }
}
