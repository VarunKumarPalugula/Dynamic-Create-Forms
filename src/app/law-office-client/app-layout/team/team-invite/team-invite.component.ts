import { Component, OnInit, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ValidationService } from '@app/shared/service/validation.service';
import { AdminService } from '@app/law-office-admin/admin.service';
import { Router, ActivatedRoute } from '@angular/router';

import { from } from 'rxjs';
import { ClientService } from '@app/law-office-client/law-office-client.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientpermissionService } from '@app/auth-guard/client-guard/clientpermission.service';
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
  SendInvite = true;
  count: any = 0;
  token = '';
  response: any = [];
  isValid: boolean;
  keyupcount: any = 0;
  validationmesssagefullname = '';
  validationmesssageemail = '';
  isSubAdminAcess = true;
  orgResponse: any;
  // tslint:disable-next-line:max-line-length
  constructor(
    private Valid: ValidationService,
    private fb: FormBuilder,
    private clientService: ClientService,
    private route: Router,
    private spinner: NgxSpinnerService,
    private permissionService: ClientpermissionService,
    private toaster: ToastrService,
    private commonService: CommonService
  ) {}
  ngOnInit() {
    this.teamInviteForm = this.fb.group({
      teamInvite: this.fb.array([this.addSkillFormGroup()]),
    });
    this.isSubAdminAcess = this.permissionService.isSubAdminGetAcess();
  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      TeamMemberType: ['', Validators.required],
      FullName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern('[a-zA-Z ]*$'),
        ]),
      ],
      JobCardTitle: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z][a-zA-Z0-9_.-]*$'),
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
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
    (<FormArray>this.teamInviteForm.get('teamInvite')).push(this.addSkillFormGroup());
  }

  removeTeamMember(inviteGroupIndex: number): void {
    (<FormArray>this.teamInviteForm.get('teamInvite')).removeAt(inviteGroupIndex);
  }

  sendInvitation1(): void {}

  sendInvitation() {
    this.spinner.show();
    this.teamInvites = this.teamInviteForm.value['teamInvite'];
    this.teamInvites.forEach(function (newItem: any) {
      newItem['OrgId'] = sessionStorage.getItem('ClientOrganisationID');
    });
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    this.clientService.TeamInvitation(this.teamInvites, this.commonService.getEnvDetails()).subscribe(
      (data1: any[]) => {
        this.spinner.hide();
        this.response = data1;
        if (this.response[0].Status === 1) {
          sessionStorage.setItem('invitylist', JSON.stringify(this.teamInvites));
          this.route.navigate(['/client/applayout/team/invitesuccess']);
        } else if (this.response && this.response[0].Status === 0) {
          this.toaster.error(this.response[0].Message);
        } else {
          this.toaster.error('Invitation failed to send');
        }
      },
      (err) => {
        this.toaster.error('error occured');
      }
    );
  }
  checkClientOrganisationEmailExistency(organisationEmail: string, inputControl?: ElementRef) {
    if (organisationEmail !== '') {
      this.clientService.CheckClientOrgAdminEmailExistancy(organisationEmail).subscribe(
        (res) => {
          this.orgResponse = res;
          if (this.orgResponse.Status === 1) {
            this.toaster.error('Email Already Existed');
          }
        },
        (error) => {}
      );
    }
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
