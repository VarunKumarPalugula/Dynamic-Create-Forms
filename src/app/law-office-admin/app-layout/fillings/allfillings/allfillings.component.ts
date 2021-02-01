import { Component, OnInit } from '@angular/core';
import { AdminService } from '@app/law-office-admin/admin.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminpermissionService } from '@app/auth-guard/admin/adminpermission.service';
import { ToastrService } from 'ngx-toastr';


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
  FStatus: any = 'Select Filling Status';

  constructor(
    private adminService: AdminService,
    private route: Router,
    private spinner: NgxSpinnerService,
    private permissionService: AdminpermissionService,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
    this.FillingPermissions = this.permissionService.FillingPermissions();
    this.GetFiledFilings();
  }

  GetFiledFilings() {
    this.spinner.show();
    this.adminService.GetFiledFilings(sessionStorage.getItem('OrganisationID')).subscribe(
      (res: any[]) => {
        this.spinner.hide();
        // this.fillingList = res;
        for (var i = 0; i < res.length; i++) {
          if (res[i].FilingStatus == null) {
            res[i].FilingStatus = 'Pending';
          } else {
            res[i].FilingStatus = res[i].FilingStatus;
          }
          this.fillingList.push(res[i]);
        }
        this.fillingList.reverse();
        //console.log( this.fillingList)
        // this.fillingList.reverse();
      },
      (err) => {
        this.spinner.hide();
        this.toaster.error('Some thing went wrong with network please try again!');
      }
    );
  }

  viewFilling(filing: any, index: any) {
    sessionStorage.setItem('FillingId', filing.FillingId);
    sessionStorage.setItem('FName', filing.FName);
    sessionStorage.setItem('FilingIndex', index);
    sessionStorage.setItem('IsClientInitiated', filing.IsClientInitiated);
    this.route.navigate(['/admin/fillings/overview']);
  }

  selectFillingStatus(status) {
        this.searchFilter = status;
    this.fillingList - this.fillingList.filter((item) => item.FilingStatus === status);
  }
}
