import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AdminService } from '@app/law-office-admin/admin.service';
import { FilingsService } from '@app/law-office-admin/app-layout/fillings/filings.service';
import { ValidationService } from '@app/shared/service/validation.service';
import { AdminpermissionService } from '@app/auth-guard/admin/adminpermission.service';
import { ToastrService } from 'ngx-toastr';
import { AutotimeoutService } from '@app/shared/service/autotimeout.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '@app/shared/service/storage.service';
import { CommonService } from '@app/shared/service/common.service';

@Component({
  selector: 'app-masterpage',
  templateUrl: './masterpage.component.html',
  styleUrls: ['./masterpage.component.scss'],
  providers: [NgbDropdownConfig],
})
export class MasterpageComponent implements OnInit {
  menuHidden = false;
  shipmentTracking: any;
  confirmData: any;
  successPopupModel: any;
  assignlcaNumber: any;
  assignreceiptNumber: any;
  invitemember: any;
  selectedFilingId: any = '';
  FilingLcaNumber: any = '';
  choice: any = [{ OrgId: sessionStorage.getItem('OrganisationID') }];
  token: any;
  teaminvite: any;
  trackingNumber: any;
  filingRecieptNumber: any = '';
  selectedFilingDiv: boolean = false;
  fillingList: any = [];
  response: any;
  selectedFilingInfo: any;
  filingDropDownSettings: any;
  isAuthorize = false;
  loadSubAdminPermissions: any = {};
  username: string;
  email: string;
  userLogoName: string;
  isSubAdminAcess = true;
  Sfliinginfo: any = [];
  shipmentForm: FormGroup;
  ReceiptForm: FormGroup;
  LCAForm: FormGroup;
  logOutConfrimation: any;
  Shipmenttittle: any;
  FillingPermissions: any;
  constructor(
    config: NgbDropdownConfig,
    private modalService: NgbModal,
    private router: Router,
    private adminService: AdminService,
    private filingService: FilingsService,
    private Valid: ValidationService,
    private fb: FormBuilder,
    public permissionService: AdminpermissionService,
    private toaster: ToastrService,
    private autoTimeService: AutotimeoutService,
    private spinner: NgxSpinnerService,
    public sessionImage: StorageService,
    private commonService: CommonService
  ) {
    this.autoTimeService.autoTimeOut();
  }

  ngOnInit() {
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.GetFiledFilings();
    this.teaminvite = this.fb.group({
      Fullname: this.Valid.TeamInvite.fullname,
      Email: this.Valid.validateform.Email,
    });
    this.email = sessionStorage.getItem('Email');
    this.username = sessionStorage.getItem('AdminUserName');
    //console.log(this.username)
    if (this.username) {
      this.userLogoName = this.username.slice(0, 1).toUpperCase();
      //console.log('slice',this.userLogoName )
    }
    //here we are getting role team member/primary admin/sub admin
    this.isAuthorize = this.permissionService.isGetAcess();
    this.loadSubAdminPermissions = this.permissionService.GenericPermissions();
    this.isSubAdminAcess = this.permissionService.isSubAdminGetAcess();
    this.AssignshipmentForm();
    this.AssignLCAForm();
    this.AssignreceiptForm();
    this.FillingPermissions = this.permissionService.FillingPermissions();

    if (this.sessionImage.getImage() == '') {
      console.log('empty');
    } else if (this.sessionImage.getImage() == null) {
      console.log('null');
    } else {
      console.log('sessionIamge' + this.sessionImage.getImage());
    }
  }

  AssignshipmentForm() {
    this.shipmentForm = this.fb.group({
      Shipmenttittle: this.Valid.validateform.Required,
      Shpmentnumber: this.Valid.validateform.Taskname,
      Fillingselected: this.Valid.validateform.NotRequired,
    });
  }

  AssignLCAForm() {
    this.LCAForm = this.fb.group({
      lcanumber: this.Valid.validateform.Taskname,
      Fillingselected: this.Valid.validateform.NotRequired,
    });
  }

  AssignreceiptForm() {
    this.ReceiptForm = this.fb.group({
      receiptnumber: this.Valid.validateform.Taskname,
      Fillingselected: this.Valid.validateform.NotRequired,
    });
  }

  onfillingSelect() {}

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  confirmationSuccessPopup(data: any, tempref: any) {
    this.successPopupModel = this.modalService.open(tempref, { centered: true, keyboard: false, backdrop: 'static' });
    this.confirmData = data;
  }

  closeTeamInvite(event: any, value: any) {
    this.modalService.dismissAll();
  }

  modelShipmentTracking(event: any, data: any) {
    this.selectedFilingDiv = false;
    this.trackingNumber = '';
    this.Sfliinginfo = [];
    this.shipmentTracking = this.modalService.open(data, { centered: true });
  }

  closetracking(value: string) {
    this.shipmentTracking.close(value);
    this.removeActiveElement();
  }

  activeElement(event: any) {
    event.target.classList.value += ' active';
  }

  modalClose() {
    this.modalService.dismissAll();
    this.activeElement(event);
    this.selectedFilingInfo = [];
  }

  removeActiveElement() {
    const elements = document.getElementsByClassName('dropdown-item');
    Object.keys(elements).map((key) => {
      elements[key].classList.remove('active');
    });
  }

  selectedFiling(filing: any) {
    //console.log(this.Sfliinginfo)
    this.selectedFilingDiv = true;
    const index = this.fillingList.findIndex((x: any) => x.FillingId === filing.FillingId);
    this.selectedFilingId = filing.FillingId;
    this.selectedFilingInfo = this.fillingList[index];
  }

  GetFiledFilings() {
    this.adminService.GetFiledFilings(sessionStorage.getItem('OrganisationID')).subscribe(
      (res: any[]) => {
        for (var i = 0; i < res.length; i++) {
          if (res[i].FilingStatus == null) {
            res[i].FilingStatus = 'Pending';
          } else {
            res[i].FilingStatus = res[i].FilingStatus;
          }
          this.fillingList.push(res[i]);
        }
        this.fillingList = res.reverse();
        this.filingDropDownSettings = {
          singleSelection: true,
          idField: 'FillingId',
          textField: 'FName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: this.fillingList.length,
          allowSearchFilter: true,
        };
      },
      (err) => {
        this.toaster.error('error occured');
      }
    );
  }

  sendInvitation() {
    setTimeout(() => {
      this.modalClose();
    }, 1000);
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService.TeamInvitation(this.choice, this.token, this.commonService.getEnvDetails()).subscribe(
      (data1: any[]) => {
        this.response = data1;
        this.choice = this.confirmData;
        // tslint:disable-next-line:triple-equals
        if (this.response[0].Status == 1) {
          sessionStorage.setItem('invitylist', JSON.stringify(this.choice));
          this.router.navigate(['/admin/team/invitesuccess']);
        } else {
          this.toaster.error('invitation failed to send');
          // this.ErrorMessage = "Already Email ID exists in this role";
        }
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    );
  }

  addTrackingNumber() {
    this.modalService.dismissAll();
    this.spinner.show();
    const obj = {
      ShipmentTrackingNumber: this.trackingNumber,
      Title: this.Shipmenttittle,
      FilingId: this.selectedFilingId,
    };
    this.filingService.addShipmentNumber(sessionStorage.getItem('OrganisationID'), obj, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.toaster.success('Tracking Number Added to Filing Successfully');
      },
      (error) => {
        this.spinner.hide();
        this.toaster.error('Error OCcured');
      }
    );
  }

  addLcaNumber() {
    this.modalService.dismissAll();
    this.spinner.show();

    const obj = {
      LCANumber: this.FilingLcaNumber,
      FilingId: this.selectedFilingId,
      OrgId: sessionStorage.getItem('OrganisationID'),
    };
    this.filingService.addLcaNumber(obj, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.toaster.success('LCA Number Added to Filing Successfully');
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  addRecieptNumber() {
    this.modalService.dismissAll();
    this.spinner.show();
    const obj = {
      ReceiptNumber: this.filingRecieptNumber,
      FilingId: this.selectedFilingId,
      OrgId: sessionStorage.getItem('OrganisationID'),
    };
    this.filingService.addRecieptNumber(obj, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.toaster.info('Reciept Number Added to Filing Successfully');
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
    this.closeConfirmDelete('close click');
  }
  logOutConfirmationPopUp(popUp: any) {
    this.logOutConfrimation = this.modalService.open(popUp, { centered: true, keyboard: false, backdrop: 'static' });
  }

  closeConfirmDelete(value: string) {
    this.logOutConfrimation.close(value);
  }

  lcaNumber(event: any, lca: any) {
    this.Sfliinginfo = [];
    this.FilingLcaNumber = '';
    this.activeElement(event);
    this.selectedFilingDiv = false;
    this.assignlcaNumber = this.modalService.open(lca, { centered: true });
  }
  closelcaNumber(value: string) {
    this.assignlcaNumber.close(value);
    this.removeActiveElement();
  }
  receiptNumber(event: any, receipt: any) {
    this.Sfliinginfo = [];
    this.filingRecieptNumber = '';
    this.activeElement(event);
    this.selectedFilingDiv = false;
    this.assignreceiptNumber = this.modalService.open(receipt, { centered: true });
  }
  closeReceipt(value: string) {
    this.assignreceiptNumber.close(value);
    this.removeActiveElement();
  }
  inviteTeammember(event: any, invite: any) {
    this.activeElement(event);
    this.invitemember = this.modalService.open(invite, { centered: true });
  }
  closeInviteteammember(value: string) {
    this.invitemember.close(value);
    this.removeActiveElement();
  }

  closeConfirmSuccess(value) {
    //this.successPopupModel.close(value);
    this.modalService.dismissAll();
  }
}
