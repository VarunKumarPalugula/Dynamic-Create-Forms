import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientFilingsService } from '@app/law-office-client/app-layout/fillings/filings.service';
import { Http, ResponseContentType } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
import { FormService } from '@app/shared/service/form.service';
import { FormNameConfig } from '@app/enums/FormNames.config';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss'],
})
export class CaseComponent implements OnInit {
  addModel: any;
  filingId: any;
  orgId: any;
  token: any;
  caseforms: any = [];
  FormsDownload: any = [];
  SUfiles: any = [];
  splittedFile: any;
  filesAll: boolean;
  selectedIds: any = [];
  fileName: any;
  fileType: any;
  Files: any = [];
  Salli: boolean = false
  caseId:any;
  constructor(
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private filingService: ClientFilingsService,
    private http: Http,
    private toaster: ToastrService,
    private formService: FormService,
    private activatedRoute: ActivatedRoute
  ) {
    this.caseId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.filingId = sessionStorage.getItem('FillingId');
    this.orgId = sessionStorage.getItem('ClientAdminOrgId');
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
  }

  ngOnInit() {
    this.GetCaseforms();
    this.GetFilesInSupportingFilesSection();
  }

  GetCaseforms() {
    this.spinner.show();
    this.caseforms = [];
    this.filingService.GetCaseForms(this.orgId, this.filingId, this.caseId, this.token, 'H1').subscribe(
      (res) => {
        this.spinner.hide();
        if (res == null) {
          this.caseforms = [];
        } else {
          var cf = JSON.parse(JSON.stringify(res));

          for (var i = 0; i < cf.length; i++) {
            this.caseforms.push({
              $id: cf[i].cf,
              FormName: cf[i].FormName,
              isselected: false,
            });
          }
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  selectingall(event: any) {
    if (event.target.checked) {
      for (var i = 0; i < this.caseforms.length; i++) {
        this.caseforms[i].isselected = true;
      }
      this.FormsDownload = this.caseforms;
    } else {
      for (var i = 0; i < this.caseforms.length; i++) {
        this.caseforms[i].isselected = false;
      }
      this.FormsDownload = [];
    }
  }

  selectingforms(event: any, cform) {
    if (event.target.checked) {
      this.FormsDownload.push(cform);
    } else {
      var index = this.FormsDownload.indexOf(cform);

      if (index != -1) {
        this.FormsDownload.splice(index, 1);
      } else {
      }
    }
  }



  Printdocument(item) {
    this.formPrintAndDownLoad(true, item.FormName);
  }

  PrintSingleFile(filepath: any) {
    const url = filepath;
    this.http
      .get(url, {
        responseType: ResponseContentType.Blob,
      })
      .subscribe((response: any) => {
        // download file
        var mediaType = response._body.type;

        var blob = new Blob([response.blob()], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = blobUrl;
        document.body.appendChild(iframe);
        iframe.contentWindow.print();
      });
    //this.spinner.hide();
  }

  printselected() {
    if (this.FormsDownload.length > 0) {
      for (var i = 0; i < this.FormsDownload.length; i++) {
        this.formPrintAndDownLoad(true, this.FormsDownload[i].FormName);
        // if (this.FormsDownload[i].FormName == 'g-28') {
        //   this.spinner.show();
        //   var tokenid = 'Access-Control-Allow-Origin:*';
        //   this.filingService.G28viewforfiling(this.orgId, this.filingId).subscribe(
        //     (res: any) => {
        //       this.http
        //         .get(res, {
        //           responseType: ResponseContentType.Blob,
        //         })
        //         .subscribe(
        //           (response: any) => {
        //             this.spinner.hide();
        //             this.PrintSingleFile(response.url);
        //           },
        //           (err) => {
        //             this.spinner.hide();
        //           }
        //         );
        //       this.spinner.hide();
        //     },
        //     (err) => {
        //       this.spinner.hide();
        //       this.toaster.error('Error occured while printing..', 'Error');
        //     }
        //   );
        // } else if (this.FormsDownload[i].FormName == 'i-129') {
        //   this.spinner.show();

        //   this.filingService.I129viewforfiling(this.orgId, this.filingId).subscribe(
        //     (res: any) => {
        //       this.http
        //         .get(res, {
        //           responseType: ResponseContentType.Blob,
        //         })
        //         .subscribe(
        //           (response: any) => {
        //             this.spinner.hide();
        //             this.PrintSingleFile(response.url);
        //           },
        //           (err) => {
        //             this.toaster.error('Error occured while printing..', 'Error');
        //           }
        //         );
        //     },
        //     (err) => {
        //       this.spinner.hide();
        //       this.toaster.error('Error occured while printing..', 'Error');
        //       //this.spinner.hide();
        //     }
        //   );
        // }
      }
    } else {
      this.toaster.info('Select at least One for printing..');
    }
  }
  downloadselected() {
    if (this.FormsDownload.length > 0) {
      for (var i = 0; i < this.FormsDownload.length; i++) {
        this.formPrintAndDownLoad(false, this.FormsDownload[i].FormName);
        // if (this.FormsDownload[i].FormName == 'g-28') {
        //   var tokenid = 'Access-Control-Allow-Origin:*';
        //   this.filingService.G28viewforfiling(this.orgId, this.filingId).subscribe(
        //     (res: any) => {
        //       this.DownloadSingleFile(res, 'G28.pdf');
        //       this.spinner.hide();
        //     },
        //     (err) => {
        //       this.spinner.hide();
        //       this.toaster.error('Error occured while downloading..', 'Error');
        //     }
        //   );
        // } else if (this.FormsDownload[i].FormName == 'i-129') {
        //   this.filingService.I129viewforfiling(this.orgId, this.filingId).subscribe(
        //     (res: any) => {
        //       this.spinner.hide();
        //       this.DownloadSingleFile(res, 'I129.pdf');
        //     },
        //     (err) => {
        //       this.spinner.hide();
        //       this.toaster.error('Error occured while downloading..', 'Error');
        //       //this.spinner.hide();
        //     }
        //   );
        // }
      }
    } else {
      this.toaster.info('Select at least One to download..');
    }
  }

  DownloadSingleFile(filepath: any, fname: any) {
    this.http
      .get(filepath, {
        responseType: ResponseContentType.Blob,
      })
      .subscribe(
        (response: any) => {
          const mediaType = 'pdf';
          const blob = new Blob([response._body], { type: 'application/pdf' });
          saveAs(blob, fname);
        },
        (err) => {
          // alert('error');
          this.toaster.error('Error occured while downloading..', 'Error');
        }
      );
    this.spinner.hide();
  }

  G28viewforfiling(item) {
    this.formPrintAndDownLoad(false,item.FormName);
  }
  formPrintAndDownLoad(isPrint, formName) {
    if (formName === 'g-28') {
      formName = FormNameConfig.G28
    } else if (formName == 'i-129') {
      formName = FormNameConfig.I129
    }
    let formObj = {
      "FilingId": sessionStorage.getItem('FillingId'),
      "VersionId": "0",
      "FormName": formName,
      "FormValues": {
      }
    }
    this.spinner.show();
    this.formService.previewImmigrationFormData(this.orgId, formObj,1).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.Status == 1) {
          if (isPrint) {
            this.PrintSingleFile(res.Message);
          } else {
            this.DownloadSingleFile(res.Message, formName+'-'+Date.now()+'.pdf');
          }
        } else if (res.Status == 0) {
          this.toaster.error(res.Message)
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }




  GetFilesInSupportingFilesSection() {
    //this.SUfiles = [];

    this.filingService.GetFilesInSupportingFilesSectionClient(this.orgId, this.filingId, this.caseId, this.token).subscribe(
      (res: any = []) => {
        if (res == null) {
          this.SUfiles = [];
        } else {
          let sf = JSON.parse(JSON.stringify(res));

          for (let i = 0; i < sf.length; i++) {
            this.splittedFile = sf[i].FileName.split('.');

            this.SUfiles.push({
              $id: sf[i].$id,
              FileId: 's' + sf[i].FileId,
              FileName: sf[i].FileName,
              S3BucketPath: sf[i].S3BucketPath,
              fileType: this.splittedFile[1],
              Sfileid: sf[i].FileId,
              selected: false,
            });
          }
        }
      },
      (err) => {
        this.toaster.error('Error occurred while archiveing Topic..', 'Error');
      }
    );
  }
  selectAllFiles(event: any) {
    if (event.target.checked === true) {
      for (let i = 0; i < this.SUfiles.length; i++) {
        this.SUfiles[i].selected = true;
        this.filesAll = true;
      }
    } else {
      for (let i = 0; i < this.SUfiles.length; i++) {
        this.SUfiles[i].selected = false;
        this.filesAll = false;
        this.selectedIds = [];
      }
    }
  }

  SelectedOptionalFiles(fileId: string, fileName: string, fileType: string, event: any) {
    if (event.target.checked === true) {
      this.selectedIds.push({ fileId: fileId, filename: fileName, fileType: fileType });
    } else {
      const index = this.selectedIds.findIndex((file) => file.fileId === fileId);
      // console.log(index)
      this.selectedIds.splice(index, 1);
    }
    if(this.selectedIds.length == this.SUfiles.length) {
      this.Salli = true
    } else {
      this.Salli = false
    }
  }

  viewFile(fileId: any) {
    // this.spinner.show();
    this.filingService.viewFile(this.orgId, this.filingId, fileId, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        let Viewres = JSON.parse(JSON.stringify(res));
        if (Viewres.Message == 'Not Authorized to view the file') {
          this.toaster.error('Not Authorized to view the file.');
        } else {
          //window.location.href = res.Message;
          window.open(Viewres.Message, '_blank');
        }
      },
      (error) => {
        this.toaster.error('error occured.');
      }
    );
  }

  printFile(fileId: any, filename: string, filetype: string) {
    this.spinner.show();
    this.fileName = filename;
    this.fileType = filetype;
    this.filingService.viewFile(this.orgId, this.filingId, fileId, this.token).subscribe(
      (res: any) => {
        if (res.Message == 'Not Authorized to view the file') {
          this.toaster.error('Not Authorized to print the file.');
        } else {
          this.PrintSSingleFile(res.Message);
        }

        this.spinner.hide();
      },
      (error) => {}
    );
  }

  PrintSSingleFile(filepath: any) {
    this.spinner.show();
    const url = filepath;
    this.http
      .get(url, {
        responseType: ResponseContentType.Blob,
      })
      .subscribe((response: any) => {
        // download file
        var mediaType = response._body.type;
        if (this.fileType == 'pdf') {
          var blob = new Blob([response.blob()], { type: 'application/pdf' });
          const blobUrl = URL.createObjectURL(blob);
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = blobUrl;
          document.body.appendChild(iframe);
          iframe.contentWindow.print();
        }
        if (this.fileType == 'xlsx' || this.fileType == 'csv') {
          var blob = new Blob([response.blob()], { type: mediaType });
          const blobUrl = URL.createObjectURL(blob);
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = blobUrl;
          document.body.appendChild(iframe);
          iframe.contentWindow.print();
        }

        if (
          this.fileType == 'jpg' ||
          this.fileType == 'jpeg' ||
          this.fileType == 'JPG' ||
          this.fileType == 'JPEG' ||
          this.fileType == 'png'
        ) {
          var blob = new Blob([response.blob()], { type: 'image/jpeg' });
          const blobUrl = URL.createObjectURL(blob);
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = blobUrl;
          document.body.appendChild(iframe);
          iframe.contentWindow.print();
        }
        if (this.fileType == 'txt') {
          var blob = new Blob([response.blob()], { type: 'text/plain' });
          const blobUrl = URL.createObjectURL(blob);
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = blobUrl;
          document.body.appendChild(iframe);
          iframe.contentWindow.print();
        }
      });
    this.spinner.hide();
  }

  downloadFile(fileId: any, filename: string, filetype: string) {
    this.fileName = filename;
    this.fileType = filetype;
    this.spinner.show();
    this.filingService.viewFile(this.orgId, this.filingId, fileId, this.token).subscribe(
      (res: any) => {
        if (res.Message == 'Not Authorized to view the file') {
          this.toaster.error('Not Authorized to download the file.');
        } else {
          this.DownloadSSingleFile(res.Message, res.Message1);
        }

        this.spinner.hide();
      },
      (error) => {}
    );
  }
  DownloadSSingleFile(filepath: any, filename: any) {
    this.fileName = filename;
    this.splittedFile = this.fileName.split('.');
    this.fileType = this.splittedFile[1];
    this.http
      .get(filepath, {
        responseType: ResponseContentType.Blob,
      })
      .subscribe(
        (response: any) => {
          const mediaType = this.fileType;
          const blob = new Blob([response._body], { type: mediaType });
          saveAs(blob, filename);
        },
        (err) => {
          this.toaster.error('error occured');
        }
      );
    this.spinner.hide();
  }
  printMultipleFiles() {
    this.selectedIds = [];
    for (let i = 0; i < this.Files.length; i++) {
      this.selectedIds.push({
        fileId: this.Files[i].FileId,
        filename: this.Files[i].FileName,
        fileType: this.Files[i].fileType,
      });
    }

    for (let i = 0; i < this.selectedIds.length; i++) {
      this.filingService.viewFile(this.orgId, this.filingId, this.selectedIds[i].fileId, this.token).subscribe(
        (res: any) => {
          if (res.Message == 'Not Authorized to view the file') {
            this.toaster.error('Not Authorized to print the file.');
          } else {
            this.PrintSSingleFile(res.Message);
          }

          this.spinner.hide();
        },
        (error) => {}
      );
    }
  }
  downloadMultipleFiles() {
    this.selectedIds = [];
    for (let i = 0; i < this.Files.length; i++) {
      this.selectedIds.push({
        fileId: this.Files[i].FileId,
        filename: this.Files[i].FileName,
        fileType: this.Files[i].fileType,
      });
    }

    for (let i = 0; i < this.selectedIds.length; i++) {
      this.filingService.viewFile(this.orgId, this.filingId, this.selectedIds[i].fileId, this.token).subscribe(
        (res: any) => {
          if (res.Message == 'Not Authorized to view the file') {
            this.toaster.error('Not Authorized to download the file.');
          } else {
            this.DownloadSSingleFile(res.Message, res.Message1);
          }

          this.spinner.hide();
        },
        (error) => {}
      );
    }

    this.toaster.info('select at least one file');
  }
  Modeladd(content: any) {
    this.addModel = this.modalService.open(content, { centered: true });
  }
  Closeadd(content: string) {
    this.addModel.close(content);
  }
}
