import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ValidationService } from '@app/shared/service/validation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '@app/law-office-admin/admin.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminpermissionService } from '@app/auth-guard/admin/adminpermission.service';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '@app/law-office-client/law-office-client.service';
import { CommonService } from '@app/shared/service/common.service';

@Component({
  selector: 'team-individual-invite',
  templateUrl: './team-individual-invite.component.html',
  styleUrls: ['./team-individual-invite.component.scss'],
})
export class TeamIndividualInviteComponent implements OnInit {
  teamInviteForm: FormGroup;
  isValidFullName: boolean;
  invity = [];
  token: any;
  teamInvites: any = [];
  LoginUser: any;
  message: string;
  inviationResponse: any;
  data: any = {};
  @Input()
  SetType: string;
  @Input()
  tittle: string;
  @Output()
  emitCloseModel = new EventEmitter();
  @Output()
  emitConfirmation = new EventEmitter();
  @Input()
  isSubAdminAcess = true;
  @Input()
  isSetTypeRequired = true;
  constructor(
    private Valid: ValidationService,
    private fb: FormBuilder,
    private adminService: AdminService,
    private route: Router,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private clientService: ClientService,
    private permissionService: AdminpermissionService,
    private toaster: ToastrService,
    private commonService: CommonService
  ) {
    this.LoginUser = sessionStorage.getItem('Login_User');
  }

  ngOnInit() {
    this.inviteBuildForm();
    this.configRole();
  }

  configRole() {
    if (this.isSetTypeRequired == false) {
      const clientSetTypeCorntrol = this.teamInviteForm.get('TeamMemberType');
      if (clientSetTypeCorntrol) {
        clientSetTypeCorntrol.clearValidators();
        clientSetTypeCorntrol.updateValueAndValidity();
      }
    }
  }

  inviteBuildForm() {
    this.teamInviteForm = this.fb.group({
      TeamMemberType: this.Valid.validateform.Required,
      FullName: this.Valid.validateform.FullName,
      JobCardTitle: this.Valid.validateform.JobCardTitle,
      Email: this.Valid.validateform.Email,
    });
    // this.isSubAdminAcess = this.permissionService.isSubAdminGetAcess();
  }

  sendInvite() {
    if (this.LoginUser == 'Client') {
      this.sendClientInvitation();
    } else {
      this.sendAdminInvitation();
    }
  }

  sendClientInvitation() {
    this.invity=[];
    this.data.Email = this.teamInviteForm.value.Email;
    this.data.FullName = this.teamInviteForm.value.FullName;
    this.data.JobCardTitle = this.teamInviteForm.value.JobCardTitle;
    this.data.TeamMemberType =
      this.teamInviteForm.value && this.teamInviteForm.value.TeamMemberType && this.teamInviteForm.value.TeamMemberType
        ? this.teamInviteForm.value.TeamMemberType
        : this.SetType;
    this.data.SetType = this.SetType;
    this.data.OrgId = sessionStorage.getItem('ClientOrganisationID');
    this.invity.push(this.data);
    this.spinner.show();
    this.clientService.TeamInvitation(this.invity, this.commonService.getEnvDetails()).subscribe(
      (data1: any[]) => {
        this.spinner.hide();
        this.inviationResponse = data1;
        if (this.inviationResponse[0].Status == 1) {
          this.emitConfirmation.emit(this.invity);
          this.data = {};
          this.message = 'invitaion send sucessfully';
        } else if (this.inviationResponse && this.inviationResponse[0].Status === 0) {
          this.toaster.error(this.inviationResponse[0].Message);
        } else {
          this.toaster.error('invitation failed to send');
        }
      },
      (err) => {
        this.toaster.error('error occured');
      }
    );
  }

  sendAdminInvitation() {
    this.invity=[];
    this.data.Email = this.teamInviteForm.value.Email;
    this.data.FullName = this.teamInviteForm.value.FullName;
    this.data.JobCardTitle = this.teamInviteForm.value.JobCardTitle;
    this.data.TeamMemberType = this.teamInviteForm.value.TeamMemberType;
    this.data.SetType = this.SetType;
    this.data.OrgId = sessionStorage.getItem('OrganisationID');
    this.invity.push(this.data);
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.spinner.show();
    this.adminService.TeamInvitation(this.invity, this.token, this.commonService.getEnvDetails()).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.inviationResponse = data;
        if (this.inviationResponse[0].Status == 1) {
          this.emitConfirmation.emit(this.invity);
          this.data = {};
          this.message = 'invitaion send sucessfully';
        }else if (this.inviationResponse && this.inviationResponse[0].Status === 0) {
          this.toaster.error(this.inviationResponse[0].Message);
        } else {
          this.toaster.error('invitation failed to send');
        }
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  Close(value: string) {
    this.emitCloseModel.emit(value);
  }

  validateFullname(event: any) {
    const value = event.target.value.indexOf(' ');
    if (value == 0) {
      this.isValidFullName = true;
    } else {
      this.isValidFullName = false;
    }
  }
  sendInvitation() { }
}
