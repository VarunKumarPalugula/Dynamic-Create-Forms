import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ValidationService } from '@app/shared/service/validation.service';
import { ClientService } from '@app/law-office-client/law-office-client.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PasswordValidator } from '@app/shared/helpers/PasswordValidator';
import { RandomColor } from 'angular-randomcolor';

@Component({
  selector: 'account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent implements OnInit {
  token: string;
  accountForm: FormGroup;
  orgAccountData: any = {};
  passwordObj: any = {};
  passwordModel: any;
  passwordFormGroup: FormGroup;
  colors: any = [];
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  constructor(
    private Valid: ValidationService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private clientService: ClientService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.accountbuildForm();
    this.getaccountdata();
    this.buildPasswordTemplateForm();
    this.getColor();
  }

  accountbuildForm() {
    this.accountForm = this.fb.group({
      FirstName: this.Valid.validateform.FirstName,
      LastName: this.Valid.validateform.LastName,
    });
  }

  changeaccountdata() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    const formData = new FormData();
    formData.append('file', this.fileData);
    formData.append('FirstName', this.orgAccountData.FirstName);
    formData.append('LastName', this.orgAccountData.LastName);
    this.clientService.changeaccountdata(formData, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.Status == 1) {
          this.toaster.success('Your profile updated successfully', 'success');
          this.getaccountdata();
        } else if (res.Status == 0) {
          this.toaster.error('Failed to change account data');
        }
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    );
  }

  changeaccountpassword() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    this.clientService.changeaccountpassword(this.passwordObj, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.Status == 1) {
          this.passwordObj = {};
          this.toaster.success('Password updated successfully');
          this.passwordFormGroup.reset();
          this.closePasswordPop('close click');
        } else if (res.Status == 0) {
          if (res.Message) {
            this.toaster.error(res.Message);
          } else {
            this.toaster.error('Failed to change password');
          }
        }
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    );
  }
  buildPasswordTemplateForm() {
    this.passwordFormGroup = this.fb.group(
      {
        currentpassword: this.Valid.validateform.Password,
        password: this.Valid.validateform.Password,
        confirmPassword: this.Valid.validateform.Password,
      },
      {
        validator: PasswordValidator.validate.bind(this),
      }
    );
  }

  passwordPop(password: any) {
    this.passwordModel = this.modalService.open(password, { centered: true });
  }

  closePasswordPop(value: string) {
    this.passwordModel.close(value);
  }

  getaccountdata() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    this.clientService.getaccountdata(this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.orgAccountData = res;
        if (this.orgAccountData.Image) {
          sessionStorage.setItem('Image', this.orgAccountData.Image);
        }
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    );
  }
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }
  getColor() {
    for (var i = 0; i < 100; i++) {
      const newColor = RandomColor.generateColor();

      this.colors.push(newColor);
    }
  }
  getShortName(fullName) {
    return fullName
      .split('')
      .map((n) => n[0])
      .join('');
  }
}
