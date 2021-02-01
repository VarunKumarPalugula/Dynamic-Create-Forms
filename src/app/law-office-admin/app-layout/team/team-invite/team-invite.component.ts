import { Component, OnInit } from '@angular/core';
import { ValidationService } from '@app/shared/service/validation.service';
import { AdminService } from '@app/law-office-admin/admin.service';
import { DataService } from '@app/shared/service/data.service';
import { Router } from '@angular/router';
import {  FormGroup, FormBuilder, FormArray} from '@angular/forms';

import { NgxSpinnerService } from 'ngx-spinner';
import { AdminpermissionService } from '@app/auth-guard/admin/adminpermission.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '@app/shared/service/common.service';
@Component({
  selector: 'app-team-invite',
  templateUrl: './team-invite.component.html',
  styleUrls: ['./team-invite.component.scss'],
})
export class TeamInviteComponent implements OnInit {
  teamInviteForm: FormGroup;
  teamInvites = [];
  teaminvite: FormGroup;
  isValidFullName: boolean;
  isValidEmail: boolean;
  SendInvite = true;
  count: any = 0;
  token = '';
  response: any = [];
  isValid: boolean;
  keyupcount: any = 0;
  validationmesssagefullname = '';
  validationmesssageemail = '';
  isSubAdminAcess = true;
  // tslint:disable-next-line:max-line-length
  constructor(
    private Valid: ValidationService,
    private fb: FormBuilder,
    private adminservice: AdminService,
    private route: Router,
    private spinner: NgxSpinnerService,
    private permissionService: AdminpermissionService,
    private toaster: ToastrService,
    private commonService:CommonService
  ) {}
  ngOnInit() {
    this.teamInviteForm = this.fb.group({
      teamInvite: this.fb.array([this.addSkillFormGroup()]),
    });
    this.isSubAdminAcess = this.permissionService.isSubAdminGetAcess();
  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      TeamMemberType: this.Valid.validateform.Required,
      FullName: this.Valid.validateform.FullName,
      JobCardTitle: this.Valid.validateform.JobCardTitle,
      Email: this.Valid.validateform.Email,
    });
  }

  addTeamMember(): void {
    (<FormArray>this.teamInviteForm.get('teamInvite')).push(this.addSkillFormGroup());
  }

  removeTeamMember(inviteGroupIndex: number): void {
    (<FormArray>this.teamInviteForm.get('teamInvite')).removeAt(inviteGroupIndex);
  }

  validateEmail(event: any) {
    const value = event.target.value.indexOf('@');
    if (value != -1) {
      this.isValidEmail = false;
    } else {
      this.isValidEmail = true;
    }
    this.validateSpecialCharacters(event.target.value);
  }

  validateSpecialCharacters(value: any) {
    var format = /[!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;
    if (format.test(value)) {
      this.isValidEmail = true;
    } else {
      this.isValidEmail = false;
    }
  }

  sendInvitation1(): void {}

   sendInvitation() {
    this.spinner.show();
    this.teamInvites = this.teamInviteForm.value['teamInvite'];
    this.teamInvites.forEach(function (newItem: any) {
      newItem['OrgId'] = sessionStorage.getItem('OrganisationID');
    });
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminservice.TeamInvitation(this.teamInvites, this.token, this.commonService.getEnvDetails()).subscribe(
      (data1: any[]) => {
        this.spinner.hide();
        this.response = data1;
        if (this.response[0].Status === 1) {
          sessionStorage.setItem('invitylist', JSON.stringify(this.teamInvites));
          this.route.navigate(['/admin/team/invitesuccess']);
        } else if (this.response[0].Status === 0) {
          this.toaster.error(this.response[0].Message);
        } else {
          this.toaster.error('invitation failed to send');
        }
      },
      (err) => {
        this.toaster.error('error occured');
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
