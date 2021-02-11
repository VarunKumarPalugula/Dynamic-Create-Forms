import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '@app/shared/service/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApicallsService } from '@app/shared/service/apicalls.service';
import { RandomColor } from 'angular-randomcolor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientFilingsService } from '@app/law-office-client/app-layout/fillings/filings.service';
import { ToastrService } from 'ngx-toastr';
import { ISignalRConnection } from 'ng2-signalr';
import { ClientpermissionService } from '@app/auth-guard/client-guard/clientpermission.service';
import { CommonService } from '@app/shared/service/common.service';

@Component({
  selector: 'app-viewmessages',
  templateUrl: './viewmessages.component.html',
  styleUrls: ['./viewmessages.component.scss'],
})
export class ViewmessagesComponent implements OnInit, OnDestroy {
  topicModel: any;
  TopicForm: FormGroup;
  message_dat: any;
  isshwowing: boolean = false;
  viewdata: any;
  connecting = false;
  connected = false;
  sending = false;
  messages: any = [];
  teamMembersList: any = [];
  adminteamMembersDropsownSettings = {};
  selectedadminTeamMembers: any = [];
  selectedTeamMembers: any = [];
  teamMembersDropsownSettings = {};
  memberids: any = [];
  adminmemberids: any = [];
  topic: any = '';
  maxChars = 500;
  filingId: any = '';
  orgId: any;
  description: string = '';
  errormessage: any;
  isempty: boolean = false;
  adminteamMembersList: any = [];
  Replies: number;
  AdminId = sessionStorage.getItem('LawOfficeClientID');
  MemberAddedMessage = '';
  name = '';
  UserName = sessionStorage.getItem('ClientAdminUserName');
  message = '';
  submessage = '';
  TopicId = sessionStorage.getItem('CtopicId');
  groupname: any;
  url: any;
  issubmessagesopen: boolean = true;
  colors: any = [];
  Subcolors: any = [];
  DeleteManMessModel: any;
  GroupMessagingId: any;
  DeleteMessModel: any;
  private connection: ISignalRConnection;
  topicId: any;
  FillingPermissions: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private filingService: ClientFilingsService,
    private toaster: ToastrService,
    private fb: FormBuilder,
    private permissionService: ClientpermissionService,
    private commonService: CommonService
  ) {
    this.connection = route.snapshot.data['connection'];
    this.getColor();
    this.editformvalidation();
    this.GetFilingAdminTeammembers();
    this.GetFilingClientTeammembers();
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

  getShortName(fullName) {
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('');
  }

  async ngOnInit() {
    this.viewdata = JSON.parse(sessionStorage.getItem('message_data'));
    this.viewdata.FilingId = sessionStorage.getItem('FillingId');
    this.groupname = sessionStorage.getItem('ClientAdminOrgId') + this.viewdata.FilingId + this.TopicId;

    this.TopicId = this.viewdata.TopicID;
    this.connecting = true;
    this.connecting = false;
    this.message = '';
    this.JoinGroup();
    this.GetOldMessagesData();
    let onMreceiveOldMessages$ = this.connection.listenForRaw('receiveOldMessages');
    onMreceiveOldMessages$.subscribe((OldMessages: any[]) => {
      this.message = '';
      this.ngZone.run(() => {
        this.messages = OldMessages[0];
        this.messages.reverse();
      });
    });

    let onReceiveMessage$ = this.connection.listenForRaw('receiveMessage');
    onReceiveMessage$.subscribe((OldMessages: any[]) => {
      this.message = '';
      this.refresh();
      this.message = '';
    });
  }

  async JoinGroup() {
    this.sending = true;
    await this.connection.invoke('JoinGroup', this.groupname, this.UserName).then(() => {
      this.message = '';
    });
  }

  refresh() {
    this.GetOldMessagesData();
  }
  async GetOldMessagesData() {
    this.spinner.show();
    this.sending = true;
    await this.connection
      .invoke(
        'ReceiveOldMessagesOfClient',
        sessionStorage.getItem('ClientAdminOrgId'),
        this.viewdata.FilingId,
        this.TopicId,
        this.groupname,
        this.AdminId
      )
      .then(() => {
        this.message = '';
        this.sending = false;
        this.spinner.hide();
      });
  }

  async SendClientMessage() {
    if (!this.message) {
      return;
    }
    this.sending = true;
    await this.connection
      .invoke(
        'SendClientMessage',
        sessionStorage.getItem('ClientAdminOrgId'),
        this.viewdata.FilingId,
        this.TopicId,
        this.AdminId,
        this.UserName,
        this.message,
        this.groupname
      )
      .then(() => {
        this.message = '';
        this.sending = false;
        this.refresh();
      });
  }

  async SendClientSubMessage(data: any) {
    this.sending = true;
    await this.connection
      .invoke(
        'SendClientSubMessage',
        sessionStorage.getItem('ClientAdminOrgId'),
        this.viewdata.FilingId,
        this.TopicId,
        data.GroupMessagingId,
        this.AdminId,
        this.UserName,
        this.submessage,
        this.groupname
      )
      .then(() => {
        this.submessage = '';
        this.sending = false;
      });
  }

  toggler(ev: any, id: any) {
    document.getElementById(id).classList.toggle('d-n');
    if (this.issubmessagesopen) {
      this.issubmessagesopen = false;
    } else {
      this.issubmessagesopen = true;
    }
  }

  subreplay() {
    if (this.isshwowing) {
      this.isshwowing = false;
    } else {
      this.isshwowing = true;
    }
  }

  checkCanReplay(username, i) {
    if (!this.commonService.checkNullorUndefined(this.FillingPermissions)) {
      let businessClient;
      businessClient = this.adminteamMembersList.find((r) => r.Status == true && r.UserName == username);
      if (!this.commonService.checkNullorUndefined(businessClient)) {
        if (this.FillingPermissions.CanReplyToConnections) {
          return true;
        } else {
          return false;
        }
      }
      let applicant: any = this.teamMembersList.find(
        (r) => r.Status == true && r.UserName == username && r.Role == 'Applicant'
      );
      if (!this.commonService.checkNullorUndefined(applicant)) {
        if (this.FillingPermissions.CanReplyToApplicants) {
          return true;
        } else {
          return false;
        }
      }
    }
    this.toggler(null, i);
    return true;
  }

  GetFilingAdminTeammembers() {
    const data = { FilingId: this.filingId };

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
  }

  GetFilingClientTeammembers() {
    var data = { FilingId: this.filingId };

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

  DeleteMainMessage(deleteMainMessagePopUpTemp, item) {
    this.DeleteManMessModel = this.modalService.open(deleteMainMessagePopUpTemp, {
      centered: true,
      keyboard: false,
      backdrop: 'static',
    });
  }
  ArchieveTopic() {
    this.modalService.dismissAll();
    this.spinner.show();
    var tokenid = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    this.filingService
      .Topicarchive(
        sessionStorage.getItem('ClientAdminOrgId'),
        sessionStorage.getItem('FillingId'),
        tokenid,
        this.TopicId
      )
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.toaster.info(res['Message']);
          this.router.navigate(['client/applayout/fillings/messages']);
        },
        (err) => {
          this.spinner.hide();
          this.toaster.error('Error occurred while archiveing Topic..', 'Error');
        }
      );
  }
  closeModal() {
    this.modalService.dismissAll();
  }

  DeleteMessage(deleteMessagePopUpTemp, item) {
    debugger;
    console.log(item);

    this.GroupMessagingId = item.GroupMessagingId;

    this.DeleteMessModel = this.modalService.open(deleteMessagePopUpTemp, {
      centered: true,
      keyboard: false,
      backdrop: 'static',
    });
  }
  Archievemessage() {
    this.modalService.dismissAll();
    var tokenid = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    this.filingService
      .Groupmessagearchive(
        sessionStorage.getItem('ClientAdminOrgId'),
        sessionStorage.getItem('FillingId'),
        tokenid,
        this.TopicId,
        this.GroupMessagingId
      )
      .subscribe(
        (res) => {
          this.toaster.info(res['Message']);
          this.messages = [];
          this.GetOldMessagesData();
        },
        (err) => {
          this.toaster.error('Error occurred while archiveing Message..', 'Error');
        }
      );
  }

  //edit message topic model
  editTopicModel(content: any, viewdata: any) {
    this.selectedadminTeamMembers = [];
    this.selectedTeamMembers = [];
    viewdata.Users.forEach((element) => {
      const adminMembers = this.adminteamMembersList.find((a) => a.UserName == element.username);
      if (adminMembers) {
        const seletedMemebers: any = {};
        seletedMemebers.AdminID = adminMembers.AdminID;
        seletedMemebers.Email = adminMembers.Email;
        this.selectedadminTeamMembers.push(seletedMemebers);
      } else {
        const clientMembers = this.teamMembersList.find((a) => a.UserName == element.username);
        if (clientMembers) {
          const seletedClientMembers: any = {};
          seletedClientMembers.LawOfficeClientID = clientMembers.LawOfficeClientID;
          seletedClientMembers.Email = clientMembers.Email;
          this.selectedTeamMembers.push(seletedClientMembers);
        }
      }
    });
    this.topicId = viewdata.TopicID;
    this.viewdata = viewdata;
    this.topicModel = this.modalService.open(content, { centered: true });
  }

  editformvalidation() {
    // this.TopicForm = this.fb.group({

    //   'name': ['', Validator.required],
    // });
    this.TopicForm = this.fb.group({
      topic: ['', Validators.required],
      description: ['', Validators.required],
      adminmembers: [''],
      members: [''],
      orgId: [''],
      filingId: [''],
    });
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
        OrgId: sessionStorage.getItem('ClientAdminOrgId'),
        FilingId: sessionStorage.getItem('FillingId'),
        Title: this.TopicForm.value.topic,
        Description: this.TopicForm.value.description,
        AdminIds: this.adminmemberids.toString(),
        LawOfficeClientIds: this.memberids.toString(),
        TopicID: this.topicId,
        IsUpdateAction: true,
      };
      this.filingService.CreateTopicForFiling(data).subscribe(
        (res: any[]) => {
          this.spinner.hide();
          this.topic = '';
          this.description = '';
          this.selectedTeamMembers = [];
          this.selectedadminTeamMembers = [];
          this.TopicForm.reset();
          this.GetTopicsForFilings();
          this.toaster.success('Topic Updated Successfully.');
          this.topicModel.close();
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
    }
  }

  GetTopicsForFilings() {
    this.spinner.show();
    this.filingService
      .getClientTopics(sessionStorage.getItem('ClientAdminOrgId'), sessionStorage.getItem('FillingId'))
      .subscribe(
        (res: any = []) => {
          this.spinner.hide();
          sessionStorage.setItem('message_data', JSON.stringify(res.find((r) => r.TopicID == this.TopicId)));
          this.viewdata = JSON.parse(sessionStorage.getItem('message_data'));
        },
        (error) => {
          this.spinner.hide();
        }
      );
  }

  Close() {
    this.topicModel.close();
    this.topic = '';
    this.description = '';
    this.selectedTeamMembers = [];
    this.selectedadminTeamMembers = [];
    this.adminmemberids = [];
    this.memberids = [];
    this.topicId = '';
  }
  ngOnDestroy() {
    this.closeModal();
    this.connection.stop();
  }
}
