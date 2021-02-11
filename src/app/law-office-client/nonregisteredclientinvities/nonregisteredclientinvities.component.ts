import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { CommonService } from '@app/shared/service/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '@app/law-office-client/law-office-client.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidationService } from '@app/shared/service/validation.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nonregisteredclientinvities',
  templateUrl: './nonregisteredclientinvities.component.html',
  styleUrls: ['./nonregisteredclientinvities.component.scss'],
})
export class NonregisteredclientinvitiesComponent implements OnInit {
  @ViewChild('nameInput')
  nameInput: ElementRef;
  @ViewChild('orgNameInput')
  orgNameInput: ElementRef;
  @ViewChild('passwordInput')
  passwordInput: ElementRef;
  public signupform: FormGroup;
  client: any = {};
  public Error: string = '';
  public orgResponse: any;
  public Status: string = '';
  dataarray: any = {};
  fieldTextType: boolean = true;
  @Input()
  Role: string;
  selectedRole: string;
  Roles: any = [];
  roleDisabled = false;
  Tittle: string;
  configClientSetup = true;
  OrgName: string;
  Email: string;
  emailDisabled = false;
  roleType: any;
  displayTittle = '';
  constructor(
    private clientService: ClientService,
    private commonservice: CommonService,
    private route: Router,
    private fb: FormBuilder,
    private Valid: ValidationService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.buildForm();
    this.loadClientData();
    this.configureRole();
  }

  // loading url data
  loadClientData() {
    this.client.NomClaturedOrgID = this._activatedRoute.snapshot.queryParams['PortOrgId'];
    this.OrgName = this._activatedRoute.snapshot.queryParams['OrgName'];
    this.client.TStatus = this._activatedRoute.snapshot.queryParams['TStatus'];
    this.client.PortInvitedId = this._activatedRoute.snapshot.queryParams['PortInvitedId'];
    this.client.Email = this._activatedRoute.snapshot.queryParams['Email'];
    this.Email = this.client.Email;
    this.client.FirstName = this._activatedRoute.snapshot.queryParams['FullName'];
  }

  configureRole() {
    if (this.client.TStatus) {
      if (this.client.TStatus == '2' || this.client.TStatus == '3') {
        this.displayTittle = 'Member';
      } else if (this.client.TStatus == '4') {
        this.displayTittle = 'Applicant';
      }
    }
  }

  // signup
  Register() {
    console.log(this.client);
    this.spinner.show();
    this.clientService.clientTeamMemberSignup(this.client, this.commonservice.getEnvDetails()).subscribe(
      (res) => {
        this.spinner.hide();
        this.dataarray = res;
        if (this.dataarray.Status === 1) {
          this.commonservice.emailMessage(this.client.Email);
          sessionStorage.setItem('tempEmailRole', '1');
          this.route.navigate(['/emailverify']);
        } else {
          this.toaster.error(this.dataarray.Message);
          this.Error = this.dataarray.Message;
          this.toaster.error(this.Error, 'Error');
        }
      },
      (error) => {
        this.spinner.hide();
        this.toaster.error('failed to register');
        this.Error = 'Failed to Register';
        this.toaster.error(this.Error, 'Error');
      }
    );
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
    });
  }

  // signin link click
  signinAccount() {
    this.route.navigate(['client/signin']);
  }
}
