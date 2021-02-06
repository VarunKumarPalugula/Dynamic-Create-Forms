import { Component, Input, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '@app/shared/service/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientService } from '../../../law-office-client/law-office-client.service';

@Component({
  selector: 'app-travel-document-details',
  templateUrl: './travel-document-details.component.html',
  styleUrls: ['./travel-document-details.component.scss']
})
export class TravelDocumentDetailsComponent implements OnInit {

  token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');

  @Input() fields: any;
  @Input() applicantKey: any;

  addSpouseModal: any;

  travelDocumentDetails = true;

  travelList = [];

  selectDeleteFile: string

  constructor(public dialog: MatDialog,
    public commonService: CommonService,
    public modalService: NgbModal,
    public spinner: NgxSpinnerService,
    private clientService: ClientService,
    private toaster: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.travelDocumentDetails = (this.commonService.fileData[this.applicantKey] && this.finalObj() && this.finalObj('travelDocumentDetails')) ? false : true;
    if (Object.keys(this.finalObj()).length && this.finalObj(['travelList']) && this.finalObj(['travelList']).length) {
      this.getFile();
    }
  }


  openSpouseDetails(content) {
    this.addSpouseModal = this.modalService.open(content, { centered: false, keyboard: false, size: 'lg', backdrop: 'static' });
  }

  closeModel(value, key) {
    if (value) {
      this.commonService.fileData[this.applicantKey]['passport, visa or travel documents']['finalObj'] = {
        ...this.commonService.fileData[this.applicantKey]['passport, visa or travel documents']['finalObj'],
        [key]: value
      }
      this.commonService.fileData[this.applicantKey]['passport, visa or travel documents'].readOnly = false;
      this[key] = false;
    }
    if (this.addSpouseModal != undefined) {
      this.addSpouseModal.close(value);
    }
  }

  finalObj(i?) {
    return i ? this.commonService.fileData[this.applicantKey]['passport, visa or travel documents']['finalObj'][i] : this.commonService.fileData[this.applicantKey]['passport, visa or travel documents']['finalObj'];
  }

  deleteCard(key) {
    delete this.commonService.fileData[this.applicantKey]['passport, visa or travel documents']['finalObj'][key];
    this.commonService.fileData[this.applicantKey]['passport, visa or travel documents'].readOnly = false;
  }


  uploadFile(file) {
    this.spinner.show();
    const formdata: FormData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formdata.append('travelList', file[i]);
    }
    // formdata.append('Resume', uploadResumeFile), formdata.append('Type', 'Resume');
    formdata.append('travelList', file), formdata.append('Type', 'travelList');
    this.clientService.uploadFile(formdata, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res != null) {
          for (let i = 0; i < file.length; i++) {
            this.travelList.push(file[i].name);
          }
          this.commonService.fileData[this.applicantKey]['passport, visa or travel documents']['finalObj'] = {
            ...this.commonService.fileData[this.applicantKey]['passport, visa or travel documents']['finalObj'],
            travelList: this.travelList
          }
          this.commonService.fileData[this.applicantKey]['passport, visa or travel documents'].readOnly = false;
          this.toaster.success(`travel uploaded successfulley`, 'Success');
        } else {
          this.toaster.error('Failed to update education details');
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }

  getFile() {
    this.spinner.show();
    const token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    this.clientService.getFile('travelList', token, sessionStorage.getItem('LawOfficeClientID')).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res !== null) {
          this.travelList = res;
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }

  deletePopup(popup, dFile) {
    this.selectDeleteFile = dFile;
    this.modalService.open(popup, {
      centered: true,
      keyboard: false,
      backdrop: 'static'
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
          delete this.commonService.fileData[this.applicantKey]['passport, visa or travel documents']['finalObj'][this.travelList][file];
          this.closeModal();
          this.travelList = this.travelList.filter(res => res)
          this.toaster.error('Your file deleted successfully', 'File Delete');
        } else if (res.Status == 0) {
          this.toaster.error('Failed to delete your file');
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }

}