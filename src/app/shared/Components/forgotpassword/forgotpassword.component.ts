import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  TemplateRef,
  Input,
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
import { AdminSignin } from '@app/models/law-office-admin/AdminSignin';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
})
export class ForgotpasswordComponent implements OnInit {
  @Input()
  userType: string;
  @Input()
  routelink: string;
  passwordForm: FormGroup;
  model: any = {};
  public Error: string;
  public Status: string;
  dataarray: any = {};

  constructor(
    private route: Router,
    private adminservice: AdminService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private Valid: ValidationService,
    private spinner: NgxSpinnerService,
    private commonservice: CommonService,
    private _activatedRoute: ActivatedRoute,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  forgotPassword() {
    this.spinner.show();
    if (this.model.Email == null || this.model.Email === undefined) {
      this.Error = 'Please provide Email Id';
      this.toaster.error(this.Error, 'Error');
      this.spinner.hide();
    } else {
      const obj = {
        UserType: this.userType,
        Email: this.model.Email,
      };
      this.adminservice.forgotPassword(obj).subscribe(
        (res) => {
          this.spinner.hide();
          this.dataarray = res;
          if (this.dataarray.Status === 1) {
            this.toaster.info('Temporary Password Sent to Your Email Successfully');
            this.commonService.changeMessage(this.dataarray.Message);
            if (this.userType == 'ADMIN') {
              this.route.navigate(['signin']);
            } else if ((this.userType = 'CLIENT')) {
              this.route.navigate(['client/signin']);
            }
          } else {
            this.spinner.hide();
            this.Error = this.dataarray.Message;
            this.toaster.error(this.Error);
          }
        },
        (error) => {
          this.spinner.hide();
          this.Error = 'Failed';
          this.toaster.error(this.Error);
        }
      );
    }
  }
  buildForm() {
    this.passwordForm = this.fb.group({
      Email: this.Valid.validateform.Email,
    });
  }
  goToSignIn() {
    const signInRoute = this.routelink + '/' + 'signin';
    this.route.navigate([signInRoute]);
  }
  goToSignUp() {
    const signUpRoute = this.routelink + '/' + 'signup';
    this.route.navigate([signUpRoute]);
  }
}
