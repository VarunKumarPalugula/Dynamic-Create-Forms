import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientService } from '../../../law-office-client/law-office-client.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '@app/shared/service/common.service';
import { Http, ResponseContentType } from '@angular/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  constructor(
    public spinner: NgxSpinnerService,
    private clientService: ClientService,
    private toaster: ToastrService,
    public commonService: CommonService,
    public modalService: NgbModal,
    private http: Http
  ) { }

  token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');

  @Input() label: string;
  @Input() name: string;
  @Input() parent: string;
  @Input() list: any;
  @Input() single: boolean;
  @Input() applicantKey: string;
  @Input() resumeExn = [];

  selectDeleteFile: number;
  fileUploaded: any;
  previewUrl = [];

  ngOnInit(): void {
    this.getFile(this.name);
  }

  getFileExtension(file) {
    return file.split('.').pop();
  }

  preview() {
    // Show preview
    for (let f = 0; f < this.fileUploaded.length; f++) {

      var mimeType = this.fileUploaded[f].type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(this.fileUploaded[f]);
      reader.onload = (_event) => {
        this.previewUrl.push(reader.result);
      };
    }
  }

  fileUpload(file, confirmPopup) {
    this.fileUploaded = file;
    for (let f = 0; f < file.length; f++) {
      if (this.resumeExn.length && !this.resumeExn.includes(file[f].FileName)) {
        this.fileUploaded = null;
        return;
      }
    };
    if (this.fileUploaded) {
      this.preview();
      this.modalService.open(confirmPopup, {
        centered: true,
        keyboard: false,
        backdrop: 'static',
      });
    }
  }

  uploadFile(file) {
    this.spinner.show();
    this.closeModal();
    const formdata: FormData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formdata.append(this.name, file[i]);
    }
    formdata.append(this.name, file), formdata.append('Type', this.name);
    this.clientService.uploadFile(formdata, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res != null) {
          if (this.single) {
            this.list = [];
            this.commonService.fileData[this.applicantKey][this.parent]['finalObj'][this.name] = [];
          }
          this.getFile(this.name);
          this.commonService.fileData[this.applicantKey][this.parent].readOnly = false;
          this.toaster.success(`${this.name} uploaded successfulley`, 'Success');
        } else {
          this.toaster.error('Failed to update education details');
        }
      },
      (err) => {
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
          this.list = res;
          this.commonService.fileData[this.applicantKey][this.parent]['finalObj'] = {
            ...this.commonService.fileData[this.applicantKey][this.parent]['finalObj'],
            [this.name]: this.list,
          };
        }
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    );
  }

  viewEmployementFiles(fileId) {
    let filePath = this.list.find((x) => (x.EFileId = fileId));
    window.open(filePath.S3Path, '_blank');
  }

  downloadEmployementFiles(fileId, fileName, fileType) {
    let final = this.list.find((x) => (x.EFileId = fileId));
    let filepath = final.S3Path;
    const mediaType = fileType;
    const blob = new Blob([filepath], { type: mediaType });
    saveAs(blob, fileName);
    (err) => {
      this.toaster.error('error occured');
    };
  }

  printSpecificFile(filepath: any, fileName: any) {
    let splittedFile = fileName.split('.');
    let splitFileType = splittedFile[1];
    this.http
      .get(filepath, {
        responseType: ResponseContentType.Blob,
      })
      .subscribe((response: any) => {
        var mediaType = response._body.type;
        if (splitFileType == 'pdf') {
          var blob = new Blob([response.blob()], { type: 'application/pdf' });
          const blobUrl = URL.createObjectURL(blob);
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = blobUrl;
          document.body.appendChild(iframe);
          iframe.contentWindow.print();
        }
        if (
          splitFileType == 'jpg' ||
          splitFileType == 'jpeg' ||
          splitFileType == 'JPG' ||
          splitFileType == 'JPEG' ||
          splitFileType == 'png' ||
          splitFileType == 'PNG'
        ) {
          var blob = new Blob([response.blob()], { type: 'image/jpeg' });
          const blobUrl = URL.createObjectURL(blob);
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = blobUrl;
          document.body.appendChild(iframe);
          iframe.contentWindow.print();
        }
      });
  }

  deletePopup(popup, dFile) {
    this.selectDeleteFile = dFile;
    this.modalService.open(popup, {
      centered: true,
      keyboard: false,
      backdrop: 'static',
    });
  }

  deleteFiles(file) {
    this.spinner.show();
    this.clientService.deleteFile(file, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.Status == 1) {
          this.commonService.fileData[this.applicantKey][this.parent]['finalObj'][
            this.name
          ] = this.commonService.fileData[this.applicantKey][this.parent]['finalObj'][this.name].filter(
            (res) => res.EFileId != file
          );
          this.closeModal();
          this.list = this.list.filter((res) => res);
          this.getFile(this.name);
          this.toaster.error('Your file deleted successfully', 'File Delete');
          this.modalService.dismissAll();
        } else if (res.Status == 0) {
          this.toaster.error('Failed to delete your file');
        }
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    );
  }

  closeModal() {
    this.modalService.dismissAll();
    this.fileUploaded = null;
    this.previewUrl = [];
  }
}
