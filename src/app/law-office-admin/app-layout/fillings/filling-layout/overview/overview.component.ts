import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilingsService } from '@app/law-office-admin/app-layout/fillings/filings.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminpermissionService } from '@app/auth-guard/admin/adminpermission.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '@app/law-office-admin/admin.service';
import { ToastrService } from 'ngx-toastr';
import { AdminClientService } from '@app/law-office-admin/app-layout/clients/client.service';
import { CommonService } from '@app/shared/service/common.service';
import { ValidationService } from '@app/shared/service/validation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {

  applicantdetails: any = {};
  sponserdetails: any = {};
  fillingDetails: any = {};
  viewFilingsModel: any;
  relatedfilingsModel: any;
  trackModel: any;
  noteModel: any;
  orgId: any;
  filingName: string;
  filingId: any;
  activityinfo: any = [];
  addnote: any = '';
  notes: any;
  fillings = ['Select an option', 'Pending', 'In Progress', 'Completed'];
  selectedfstatus: any = 'Select an option';
  fillingmodel: any = {};
  errormessage: any;
  isempty: boolean = false;
  autoupdateselected: boolean = false;
  activityviewall: any = 3;
  activityview: any = 'View All';
  notesviewall: any = 10;
  notesview: any = 'View All';
  fillingList: any = [];
  minDate: Date;
  overviewSection: boolean;
  Shipmenttittle: any = '';
  Shipmentnumber: any = '';
  modelApprove: any;
  Shipmentdetails: any = [];
  Upcomingtaskdetails: any = [];
  Tasksummarydetails: any = {};
  Tasksummarycolors: any = { applicant: '#FF0000', sponser: '#FF0000', yourteam: '#FF0000' };
  FillingPermissions: any = {};
  relatedfilling: any = [];
  fliingForm: FormGroup;
  fillingTypes: any = [];
  notelength: number = 0;
  ShippingDeatilsId: any;
  ShimentModel: any;
  DeleteShipmentnumber: any;
  IsClientInitiated: boolean = false;
  filingStatusModel: any;
  shipmentForm: FormGroup;
  adminClientsListData: any;
  username: string;
  emitGetUITemplateResults: Subscription;
  templateList: any = [];
  selectedTeamplate = [];
  selectedFillingType: string;
  selectedTemplate: any;

  constructor(
    private modalService: NgbModal,
    private filingService: FilingsService,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private permissionService: AdminpermissionService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private clientService: AdminClientService,
    private commonService: CommonService,
    private Valid: ValidationService,

  ) {
    this.filingName = sessionStorage.getItem('FName');
    this.emitGetUITemplateResults = this.commonService.emitGetUITemplateResults.subscribe((res) => {
      if (!commonService.checkNullorUndefined(res)) {
        this.templateList = res['Templates'];
      }
    });

  }

  ngOnInit() {
    this.FillingPermissions = this.permissionService.FillingPermissions();
    this.filingId = sessionStorage.getItem('FillingId');
    this.orgId = sessionStorage.getItem('OrganisationID');
    let isclinet = sessionStorage.getItem('IsClientInitiated');
    this.username = sessionStorage.getItem('AdminUserName');
    if (isclinet == 'true') {
      this.IsClientInitiated = true;
    } else if (isclinet == 'false') {
      this.IsClientInitiated = false;
    }

    this.shipInfo();
    this.getApplicantDetail();
    this.relatedfillings();
    this.adminClientsList();
    this.getSponserDetail();
    this.getActivityinfo();
    this.getListOfNotes();
    this.getShipmentTrackingList();
    this.getFilingDetails();

    this.GetTaskSummary();
    this.GetAdminUpComingTasks();
    this.checkFilingName();
    this.fillingformvalidation();
    this.GetFillingTypes();
    if (this.filingName == 'InComplete' && this.IsClientInitiated) {
      this.commonService.getFilingTemplates(this.selectedFillingType = 'H1', sessionStorage.getItem('LoguserId'), sessionStorage.getItem('OrganisationID'));
    }
  }

  shipInfo() {
    this.shipmentForm = this.fb.group({
      Shipmenttittle: this.Valid.validateform.Tittle,
      Shipmentnumber: this.Valid.validateform.Required,
    });
  }
  fillingformvalidation() {
    this.fliingForm = this.fb.group({
      fillingdate: this.Valid.validateform.Required,
      fillingtype: this.Valid.validateform.Required,
      receiptnumber: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      lcanumber: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      filingstatus: this.Valid.validateform.Required,
    });
  }

  //getApplicantDetail
  getApplicantDetail() {
    var data = { AdminOrgId: this.orgId, FilingId: this.filingId };
    this.applicantdetails = {};
    this.filingService.GetApplicantDetail(data).subscribe(
      (res) => {
        if (!this.commonService.checkNullorUndefined(res)) {
          this.applicantdetails = res;
          sessionStorage.setItem('LawOfficeClientID', this.applicantdetails.LawOfficeClientID);
        }
      },
      (err) => { }
    );
  }
  //relatedfillings
  relatedfillings() {
    this.spinner.show();
    this.filingService.relatedfillings(this.orgId, this.filingId).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (!this.commonService.checkNullorUndefined(res) && res.length) {
          this.relatedfilling = res;
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  //getSponserDetail
  getSponserDetail() {
    this.sponserdetails = {};
    var data = { AdminOrgId: this.orgId, FilingId: this.filingId };
    this.filingService.getSponserDetail(data).subscribe(
      (res) => {
        if (!this.commonService.checkNullorUndefined(res)) {
          this.sponserdetails = res;
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  //getActivityinfo
  getActivityinfo() {
    this.spinner.show();
    var data = { OrgId: this.orgId, FilingId: this.filingId };
    this.filingService.getActivityinfo(data).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (!this.commonService.checkNullorUndefined(res) && res.length) {
          this.activityinfo = res;
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  //getListOfNotes
  getListOfNotes() {
    this.notes = [];
    this.filingService.getNote(this.orgId, this.filingId).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (!this.commonService.checkNullorUndefined(res)) {
          this.notes = res;
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  //saveNote
  saveNote() {
    const data = { FilingId: this.filingId, AdminOrgId: this.orgId, NoteId: '0', Title: this.addnote };
    this.filingService.addNote(data).subscribe(
      (res: any) => {
        this.addnote = '';
        this.noteModel.close('close click');
        this.getListOfNotes();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  getShipmentTrackingList() {
    this.spinner.show();
    this.filingService.getShipmentTrackingList(this.orgId, this.filingId).subscribe(
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

  // getFilingDetails
  getFilingDetails() {
    this.spinner.show();
    this.fillingDetails = {};
    this.filingService.getFilingDetails(this.orgId, this.filingId).subscribe(
      (res) => {
        this.spinner.hide();
        this.fillingDetails = {};
        if (!this.commonService.checkNullorUndefined(res)) {
          this.fillingDetails = res;
          this.fillingmodel.fillingtype = this.fillingDetails.FilingType;
          this.fillingmodel.receiptnumber = this.fillingDetails.ReceiptNumber;
          this.fillingmodel.lcanumber = this.fillingDetails.LCANumber;
          this.selectedfstatus = this.fillingDetails.FilingStatus;
          this.autoupdateselected = this.fillingDetails.AutoUpdate;
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }


  toggler(ev: any, id: any) {
    id = 'togg' + id;
    document.getElementById(id).classList.toggle('d-n');
  }

  //Get Fillings
  GetFillingTypes() {
    this.spinner.show();
    this.adminService.GetFilings().subscribe(
      (res: any[]) => {
        this.spinner.hide();
        this.fillingTypes = res;
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  selectFillingType(event: any) { }

  checkFilingName() {
    if (this.filingName == 'InComplete') {
      this.overviewSection = false;
    } else {
      this.overviewSection = true;
    }
  }

  approveFiling() {
    
    const reqObj = {
      "Templates": this.templateList.filter(res => res.DisplayTemplateTitle == this.selectedTemplate),
      "OrgID": this.orgId,
      "FilingId": this.filingId
    }
    this.filingService.ApproveFiling(reqObj).subscribe(
      (res: any) => {
        this.toaster.success('Filling approved successfully.');
        this.closeModal();
        this.GetFiledFilings();
      },
      (error) => { }
    );
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  selectTemplateType(event) {
    this.selectedTemplate = event.target.value;
  }

  GetFiledFilings() {
    this.spinner.show();
    this.adminService.GetFiledFilings(sessionStorage.getItem('OrganisationID')).subscribe(
      (res: any[]) => {
        this.spinner.hide();
        for (var i = 0; i < res.length; i++) {
          if (res[i].FilingStatus == null) {
            res[i].FilingStatus = 'Pending';
          } else {
            res[i].FilingStatus = res[i].FilingStatus;
          }
          this.fillingList.push(res[i]);
        }
        const index = sessionStorage.getItem('FilingIndex');
        const parsedIndex = parseInt(index, 10);
        sessionStorage.setItem('FName', this.fillingList[parsedIndex].FName);
        this.filingName = sessionStorage.getItem('FName');
        this.filingService.filingName = this.filingName;
        this.checkFilingName();
      },
      (err) => { }
    );
  }

  approveModel(approve: any) {
    if (!this.selectedTemplate) {
      this.toaster.error('Please select template before creating filing')
      return;
    }
    this.modelApprove = this.modalService.open(approve, { centered: true });
  }

  Viewlcanumber() {
    window.open('https://icert.doleta.gov/', '_blank');
  }



  //adminClientsList
  adminClientsList() {
    this.clientService.adminClientsList(sessionStorage.getItem('OrganisationID')).subscribe(
      (data: any) => {
        this.adminClientsListData = data;
        this.getFilingClientTeammembers();
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }


  getFilingClientTeammembers() {
    let teamobj = {
      FilingId: sessionStorage.getItem('FillingId'),
      AdminOrgId: sessionStorage.getItem('OrganisationID'),
    };
    this.adminService.GetFilingClientTeammembers(teamobj).subscribe(
      (res: any[]) => {
        if (res != null && res != undefined) {
          let businessClient: any = res.find((r) => r.Status == true && r.Role == 'Business Client')
          if (!this.commonService.checkNullorUndefined(businessClient)) {
            sessionStorage.setItem('ClientOrganisationID', businessClient.ClientOrgId);
          } else {
            let businessClient: any = res.find((r) => r.Status == true && r.Role == 'Sponserer')
            let isClient = this.adminClientsListData.find(c => c.SetType == 1 && c.UserName == businessClient.UserName);
            if (!this.commonService.checkNullorUndefined(isClient)) {
              sessionStorage.setItem('ClientOrganisationID', businessClient.ClientOrgId);
            }
          }
          let applicant: any = res.find((r) => r.Status == true && r.Role == 'Applicant')
          if (!this.commonService.checkNullorUndefined(applicant)) {
            sessionStorage.setItem('LawOfficeClientID', applicant.LawOfficeClientID);
          }
        }
      },
      (err) => {
        this.toaster.error('error occured');
      }
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







  clearShipTracking() {
    this.Shipmentnumber = '';
    this.Shipmenttittle = '';
    this.ShippingDeatilsId = '';
    this.shipmentForm.reset();
  }
  GetAdminUpComingTasks() {
    this.spinner.show();
    var data = { OrgId: this.orgId, FilingId: this.filingId };
    var tokenid = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.filingService.AdminUpComingTasks(this.orgId, this.filingId, tokenid).subscribe(
      (res) => {
        this.spinner.hide();
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
    this.Tasksummarydetails = {};
    this.filingService.TaskSummary(this.orgId, this.filingId).subscribe(
      (res) => {
        this.spinner.hide();
        if (res !== null) {
          this.Tasksummarydetails = JSON.parse(JSON.stringify(res));
          if (this.Tasksummarydetails.ApplicantTasks.PercentageOfTasksCompleted == 'NaN') {
            this.Tasksummarydetails.ApplicantTasks.PercentageOfTasksCompleted = 0;
            this.Tasksummarycolors.applicant = '#FF0000';
          } else if (parseInt(this.Tasksummarydetails.ApplicantTasks.PercentageOfTasksCompleted) <= 50) {
            this.Tasksummarycolors.applicant = '#FF0000';
          } else if (parseInt(this.Tasksummarydetails.ApplicantTasks.PercentageOfTasksCompleted) <= 80) {
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
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }


  ModelviewFiling(data: any) {
    this.viewFilingsModel = this.modalService.open(data, { centered: true, size: 'lg' });
  }
  CloseviewFiling(value: string) {
    this.viewFilingsModel.close(value);
  }
  modelAddNote(note: any) {
    this.noteModel = this.modalService.open(note, { centered: true });
  }
  relatedFilingsModel(related) {
    this.relatedfilingsModel = this.modalService.open(related, { centered: true });
  }
  relatedFilingsclose(value) {
    this.relatedfilingsModel.close(value);
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
  submitfillingdetails(FilingStatusCompleted) {
    if (this.fliingForm.valid) {
      if (this.selectedfstatus === 'Completed') {
        this.filingStatusModel = this.modalService.open(FilingStatusCompleted, { centered: true });
      } else {
        this.filingSubmit();
      }
    }
  }

  filingSubmit() {
    // const fillingdate = new Date(this.fillingmodel.fillingdate);
    const data = {
      FilingId: this.filingId,
      OrgId: this.orgId,
      FilingSubmitDate: this.fillingmodel.fillingdate,
      FilingType: this.fillingmodel.fillingtype,
      RecieptNumber: this.fillingmodel.receiptnumber,
      LCANmber: this.fillingmodel.lcanumber,
      FilingStatus: this.selectedfstatus,
      AutoUpdate: this.autoupdateselected,
    };
    this.spinner.show();
    this.filingService.StoreFilingDetails(data).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.addnote = '';
        this.modalService.dismissAll();
        this.getFilingDetails();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  closeModalfilingStatus(view) {
    this.modalService.dismissAll();
    this.ModelviewFiling(view);
  }
  visitingInput() {
    this.isempty = false;
  }
  SubmitTrackingid() {
    let tokenid = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    let data = {
      ShippingDeatilsId: this.ShippingDeatilsId,
      FilingId: this.filingId,
      Title: this.Shipmenttittle,
      ShipmentTrackingNumber: this.Shipmentnumber,
    };
    this.filingService.ShipMentTrackingNumber(this.orgId, data, tokenid).subscribe(
      (res: any) => {
        if (res.Status == 1) {
          this.getShipmentTrackingList();
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

  addnotechnage(item) {
    this.notelength = item.length;
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
  DeleteShipment() {
    this.modalService.dismissAll();
    this.spinner.show();
    let tokenid = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.filingService
      .deleteshipmenttrackingnumber(this.orgId, this.filingId, this.DeleteShipmentnumber, tokenid)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.toaster.success('', 'Shipment deleted successfully.');
          this.DeleteShipmentnumber = '';
          this.getShipmentTrackingList();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }
  ngOnDestroy() {
    this.modalService.dismissAll();
    this.emitGetUITemplateResults.unsubscribe();
    this.commonService.clearCommonEmitters();

  }
}
