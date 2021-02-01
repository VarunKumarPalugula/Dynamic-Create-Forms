import { Component, OnInit, ElementRef } from '@angular/core';
import { ClientService } from '@app/law-office-client/law-office-client.service';
import { AdminSignup } from '@app/models/law-office-admin/AdminSignup';
import { Router } from '@angular/router';
import { ValidationService } from '@app/shared/service/validation.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from '@app/shared/service/data.service';
import { ConnectionService } from '../connection.service';
import { AdminService } from '@app/law-office-admin/admin.service';
import { CommonService } from '@app/shared/service/common.service';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-client-connections-invite.component',
  templateUrl: './connections-invite.component.html',
  styleUrls: ['./connections-invite.component.scss'],
})
export class ConnectionInviteComponent implements OnInit {
  clientInviteForm: FormGroup;
  inviationResponse: any;
  token: any;
  count: number;
  isInValidEmail: boolean;
  i: any;
  cancelMemberData: any;
  orgResponse: any;
  clinetInvite: FormGroup;
  SendInvite: boolean;
  admin: AdminSignup = new AdminSignup();
  teamInvites = [];
  isValidFullName: boolean;
  public OrganisationName: string = sessionStorage.getItem('OrganisationName');

  constructor(
    private connectionService: ConnectionService,
    private adminservice: AdminService,
    private route: Router,
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

  addConnection(): void {
    (<FormArray>this.clientInviteForm.get('teamInvite')).push(this.addSkillFormGroup());
  }

  removeConnection(inviteGroupIndex: number): void {
    (<FormArray>this.clientInviteForm.get('teamInvite')).removeAt(inviteGroupIndex);
  }

  sendInvitation() {
    this.spinner.show();
    this.teamInvites = this.clientInviteForm.value['teamInvite'];
    this.teamInvites.forEach(function (newItem: any) {
      newItem['ClientOrgId'] = sessionStorage.getItem('ClientOrganisationID');
    });
    this.connectionService.sendInvite(this.teamInvites, this.commonService.getEnvDetails()).subscribe(
      (data1: any[]) => {
        this.spinner.hide();
        this.inviationResponse = data1;
        if (this.inviationResponse[0].Status === 1) {
          this.toaster.success('Mail sent successfully', 'success');
          sessionStorage.setItem('clientinvitelist', JSON.stringify(this.teamInvites));
          this.route.navigate(['/client/applayout/connections/connectionssuccess']);
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

  checkAdminOrganisationEmailExistency(email: string, inputControl: ElementRef) {
    if (email !== '') {
      this.spinner.show();
      this.adminservice.checkAdminOrganisationEmailExistency(email).subscribe(
        (res) => {
          this.spinner.hide();
          this.orgResponse = res;
          if (this.orgResponse.Status === 1) {
            this.toaster.error('Email Already Exists');
            this.isInValidEmail = true;
          } else {
            this.isInValidEmail = false;
          }
        },
        (error) => {
          this.spinner.hide();
          //     this.Error = 'Failed to Check';
        }
      );
    }
  }
}
