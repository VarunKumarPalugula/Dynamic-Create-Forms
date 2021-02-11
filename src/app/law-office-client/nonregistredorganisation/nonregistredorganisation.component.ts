import { Component, OnInit, ElementRef } from '@angular/core';
import { AdminService } from '@app/law-office-admin/admin.service';
import { CommonService } from '@app/shared/service/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidationService } from '@app/shared/service/validation.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConnectionService } from '../app-layout/connections/connection.service';

@Component({
  selector: 'app-nonregistredorganisation',
  templateUrl: './nonregistredorganisation.component.html',
  styleUrls: ['./nonregistredorganisation.component.scss'],
})
export class NonregistredorganisationComponent implements OnInit {
  AdminOrganisationName: string;
  admin: any = {};
  signupform: FormGroup;
  isValidFullName: boolean;
  isValidLastname: boolean;
  fieldTextType: boolean = true;
  mobileInput: ElementRef;
  isWhiteSpace: any;
  OrgName: any;
  orgDisabled: boolean;
  orgResponse: any;
  Error: any;
  emailDisabled: boolean;
  constructor(
    private connectionService: ConnectionService,
    private commonservice: CommonService,
    private _activatedRoute: ActivatedRoute,
    private adminservice: AdminService,
    private route: Router,
    private fb: FormBuilder,
    private Valid: ValidationService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.CheckEmailExistency();
    this.buildForm();
  }

  //checking email existing
  CheckEmailExistency() {
    if (
      this._activatedRoute.snapshot.queryParams['Email'] !== '' &&
      this._activatedRoute.snapshot.queryParams['Email'] !== undefined
    ) {
      this.spinner.show();
      this.adminservice.CheckEmailExistency(this._activatedRoute.snapshot.queryParams['Email']).subscribe(
        (res) => {
          this.spinner.hide();
          this.orgResponse = res;
          if (this.orgResponse.Status === 1) {
            this.AddingConnectionToAdminAndClient();
          } else if (this.orgResponse.Status === 0) {
            this.nonregistereduserinadminrole();
          }
        },
        (error) => {
          this.spinner.hide();
          this.Error = 'Failed to Check';
          this.toaster.error(this.Error, 'Error');
        }
      );
    }
  }

  //checking user already register or not if there there connection will establish
  AddingConnectionToAdminAndClient() {
    const obj = {
      EnTypeClientOrg: this._activatedRoute.snapshot.queryParams['PortCOrgId'],
      ClientNomInvitationId: this._activatedRoute.snapshot.queryParams['PortInvitedId'],
    };
    this.adminservice.AddingConnectionToAdminAndClient(obj).subscribe(
      (res) => {
        this.spinner.hide();
        this.orgResponse = res;
        this.route.navigate(['admin/signin']);
        if (this.orgResponse.Status == 1) {
          this.toaster.success(this.orgResponse.Message);
        } else if (this.orgResponse.Status == 0) {
          this.toaster.error('Admin Verifcation Already Completed Please login');
        }
      },
      (error) => {
        this.spinner.hide();
        this.Error = 'Failed to Check';
        this.toaster.error(this.Error, 'Error');
      }
    );
  }

  whiteSpaceValidator(event: any) {
    if (event.target.value.indexOf(' ') >= 0) {
      this.isWhiteSpace = true;
    }
  }

  validateFirstname(event: any) {
    const value = event.target.value.indexOf(' ');
    if (value == 0) {
      this.isValidFullName = true;
    } else {
      this.isValidFullName = false;
    }
  }

  Register() {
    // if(this.admin.AdminOrganisationName!=='dofiling.'){
    //   if(this.admin.AdminOrganisationName.substring(0, 9)!=='dofiling.'){
    //     this.toaster.error("Please give valid organization name");
    //     this.admin.AdminOrganisationName = 'dofiling.';
    //     return;
    //   }
    this.spinner.show();
    //this.admin.OrganisationName = 'dofiling.' + this.admin.OrganisationName;
    this.connectionService.connectionSignup(this.admin, this.commonservice.getEnvDetails()).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.Status === 1) {
          this.commonservice.emailMessage(this.admin.Email);
          sessionStorage.setItem('tempEmailRole', '0');
          this.route.navigate(['/emailverify']);
        } else if (res.Status === 0) {
          this.toaster.error(res.Message);
        }
      },
      (error) => {
        this.spinner.hide();
        this.toaster.error('failed to register');
      }
    );
    // }else{
    //   this.toaster.error("Please give valid organization name");
    //   this.admin.ClientOrganisationName = 'dofiling.';
    //   return;
    // }
  }

  validateLastname(event: any) {
    const value = event.target.value.indexOf(' ');
    if (value == 0) {
      this.isValidLastname = true;
    } else {
      this.isValidLastname = false;
    }
  }

  // show and hide password
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  checkAdminUsernameExistency(username: string, inputControl: ElementRef) {
    if (username !== '') {
      this.spinner.show();
      this.adminservice.checkAdminUsernameExistency(username).subscribe(
        (res) => {
          this.spinner.hide();
          this.orgResponse = res;
          if (this.orgResponse.Status === 1) {
            this.toaster.error('Username Already Exists');
            this.commonservice.applyRequired(true, inputControl['id']);
          } else {
            if (this.mobileInput && this.mobileInput.nativeElement) {
              this.mobileInput.nativeElement.focus();
              this.commonservice.applyRequired(false, inputControl['id']);
            }
          }
        },
        (error) => {
          this.spinner.hide();
          this.Error = 'Failed to Check';
        }
      );
    }
  }

  nonregistereduserinadminrole() {
    this.AdminOrganisationName = this._activatedRoute.snapshot.queryParams['FullName'];
    if (this.AdminOrganisationName) {
      this.admin.EnTypeClientOrg = this._activatedRoute.snapshot.queryParams['PortCOrgId'];
      this.admin.AdminNomeclaturedgeneratedInvite = this._activatedRoute.snapshot.queryParams['PortInvitedId'];
      this.admin.Email = this._activatedRoute.snapshot.queryParams['Email'];
      this.admin.FirstName = this.AdminOrganisationName;
      //this.admin.AdminOrganisationName = "dofiling."+this.AdminOrganisationName;
      this.emailDisabled = true;
      //this.orgDisabled = true;
    }
    // this.admin.AdminOrganisationName="dofiling.";
  }

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
}
