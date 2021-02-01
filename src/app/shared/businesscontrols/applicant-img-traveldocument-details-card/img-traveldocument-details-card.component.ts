import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'img-traveldocument-details-card',
  templateUrl: './img-traveldocument-details-card.component.html',
  styleUrls: ['./img-traveldocument-details-card.component.scss'],
})
export class ImgTraveldocumentDetailsCardComponent implements OnInit {
  selectedImgFileToUpload: boolean = false;
  @Input()
  travelDocumentDetailsInfo: any;
  @Input()
  maxDate: Date;
  @Input()
  imgTravelDocFile: any;
  @Output()
  changeTravelDocumentDetails = new EventEmitter();
  @Output()
  emitUploadImgI94Document = new EventEmitter();

  @Output()
  emitViewFile = new EventEmitter();
  @Output()
  emitDownloadFile = new EventEmitter();
  @Output()
  emitPrintFile = new EventEmitter();
  @Output()
  emitDeleteFile = new EventEmitter();

  selectedFilesList: any = [];
  filesList: any = [];
  splittedFile: any;
  allFiles: any = [];
  filesNames: any = [];
  selectedFile: any = [];
  loginUser: any;
  constructor(private toaster: ToastrService) { }

  ngOnInit() {
    this.loginUser = sessionStorage.getItem('Login_User');

  }

  changeInfo() {
    this.changeTravelDocumentDetails.emit(this.travelDocumentDetailsInfo);
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

  upload() {
    let finalFiles = [];
    let unSupportedFiles = [];
    for (let i = 0; i < this.filesList.length; i++) {
      this.filesList[i] = this.selectedFilesList[i].file;
      if ((
        this.filesList[i]['fileType'] == 'pdf' || this.filesList[i]['fileType'] == 'PDF' ||
        this.filesList[i]['fileType'] == 'JPEG' ||
        this.filesList[i]['fileType'] == 'jpeg' ||
        this.filesList[i]['fileType'] == 'PNG' ||
        this.filesList[i]['fileType'] == 'png' ||
        this.filesList[i]['fileType'] == 'jpg' ||
        this.filesList[i]['fileType'] == 'JPG') && (!this.imgTravelDocFile.find((x => x.FileName === this.filesList[i].name)))
      ) {
        finalFiles.push(this.filesList[i])
      } else {
        unSupportedFiles.push(this.filesList[i])
      }
    }
    if (finalFiles.length != 0) {
      this.emitUploadImgI94Document.emit(finalFiles);
      this.filesList = [];
      this.filesNames = [];
      this.allFiles = [];
      this.selectedImgFileToUpload = null;
    }
    if (unSupportedFiles.length != 0) {
      let unSupportedFileNames = [];
      for (let i = 0; i < unSupportedFiles.length; i++) {
        unSupportedFileNames.push(unSupportedFiles[i].name)
      }
      this.toaster.warning(unSupportedFileNames + " This files are not supported to upload as immigration travel document please upload pdf/images/not exisisting files", '', { timeOut: 10000 });
    }
  }
  remove(i: any) {
    this.filesList = [];
    this.allFiles.splice(i, 1);
    this.filesNames.splice(i, 1);
    if (this.filesNames.length <= 0) {
      this.selectedImgFileToUpload = false;
    } else {
      this.selectedImgFileToUpload = true
    }
    this.selectedFilesList.splice(i, 1);
    for (let i = 0; i < this.selectedFilesList.length; i++) {
      this.filesList[i] = this.selectedFilesList[i].file;
    }
  }

  view(fileId: any, fileType: any) {
    this.emitViewFile.emit({ fileId: fileId, fileType: fileType });
  }
  print(fileId: any, fileName: any, fileType: any) {
    this.emitPrintFile.emit({ fileId: fileId, fileName: fileName, fileType: fileType });
  }
  download(fileId: any, fileName: any, fileType: any) {
    this.emitDownloadFile.emit({ fileId: fileId, fileName: fileName, fileType: fileType });
  }
  deleteFile(fileId: any, fileType: any) {
    this.emitDeleteFile.emit({ fileId: fileId, fileType: fileType });
  }
}
