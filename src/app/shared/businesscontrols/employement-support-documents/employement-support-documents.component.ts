import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientService } from '../../../law-office-client/law-office-client.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '@app/shared/service/common.service';

@Component({
  selector: 'app-employement-support-documents',
  templateUrl: './employement-support-documents.component.html',
  styleUrls: ['./employement-support-documents.component.scss']
})
export class EmployementSupportDocumentsComponent implements OnInit {

  token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');

  @Input() applicantKey: any;
  
  resume = [];
  recentW2 = [];
  recentPayStubs = [];
  eadCards = [];

  selectDeleteFile = {
    file: null,
    type: ''
  };

  constructor(
    public spinner: NgxSpinnerService,
    private clientService: ClientService,
    private toaster: ToastrService,
    public commonService: CommonService,
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    if (Object.keys(this.finalObj()).length && this.finalObj(['resume']) && this.finalObj(['resume']).length) {
      this.getFile('resume')
    }
    if (Object.keys(this.finalObj()).length && this.finalObj(['recentW2']) && this.finalObj(['recentW2']).length) {
      this.getFile('recentW2')
    }
    if (Object.keys(this.finalObj()).length && this.finalObj(['recentPayStubs']) && this.finalObj(['recentPayStubs']).length) {
      this.getFile('recentPayStubs')
    }
    if (Object.keys(this.finalObj()).length && this.finalObj(['eadCards']) && this.finalObj(['eadCards']).length) {
      this.getFile('eadCards')
    }
  }

  finalObj(key?) {
    return key ? this.commonService.fileData[this.applicantKey]['Employement Support Documents']['finalObj'][key] : this.commonService.fileData[this.applicantKey]['Employement Support Documents']['finalObj'];
  }

  uploadFile(file, type, single) {
    this.spinner.show();
    const formdata: FormData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formdata.append(type, file[i]);
    }
    formdata.append(type, file), formdata.append('Type', type);
    this.clientService.uploadFile(formdata, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res != null) {
          if (single) {
            this[type] = [];
            this.commonService.fileData[this.applicantKey]['Employement Support Documents']['finalObj'][type] = [];
          }
          for (let i = 0; i < file.length; i++) {
            this[type].push(file[i].name);
          }
          this.commonService.fileData[this.applicantKey]['Employement Support Documents']['finalObj'] = {
            ...this.commonService.fileData[this.applicantKey]['Employement Support Documents']['finalObj'],
            [type]: this[type]
          }
          this.commonService.fileData[this.applicantKey]['Employement Support Documents'].readOnly = false;
          this.toaster.success(`${type} uploaded successfulley`, 'Success');
        } else {
          this.toaster.error('Failed to update education details');
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }

  getFile(type) {
    this.spinner.show();
    const token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    this.clientService.getFile(type, token, sessionStorage.getItem('LawOfficeClientID')).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res !== null) {
          this[type] = res;
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }

  deletePopup(popup, dFile, type) {
    this.selectDeleteFile = {
      file: dFile,
      type: type
    };
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
          delete this.commonService.fileData[this.applicantKey]['Employement Support Documents']['finalObj'][this.selectDeleteFile.file][file];
          this.closeModal();
          this[this.selectDeleteFile.file] = this[this.selectDeleteFile.file].filter(res => res)
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
