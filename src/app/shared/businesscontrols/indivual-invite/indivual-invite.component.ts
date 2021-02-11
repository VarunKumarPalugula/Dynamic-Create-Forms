import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { ValidationService } from '@app/shared/service/validation.service';
import { AdminService } from '@app/law-office-admin/admin.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminClientService } from '@app/law-office-admin/app-layout/clients/client.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConnectionService } from '@app/law-office-client/app-layout/connections/connection.service';
import { CommonService } from '@app/shared/service/common.service';

@Component({
  selector: 'indivual-invite',
  templateUrl: './indivual-invite.component.html',
  styleUrls: ['./indivual-invite.component.scss'],
})
export class IndivualInviteComponent implements OnInit {
  clientInviteForm: FormGroup;
  invity = [];
  token: any;
  message: string;
  LoginUser: string;
  isValidFullName: boolean;
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

  constructor(
    private Valid: ValidationService,
    private fb: FormBuilder,
    private adminService: AdminClientService,
    private route: Router,
    private spinner: NgxSpinnerService,
    private connectionService: ConnectionService,
    private modalService: NgbModal,
    private commonService: CommonService
  ) {
    this.LoginUser = sessionStorage.getItem('Login_User');
  }

  ngOnInit() {
    this.clientinviteBuildForm();
  }
  clientinviteBuildForm() {
    this.clientInviteForm = this.fb.group({
      //SetType: this.Valid.TeamInvite.role,
      FullName: this.Valid.TeamInvite.fullname,
      Email: this.Valid.TeamInvite.email,
    });
  }

  validateFullname(event: any) {
    const value = event.target.value.indexOf(' ');
    if (value == 0) {
      this.isValidFullName = true;
    } else {
      this.isValidFullName = false;
    }
  }

  sendInvite() {
    if (this.LoginUser == 'Client') {
      this.sendClientInvitation();
    } else {
      this.sendAdminInvitation();
    }
  }

  sendAdminInvitation() {
    this.spinner.show();
    this.data.Email = this.clientInviteForm.value.Email;
    this.data.FullName = this.clientInviteForm.value.FullName;
    if (this.SetType == '2') {
      this.data.SetType = 3;
    } else if (this.SetType == '3') {
      this.data.SetType = 2;
    } else {
      this.data.SetType = this.SetType;
    }
    this.data.OrgId = sessionStorage.getItem('OrganisationID');
    this.invity.push(this.data);
    this.adminService.sendInvite(this.invity, this.commonService.getEnvDetails()).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.inviationResponse = data;
        this.emitConfirmation.emit(this.invity);
        this.data = {};
        this.message = 'Invitaion send sucessfully';
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  sendClientInvitation() {
    this.spinner.show();
    this.data.Email = this.clientInviteForm.value.Email;
    this.data.FullName = this.clientInviteForm.value.FullName;
    this.data.ClientOrgId = sessionStorage.getItem('ClientOrganisationID');
    this.invity.push(this.data);
    this.connectionService.sendInvite(this.invity, this.commonService.getEnvDetails()).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.inviationResponse = data;
        this.emitConfirmation.emit(this.invity);
        this.data = {};
        this.message = 'Invitaion send sucessfully';
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  Close(value: string) {
    this.emitCloseModel.emit(value);
  }
}
