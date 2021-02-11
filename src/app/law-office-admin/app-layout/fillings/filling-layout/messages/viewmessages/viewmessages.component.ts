import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '@app/shared/service/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApicallsService } from '@app/shared/service/apicalls.service';
import { AdminpermissionService } from '@app/auth-guard/admin/adminpermission.service';
import { FilingsService } from '@app/law-office-admin/app-layout/fillings/filings.service';
import { ToastrService } from 'ngx-toastr';
import { RandomColor } from 'angular-randomcolor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ISignalRConnection } from 'ng2-signalr';
import { CommonService } from '@app/shared/service/common.service';

@Component({
  selector: 'app-viewmessages',
  templateUrl: './viewmessages.component.html',
  styleUrls: ['./viewmessages.component.scss'],
})
export class ViewmessagesComponent implements OnInit, OnDestroy {
  message_dat: any;
  isshwowing: boolean = false;
  viewdata: any;
  connecting = false;
  connected = false;
  sending = false;
  messages: any = [];
  Replies: number;
  AdminId = sessionStorage.getItem('LoguserId');
  MemberAddedMessage = '';
  name = '';
  UserName = sessionStorage.getItem('AdminUserName');
  message = '';
  submessage = '';
  TopicId = sessionStorage.getItem('AtopicId');
  groupname: any;
  url: any;
  issubmessagesopen: boolean = true;
  FillingPermissions: any = {};
  TopicForm: FormGroup;
  maxChars = 500;
  description: string = '';
  adminteamMembersList: any = [];
  selectedadminTeamMembers: any = [];
  adminteamMembersDropsownSettings = {};
  teamMembersList: any = [];
  selectedClientMembers: any = [];
  teamMembersDropsownSettings = {};
  memberids: any = [];
  adminmemberids: any = [];
  errormessage: '';
  filingId: any = '';
  orgId: any;
  allpro = [{ name: 'card1' }, { name: 'card2' }];
  colors: any = [];
  Subcolors: any = [];
  DeleteMessModel: any;
  DeleteManMessModel: any;
  GroupMessagingId: any = '';
  topicModel: any;
  topic: any = '';
  isempty: boolean;
  topicId: any;
  token: any;
  ADMINID: any;
  private connection: ISignalRConnection;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private ngZone: NgZone,
    private spinner: NgxSpinnerService,
    private globalApi: ApicallsService,
    private permissionService: AdminpermissionService,
    private filingService: FilingsService,
    private toaster: ToastrService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private commonService: CommonService
  ) {
    this.connection = route.snapshot.data['connection'];
    this.getColor();
    this.editTopicformvalidation();

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
    this.filingId = sessionStorage.getItem('FillingId');
    this.orgId = sessionStorage.getItem('OrganisationID');
    this.FillingPermissions = this.permissionService.FillingPermissions();
    this.viewdata = JSON.parse(sessionStorage.getItem('message_data'));
    this.groupname = sessionStorage.getItem('OrganisationID') + this.viewdata.FilingId + this.TopicId;
    this.GetFilingAdminTeammembers();
    this.GetFilingClientTeammembers();
    this.TopicId = this.viewdata.TopicID;
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
        'ReceiveOldMessagesOfAdmin',
        sessionStorage.getItem('OrganisationID'),
        this.viewdata.FilingId,
        this.TopicId,
        this.groupname,
        sessionStorage.getItem('LoguserId')
      )
      .then(() => {
        this.message = '';
        this.sending = false;
        this.spinner.hide();
      });
  }

  async sendMessage() {
    if (!this.message) {
      return;
    }
    this.sending = true;
    await this.connection
      .invoke(
        'sendMessage',
        sessionStorage.getItem('OrganisationID'),
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
  GetFilingAdminTeammembers() {
    var data = { FilingId: this.filingId, AdminOrgId: this.ADMINID };
    let clientobj = {
      FilingId: sessionStorage.getItem('FillingId'),
      AdminOrgId: sessionStorage.getItem('OrganisationID'),
    };
    this.filingService.GetFilingAdminTeammembers(clientobj, this.token).subscribe(
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

  async sendSubMessage(data: any, submessage) {
    if (!submessage) {
      return;
    }
    //this.submessage='testmessage';
    this.sending = true;
    await this.connection
      .invoke(
        'SendSubMessage',
        sessionStorage.getItem('OrganisationID'),
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

  receiveOldMessages(OldMessages) {
    this.message = '';

    this.ngZone.run(() => {
      this.messages = OldMessages;
      this.messages.reverse();
    });
  }

  receiveMessage(data) {
    //run inside zone to update UI

    this.message = '';
    this.ngZone.run(() => {
      this.refresh();
    });
    this.message = '';
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
      businessClient = this.teamMembersList.find(
        (r) => r.Status == true && (r.Role == 'Business Client' || r.Role == 'Sponserer')
      );
      if (!this.commonService.checkNullorUndefined(businessClient)) {
        if (this.FillingPermissions.CanReplyToClients) {
          return true;
        } else {
          return false;
        }
      }
      let applicant: any = this.teamMembersList.find((r) => r.Status == true && r.Role == 'Applicant');
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

  Archievemessage() {
    this.modalService.dismissAll();
    var tokenid = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.filingService
      .Groupmessagearchive(this.orgId, this.filingId, tokenid, this.TopicId, this.GroupMessagingId)
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
  DeleteMessage(deleteMessagePopUpTemp, item) {
    this.GroupMessagingId = item.GroupMessagingId;

    this.DeleteMessModel = this.modalService.open(deleteMessagePopUpTemp, {
      centered: true,
      keyboard: false,
      backdrop: 'static',
    });
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
    var tokenid = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.filingService.Topicarchive(this.orgId, this.filingId, tokenid, this.TopicId).subscribe(
      (res) => {
        this.toaster.info(res['Message']);
        this.router.navigate(['admin/fillings/messages']);
      },
      (err) => {
        this.toaster.error('Error occurred while archiveing Topic..', 'Error');
      }
    );
  }
  closeModal() {
    this.modalService.dismissAll();
  }

  // edit popup model
  editTopicModel(content: any, viewdata: any) {
    this.selectedadminTeamMembers = [];
    this.selectedClientMembers = [];
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
          this.selectedClientMembers.push(seletedClientMembers);
        }
      }
    });
    this.topicId = viewdata.TopicID;
    this.topicModel = this.modalService.open(content, { centered: true });
  }

  Closesent() {
    this.topicModel.close();
    this.topic = '';
    this.description = '';
    this.selectedClientMembers = [];
    this.selectedadminTeamMembers = [];
    this.adminmemberids = [];
    this.memberids = [];
  }
  editTopicformvalidation() {
    this.TopicForm = this.fb.group({
      topic: ['', Validators.required],
      description: ['', Validators.required],
      adminmembers: ['', Validators.required],
      members: ['', Validators.required],
      TopicID: [],
    });
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

      this.selectedClientMembers.forEach((v) => {
        this.memberids.push(v.LawOfficeClientID);
      });

      var data = {
        OrgId: this.orgId,
        FilingId: this.filingId,
        Title: this.TopicForm.value.topic,
        TopicID: this.topicId,
        Description: this.TopicForm.value.description,
        AdminIds: this.adminmemberids.toString(),
        LawOfficeClientIds: this.memberids.toString(),
        IsUpdateAction: true,
      };
      var tokenid = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
      this.filingService.CreateTopicForFiling(data, tokenid).subscribe(
        (res: any) => {
          if (res.Status == 1) {
            this.topicModel.close();
            this.topic = '';
            this.description = '';
            this.selectedClientMembers = [];
            this.selectedadminTeamMembers = [];
            this.GetTopicsForFilings();
            this.toaster.success(res.Message);
          } else {
            this.spinner.hide();
            this.toaster.error(res.Message);
          }
        },
        (err) => {
          this.toaster.error('error occured');
        }
      );
    }
  }

  GetTopicsForFilings() {
    this.filingService.GetTopicsForFilings(this.orgId, this.filingId, this.token).subscribe(
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
    this.topicId = '';
    this.topic = '';
    this.description = '';
    this.selectedClientMembers = [];
    this.selectedadminTeamMembers = [];
    this.adminmemberids = [];
    this.memberids = [];
  }

  ngOnDestroy() {
    this.closeModal();
    this.connection.stop();
  }
}
