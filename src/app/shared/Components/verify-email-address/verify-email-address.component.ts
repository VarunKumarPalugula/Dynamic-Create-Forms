import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonService } from '@app/shared/service/common.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-verify-email-address',
  templateUrl: './verify-email-address.component.html',
  styleUrls: ['./verify-email-address.component.scss'],
})
export class VerifyEmailAddressComponent implements OnInit {
  code: string;
  id: string;
  type: string;
  data: any = {};
  dataarray: any = {};
  Error: string;
  Message: string;
  Success: boolean;
  isVerification = true;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private commonservice: CommonService,
    private route: Router,
    private location: Location,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.verificationProcess();
  }

  verificationProcess() {
    this.spinner.show();
    this.isVerification = true;
    this.code = this._activatedRoute.snapshot.queryParams['link'];
    this.id = this._activatedRoute.snapshot.queryParams['ClientNomanclaturedId'];
    this.type = this._activatedRoute.snapshot.queryParams['Type'];

    //type =0 admin, type =1 admin
    if (this.type == '0') {
      this.commonservice.adminVerifymail(this.code, this.id).subscribe(
        (res) => {
          this.spinner.hide();
          this.dataarray = res;
          this.isVerification = true;
          if (this.dataarray.Status === 1) {
            this.Message = this.dataarray.Message;
            this.Success = true;
            this.toaster.success('Successfully verified', 'Success');
          } else {
            this.Message = this.dataarray.Message;
          }
        },
        (error) => {
          this.spinner.hide();
          this.isVerification = false;
          this.Error = 'Failed to Verify';
          this.toaster.error(this.Error, 'Error');
        }
      );
    } else if (this.type == '1') {
      this.commonservice.clientVerifymail(this.code, this.id).subscribe(
        (res) => {
          this.spinner.hide();
          this.dataarray = res;
          this.isVerification = true;
          if (this.dataarray.Status === 1) {
            this.Message = this.dataarray.Message;
            this.Success = true;
            this.toaster.success('Successfully verified', 'Success');
          } else {
            this.Message = this.dataarray.Message;
          }
        },
        (error) => {
          this.spinner.hide();
          this.Error = 'Failed to Verify';
          this.toaster.error(this.Error, 'Error');
        }
      );
    }
  }

  login() {
    if (this.type == '0') {
      this.route.navigate(['signin']);
    } else if (this.type == '1') {
      this.route.navigate(['client/signin']);
    }
  }
}
