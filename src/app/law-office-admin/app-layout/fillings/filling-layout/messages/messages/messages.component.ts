import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilingsService } from '@app/law-office-admin/app-layout/fillings/filings.service';
import { Router, NavigationExtras } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminpermissionService } from '@app/auth-guard/admin/adminpermission.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RandomColor } from 'angular-randomcolor';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent implements OnInit {
  topicModel: any;
  editorConfig: AngularEditorConfig;
  filingId: any = '';
  orgId: any;
  token: any;
  maxChars = 500;
  description: string = '';
  messages: any = [];
  ismessages: boolean = false;
  teamMembersList: any = [];
  adminteamMembersDropsownSettings = {};
  teamMembersDropsownSettings = {};
  memberids: any = [];
  adminmemberids: any = [];
  selectedadminTeamMembers: any = [];
  selectedTeamMembers: any = [];
  topic: any = '';
  errormessage: any;
  isempty: boolean = false;
  topicData: any = [];
  ADMINID: any;
  adminteamMembersList: any = [];
  FillingPermissions: any = {};
  TopicForm: FormGroup;
  colors: any = [];
  Subcolors: any = [];
  DeleteMessModel: any;
  TopicId: any;
  username: string;

  constructor(
    private modalService: NgbModal,
    private filingService: FilingsService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private permissionService: AdminpermissionService,
    private toaster: ToastrService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {
    this.filingId = sessionStorage.getItem('FillingId');

    this.orgId = sessionStorage.getItem('OrganisationID');
    this.ADMINID = sessionStorage.getItem('LoguserId');
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.username = sessionStorage.getItem('AdminUserName');
    this.GetTopicsForFilings();
    this.GetFilingAdminTeammembers();
    this.GetFilingClientTeammembers();
    this.Createformvalidation();
    this.getColor();

    for (var i = 0; i < 100; i++) {
      this.Subcolors.push(this.getsubColor());
    }
  }

  getColor() {
    for (var i = 0; i < 100; i++) {
      const newColor = RandomColor.generateColor();

      this.colors.push(newColor);
    }
  }
  getsubColor() {
    const zeros = '0000000';
    let color = '#' + Math.floor(Math.random() * 0xffffff).toString(16);
    var colorLength = color.length;

    if (colorLength < 90) {
      color += zeros.substring(0, zeros.length - colorLength);
    }

    return color;
  }
  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }
  Createformvalidation() {
    // this.TopicForm = this.fb.group({

    //   'name': ['', Validator.required],
    // });
    this.TopicForm = this.fb.group({
      topic: ['', Validators.required],
      description: ['', Validators.required],
      adminmembers: ['', Validators.required],
      members: ['', Validators.required],
    });
  }
  GetFilingAdminTeammembers() {
    var data = { FilingId: this.filingId, AdminOrgId: this.ADMINID };
    let clientobj = {
      FilingId: sessionStorage.getItem('FillingId'),
      AdminOrgId: sessionStorage.getItem('OrganisationID'),
    };
    this.filingService.GetFilingAdminTeammembers(clientobj, this.token).subscribe(
      (res: any) => {
        this.adminteamMembersList = res;
        this.adminteamMembersList = this.adminteamMembersList.filter(x=>x.Status == true);
        this.adminteamMembersDropsownSettings = {
          singleSelection: false,
          idField: 'AdminID',
          textField: 'Email',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
        };
      },

      (error) => {
        this.spinner.hide();
      }
    );
  }

  GetFilingClientTeammembers() {
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    let teamobj = {
      FilingId: sessionStorage.getItem('FillingId'),
      AdminOrgId: sessionStorage.getItem('OrganisationID'),
    };
    this.filingService.GetFilingClientTeammembers(teamobj, this.token).subscribe(
      (res: any) => {
        this.teamMembersList = res;

        this.teamMembersDropsownSettings = {
          singleSelection: false,
          idField: 'LawOfficeClientID',
          textField: 'Email',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
        };
      },

      (error) => {
        this.spinner.hide();
      }
    );
  }
  ngOnInit() {}
  CreateTopicModel(content: any) {
    this.topicModel = this.modalService.open(content, { centered: true });
  }

  CloseCreatetopic(value: string) {
    this.topicModel.close(value);
  }

  getShortName(fullName) {
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('');
  }
  GetTopicsForFilings() {
    this.spinner.show();
    this.filingService.GetTopicsForFilings(this.orgId, this.filingId, this.token).subscribe(
      (res: any = []) => {
        //console.log(res)
        // this.messages = res;
        this.spinner.hide();
        if (res == null || res == '') {
          this.messages = [];
          this.ismessages = true;
        } else {
          this.ismessages = false;
          this.messages = res;
          this.messages.reverse();
        }
      },

      (error) => {
        this.spinner.hide();
      }
    );
  }
  Viewmessage(message) {
    sessionStorage.setItem('message_data', JSON.stringify(message));
    sessionStorage.setItem('AtopicId', message.TopicID);
    this.router.navigate(['admin/fillings/viewmessages']);
  }

  onadminmemberSelect(eve) {}
  onadminMemberSelectAll(eve) {}

  onTeamMemberSelect(eve) {}
  onTeamMemberSelectAll(eve) {
    this.memberids = [];
  }

  CreateTopic() {
    this.adminmemberids = [];
    this.memberids = [];

    if (this.TopicForm.valid) {
      this.selectedadminTeamMembers.forEach((v) => {
        this.adminmemberids.push(v.AdminID);
      });

      this.selectedTeamMembers.forEach((v) => {
        this.memberids.push(v.LawOfficeClientID);
      });

      var data = {
        OrgId: this.orgId,
        FilingId: this.filingId,
        Title: this.TopicForm.value.topic,
        Description: this.TopicForm.value.description,
        AdminIds: this.adminmemberids.toString(),
        LawOfficeClientIds: this.memberids.toString(),
        IsUpdateAction: false
      };
      var tokenid = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
      this.filingService.CreateTopicForFiling(data, tokenid).subscribe(
        (res: any[]) => {
          //this.spinner.hide();
          this.toaster.info(res['Message']);
          this.GetTopicsForFilings();
          this.topicModel.close();
          this.topic = '';
          this.description = '';
          this.selectedTeamMembers = [];
          this.selectedadminTeamMembers = [];
        },
        (err) => {
          this.toaster.error('error occured');
        }
      );
    }
  }

  Close() {
    this.topicModel.close();
    this.topic = '';
    this.description = '';
    this.selectedTeamMembers = [];
    this.selectedadminTeamMembers = [];
    this.adminmemberids = [];
    this.memberids = [];
  }
  Closesent() {
    this.topicModel.close();
    this.topic = '';
    this.description = '';
    this.selectedTeamMembers = [];
    this.selectedadminTeamMembers = [];
    this.adminmemberids = [];
    this.memberids = [];
  }
  visitingInput() {
    this.isempty = false;
  }

  DeleteMessage(deleteMessagePopUpTemp, item) {
    this.TopicId = item.TopicID;

    this.DeleteMessModel = this.modalService.open(deleteMessagePopUpTemp, {
      centered: true,
      keyboard: false,
      backdrop: 'static',
    });
  }

  Archievemessage() {
    var tokenid = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.filingService.Topicarchive(this.orgId, this.filingId, tokenid, this.TopicId).subscribe(
      (res) => {
        this.toaster.info(res['Message']);
        this.modalService.dismissAll();
        this.messages = [];
        this.GetTopicsForFilings();
      },
      (err) => {
        this.toaster.error('Error occurred while archiveing Topic..', 'Error');
      }
    );
  }
  closeModal() {
    this.modalService.dismissAll();
  }
}
