import { Component, OnInit } from '@angular/core';
import { ValidationService } from '@app/shared/service/validation.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientFilingsService } from '@app/law-office-client/app-layout/fillings/filings.service';
import { ToastrService } from 'ngx-toastr';
import { ClientpermissionService } from '@app/auth-guard/client-guard/clientpermission.service';

@Component({
  selector: 'app-allfillings',
  templateUrl: './allfillings.component.html',
  styleUrls: ['./allfillings.component.scss'],
})
export class AllfillingsComponent implements OnInit {
  token: any;
  fillingList: any = [];
  searchFilter: string;
  FillingPermissions: any = {};
  isAuthorize: any = {};
  FStatus: any = 'Select Filling Status';

  constructor(
    private adminService: ClientFilingsService,
    private route: Router,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private permissionService: ClientpermissionService
  ) {}

  ngOnInit() {
    this.isAuthorize = this.permissionService.isGetAcess();
    this.FillingPermissions = this.permissionService.FillingPermissions();
    this.GetFiledFilings();
  }

  GetFiledFilings() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    this.adminService.getFilings(this.token).subscribe(
      (res: any[]) => {
        this.spinner.hide();
        //this.fillingList = res;
        for (var i = 0; i < res.length; i++) {
          if (res[i].FilingStatus == null) {
            res[i].FilingStatus = 'Pending';
          } else {
            res[i].FilingStatus = res[i].FilingStatus;
          }
          this.fillingList.push(res[i]);
        }
        this.fillingList.reverse();
      },
      (err) => {
        this.spinner.hide();
        this.toaster.error('Error Occured');
      }
    );
  }

  viewFilling(filing: any, index: any) {
    sessionStorage.setItem('FillingId', filing.FillingId);
    sessionStorage.setItem('FName', filing.FName);
    sessionStorage.setItem('LetClientInvite', filing.LetClientInviteApplicant);
    sessionStorage.setItem('IsClientInitiated', filing.IsClientInitiatedFiling);
    sessionStorage.setItem('FilingIndex', index);
    sessionStorage.setItem('ClientAdminOrgId', filing.AdminOrgId);
    //console.log(filing.AdminOrgId)
    this.route.navigate(['/client/applayout/fillings/overview']);
  }

  selectFillingStatus(status) {
    //console.log(status)
    this.searchFilter = status;
    this.fillingList - this.fillingList.filter((item) => item.FilingStatus === status);
  }
}
