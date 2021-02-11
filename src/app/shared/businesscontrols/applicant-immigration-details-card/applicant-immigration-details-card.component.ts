import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'applicant-immigration-details-card',
  templateUrl: './applicant-immigration-details-card.component.html',
  styleUrls: ['./applicant-immigration-details-card.component.scss'],
})
export class ApplicantImmigrationDetailsCardComponent implements OnInit {
  selectedImgFileToUpload: boolean = false;
  @Input()
  immigrationInfo: any;
  @Input()
  imgI94DocFile: any;
  @Output()
  emitChangeInfo = new EventEmitter();

  @Output()
  emitUploadImgTravelDocument = new EventEmitter();

  @Output()
  emitViewImgFile = new EventEmitter();
  @Output()
  emitDownloadImgFile = new EventEmitter();
  @Output()
  emitPrintImgFile = new EventEmitter();
  @Output()
  emitDeleteImgFile = new EventEmitter();

  selectedFilesList: any = [];
  filesList: any = [];
  splittedFile: any;
  allFiles: any = [];
  filesNames: any = [];
  selectedFile: any = [];
  loginUser: any;
  constructor(private toaster: ToastrService) {}

  ngOnInit() {
    this.loginUser = sessionStorage.getItem('Login_User');
  }

  changeInfo() {
    this.emitChangeInfo.emit(false);
  }
  selectedImgFile(event) {
    this.selectedFilesList = [];
    this.filesList = [];
    this.filesNames = [];
    // this.allFiles = [];
    this.selectedImgFileToUpload = true;
    for (let j = 0; j < event.target.files.length; j++) {
      this.allFiles.push({ file: event.target.files[j] });
    }
    for (let i = 0; i < this.allFiles.length; i++) {
      this.selectedFilesList.push({ id: i, file: this.allFiles[i].file });
      this.filesList[i] = this.selectedFilesList[i].file;
      this.splittedFile = this.filesList[i].name.split('.');
      this.filesList[i]['fileType'] = this.splittedFile[1];
      this.filesNames.push({ id: i, name: this.filesList[i].name, fileType: this.splittedFile[1] });
    }
    event.target.value = '';
  }
  removeSelectedFiles(i: any) {
    this.filesList = [];
    this.allFiles.splice(i, 1);
    this.filesNames.splice(i, 1);
    if (this.filesNames.length <= 0) {
      this.selectedImgFileToUpload = false;
    } else {
      this.selectedImgFileToUpload = true;
    }
    this.selectedFilesList.splice(i, 1);
    for (let i = 0; i < this.selectedFilesList.length; i++) {
      this.filesList[i] = this.selectedFilesList[i].file;
    }
  }
  upload() {
    let finalFiles = [];
    let unSupportedFiles = [];
    for (let i = 0; i < this.filesList.length; i++) {
      this.filesList[i] = this.selectedFilesList[i].file;
      if (
        (this.filesList[i]['fileType'] == 'pdf' ||
          this.filesList[i]['fileType'] == 'PDF' ||
          this.filesList[i]['fileType'] == 'JPEG' ||
          this.filesList[i]['fileType'] == 'jpeg' ||
          this.filesList[i]['fileType'] == 'PNG' ||
          this.filesList[i]['fileType'] == 'png' ||
          this.filesList[i]['fileType'] == 'jpg' ||
          this.filesList[i]['fileType'] == 'JPG') &&
        !this.imgI94DocFile.find((x) => x.FileName === this.filesList[i].name)
      ) {
        finalFiles.push(this.filesList[i]);
      } else {
        unSupportedFiles.push(this.filesList[i]);
      }
    }
    if (finalFiles.length != 0) {
      this.emitUploadImgTravelDocument.emit(finalFiles);
      this.filesList = [];
      this.filesNames = [];
      this.allFiles = [];
      this.selectedImgFileToUpload = null;
    }
    if (unSupportedFiles.length != 0) {
      let unSupportedFileNames = [];
      for (let i = 0; i < unSupportedFiles.length; i++) {
        unSupportedFileNames.push(unSupportedFiles[i].name);
      }
      this.toaster.warning(
        unSupportedFileNames +
          ' This files are not supported to upload as I94 document please upload pdf/images/not exisisting files',
        '',
        { timeOut: 10000 }
      );
    }
  }

  view(fileId: any, fileType: any) {
    this.emitViewImgFile.emit({ fileId: fileId, fileType: fileType });
  }
  download(fileId: any, fileName: any, fileType: any) {
    this.emitDownloadImgFile.emit({ fileId: fileId, fileName: fileName, fileType: fileType });
  }
  print(fileId: any, fileName: any, fileType: any) {
    this.emitPrintImgFile.emit({ fileId: fileId, fileName: fileName, fileType: fileType });
  }
  deleteFile(fileId: any, fileType: any) {
    this.emitDeleteImgFile.emit({ fileId: fileId, fileName: fileType });
  }
}
