import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilingsService } from '@app/law-office-admin/app-layout/fillings/filings.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, NavigationExtras, ActivatedRoute, Params } from '@angular/router';
import { Http, ResponseContentType } from '@angular/http';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { FormNameConfig } from '@app/enums/FormNames.config';
import { FormService } from '@app/shared/service/form.service';
@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss'],
})
export class CaseComponent implements OnInit {
  addModel: any;
  formsinfo: any = [];
  filingId: any;
  orgId: any;
  caseforms: any = [];
  autofocus: boolean = false;
  searchFilter: string;
  GformsSelected: any = [];
  SformsSelected: any = [];
  issubmitforms: boolean = false;
  FormsDownload: any = [];
  SFiles: any = [];
  SFolders: any = [];
  token: string;
  filesDiv: boolean;
  Files: any = [];
  SUfiles: any = [];
  splittedFile: any;
  emptyState: boolean;
  fileName: any;
  fileType: any;
  selectedIds: any = [];
  filesAll: boolean;
  Salli: any;
  caseId: any;
  caseIdzero: any;
  constructor(
    private modalService: NgbModal,
    private filingService: FilingsService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private http: Http,
    private toaster: ToastrService,
    private formService: FormService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // subscribe to router event
    this.caseId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.filingId = sessionStorage.getItem('FillingId');
    this.orgId = sessionStorage.getItem('OrganisationID');
    this.Getforms();
    this.GetCaseforms();
    this.GetFilesInSupportingFilesSection();
    this.GetFoldersInSupportingFilesSection();
    this.getFiles();
  }

  getFiles() {
    this.filesDiv = true;
    this.caseIdzero = 0;
    this.filingService.getFilesCaseSubmission(this.orgId, this.filingId, this.caseIdzero, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.Files = res;
        for (let i = 0; i < this.Files.length; i++) {
          this.splittedFile = this.Files[i].FileName.split('.');
          this.Files[i].fileType = this.splittedFile[1];
        }
        if (this.Files.length === 0) {
          this.filesDiv = false;
          this.emptyState = true;
        } else {
          this.emptyState = false;
          this.filesDiv = true;
        }
      },
      (error) => {
        this.toaster.error('error occured');
      }
    );
  }

  // SelectedOptionalFiles(fileId: string, fileName: string, fileType: string, event: any) {
  //   if (event.target.checked === true) {
  //     this.selectedIds.push({ fileId: fileId, filename: fileName, fileType: fileType });
  //   }
  // }

  Modeladd(content: any) {
    this.addModel = this.modalService.open(content, { centered: true });
  }

  Modeladds(contents: any) {
    this.addModel = this.modalService.open(contents, { centered: true });
  }
  Closeadd(content: string) {
    this.addModel.close(content);
  }
  gformselect(event, gadta, i) {
    if (event.target.checked) {
      this.GformsSelected.push(gadta);
    } else {
      const index: number = this.GformsSelected.indexOf(gadta);
      if (index !== -1) {
        this.GformsSelected.splice(index, 1);
      }
    }
  }

  sformselect(event, file, i) {
    if (event.target.checked) {
      this.SformsSelected.push(file);
      // this.pageone.Ste3b = true;
    } else {
      const index: number = this.SformsSelected.indexOf(file);
      if (index !== -1) {
        this.SformsSelected.splice(index, 1);
      }

      //this.pageone.Ste3b = false;
    }
  }

  submitfiles() {
    var fileids = [];
    for (var i = 0; i < this.SformsSelected.length; i++) {
      fileids.push(this.SformsSelected[i].FileId);
    }

    if (fileids.length == 0) {
    } else {
      this.filingService
        .AddFilesAndFoldersToSupportingFilesSection(
          this.orgId,
          this.filingId,
          this.caseId,
          fileids.toString(),
          '',
          this.token
        )
        .subscribe(
          (res: any) => {
            this.GetFilesInSupportingFilesSection();
            this.Closeadd('close click');
          },
          (err) => {
            this.spinner.hide();
            this.Closeadd('close click');
          }
        );
    }
  }

  g28click(item) {
    this.router.navigate(['admin/fillings/form']);
    return;
    // if (item.FormName == 'g-28') {
    //   this.spinner.show();
    //   this.router.navigate(['admin/fillings/g28']);
    //   this.spinner.hide();
    // } else if (item.FormName == 'i-129') {
    //   this.spinner.show();
    //   this.router.navigate(['admin/fillings/i129']);
    //   this.spinner.hide();
    // } else if (item.FormName == 'i-526') {
    //   this.spinner.show();
    //   this.router.navigate(['admin/fillings/i526']);
    //   this.spinner.hide();
    // } else if (item.FormName == 'i-1145') {
    //   this.spinner.show();
    //   this.router.navigate(['admin/fillings/g-1145']);
    //   this.spinner.hide();
    // } else if (item.FormName == 'i-485') {
    //   this.spinner.show();
    //   this.router.navigate(['admin/fillings/i485']);
    //   this.spinner.hide();
    // }
  }

  G28viewforfiling(item, caseId) {
    this.formPrintAndDownLoad(false, item.FormName, caseId);
  }

  Printdocument(item, caseId) {
    // if (item.FormName == 'g-28') {
    this.formPrintAndDownLoad(true, item.FormName, caseId);
    // } else if (item.FormName == 'i-129') {
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
    //           (err) => { }
    //         );
    //     },
    //     (err) => {
    //       this.spinner.hide();
    //     }
    //   );
    // }
  }

  formPrintAndDownLoad(isPrint, formName, caseId) {
    if (formName === 'g-28') {
      formName = FormNameConfig.G28;
    } else if (formName == 'i-129') {
      formName = FormNameConfig.I129;
    }
    let formObj = {
      FilingId: sessionStorage.getItem('FillingId'),
      VersionId: '0',
      FormName: formName,
      FormValues: {},
    };
    this.spinner.show();
    this.formService.previewImmigrationFormData(this.orgId, formObj, caseId).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.Status == 1) {
          if (isPrint) {
            this.PrintSingleFile(res.Message);
          } else {
            this.DownloadSingleFile(res.Message, formName + '-' + Date.now() + '.pdf');
          }
        } else if (res.Status == 0) {
          this.toaster.error(res.Message);
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
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
        this.spinner.hide();
      });
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
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
          this.toaster.error('Error occured while downloading..', 'Error');
        }
      );
  }

  Getforms() {
    this.spinner.show();
    var tokenid = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.filingService.GetForms(tokenid).subscribe(
      (res) => {
        this.spinner.hide();
        if (res == null) {
          this.formsinfo = [];
        } else {
          this.formsinfo = JSON.parse(JSON.stringify(res));
        }
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  GetCaseforms() {
    this.spinner.show();
    this.caseforms = [];
    var tokenid = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.spinner.show();
    this.filingService.GetCaseForms(this.orgId, this.filingId, this.caseId, tokenid, 'H1').subscribe(
      (res) => {
        this.spinner.hide();
        if (res == null) {
          this.caseforms = [];
        } else {
          var cf = JSON.parse(JSON.stringify(res));
          for (var i = 0; i < cf.length; i++) {
            this.caseforms.push({
              $id: cf[i].FormId,
              FormName: cf[i].FormName,
              isselected: false,
            });
          }
          // console.log('forms', this.caseforms);
        }
      },
      (err) => {
        // console.log(JSON.stringify(err));
        this.spinner.hide();
      }
    );
  }

  Submitforms() {
    if (this.GformsSelected.length == 0) {
      this.issubmitforms = true;
    } else {
      this.spinner.show();
      var tokenid = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
      this.filingService
        .AddingToForms(this.orgId, this.filingId, this.caseId, tokenid, 'H1', this.GformsSelected)
        .subscribe(
          (res) => {
            this.spinner.hide();
            this.Closeadd('close click');
            if (res == null) {
            } else {
              this.Closeadd('close click');
              this.GetCaseforms();
            }
          },
          (err) => {
            this.spinner.hide();
          }
        );
    }
  }
  visitingInput() {
    this.issubmitforms = false;
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
  downloadselected() {
    if (this.FormsDownload.length > 0) {
      for (var i = 0; i < this.FormsDownload.length; i++) {
        this.formPrintAndDownLoad(false, this.FormsDownload[i].FormName, this.caseId);
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
        //     }
        //   );
        // }
      }
    } else {
      this.toaster.info('Select at least One to download..');
    }
  }

  printselected() {
    if (this.FormsDownload.length > 0) {
      for (var i = 0; i < this.FormsDownload.length; i++) {
        this.formPrintAndDownLoad(true, this.FormsDownload[i].FormName, this.caseId);
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
        //       //this.spinner.hide();
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

  GetFilesInSupportingFilesSection() {
    this.SUfiles = [];
    this.caseIdzero = 0;
    var tokenid = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.filingService.GetFilesInSupportingFilesSection(this.orgId, this.filingId, this.caseId, tokenid).subscribe(
      (res: any = []) => {
        for (let i = 0; i < res.length; i++) {
          this.splittedFile = res[i].FileName.split('.');

          this.SUfiles.push({
            $id: res[i].$id,
            FileId: 's' + res[i].FileId,
            FileName: res[i].FileName,
            S3BucketPath: res[i].S3BucketPath,
            fileType: this.splittedFile[1],
            Sfileid: res[i].FileId,
            selected: false,
          });
        }
      },
      (err) => {
        this.toaster.error('Error occurred while archiveing Topic..', 'Error');
      }
    );
  }
  GetFoldersInSupportingFilesSection() {
    var tokenid = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.filingService.GetFoldersInSupportingFilesSection(this.orgId, this.filingId, this.caseId, tokenid).subscribe(
      (res: any = []) => {
        //console.log(res);

        var files = JSON.parse(JSON.stringify(res));

        if (files.length == 0) {
          this.SFiles = [];
        } else {
          this.SFiles = files;
        }
      },
      (err) => {
        this.toaster.error('Error occurred while archiveing Topic..', 'Error');
      }
    );
  }

  Suelectingall(event) {
    if (event.target.checked) {
      for (var i = 0; i < this.SUfiles.length; i++) {
        this.SUfiles[i].isselected = true;
      }
      this.FormsDownload = this.SUfiles;
    } else {
      for (var i = 0; i < this.SUfiles.length; i++) {
        this.SUfiles[i].isselected = false;
      }
      this.FormsDownload = [];
    }
  }

  viewFile(fileId: any) {
    // this.spinner.show();
    this.filingService.viewFile(this.orgId, this.filingId, fileId, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        let Viewres = JSON.parse(JSON.stringify(res));
        if (res.Message == 'Not Authorized to view the file') {
          this.toaster.error('Not Authorized to view the file.');
        } else {
          window.open(Viewres.Message, '_blank');
          // window.location.href = res.Message;
        }

        // window.location.href = res.Message;
      },
      (error) => {}
    );
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
      (error) => {
        this.spinner.hide();
      }
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
          this.spinner.hide();
          this.toaster.error('error occured');
        }
      );
    this.spinner.hide();
  }

  printFile(fileId: any, filename: string, filetype: string) {
    this.spinner.show();
    //console.log(this.fileType)
    this.fileName = filename;
    this.fileType = filetype;
    this.filingService.viewFile(this.orgId, this.filingId, fileId, this.token).subscribe(
      (res: any) => {
        // console.log(res)
        if (res.Message == 'Not Authorized to view the file') {
          this.toaster.error('Not Authorized to print the file.');
        } else {
          this.PrintSSingleFile(res.Message, filetype);
        }
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  PrintSSingleFile(filepath: any, fileType: any) {
    this.spinner.show();
    const url = filepath;
    this.http
      .get(url, {
        responseType: ResponseContentType.Blob,
      })
      .subscribe((response: any) => {
        // download file
        var mediaType = response._body.type;
        if (fileType == 'pdf') {
          var blob = new Blob([response.blob()], { type: 'application/pdf' });
          const blobUrl = URL.createObjectURL(blob);
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = blobUrl;
          document.body.appendChild(iframe);
          iframe.contentWindow.print();
        } else if (fileType == 'xlsx' || this.fileType == 'csv') {
          var blob = new Blob([response.blob()], { type: mediaType });
          const blobUrl = URL.createObjectURL(blob);
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = blobUrl;
          document.body.appendChild(iframe);
          iframe.contentWindow.print();
        } else if (
          fileType == 'jpg' ||
          fileType == 'jpeg' ||
          fileType == 'JPG' ||
          fileType == 'JPEG' ||
          fileType == 'png' ||
          fileType == 'PNG'
        ) {
          //console.log('image',fileType)
          var blob = new Blob([response.blob()], { type: 'image/jpeg' });
          const blobUrl = URL.createObjectURL(blob);
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = blobUrl;
          document.body.appendChild(iframe);
          iframe.contentWindow.print();
        } else if (fileType == 'txt') {
          var blob = new Blob([response.blob()], { type: 'text/plain' });
          const blobUrl = URL.createObjectURL(blob);
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = blobUrl;
          document.body.appendChild(iframe);
          iframe.contentWindow.print();
        } else {
          //console.log(fileType)
          var blob = new Blob([response.blob()], { type: '*' });
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

  selectingsforms(event: any, cform) {
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

  SelectedOptionalFiles(fileId: string, fileName: string, fileType: string, event: any) {
    // console.log(fileId+"--"+fileName+"--"+fileType)
    if (event.target.checked === true) {
      this.selectedIds.push({ fileId: fileId, filename: fileName, fileType: fileType });
    } else {
      const index = this.selectedIds.findIndex((file) => file.fileId === fileId);
      // console.log(index)
      this.selectedIds.splice(index, 1);
    }
    if (this.selectedIds.length == this.SUfiles.length) {
      this.Salli = true;
    } else {
      this.Salli = false;
    }
  }

  selectAllFiles(event) {
    //console.log(event.target.checked)
    if (event === true) {
      // console.log(event.target.checked)
      for (let i = 0; i < this.SUfiles.length; i++) {
        this.SUfiles[i].selected = true;
        this.filesAll = true;
      }
      for (let i = 0; i < this.Files.length; i++) {
        this.selectedIds.push({
          fileId: this.Files[i].FileId,
          filename: this.Files[i].FileName,
          fileType: this.Files[i].fileType,
        });
      }
    } else {
      //console.log(event.target.checked)
      for (let i = 0; i < this.SUfiles.length; i++) {
        this.SUfiles[i].selected = false;
        this.filesAll = false;
        this.selectedIds = [];
      }
    }
  }

  downloadMultipleFiles() {
    // this.selectedIds = [];
    // for (let i = 0; i < this.Files.length; i++) {
    //   this.selectedIds.push({
    //     fileId: this.Files[i].FileId,
    //     filename: this.Files[i].FileName,
    //     fileType: this.Files[i].fileType
    //   });
    // }

    if (this.selectedIds.length == 0) {
      this.toaster.warning('Select at least One to download..');
    } else {
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
    }
  }

  printMultipleFiles() {
    // this.selectedIds = [];
    // for (let i = 0; i < this.Files.length; i++) {
    //   this.selectedIds.push({
    //     fileId: this.Files[i].FileId,
    //     filename: this.Files[i].FileName,
    //     fileType: this.Files[i].fileType
    //   });
    // }

    if (this.selectedIds.length == 0) {
      this.toaster.warning('Select at least One for printing..');
    } else {
      for (let i = 0; i < this.selectedIds.length; i++) {
        this.filingService.viewFile(this.orgId, this.filingId, this.selectedIds[i].fileId, this.token).subscribe(
          (res: any) => {
            if (res.Message == 'Not Authorized to view the file') {
              this.toaster.error('Not Authorized to print the file.');
            } else {
              this.PrintSSingleFile(res.Message, this.selectedIds[i].fileType);
            }

            this.spinner.hide();
          },
          (error) => {}
        );
      }
    }
  }
}
