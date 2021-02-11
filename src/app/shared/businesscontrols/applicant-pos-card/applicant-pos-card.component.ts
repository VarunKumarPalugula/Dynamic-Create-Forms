import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'applicant-pos-card',
  templateUrl: './applicant-pos-card.component.html',
  styleUrls: ['./applicant-pos-card.component.scss'],
})
export class ApplicantPosCardComponent implements OnInit {
  selectedPosFileToUpload: File = null;
  posFileInfo: boolean = false;
  @Input()
  posInfo: any;
  @Input()
  objIndex: number;
  @Output()
  emitPosInfo = new EventEmitter();
  @Input()
  getPosFile: any;
  @Output()
  emitChangeInfo = new EventEmitter();
  @Output()
  emitUploadPosTravelDocument = new EventEmitter();
  @Output()
  emitViewPosFile = new EventEmitter();
  @Output()
  emitDownloadPosFile = new EventEmitter();
  @Output()
  emitPrintPosFile = new EventEmitter();
  @Output()
  emitDeletePosFile = new EventEmitter();
  posId: any;

  @Output() emitPosDeleteInfo = new EventEmitter();

  selectedFilesList: any = [];
  filesList: any = [{}];
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
    this.emitChangeInfo.emit(this.posInfo);
  }
  selectedPosFile(event: any, posId) {
    this.selectedFilesList = [];
    this.filesList = [];
    this.filesNames = [];
    // this.allFiles = [];
    this.posFileInfo = true;
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
    this.posId = posId;
  }
  removeSelectedPosFiles(i: any) {
    this.filesList = [];
    this.allFiles.splice(i, 1);
    this.filesNames.splice(i, 1);
    if (this.filesNames.length <= 0) {
      this.posFileInfo = false;
    } else {
      this.posFileInfo = true;
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
          this.filesList[i]['fileType'] == 'JPG' ||
          this.filesList[i]['fileType'] == 'jpg') &&
        !this.getPosFile.find((x) => x.FileName === this.filesList[i].name)
      ) {
        finalFiles.push(this.filesList[i]);
      } else {
        unSupportedFiles.push(this.filesList[i]);
      }
    }
    if (finalFiles.length != 0) {
      this.emitUploadPosTravelDocument.emit({ posImages: finalFiles, posId: this.posId });
      this.posFileInfo = false;
      this.filesList = [];
      this.filesNames = [];
      this.allFiles = [];
      this.selectedPosFileToUpload = null;
    }
    if (unSupportedFiles.length != 0) {
      let unSupportedFileNames = [];
      for (let i = 0; i < unSupportedFiles.length; i++) {
        unSupportedFileNames.push(unSupportedFiles[i].name);
      }
      this.toaster.warning(
        unSupportedFileNames +
          ' This files are not supported to upload as period of stay document please upload pdf/images/docs/not exisisting files',
        '',
        { timeOut: 10000 }
      );
    }
  }
  view(fileId: any, fileType: any) {
    this.emitViewPosFile.emit({ fileId: fileId, fileType: fileType });
  }
  download(fileId: any, fileName: any, fileType: any) {
    this.emitDownloadPosFile.emit({ fileId: fileId, fileName: fileName, fileType: fileType });
  }
  print(fileId: any, fileName: any, fileType: any) {
    this.emitPrintPosFile.emit({ fileId: fileId, fileName: fileName, fileType: fileType });
  }
  deleteFile(fileId: any, fileType: any) {
    this.emitDeletePosFile.emit({ fileId: fileId, fileType: fileType });
  }
  deletePosInfo(PSId) {
    this.emitPosDeleteInfo.emit(PSId);
  }
}
