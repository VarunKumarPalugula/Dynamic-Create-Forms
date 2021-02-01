import { Component, OnInit } from '@angular/core';
import { AdminClientService } from '@app/law-office-admin/app-layout/clients/client.service';
import { AdminSignup } from '@app/models/law-office-admin/AdminSignup';
import { Router } from '@angular/router';
import { ValidationService } from '@app/shared/service/validation.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from '@app/shared/service/data.service';
import { AbstractControl, FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { CommonService } from '@app/shared/service/common.service';

@Component({
  selector: 'app-admin-client-invite',
  templateUrl: './admin-client-invite.component.html',
  styleUrls: ['./admin-client-invite.component.scss'],
})
export class AdminClientInviteComponent implements OnInit {
  clientInviteForm: FormGroup;
  teamInvites = [];
  isValidEmail: boolean;
  isValidFullName: boolean;
  inviationResponse: any;
  token: any;
  count: number;
  i: any;
  cancelMemberData: any;
  clinetInvite: FormGroup;
  SendInvite: boolean;
  admin: AdminSignup = new AdminSignup();
  choices: any = [{ OrgId: sessionStorage.getItem('OrganisationID') }];
  constructor(
    private adminClientService: AdminClientService,
    private data: DataService,
    private route: Router,
    private Valid: ValidationService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.clientInviteForm = this.fb.group({
      teamInvite: this.fb.array([this.addSkillFormGroup()]),
    });
  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      SetType: ['', Validators.required],
      FullName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern('[a-zA-Z ]*$'),
        ]),
      ],
      Email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9-]+\\.[a-z]|\\.[a-z]{2,4}$'),
        ]),
      ],
    });
  }

  addTeamMember(): void {
    (<FormArray>this.clientInviteForm.get('teamInvite')).push(this.addSkillFormGroup());
  }

  removeTeamMember(inviteGroupIndex: number): void {
    (<FormArray>this.clientInviteForm.get('teamInvite')).removeAt(inviteGroupIndex);
  }

  sendInvite() {
    this.spinner.show();
    this.admin.OrgId = sessionStorage.getItem('OrganisationID');
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminClientService.sendInvite(this.choices, this.commonService.getEnvDetails()).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.inviationResponse = data;
        this.toaster.success('Mail sent successfully', 'success');
        sessionStorage.setItem('clientinvitelist', JSON.stringify(this.choices));
        this.route.navigate(['/admin/clients/clientinvitesuccess']);
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  sendInvitation() {
    this.spinner.show();
    this.teamInvites = this.clientInviteForm.value['teamInvite'];
    this.teamInvites.forEach(function (newItem: any) {
      newItem['OrgId'] = sessionStorage.getItem('OrganisationID');
    });

    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminClientService.sendInvite(this.teamInvites, this.commonService.getEnvDetails()).subscribe(
      (data1: any[]) => {
        this.spinner.hide();
        this.inviationResponse = data1;
        if (this.inviationResponse[0].Status === 1) {
          sessionStorage.setItem('clientinvitelist', JSON.stringify(this.teamInvites));
          this.route.navigate(['/admin/clients/clientinvitesuccess']);
        } else if (this.inviationResponse[0].Status === 0) {
          this.toaster.error(this.inviationResponse[0].Message);
        } else {
          this.toaster.error('invitation failed to send');
        }
      },
      (err) => {
        this.spinner.hide();
        this.toaster.error('Some thing went wrong with network please try again!');
      }
    );
  }

  validateFullname(event: any) {
    const value = event.target.value.indexOf(' ');
    if (value == 0) {
      this.isValidFullName = true;
    } else {
      this.isValidFullName = false;
    }
  }
}
