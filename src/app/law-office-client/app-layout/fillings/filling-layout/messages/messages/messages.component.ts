import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilingsService } from '@app/law-office-admin/app-layout/fillings/filings.service';
import { Router, NavigationExtras } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientFilingsService } from '@app/law-office-client/app-layout/fillings/filings.service';
import { RandomColor } from 'angular-randomcolor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClientpermissionService } from '@app/auth-guard/client-guard/clientpermission.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  topicModel: any;
  editorConfig: AngularEditorConfig;
  filingId: any = '';
  orgId: any;
  token: any;
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
  maxChars = 500;
  description: string = '';
  errormessage: any;
  isempty: boolean = false;
  topicData: any = [];
  ADMINID: any;
  adminteamMembersList: any = [];
  colors: any = [];
  Subcolors: any = [];
  TopicForm: FormGroup;
  TopicId: any;
  DeleteMessModel: any;
  username: string;
  FillingPermissions: any;

  constructor(
    private modalService: NgbModal,
    private filingService: ClientFilingsService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private permissionService: ClientpermissionService
  ) {
    this.filingId = sessionStorage.getItem('FillingId');

    this.orgId = sessionStorage.getItem('ClientAdminOrgId');
    this.ADMINID = sessionStorage.getItem('LoguserId');
    this.GetTopicsForFilings();
    this.GetFilingAdminTeammembers();
    this.GetFilingClientTeammembers();
    this.Createformvalidation();
    this.getColor();
    this.username = sessionStorage.getItem('ClientAdminUserName');
    this.FillingPermissions = this.permissionService.FillingPermissions();
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

  getShortName(fullName) {
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('');
  }

  GetFilingAdminTeammembers() {
    const data = { FilingId: this.filingId, AdminOrgId: this.ADMINID };

    const obj = {
      FilingId: sessionStorage.getItem('FillingId'),
      AdminOrgId: sessionStorage.getItem('ClientAdminOrgId'),
    };
    this.filingService.getAdminTeam(obj).subscribe(
      (res: any) => {
        this.adminteamMembersList = res;
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
      (error) => {}
    );
    // this.filingService.GetFilingAdminTeammembers(data).subscribe(
    //   (res: any) => {
    //     this.adminteamMembersList = res;
    //     this.adminteamMembersDropsownSettings = {
    //       singleSelection: false,
    //       idField: 'AdminID',
    //       textField: 'Email',
    //       selectAllText: 'Select All',
    //       unSelectAllText: 'UnSelect All',
    //       itemsShowLimit: 3,
    //       allowSearchFilter: true
    //     };
    //   },

    //   error => {
    //     this.spinner.hide();
    //   }
    // );
  }

  GetFilingClientTeammembers() {
    var data = { FilingId: this.filingId, AdminOrgId: this.ADMINID };

    const obj = {
      FilingId: sessionStorage.getItem('FillingId'),
      AdminOrgId: sessionStorage.getItem('ClientAdminOrgId'),
    };
    this.filingService.getClientTeam(obj).subscribe(
      (res: any) => {
        this.spinner.hide();
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
    // this.filingService.GetFilingClientTeammembers(data).subscribe(
    //   (res: any) => {
    //     this.teamMembersList = res;

    //     this.teamMembersDropsownSettings = {
    //       singleSelection: false,
    //       idField: 'LawOfficeClientID',
    //       textField: 'Email',
    //       selectAllText: 'Select All',
    //       unSelectAllText: 'UnSelect All',
    //       itemsShowLimit: 3,
    //       allowSearchFilter: true
    //     };
    //   },

    //   error => {
    //     this.spinner.hide();
    //   }
    // );
  }
  ngOnInit() {}
  CreateTopicModel(content: any) {
    this.topicModel = this.modalService.open(content, { centered: true });
  }

  CloseCreatetopic(value: string) {
    this.topicModel.close(value);
  }

  GetTopicsForFilings() {
    this.spinner.show();
    this.filingService.getClientTopics(this.orgId, this.filingId).subscribe(
      (res: any = []) => {
        //console.log(res)
        this.spinner.hide();
        if (res == null || res == '') {
          this.messages = [];
          this.ismessages = true;
        } else {
          this.ismessages = false;
          this.messages = res;
          this.messages.reverse();
        }
        // this.messages = res;
        // this.spinner.hide();
        // if (res.length > 0) {
        //   this.ismessages = false;
        //   this.messages.reverse();
        // } else {
        //   this.ismessages = true;
        // }
      },

      (error) => {
        this.spinner.hide();
      }
    );
  }

  Viewmessage(message: any) {
    sessionStorage.setItem('message_data', JSON.stringify(message));
    sessionStorage.setItem('CtopicId', message.TopicID);
    this.router.navigate(['/client/applayout/fillings/viewmessages']);
  }

  onadminmemberSelect(eve) {}
  onadminMemberSelectAll(eve) {}

  onTeamMemberSelect(eve) {}
  onTeamMemberSelectAll(eve) {
    this.memberids = [];
  }

  CreateTopic() {
    this.spinner.show();
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
        IsUpdateAction: false,
      };

      var tokenid = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
      this.filingService.CreateTopicForFiling(data).subscribe(
        (res: any[]) => {
          this.spinner.hide();
          this.toaster.info(res['Message']);
          this.GetTopicsForFilings();
          this.topicModel.close();
          this.topic = '';
          this.description = '';
          this.selectedTeamMembers = [];
          this.selectedadminTeamMembers = [];
          this.TopicForm.reset();
        },
        (err) => {
          this.toaster.error('Error Occured');
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
    this.modalService.dismissAll();
    var tokenid = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    console.log(this.orgId + '--' + this.filingId + '--' + this.TopicId);
    console.log(tokenid);
    this.filingService.Topicarchive(this.orgId, this.filingId, tokenid, this.TopicId).subscribe(
      (res: any) => {
        console.log(res);
        this.toaster.info(res['Message']);
        //this.modalService.dismissAll()
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
