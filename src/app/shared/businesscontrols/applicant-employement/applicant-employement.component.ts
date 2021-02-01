import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'applicant-employement',
  templateUrl: './applicant-employement.component.html',
  styleUrls: ['./applicant-employement.component.scss'],
})
export class ApplicantEmployementComponent implements OnInit {
  @Input()
  isShowResume = true;
  @Input()
  isShowRecentw2s = true;
  @Input()
  isShowPaystubs = true;
  @Input()
  isShowEadCard = true;

  resumeFileToUpload: any
  recentw2sFileToUpload: boolean = false;
  selectedFilesList: any = [];
  filesList: any = [];
  splittedFile: any;
  allFiles: any = [];
  filesNames: any = [];
  selectedFile: any = [];
  paystubsFileInfo: boolean = false;
  eadCardToUpload: boolean = false;
  // getting all files here from applicant profile parent component
  @Input()
  getResumeFile: any;
  @Input()
  getRecentw2s: any = [];
  @Input()
  getEadCardFile: any = [];
  @Input()
  getRecentPaystubfiles: any = [];

  // upload documents
  @Output()
  emitUploadResumeFile = new EventEmitter();
  @Output()
  emitUploadRecentW2s = new EventEmitter();
  @Output()
  emitUpload3RecentPaystubs = new EventEmitter();
  @Output()
  emitUploadEadCard = new EventEmitter();

  // file Actions
  @Output()
  emitViewFile = new EventEmitter();
  @Output()
  emitDownloadFile = new EventEmitter();
  @Output()
  emitPrintFile = new EventEmitter();
  @Output()
  emitDeleteFile = new EventEmitter();
  loginUser: any
  constructor(private toaster: ToastrService) { }

  ngOnInit() {
    this.loginUser = sessionStorage.getItem('Login_User');
  }

  selectedResumeFile(event) {
    this.resumeFileToUpload = event.target.files.item(0);
    this.splittedFile = this.resumeFileToUpload.name.split('.');
    this.resumeFileToUpload['fileType'] = this.splittedFile[1];
    event.target.value = '';
  }

  selectedRecentw2sFile(event) {
    console.log(this.filesList.length);
    this.selectedFilesList = [];
    this.filesList = [];
    this.filesNames = [];
    //this.allFiles = [];
    this.recentw2sFileToUpload = true;
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
  selected3recentPaystubs(event) {
    this.selectedFilesList = [];
    this.filesList = [];
    this.filesNames = [];
    // this.allFiles = [];
    this.paystubsFileInfo = true;
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

  selectedFileEad(event) {
    this.selectedFilesList = [];
    this.filesList = [];
    this.filesNames = [];
    // this.allFiles = [];
    this.eadCardToUpload = true;
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
  uploadResume() {
    if (
      this.resumeFileToUpload.fileType == 'pdf' || this.resumeFileToUpload.fileType == 'PDF' ||
      this.resumeFileToUpload.fileType == 'doc' || this.resumeFileToUpload.fileType == 'DOC' ||
      this.resumeFileToUpload.fileType == 'docx' || this.resumeFileToUpload.fileType == 'DOCX'
    ) {
      this.emitUploadResumeFile.emit(this.resumeFileToUpload);
      this.resumeFileToUpload = null;
    } else {
      this.toaster.warning('Resume file accepts only pdf and doc and docx type');
    }
  }
  removeSelectedResume() {
    this.resumeFileToUpload = null;
  }
  uploadRecentw2s() {
    let finalRecentw2sFiles = [];
    let unSupportedRecentw2sFiles = [];
    for (let i = 0; i < this.filesList.length; i++) {
      this.filesList[i] = this.selectedFilesList[i].file;
      if (
        (this.filesList[i]['fileType'] == 'doc' || this.filesList[i]['fileType'] == 'DOC' || 
        this.filesList[i]['fileType'] == 'docx' || this.filesList[i]['fileType'] == 'DOCX' ||
        this.filesList[i]['fileType'] == 'pdf' || this.filesList[i]['fileType'] == 'PDF' ||
        this.filesList[i]['fileType'] == 'JPEG' ||
        this.filesList[i]['fileType'] == 'jpeg' ||
        this.filesList[i]['fileType'] == 'PNG' ||
        this.filesList[i]['fileType'] == 'png' ||
        this.filesList[i]['fileType'] == 'jpg' ||
        this.filesList[i]['fileType'] == 'JPG') && (!this.getRecentw2s.find((x => x.FileName === this.filesList[i].name)))
      ) {
        finalRecentw2sFiles.push(this.filesList[i])
      } else {
        unSupportedRecentw2sFiles.push(this.filesList[i])
      }
    }
    if (finalRecentw2sFiles.length != 0) {
      this.emitUploadRecentW2s.emit(finalRecentw2sFiles);
      this.filesList = [];
      this.filesNames = [];
      this.allFiles = [];
      this.recentw2sFileToUpload = null;
    }
    if (unSupportedRecentw2sFiles.length != 0) {
      let unSupportedRecentw2sFileNames = [];
      for (let i = 0; i < unSupportedRecentw2sFiles.length; i++) {
        unSupportedRecentw2sFileNames.push(unSupportedRecentw2sFiles[i].name)
      }
      this.toaster.warning(unSupportedRecentw2sFileNames + " This files are not supported to upload as Recent w2s please upload pdf/images/docs/not exisisting files", '', { timeOut: 10000 });
    }
  }
  removeSelectedRecentw2s(i) {
    this.filesList = [];
    this.allFiles.splice(i, 1);
    this.filesNames.splice(i, 1);
    if (this.filesNames.length <= 0) {
      this.recentw2sFileToUpload = false;
    } else {
      this.recentw2sFileToUpload = true
    }
    this.selectedFilesList.splice(i, 1);
    for (let i = 0; i < this.selectedFilesList.length; i++) {
      this.filesList[i] = this.selectedFilesList[i].file;
    }
  }
  upload3RecentPaystubs() {
    let finalRecentPayStubsFiles = [];
    let unSupportedRecentPayStubsFiles = [];
    for (let i = 0; i < this.filesList.length; i++) {
      this.filesList[i] = this.selectedFilesList[i].file;
      if ((this.filesList[i]['fileType'] == 'doc' || this.filesList[i]['fileType'] == 'DOC' || 
      this.filesList[i]['fileType'] == 'docx' || this.filesList[i]['fileType'] == 'DOCX' ||
        this.filesList[i]['fileType'] == 'pdf' || this.filesList[i]['fileType'] == 'PDF' ||
        this.filesList[i]['fileType'] == 'JPEG' ||
        this.filesList[i]['fileType'] == 'jpeg' ||
        this.filesList[i]['fileType'] == 'PNG' ||
        this.filesList[i]['fileType'] == 'png' ||
        this.filesList[i]['fileType'] == 'jpg' ||
        this.filesList[i]['fileType'] == 'JPG') && (!this.getRecentPaystubfiles.find((x => x.FileName === this.filesList[i].name)))
      ) {
        finalRecentPayStubsFiles.push(this.filesList[i])
      } else {
        unSupportedRecentPayStubsFiles.push(this.filesList[i])
      }
    }
    if (finalRecentPayStubsFiles.length != 0) {
      this.emitUpload3RecentPaystubs.emit(finalRecentPayStubsFiles);
      this.filesList = [];
      this.filesNames = [];
      this.allFiles = [];
      this.paystubsFileInfo = false;
    }
    if (unSupportedRecentPayStubsFiles.length != 0) {
      let unSupportedRecentPayStubsFileNames = [];
      for (let i = 0; i < unSupportedRecentPayStubsFiles.length; i++) {
        unSupportedRecentPayStubsFileNames.push(unSupportedRecentPayStubsFiles[i].name)
      }
      this.toaster.warning(unSupportedRecentPayStubsFileNames + " This files are not supported to upload as Recent w2s document please upload pdf/images/docs/not exisisting files", '', { timeOut: 10000 });
    }
  }
  removeSelected3RecentPaystubs(i: any) {
    this.filesList = [];
    this.allFiles.splice(i, 1);
    this.allFiles.splice(i, 1);
    this.filesNames.splice(i, 1);
    if (this.filesNames.length <= 0) {
      this.paystubsFileInfo = false;
    } else {
      this.paystubsFileInfo = true
    }
    this.selectedFilesList.splice(i, 1);
    for (let i = 0; i < this.selectedFilesList.length; i++) {
      this.filesList[i] = this.selectedFilesList[i].file;
    }
  }
  uploadEadCard() {
    let finalEadcardFiles = [];
    let unSupportedEadcardFiles = [];
    for (let i = 0; i < this.filesList.length; i++) {
      this.filesList[i] = this.selectedFilesList[i].file;
      if ((this.filesList[i]['fileType'] == 'doc' || this.filesList[i]['fileType'] == 'DOC' || 
        this.filesList[i]['fileType'] == 'docx' || this.filesList[i]['fileType'] == 'DOCX' ||
        this.filesList[i]['fileType'] == 'pdf' || this.filesList[i]['fileType'] == 'PDF' ||
        this.filesList[i]['fileType'] == 'JPEG' ||
        this.filesList[i]['fileType'] == 'jpeg' ||
        this.filesList[i]['fileType'] == 'PNG' ||
        this.filesList[i]['fileType'] == 'png' ||
        this.filesList[i]['fileType'] == 'jpg' ||
        this.filesList[i]['fileType'] == 'JPG') && (!this.getEadCardFile.find((x => x.FileName === this.filesList[i].name)))
      ) {
        finalEadcardFiles.push(this.filesList[i])
      } else {
        unSupportedEadcardFiles.push(this.filesList[i])
      }
    }
    if (finalEadcardFiles.length != 0) {
      this.emitUploadEadCard.emit(finalEadcardFiles);
      this.filesList = [];
      this.filesNames = [];
      this.allFiles = [];
      this.eadCardToUpload = null;
    }
    if (unSupportedEadcardFiles.length != 0) {
      let unSupportedEadcardFileNames = [];
      for (let i = 0; i < unSupportedEadcardFiles.length; i++) {
        unSupportedEadcardFileNames.push(unSupportedEadcardFiles[i].name)
      }
      this.toaster.warning(unSupportedEadcardFileNames + " This files are not supported to upload as eadcard please upload pdf/images/docs/not exisisting files", '', { timeOut: 10000 });
    }
  }
  removeSelectedEadCard(i: any) {
    this.filesList = [];
    this.allFiles.splice(i, 1);
    this.filesNames.splice(i, 1);
    if (this.filesNames.length <= 0) {
      this.eadCardToUpload = false;
    } else {
      this.eadCardToUpload = true
    }
    this.selectedFilesList.splice(i, 1);
    for (let i = 0; i < this.selectedFilesList.length; i++) {
      this.filesList[i] = this.selectedFilesList[i].file;
    }
  }

  viewFile(fileId: any, fileType: any) {
    this.emitViewFile.emit({ fileId: fileId, fileType: fileType });
  }
  downloadFile(fileId: any, fileName: any, fileType: any) {
    this.emitDownloadFile.emit({ fileId: fileId, fileName: fileName, fileType: fileType });
  }
  printFile(fileId: any, fileName: any, fileType: any) {
    this.emitPrintFile.emit({ fileId: fileId, fileName: fileName, fileType: fileType });
  }
  deleteFile(fileId: any, fileType: any) {
    this.emitDeleteFile.emit({ fileId: fileId, fileType: fileType });
  }
}
