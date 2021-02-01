import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  TemplateRef,
  OnDestroy,
} from '@angular/core';
import { AdminService } from '@app/law-office-admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApicallsService } from '@app/shared/service/apicalls.service';
import { StorageService } from '@app/shared/service/storage.service';
import { CommonService } from '@app/shared/service/common.service';
import { ValidationService } from '@app/shared/service/validation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
})
export class EmailVerificationComponent implements OnInit {
  Email: string;
  roleType: string;
  Message: string;
  error: boolean;
  dataarray: any = {};

  constructor(
    private _activatedRoute: ActivatedRoute,
    private commonservice: CommonService,
    private route: Router,
    private fb: FormBuilder,
    private Valid: ValidationService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
  ) {}
  ngOnInit() {
    this.roleType = sessionStorage.getItem('tempEmailRole');
  }
  reVerificationEmail() {
    this.spinner.show();
    if (this.roleType === '0') {
      this.commonservice.adminReVerifymail(this.Email, this.commonservice.getEnvDetails()).subscribe(
        (res) => {
          this.spinner.hide();
          this.dataarray = res;
          if (this.dataarray.Status === 1) {
            this.Message = this.dataarray.Message;
          } else {
            this.Message = this.dataarray.Message;
          }
          this.toaster.success('Successfully Verification Email Resent');
        },
        (error) => {
          this.spinner.hide();
          this.toaster.error('Failed to Verify');
        }
      );
    } else if (this.roleType === '1') {
      this.commonservice.clientReVerifymail(this.Email).subscribe(
        (res) => {
          this.spinner.hide();
          this.dataarray = res;
          if (this.dataarray.Status === 1) {
            this.Message = this.dataarray.Message;
          } else {
            this.Message = this.dataarray.Message;
          }
          this.toaster.success('Successfully Verification Email Resent');
        },
        (error) => {
          this.toaster.error('Failed to Verify');
          this.spinner.hide();
        }
      );
    } else {
      this.toaster.error('Unable to process');
      this.spinner.hide();
    }
  }
  ngOnDestroy() {
    sessionStorage.removeItem('tempEmailRole');
  }
}
