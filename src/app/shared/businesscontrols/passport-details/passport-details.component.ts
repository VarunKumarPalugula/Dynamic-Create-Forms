import { Component, Input, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '@app/shared/service/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientService } from '../../../law-office-client/law-office-client.service';

@Component({
  selector: 'app-passport-details',
  templateUrl: './passport-details.component.html',
  styleUrls: ['./passport-details.component.scss'],
})
export class PassportDetailsComponent implements OnInit {
  token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');

  @Input() fields: any;
  @Input() applicantKey: any;

  addSpouseModal: any;

  passportDetails = true;

  passportList = [];

  selectDeleteFile: string;

  constructor(
    public dialog: MatDialog,
    public commonService: CommonService,
    public modalService: NgbModal,
    public spinner: NgxSpinnerService,
    private clientService: ClientService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.passportDetails =
      this.commonService.fileData[this.applicantKey] && this.finalObj() && this.finalObj('passportDetails')
        ? false
        : true;
    if (
      Object.keys(this.finalObj()).length &&
      this.finalObj(['passportList']) &&
      this.finalObj(['passportList']).length
    ) {
      this.getFile();
    }
  }

  openSpouseDetails(content) {
    this.addSpouseModal = this.modalService.open(content, {
      centered: false,
      keyboard: false,
      size: 'lg',
      backdrop: 'static',
    });
  }

  closeModel(value) {
    if (value) {
      this.commonService.fileData[this.applicantKey]['passport, visa or travel documents']['finalObj'] = {
        ...this.commonService.fileData[this.applicantKey]['passport, visa or travel documents']['finalObj'],
        passportDetails: value,
      };
      this.commonService.fileData[this.applicantKey]['passport, visa or travel documents'].readOnly = false;
      this.passportDetails = false;
    }
    if (this.addSpouseModal != undefined) {
      this.addSpouseModal.close(value);
    }
  }

  finalObj(i?) {
    return i
      ? this.commonService.fileData[this.applicantKey]['passport, visa or travel documents']['finalObj'][i]
      : this.commonService.fileData[this.applicantKey]['passport, visa or travel documents']['finalObj'];
  }

  deleteCard(key) {
    delete this.commonService.fileData[this.applicantKey]['passport, visa or travel documents']['finalObj'][key];
    this.commonService.fileData[this.applicantKey]['passport, visa or travel documents'].readOnly = false;
  }

  uploadFile(file) {
    this.spinner.show();
    const formdata: FormData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formdata.append('', file[i]);
    }
    formdata.append('passportList', file), formdata.append('Type', 'passportList');
    this.clientService.uploadFile(formdata, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res != null) {
          for (let i = 0; i < file.length; i++) {
            this.passportList.push(file[i].name);
          }
          this.commonService.fileData[this.applicantKey]['passport, visa or travel documents']['finalObj'] = {
            ...this.commonService.fileData[this.applicantKey]['passport, visa or travel documents']['finalObj'],
            passportList: this.passportList,
          };
          this.commonService.fileData[this.applicantKey]['passport, visa or travel documents'].readOnly = false;
          this.toaster.success(`passport uploaded successfulley`, 'Success');
        } else {
          this.toaster.error('Failed to update education details');
        }
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    );
  }

  getFile() {
    this.spinner.show();
    const token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    this.clientService.getFile('passportList', token, sessionStorage.getItem('LawOfficeClientID')).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res !== null) {
          res.forEach((res) => this.passportList.push(res.FileName));
        }
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    );
  }

  deletePopup(popup, dFile) {
    this.selectDeleteFile = dFile;
    this.modalService.open(popup, {
      centered: true,
      keyboard: false,
      backdrop: 'static',
    });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  deleteFiles(file) {
    this.spinner.show();
    this.clientService.deleteFile(file, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.Status == 1) {
          delete this.commonService.fileData[this.applicantKey]['passport, visa or travel documents']['finalObj'][
            'passportList'
          ][file];
          this.closeModal();
          this.passportList = this.passportList.filter((res) => res);
          this.toaster.error('Your file deleted successfully', 'File Delete');
        } else if (res.Status == 0) {
          this.toaster.error('Failed to delete your file');
        }
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    );
  }
}
