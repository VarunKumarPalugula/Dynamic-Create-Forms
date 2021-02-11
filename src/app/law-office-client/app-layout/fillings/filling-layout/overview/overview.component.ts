import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientFilingsService } from '@app/law-office-client/app-layout/fillings/filings.service';
import { FilingsService } from '@app/law-office-admin/app-layout/fillings/filings.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '@app/shared/service/validation.service';
import { ClientService } from '@app/law-office-client/law-office-client.service';
import { ClientpermissionService } from '@app/auth-guard/client-guard/clientpermission.service';
import { CommonService } from '@app/shared/service/common.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  viewFilingsModel: any;
  trackModel: any;
  noteModel: any;
  orgId: any;
  // tslint:disable-next-line:no-inferrable-types
  isNotes: boolean = true;
  filingId: any;
  taskSummary: any;
  token: any;
  applicantdetails: any = {};
  sponserdetails: any = {};
  fillingdetails: any = {};
  activityinfo: any = [];
  addnote: any;
  notes: any;
  fillings = ['Select an option', 'Pending', 'In Progress', 'Completed'];
  selectedfstatus: any = 'Select an option';
  fillingmodel = { fillingdate: '', fillingtype: '', receiptnumber: '', lcanumber: '' };
  errormessage: any;
  isempty: boolean = false;
  autoupdateselected: boolean = false;
  activityviewall: any = 3;
  activityview: any = 'View All';
  notesviewall: any = 3;
  notesview: any = 'View All';
  Shipmenttittle: any = '';
  applicantassign: any;
  Shipmentnumber: any = '';
  Shipmentdetails: any = [];
  invitenew: any;
  Upcomingtaskdetails: any = [];
  Tasksummarydetails: any = {};
  modelApprove: any;
  clientInvite: any;
  Tasksummarycolors: any = { applicant: '#FF0000', sponser: '#FF0000', yourteam: '#FF0000' };
  applicantData: any;
  filingName: string;
  isLetClientInviteApplicant: boolean;
  clientId: any;
  emptyObj: any;
  applicantsDataList: any = [];
  overviewSection: boolean;
  fillingList: any;
  notelength: number = 0;
  searchFilter: string;
  InviteForm: FormGroup;
  teamInvites = [];
  IsClientInitiated: boolean = false;
  shipmentForm: FormGroup;
  FillingPermissions: any;
  minDate: Date;
  ShippingDeatilsId: string;
  DeleteShipmentnumber: any;
  ShimentModel: any;
  username: string;

  constructor(
    private modalService: NgbModal,
    private clientFilingService: ClientFilingsService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private route: Router,
    private fb: FormBuilder,
    private Valid: ValidationService,
    private clientService: ClientService,
    public permissionService: ClientpermissionService,
    private commonService: CommonService
  ) {
    //this.spinner.show();
    this.filingId = sessionStorage.getItem('FillingId');
    this.orgId = sessionStorage.getItem('ClientAdminOrgId');
    this.filingName = sessionStorage.getItem('FName');
    let isclinet = sessionStorage.getItem('IsClientInitiated');

    if (isclinet == 'true') {
      this.IsClientInitiated = true;
    } else if (isclinet == 'false') {
      this.IsClientInitiated = false;
    }
    // console.log(this.IsClientInitiated)
    //console.log(sessionStorage.getItem('A_AccessToken'));
  }

  ngOnInit() {
    this.filingId = sessionStorage.getItem('FillingId');
    this.username = sessionStorage.getItem('ClientAdminUserName');
    this.FillingPermissions = this.permissionService.FillingPermissions();
    this.GetApplicantDetail();
    this.GetSponserDetail();
    this.GetListOfNotes();
    this.GetFilingDetails();
    this.GetActivityinfo();
    this.GetShipmentTrackingList();
    this.GetAdminUpComingTasks();
    this.GetTaskSummary();
    this.checkFilingName();
    this.InviteApplicantForm();
    this.shipInfo();
  }

  shipInfo() {
    this.shipmentForm = this.fb.group({
      Shipmenttittle: this.Valid.validateform.Tittle,
      Shipmentnumber: this.Valid.validateform.Required,
    });
  }

  approveModel(approve: any) {
    this.modelApprove = this.modalService.open(approve, { centered: true });
  }

  CloseAssignApplicant(assign: string) {
    this.applicantassign.close(assign);
  }

  invitenewteammember(invite: any) {
    this.invitenew = this.modalService.open(invite, { centered: true });
  }

  GetApplicantDetail() {
    const data = { AdminOrgId: this.orgId, FilingId: this.filingId };
    this.clientFilingService.GetApplicantDetails(data).subscribe(
      (res) => {
        this.applicantdetails = JSON.parse(JSON.stringify(res));
        // sessionStorage.setItem('LawOfficeClientID',this.applicantdetails.LawOfficeClientID);
      },
      (err) => {}
    );
  }

  viewall() {
    if (this.activityview == 'View All') {
      if (this.activityinfo.length != 0 && this.activityinfo.length > 3) {
        this.activityviewall = this.activityinfo.length;
        this.activityview = 'View Less';
      }
    } else {
      this.activityviewall = 3;
      this.activityview = 'View All';
    }
  }

  InviteApplicantForm() {
    this.InviteForm = this.fb.group({
      FullName: this.Valid.validateform.Taskname,
      Email: this.Valid.validateform.Email,
    });
  }

  notesclick() {
    if (this.notesview == 'View All') {
      if (this.notes.length != 0 && this.notes.length > 10) {
        this.notesviewall = this.notes.length;
        this.notesview = 'View Less';
      }
    } else {
      this.notesviewall = 10;
      this.notesview = 'View All';
    }
  }

  GetSponserDetail() {
    const data = { AdminOrgId: this.orgId, FilingId: this.filingId };
    this.clientFilingService.GetOrganizationDetails(data).subscribe(
      (res) => {
        this.sponserdetails = JSON.parse(JSON.stringify(res));
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  GetFilingDetails() {
    this.clientFilingService.GetFilingDetails(this.orgId, this.filingId).subscribe(
      (res) => {
        if (res != null) {
          this.spinner.hide();
          this.fillingdetails = JSON.parse(JSON.stringify(res));
          this.fillingmodel.fillingtype = this.fillingdetails.FilingType;
          this.fillingmodel.receiptnumber = this.fillingdetails.ReceiptNumber;
          this.fillingmodel.lcanumber = this.fillingdetails.LCANumber;
          this.selectedfstatus = this.fillingdetails.FilingStatus;
          this.autoupdateselected = this.fillingdetails.AutoUpdate;
        } else {
          this.spinner.hide();
          const fdetails = { FilingStatus: '', CreatedOn: '', FilingType: 'H1', ReceiptNumber: '', LCANumber: '' };
          this.fillingdetails = fdetails;
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  GetActivityinfo() {
    this.spinner.show();
    const data = { OrgId: this.orgId, FilingId: this.filingId };
    this.clientFilingService.GetActivityinfo(data).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.activityinfo = JSON.parse(JSON.stringify(res));
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  GetListOfNotes() {
    this.notes = [];
    this.clientFilingService.GetNote(this.orgId, this.filingId).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.length !== 0) {
          this.isNotes = true;
          this.notes = JSON.parse(JSON.stringify(res));
        } else {
          this.isNotes = false;
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  savenote() {
    if (this.addnote.length <= 0) {
      this.isempty = true;
    } else {
      const data = { FilingId: this.filingId, AdminOrgId: this.orgId, NoteId: '0', Title: this.addnote };
      this.clientFilingService.Addnote(data).subscribe(
        (res: any) => {
          this.addnote = '';
          this.noteModel.close('close click');
          this.GetListOfNotes();
        },
        (err) => {
          this.spinner.hide();
        }
      );
    }
  }

  GetShipmentTrackingList() {
    this.spinner.show();
    var tokenid = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.clientFilingService.getShipmentTrackingList(this.orgId, this.filingId, tokenid).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.length) {
          this.Shipmentdetails = res;
          this.Shipmentdetails.reverse();
        } else {
          this.Shipmentdetails = [];
        }
        this.clearShipTracking();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  clearShipTracking() {
    this.Shipmentnumber = '';
    this.Shipmenttittle = '';
    this.ShippingDeatilsId = '';
    this.shipmentForm.reset();
  }

  GetAdminUpComingTasks() {
    this.spinner.show();
    this.clientFilingService.getUpcomingTasks(this.orgId, this.filingId).subscribe(
      (res) => {
        if (res == null) {
          this.Upcomingtaskdetails = [];
        } else {
          this.Upcomingtaskdetails = JSON.parse(JSON.stringify(res));
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  GetTaskSummary() {
    this.spinner.show();
    this.clientFilingService.getTasksSummary(this.orgId, this.filingId).subscribe(
      (res) => {
        if (res === null || res == '') {
        } else {
          this.taskSummary = res;
          if (this.taskSummary.length === 0) {
            this.Tasksummarydetails = {};
          } else {
            this.Tasksummarydetails = JSON.parse(JSON.stringify(res));
            if (this.Tasksummarydetails.ApplicantTasks.PercentageOfTasksCompleted == 'NaN') {
              this.Tasksummarydetails.ApplicantTasks.PercentageOfTasksCompleted = 0;
              this.Tasksummarycolors.applicant = '#FF0000';
            } else if (parseInt(this.Tasksummarydetails.ApplicantTasks.PercentageOfTasksCompleted, 10) <= 50) {
              this.Tasksummarycolors.applicant = '#FF0000';
            } else if (parseInt(this.Tasksummarydetails.ApplicantTasks.PercentageOfTasksCompleted, 10) <= 80) {
              this.Tasksummarycolors.applicant = '#FCB95B';
            } else {
              this.Tasksummarycolors.applicant = '#006400';
            }
            if (this.Tasksummarydetails.SponserTeamTasks.PercentageOfTasksCompleted == 'NaN') {
              this.Tasksummarydetails.SponserTeamTasks.PercentageOfTasksCompleted = 0;
              this.Tasksummarycolors.sponser = '#FF0000';
            } else if (parseInt(this.Tasksummarydetails.SponserTeamTasks.PercentageOfTasksCompleted) <= 50) {
              this.Tasksummarycolors.sponser = '#FF0000';
            } else if (parseInt(this.Tasksummarydetails.SponserTeamTasks.PercentageOfTasksCompleted) <= 80) {
              this.Tasksummarycolors.sponser = '#FCB95B';
            } else {
              this.Tasksummarycolors.sponser = '#006400';
            }

            if (this.Tasksummarydetails.YourTeamTasks.PercentageOfTasksCompleted == 'NaN') {
              this.Tasksummarydetails.YourTeamTasks.PercentageOfTasksCompleted = 0;
              this.Tasksummarycolors.yourteam = '#FF0000';
            } else if (parseInt(this.Tasksummarydetails.YourTeamTasks.PercentageOfTasksCompleted) <= 50) {
              this.Tasksummarycolors.yourteam = '#FF0000';
            } else if (parseInt(this.Tasksummarydetails.YourTeamTasks.PercentageOfTasksCompleted) <= 80) {
              this.Tasksummarycolors.yourteam = '#FCB95B';
            } else {
              this.Tasksummarycolors.yourteam = '#006400';
            }
          }
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  ModelviewFiling(data: any) {
    this.viewFilingsModel = this.modalService.open(data, { centered: true });
  }
  CloseviewFiling(value: string) {
    this.viewFilingsModel.close(value);
  }
  Modeladdnote(note: any) {
    this.noteModel = this.modalService.open(note, { centered: true });
  }
  Closeaddnote(value: string) {
    this.addnote = '';
    this.noteModel.close(value);
  }
  Modeladdtrack(track: any) {
    this.trackModel = this.modalService.open(track, { centered: true });
  }
  Closeaddtrack(value: string) {
    this.clearShipTracking();
    if (this.trackModel) {
      this.trackModel.close(value);
    }
  }
  fillingstatusselect(value) {
    this.selectedfstatus = value;
  }
  toggleEditable(event) {
    if (event.target.checked) {
      this.autoupdateselected = true;
    } else {
      this.autoupdateselected = false;
    }
  }
  // submitfillingdetails() {
  //   if (this.fillingmodel.fillingdate == '' || this.fillingmodel.fillingdate.length <= 0) {
  //     this.isempty = true;
  //     this.errormessage = 'Filling Date is required.';
  //   } else if (this.fillingmodel.fillingtype == '' || this.fillingmodel.fillingtype.length <= 0) {
  //     this.isempty = true;
  //     this.errormessage = 'Filling Type is required.';
  //   } else if (this.fillingmodel.receiptnumber == '' || this.fillingmodel.receiptnumber.length <= 0) {
  //     this.isempty = true;
  //     this.errormessage = 'Receipt Number is required.';
  //   } else if (this.fillingmodel.lcanumber == '' || this.fillingmodel.lcanumber.length <= 0) {
  //     this.isempty = true;
  //     this.errormessage = 'Lca Number Type is required.';
  //   } else if (this.selectedfstatus == 'Select an option') {
  //     this.isempty = true;
  //     this.errormessage = 'Please select filling status.';
  //   } else {
  //     var fillingdate = JSON.parse(JSON.stringify(this.fillingmodel.fillingdate));

  //     var tokenid = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
  //     var data = {
  //       FilingId: this.filingId,
  //       OrgId: this.orgId,
  //       FilingSubmitDate: fillingdate.year + '-' + fillingdate.month + '-' + fillingdate.day,
  //       FilingType: this.fillingmodel.fillingtype,
  //       RecieptNumber: this.fillingmodel.receiptnumber,
  //       LCANmber: this.fillingmodel.lcanumber,
  //       FilingStatus: this.selectedfstatus,
  //       AutoUpdate: this.autoupdateselected
  //     };

  //     this.clientFilingService.StoreFilingDetails(data, tokenid).subscribe(
  //       (res: any) => {
  //         this.addnote = '';

  //         this.CloseviewFiling('close click');
  //         this.GetFilingDetails();
  //       },
  //       err => {
  //         this.spinner.hide();
  //       }
  //     );
  //   }
  // }

  visitingInput() {
    this.isempty = false;
  }

  EditShiping(item, track) {
    //console.log(item)
    this.ShippingDeatilsId = item.ShippingDeatilsId;
    if (item.Title) {
      this.Shipmenttittle = item.Title;
    } else {
      this.Shipmenttittle = '';
    }
    this.Shipmentnumber = item.TrackingNumber;
    this.trackModel = this.modalService.open(track, { centered: true });
  }

  DeleteShippopup(shipment, deleteshipmentPopUp) {
    this.DeleteShipmentnumber = shipment.TrackingNumber;
    this.ShimentModel = this.modalService.open(deleteshipmentPopUp, { centered: true });
  }

  SubmitTrackingid() {
    let tokenid = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    let data = {
      ShippingDeatilsId: this.ShippingDeatilsId,
      FilingId: this.filingId,
      Title: this.Shipmenttittle,
      ShipmentTrackingNumber: this.Shipmentnumber,
    };
    this.clientFilingService.ShipMentTrackingNumber(this.orgId, data, tokenid).subscribe(
      (res: any) => {
        if (res.Status == 1) {
          this.GetShipmentTrackingList();
          this.toaster.success(res.Message);
        } else if (res.Status == 0) {
          this.toaster.error(res.Message);
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
    this.Closeaddtrack('close click');
  }

  getShipmentDetails() {
    const data = {
      ShippingDeatilsId: '0',
      FilingId: this.filingId,
      Title: this.Shipmenttittle,
      ShipmentTrackingNumber: this.Shipmentnumber,
    };
    this.clientFilingService.getShipmentTrackingList(this.orgId, this.filingId, data).subscribe(
      (res: any) => {
        this.Shipmentnumber = '';
        this.Shipmenttittle = '';

        this.GetShipmentTrackingList();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  //#region for assign and approve applicant
  getFilingApplicantData() {
    this.spinner.show();
    this.clientFilingService.getfilingApplicantData(this.orgId, this.filingId).subscribe(
      (res: any) => {
        this.applicantData = res;
        if (this.applicantData == null) {
          this.isLetClientInviteApplicant = false;
        } else {
          this.isLetClientInviteApplicant = true;
        }
      },
      (error) => {}
    );
  }

  approveApplicant() {
    this.closeModal();

    this.clientFilingService
      .postApproveApplicant(this.orgId, this.filingId, this.applicantData.LawOfficeClientID, this.emptyObj)
      .subscribe(
        (res: any) => {
          this.toaster.info('Applicant Approved Succesfullly');
          this.GetFiledFilings();
        },
        (error) => {
          //  console.log('approveerror', error)
        }
      );
  }

  GetFiledFilings() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    this.clientFilingService.getFilings(this.token).subscribe(
      (res: any[]) => {
        this.spinner.hide();
        this.fillingList = res;
        const index = sessionStorage.getItem('FilingIndex');
        const parsedIndex = parseInt(index, 10);
        sessionStorage.setItem('FName', this.fillingList[parsedIndex].FName);
        this.filingName = sessionStorage.getItem('FName');
        this.clientFilingService.filingName = this.filingName;
        this.checkFilingName();
      },
      (err) => {
        this.spinner.hide();
        this.toaster.error('Error Occured');
      }
    );
  }

  applicantsList() {
    this.clientFilingService.getApplicantList().subscribe(
      (res: any) => {
        this.applicantsDataList = res;
        for (let i = 0; i < this.applicantsDataList.length; i++) {
          this.applicantsDataList[i].assign = false;
        }
      },
      (error) => {}
    );
  }

  selectApplicant(index: any, applicant: any) {
    this.applicantAssign(index);
    this.applicantsDataList[index].assign = true;
    this.applicantData = applicant;
  }

  applicantAssign(index: any) {
    for (let i = 0; i < this.applicantsDataList.length; i++) {
      this.applicantsDataList[i].assign = false;
    }
  }
  assignSelected() {
    // this.isLetClientInviteApplicant = true;
    //console.log( this.applicantData)
    // console.log( this.emptyObj)
    if (this.applicantData == null) {
      this.toaster.info('Please select applicant.');
    } else {
      this.spinner.show();

      this.clientFilingService
        .AssignApplicantForFiling(this.orgId, this.filingId, this.applicantData.LawOfficeClientID, this.emptyObj)
        .subscribe(
          (res: any) => {
            this.spinner.hide();
            this.toaster.success('Applicant assigned Succesfullly.');
            this.GetFiledFilings();
            this.GetApplicantDetail();
            this.GetSponserDetail();
            this.GetListOfNotes();
            this.GetFilingDetails();
            this.GetActivityinfo();
            this.GetShipmentTrackingList();
            this.GetAdminUpComingTasks();
            this.GetTaskSummary();
            this.checkFilingName();
          },
          (error) => {
            this.spinner.hide();
            this.toaster.error('Applicant assignment failed.');
            // console.log('assigne', error)
          }
        );
    }

    this.closeModal();
  }

  openApplicants(assign: any) {
    this.applicantData = null;
    this.applicantassign = this.modalService.open(assign, { centered: true });
    for (let i = 0; i < this.applicantsDataList.length; i++) {
      this.applicantsDataList[i].assign = false;
    }
  }

  checkFilingName() {
    if (this.filingName === 'InComplete') {
      this.overviewSection = false;
      this.getFilingApplicantData();
      this.applicantsList();
      if (sessionStorage.getItem('LetClientInvite') === 'true') {
        this.isLetClientInviteApplicant = false;
      } else {
        this.isLetClientInviteApplicant = true;
      }
    } else {
      this.overviewSection = true;
    }
  }

  closeAssignModal() {
    for (let i = 0; i < this.applicantsDataList.length; i++) {
      this.applicantsDataList[i].assign = false;
    }
    this.closeModal();
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  Closeinvitenewteammember(value: string) {
    //console.log(value)
    this.invitenew.close(value);
  }

  addnotechnage(item) {
    //console.log('lenght', item.length);
    this.notelength = item.length;
  }

  sendinvite() {
    this.teamInvites = [];
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    let data = {
      OrgId: sessionStorage.getItem('ClientOrganisationID'),
      TeamMemberType: '4',
      FullName: this.InviteForm.value.FullName,
      Email: this.InviteForm.value.Email,
      JobCardTitle: '',
    };
    this.teamInvites.push(data);
    // console.log(this.teamInvites)
    this.Closeinvitenewteammember('close');
    this.spinner.show();
    this.clientService.TeamInvitation(this.teamInvites, this.commonService.getEnvDetails()).subscribe(
      (data1: any[]) => {
        this.spinner.hide();
        //console.log('invite', data1)

        if (data1[0].Status === 1) {
          this.toaster.success('Invitation sent successfully.');
        } else {
          this.toaster.error('invitation failed to send');
        }
      },
      (err) => {
        this.toaster.error('error occured');
      }
    );
  }

  toggler(ev: any, id: any) {
    id = 'togg' + id;
    document.getElementById(id).classList.toggle('d-n');
  }

  DeleteShipment() {
    this.modalService.dismissAll();
    this.spinner.show();
    let tokenid = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    this.clientFilingService
      .deleteshipmenttrackingnumber(this.orgId, this.filingId, this.DeleteShipmentnumber, tokenid)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.toaster.success('', 'Shipment deleted successfully.');
          this.DeleteShipmentnumber = '';
          this.GetShipmentTrackingList();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }
  ngOnDestroy() {
    this.modalService.dismissAll();
  }
  //#endregion
}
