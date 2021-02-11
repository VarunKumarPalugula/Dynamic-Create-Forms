import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'applicant-education-details-card',
  templateUrl: './applicant-education-details-card.component.html',
  styleUrls: ['./applicant-education-details-card.component.scss'],
})
export class ApplicantEducationDetailsCardComponent implements OnInit {
  selectedEduFileToUpload: boolean = false;

  @Input()
  educationInfo: any;
  @Input()
  getEduFile: any = [];
  @Output()
  emitChangeInfo = new EventEmitter();
  @Output()
  emitEducationData = new EventEmitter();

  @Output()
  emitViewEduFile = new EventEmitter();
  @Output()
  emitDownloadEduFile = new EventEmitter();
  @Output()
  emitPrintEduFile = new EventEmitter();
  @Output()
  emitDeleteEduFile = new EventEmitter();

  selectedFilesList: any = [];
  filesList: any = [];
  splittedFile: any;
  allFiles: any = [];
  filesNames: any = [];
  selectedFile: any = [];

  @Output()
  emitEduInfo = new EventEmitter();

  @Output()
  emitUploadEduTravelDocument = new EventEmitter();

  educationDetailsId: any;
  loginUser: any;
  constructor(private toaster: ToastrService) {}

  ngOnInit() {
    this.loginUser = sessionStorage.getItem('Login_User');
  }

  selectedEduFile(event, educationDetailsId) {
    debugger;
    this.selectedFilesList = [];
    this.filesList = [];
    this.filesNames = [];
    // this.allFiles = [];
    this.selectedEduFileToUpload = true;
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
    this.educationDetailsId = educationDetailsId;
  }

  changeInfo() {
    this.emitChangeInfo.emit(false);
    this.emitEducationData.emit(this.educationInfo);
  }
  view(fileId: any, fileType: any) {
    this.emitViewEduFile.emit({ fileId: fileId, fileType: fileType });
  }
  download(fileId: any, fileName: any, fileType: any) {
    this.emitDownloadEduFile.emit({ fileId: fileId, fileName: fileName, fileType: fileType });
  }
  print(fileId: any, fileName: any, fileType: any) {
    this.emitPrintEduFile.emit({ fileId: fileId, fileName: fileName, fileType: fileType });
  }
  deleteFile(fileId: any, fileType: any) {
    this.emitDeleteEduFile.emit({ fileId: fileId, fileType: fileType });
  }
  removeSelectedFile(i: any) {
    this.filesList = [];
    this.allFiles.splice(i, 1);
    this.filesNames.splice(i, 1);
    if (this.filesNames.length <= 0) {
      this.selectedEduFileToUpload = false;
    } else {
      this.selectedEduFileToUpload = true;
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
        (this.filesList[i]['fileType'] == 'doc' ||
          this.filesList[i]['fileType'] == 'DOC' ||
          this.filesList[i]['fileType'] == 'docx' ||
          this.filesList[i]['fileType'] == 'DOCX' ||
          this.filesList[i]['fileType'] == 'pdf' ||
          this.filesList[i]['fileType'] == 'PDF' ||
          this.filesList[i]['fileType'] == 'JPEG' ||
          this.filesList[i]['fileType'] == 'jpeg' ||
          this.filesList[i]['fileType'] == 'PNG' ||
          this.filesList[i]['fileType'] == 'png' ||
          this.filesList[i]['fileType'] == 'jpg' ||
          this.filesList[i]['fileType'] == 'JPG') &&
        !this.getEduFile.find((x) => x.FileName === this.filesList[i].name)
      ) {
        finalFiles.push(this.filesList[i]);
      } else {
        unSupportedFiles.push(this.filesList[i]);
      }
    }
    if (finalFiles.length != 0) {
      this.emitUploadEduTravelDocument.emit({ eduImages: finalFiles, educationDetailsId: this.educationDetailsId });
      this.emitUploadEduTravelDocument = null;
      this.filesList = [];
      this.filesNames = [];
      this.allFiles = [];
    }
    if (unSupportedFiles.length != 0) {
      let unSupportedFileNames = [];
      for (let i = 0; i < unSupportedFiles.length; i++) {
        unSupportedFileNames.push(unSupportedFiles[i].name);
      }
      this.toaster.warning(
        unSupportedFileNames +
          ' This files are not supported to upload as educational document please upload pdf/images/docs/not exisisting files'
      );
    }
  }
  deleteEduInfo(EducationDetailsId) {
    this.emitEduInfo.emit(EducationDetailsId);
  }
}
