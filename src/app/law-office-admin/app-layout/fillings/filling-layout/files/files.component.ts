import { Component, OnInit } from '@angular/core';
import { FilingsService } from '@app/law-office-admin/app-layout/fillings/filings.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Http, ResponseContentType } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { FileUploader } from 'ng2-file-upload';
import { AdminClientService } from '@app/law-office-admin/app-layout/clients/client.service';
import { AdminService } from '@app/law-office-admin/admin.service';
import { AdminpermissionService } from '@app/auth-guard/admin/adminpermission.service';
import { ToastrService } from 'ngx-toastr';
import { RandomColor } from 'angular-randomcolor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '@app/shared/service/validation.service';
import { CommonService } from '@app/shared/service/common.service';

declare var gapi: any;
declare var google: any;
declare var Dropbox: any;

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
})
export class FilesComponent implements OnInit {
  selectedFilesList: any = [];
  filesList: any = [];
  splittedFile: any;
  folderName: any;
  fileProgress: any;
  fileType: any;
  foldersListData: any = [];
  isFiles: boolean;
  isSelectedFiles = true;
  fileName: any;
  selectedIds: any = [];
  teamMembersList: any = [];
  searchele: any;
  isViewfile: boolean;
  filesNames: any = [];
  adminClientsListData: any = [];
  filesDiv: boolean;
  // tslint:disable-next-line:no-inferrable-types
  reverse: boolean = false;
  all: boolean;
  members: any = [];
  filingId: any;
  uploadFilesDiv: boolean;
  filepath: string;
  // emptyState: boolean;
  key: any;
  sortBy: any;
  orgId: any;
  allFiles: any = [];
  fileId: any;
  allClients = false;
  allTeam: boolean;
  token: string;
  Files: any = [];
  fileAccessPath: any;
  newFoldermodel: any;
  sentModel: any;
  privacyModel: any;
  filedeleteModel: any;
  folderdeleteModel: any;
  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  selectAll: boolean = false;
  FillingPermissions: any = {};
  FileCreatedby: any = '';
  FileCreatedDate: any = '';
  CreatedFileType: any = '';
  clientId = '482163528652-r6lkgd3ogj95150tdcnbaa02l60glpc6.apps.googleusercontent.com';
  scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/drive', //insert scope here
  ].join(' ');
  pickerApiLoaded = false;
  oauthToken?: any;
  ddocs: any = [];
  RemovefileID: number;
  RemovefolderID: number;
  colors: any = [];
  Subcolors: any = [];
  progress: number = 0;
  uploaddeleteModel: any;
  Uploadfileindex: number;
  DeletefolderModel: any;
  DeleteFolderid: any;
  DeletefileModel: any;
  Deletefileid: any;
  FolderForm: FormGroup;
  username: any = '';
  caseId: number = 0;
  constructor(
    private filingService: FilingsService,
    private router: Router,
    private adminService: AdminService,
    private modalService: NgbModal,
    private http: Http,
    private clientService: AdminClientService,
    private spinner: NgxSpinnerService,
    private permissionService: AdminpermissionService,
    private toaster: ToastrService,
    private fb: FormBuilder,
    private Valid: ValidationService,
    private commonService: CommonService
  ) {
    this.filingId = sessionStorage.getItem('FillingId');
    this.orgId = sessionStorage.getItem('OrganisationID');
    this.isFiles = true;
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.username = sessionStorage.getItem('AdminUserName');

    this.getColor();

    for (var i = 0; i < 100; i++) {
      this.Subcolors.push(this.getsubColor());
    }
  }

  ngOnInit() {
    this.FillingPermissions = this.permissionService.FillingPermissions();
    this.username = sessionStorage.getItem('AdminUserName');
    this.getFiles();
    //this.adminClientsList();
    this.getFilingClientTeammembers();
    this.getFilingAdminTeammembers();
    this.FolderCreateForm();
    //this.loadTeamList();
    this.sortBy = '1';
    this.all = false;
  }

  FolderCreateForm() {
    this.FolderForm = this.fb.group({
      folderName: this.Valid.validateform.Taskname,
    });
  }

  getColor() {
    for (var i = 0; i < 100; i++) {
      const newColor = RandomColor.generateColor();

      this.colors.push(newColor);
    }
  }
  getsubColor() {
    const zeros = '0000000';
    let color = '#' + Math.floor(Math.random() * 0xffffff).toString(16);
    var colorLength = color.length;
    if (colorLength < 90) {
      color += zeros.substring(0, zeros.length - colorLength);
    }
    return color;
  }

  getShortName(fullName) {
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('');
  }

  Modelsent(data: any) {
    this.sentModel = this.modalService.open(data, { centered: true });
  }

  ModelUploadFiledelete(uploadfiledelete, i) {
    //console.log(i)
    this.uploaddeleteModel = this.modalService.open(uploadfiledelete, { centered: true });
    this.Uploadfileindex = i;
  }

  ModelFiledelete(filedelete, fileId: any) {
    this.RemovefileID = fileId;
    this.filedeleteModel = this.modalService.open(filedelete, { centered: true });
  }

  ModelFolderdelete(folderdelete, FolderId: any) {
    this.RemovefolderID = FolderId;
    this.folderdeleteModel = this.modalService.open(folderdelete, { centered: true });
  }

  sort() {
    this.key = this.sortBy;
    if (this.sortBy === 'UploadedOn') {
      this.reverse = true;
    } else {
      this.reverse = false;
    }
  }

  adminClientsList() {
    this.clientService.adminClientsList(this.orgId).subscribe(
      (data: any) => {
        this.adminClientsListData = data;
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  selectedFiles(event: any) {
    this.selectedFilesList = [];
    this.isSelectedFiles = false;
    this.filesList = [];
    this.filesNames = [];
    for (let j = 0; j < event.target.files.length; j++) {
      //console.log(event.target.files[j])
      this.allFiles.push({ file: event.target.files[j] });
    }
    for (let i = 0; i < this.allFiles.length; i++) {
      this.selectedFilesList.push({ id: i, file: this.allFiles[i].file });
      this.filesList[i] = this.selectedFilesList[i].file;
      this.splittedFile = this.filesList[i].name.split('.');
      this.filesNames.push({ id: i, name: this.filesList[i].name, fileType: this.splittedFile[1] });
      if (this.filesNames.length != 0) {
        this.isSelectedFiles = false;
      } else {
        this.isSelectedFiles = true;
      }
    }
  }

  emptySelectedFiles(event: any) {
    this.selectedFilesList = [];
    this.filesList = [];
    this.filesNames = [];
    for (let j = 0; j < event.target.files.length; j++) {
      this.allFiles.push({ file: event.target.files[j] });
    }
    for (let i = 0; i < this.allFiles.length; i++) {
      this.selectedFilesList.push({ id: i, file: this.allFiles[i].file });
      this.filesList[i] = this.selectedFilesList[i].file;
      this.splittedFile = this.filesList[i].name.split('.');
      this.filesNames.push({ id: i, name: this.filesList[i].name, fileType: this.splittedFile[1] });
    }
    this.fileUpload();
  }

  fileUpload() {
    this.spinner.show();
    this.fileProgress = 99;
    const formdata: FormData = new FormData();
    for (let i = 0; i < this.filesList.length; i++) {
      formdata.append('attachments', this.filesList[i]);
    }
    this.filingId = sessionStorage.getItem('FillingId');
    this.orgId = sessionStorage.getItem('OrganisationID');
    this.filingService.fileUpload(this.orgId, this.filingId, formdata, this.token).subscribe(
      (res: any) => {
        // console.log(res)
        this.spinner.hide();
        this.fileProgress = 100;
        this.uploadFilesDiv = false;
        this.toaster.success('file uploaded successfully');
        this.getFiles();
      },
      (error) => {
        this.toaster.error('uploading failed');
      }
    );
  }

  deleteFolder(folderId: any) {
    this.filingService.deleteFolder(this.orgId, this.filingId, folderId, this.token).subscribe(
      (res: any) => {
        this.toaster.info('Folder Deleted Sucessfully');
        this.FoldersList();
      },
      (error) => {
        this.toaster.error('Error Occured');
      }
    );
  }

  Deletefilesfolder() {
    this.modalService.dismissAll();
    this.spinner.show();
    this.filingService.deleteFolder(this.orgId, this.filingId, this.RemovefolderID, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.toaster.info('Folder Deleted Sucessfully');
        this.FoldersList();
      },
      (error) => {
        this.spinner.hide();
        this.toaster.error('Error Occured');
      }
    );
  }
  deleteFolderpopup(item, fid) {
    this.RemovefolderID = fid;
    this.DeletefolderModel = this.modalService.open(item, {
      centered: true,
      keyboard: false,
      backdrop: 'static',
    });
  }
  removeFilepopup(item, fid) {
    this.RemovefileID = fid;
    this.DeletefileModel = this.modalService.open(item, {
      centered: true,
      keyboard: false,
      backdrop: 'static',
    });
  }

  removeSelectedFile() {
    this.filesList = [];
    this.filesNames.splice(this.Uploadfileindex, 1);
    this.allFiles.splice(this.Uploadfileindex, 1);
    this.selectedFilesList.splice(this.Uploadfileindex, 1);
    if (this.filesNames.length != 0) {
      this.isSelectedFiles = false;
    } else {
      this.isSelectedFiles = true;
    }

    this.modalService.dismissAll();
  }

  modelNewfolder(data: any) {
    this.newFoldermodel = this.modalService.open(data, { size: 'sm', centered: true });
  }

  routeToFolder(id: any) {
    sessionStorage.setItem('folderId', id);
    this.router.navigate(['/admin/fillings/files/folder']);
  }

  FoldersList() {
    this.filingService.getListOfFolders(this.orgId, this.filingId, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.foldersListData = res;
        if (this.Files.length || this.foldersListData.length) {
          this.filesDiv = true;
        } else {
          this.filesDiv = false;
        }
      },
      (error) => {}
    );
  }

  createFolder() {
    this.modalService.dismissAll();
    this.spinner.show();
    // setTimeout(() => {
    //   this.modalService.dismissAll();
    // }, 2000);
    this.filingService.createFolder(this.orgId, this.filingId, this.folderName, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.folderName = '';
        if (res['Message'] == 'Folder Name Already Exists') {
          this.toaster.info('The Folder Name Already exists. Please  Create With Different Name');
        } else {
          this.toaster.info(res['Message']);
        }
        this.FoldersList();
      },
      (error) => {
        this.spinner.hide();
        this.toaster.error('Folder Creation Failed');
      }
    );
  }

  Deletefile() {
    this.spinner.show();
    this.filingService.deleteFiles(this.orgId, this.filingId, this.RemovefileID, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.toaster.info('file deleted');
        this.getFiles();
        this.FoldersList();
        this.modalService.dismissAll();
      },
      (error) => {
        this.toaster.error('error occured');
      }
    );
  }

  removeFile() {
    this.modalService.dismissAll();
    this.spinner.show();
    this.filingService.deleteFiles(this.orgId, this.filingId, this.RemovefileID, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();

        this.toaster.info('file deleted');
        this.getFiles();
      },
      (error) => {
        this.toaster.error('error occured');
      }
    );
  }

  selectAllFiles(event: any) {
    if (event.target.checked === true) {
      for (let i = 0; i < this.Files.length; i++) {
        this.Files[i].selected = true;
      }
    } else {
      for (let i = 0; i < this.Files.length; i++) {
        this.Files[i].selected = false;
        this.selectedIds = [];
      }
    }
  }

  selectAllClientMembers(event: any, userType: number) {
    if (event.target.checked === true) {
      this.adminClientsListData.forEach((element, index) => {
        this.adminClientsListData[index].selected = true;
      });
    } else {
      this.adminClientsListData.forEach((element, index) => {
        this.adminClientsListData[index].selected = false;
      });
    }
  }

  selectClientMembers(event: any, index: any) {
    if (event.target.checked === true) {
      this.adminClientsListData[index].selected = true;
    } else {
      this.adminClientsListData[index].selected = false;
    }
    const selectedClient = this.adminClientsListData.filter((i) => i.selected == true);
    if (selectedClient.length == this.adminClientsListData.length) {
      this.allClients = true;
    } else {
      this.allClients = false;
    }
  }

  selectAllTeamMembers(event: any, userType: number) {
    if (event.target.checked === true) {
      this.teamMembersList.forEach((element, index) => {
        this.teamMembersList[index].selected = true;
      });
    } else {
      this.teamMembersList.forEach((element, index) => {
        this.teamMembersList[index].selected = false;
      });
    }
  }

  selectTeamMembers(event: any, index: any) {
    if (event.target.checked === true) {
      this.teamMembersList[index].selected = true;
    } else {
      this.teamMembersList[index].selected = false;
    }
    const selectedTeamList = this.teamMembersList.filter((i) => i.selected == true);
    if (selectedTeamList.length == this.teamMembersList.length) {
      this.allTeam = true;
    } else {
      this.allTeam = false;
    }
  }

  Modelprivacy(data: any, fileName: string, fileId: any, fileinfo: any) {
    if (
      !this.commonService.checkNullorUndefined(fileinfo.FileAccessClientMemberIds) &&
      fileinfo.FileAccessClientMemberIds.length
    ) {
      fileinfo.FileAccessClientMemberIds.forEach((element) => {
        let index = this.adminClientsListData.findIndex((c) => c.LawOfficeClientID == element);
        if (index != -1) {
          this.adminClientsListData[index].selected = true;
        }
      });
      if (fileinfo.FileAccessClientMemberIds.length == this.adminClientsListData.length) {
        this.allClients = true;
      }
    }
    if (
      !this.commonService.checkNullorUndefined(fileinfo.FileAccesAdminMemeberIds) &&
      fileinfo.FileAccesAdminMemeberIds.length
    ) {
      fileinfo.FileAccesAdminMemeberIds.forEach((element) => {
        let index = this.teamMembersList.findIndex((c) => c.AdminID == element);
        if (index != -1) {
          this.teamMembersList[index].selected = true;
        }
      });
      if (fileinfo.FileAccesAdminMemeberIds.length == this.teamMembersList.length) {
        this.allTeam = true;
      }
    }
    this.fileName = fileName;
    this.fileId = fileId;
    this.FileCreatedby = fileinfo.CreatedBy;
    this.FileCreatedDate = fileinfo.UploadedOn;
    this.CreatedFileType = fileinfo.fileType;
    this.privacyModel = this.modalService.open(data, { size: 'lg' });
  }

  filePermissions() {
    this.members = [];
    this.teamMembersList.forEach((element, index) => {
      if (this.teamMembersList[index].selected == true) {
        this.selectedTeamMembers(index, true);
      } else {
        this.selectedTeamMembers(index, false);
      }
    });

    this.adminClientsListData.forEach((element, index) => {
      if (this.adminClientsListData[index].selected == true) {
        this.selectedClientMembers(index, true);
      } else {
        this.selectedClientMembers(index, false);
      }
    });
    console.log(this.members);

    setTimeout(() => {
      this.modalService.dismissAll();
    }, 2000);
    this.spinner.show();
    this.filingService.fileViewPermissions(this.members, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.toaster.info('Permissions updated to file');
        this.getFiles();
      },
      (error) => {}
    );
  }

  private selectedTeamMembers(index: any, CanViewUploadedFile) {
    this.members.push({
      OrganisationID: this.orgId,
      FilingID: this.filingId,
      FileId: this.fileId,
      CDBRespectiveTableId: this.teamMembersList[index].AdminID,
      userType: 1,
      CanViewUploadedFile: CanViewUploadedFile,
    });
  }
  private selectedClientMembers(index: any, CanViewUploadedFile) {
    this.members.push({
      OrganisationID: this.orgId,
      FilingID: this.filingId,
      FileId: this.fileId,
      CDBRespectiveTableId: this.adminClientsListData[index].LawOfficeClientID,
      userType: 2,
      CanViewUploadedFile: CanViewUploadedFile,
    });
  }

  getFiles() {
    this.spinner.show();
    this.filingService.getFiles(this.orgId, this.filingId, this.caseId, this.token).subscribe(
      (res: any) => {
        this.FoldersList();
        //console.log('files',res)
        this.Files = res;
        for (let i = 0; i < this.Files.length; i++) {
          this.splittedFile = this.Files[i].FileName.split('.');
          this.Files[i].fileType = this.splittedFile[1];
        }
      },
      (error) => {
        this.spinner.hide();
        this.toaster.error('error occured');
      }
    );
  }

  viewFile(fileId: any) {
    // this.spinner.show();
    this.filingService.viewFile(this.orgId, this.filingId, fileId, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        let Viewres = JSON.parse(JSON.stringify(res));
        if (Viewres.Message == 'Not Authorized to view the file') {
          this.toaster.error(Viewres.Message);
        } else {
          this.fileAccessPath = Viewres.Message;
          this.isViewfile = true;
          window.open(Viewres.Message, '_blank');
        }
      },
      (error) => {}
    );
  }

  DownloadSingleFile(filepath: any, filename: any) {
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
          for (let i = 0; i < this.Files.length; i++) {
            this.Files[i].selected = false;
          }
          this.selectAll = false;
        },
        (err) => {
          this.toaster.error('error occured');
        }
      );
    this.spinner.hide();
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  downloadFile(fileId: any, filename: string, filetype: string) {
    this.fileName = filename;
    this.fileType = filetype;
    this.spinner.show();
    this.filingService.viewFile(this.orgId, this.filingId, fileId, this.token).subscribe(
      (res: any) => {
        this.DownloadSingleFile(res.Message, res.Message1);
        this.spinner.hide();
      },
      (error) => {}
    );
  }

  SelectedOptionalFiles(fileId: string, fileName: string, fileType: string, event: any) {
    if (event.target.checked === true) {
      this.selectedIds.push({ fileId: fileId, filename: fileName, fileType: fileType });
      if (this.selectedIds.length == this.Files.length) {
        this.selectAll = true;
      } else {
        this.selectAll = false;
      }
    } else {
      const index = this.selectedIds.findIndex((file) => file.fileId === fileId);
      this.selectedIds.splice(index, 1);
      this.selectAll = false;
    }
  }

  downloadMultipleFiles() {
    this.selectedIds = [];
    let files = this.Files.filter((i) => i.selected == true);
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.selectedIds.push({
          fileId: files[i].FileId,
          filename: files[i].FileName,
          fileType: files[i].fileType,
        });
      }
      for (let i = 0; i < this.selectedIds.length; i++) {
        this.filingService.viewFile(this.orgId, this.filingId, this.selectedIds[i].fileId, this.token).subscribe(
          (res: any) => {
            this.DownloadSingleFile(res.Message, res.Message1);
            this.spinner.hide();
          },
          (error) => {}
        );
      }
    } else {
      this.toaster.error('Please select atleast one file to download');
    }
  }

  uploadSection() {
    this.fileProgress = 0;
    this.uploadFilesDiv = true;
    this.filesNames = [];
    this.allFiles = [];
    this.selectedFilesList = [];
    this.getFilingClientTeammembers();
  }

  backToFiles() {
    this.uploadFilesDiv = false;
  }

  printFile(fileId: any, filename: string, filetype: string) {
    this.spinner.show();
    this.fileName = filename;
    this.fileType = filetype;
    this.filingService.viewFile(this.orgId, this.filingId, fileId, this.token).subscribe(
      (res: any) => {
        this.PrintSingleFile(res.Message);
        this.spinner.hide();
      },
      (error) => {}
    );
  }

  PrintSingleFile(filepath: any) {
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
          var blob = new Blob([response.blob()], { type: 'text/csv;encoding:utf-8' });
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
          this.fileType == 'png' ||
          this.fileType == 'PNG'
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

  loadTeamList() {
    if (sessionStorage.getItem('IsOwner') === 'true') {
      this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
      this.adminService.OrgTeamMembersList(sessionStorage.getItem('OrganisationID'), this.token).subscribe(
        (res: any[]) => {
          this.teamMembersList = res;
        },
        (err) => {
          this.toaster.error('error occured');
        }
      );
    }
  }

  getFilingClientTeammembers() {
    let teamobj = {
      FilingId: sessionStorage.getItem('FillingId'),
      AdminOrgId: sessionStorage.getItem('OrganisationID'),
    };
    this.adminService.GetFilingClientTeammembers(teamobj).subscribe(
      (res: any[]) => {
        this.spinner.hide();
        //console.log('client', res)
        if (res != null && res != undefined) {
          this.adminClientsListData = res;
        }
      },
      (err) => {
        this.toaster.error('error occured');
      }
    );
  }

  getFilingAdminTeammembers() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    let clientobj = {
      FilingId: sessionStorage.getItem('FillingId'),
      AdminOrgId: sessionStorage.getItem('OrganisationID'),
    };
    this.adminService.GetFilingAdminTeammembers(clientobj, this.token).subscribe(
      (res: any[]) => {
        this.spinner.hide();
        //console.log('team', res)
        if (res != null && res != undefined) {
          //this.teamMembersList = res;
          this.teamMembersList = res.filter((s) => s.Status == true);

          //this.loadTeamList();
        }
      },
      (err) => {
        this.toaster.error('error occured');
      }
    );
  }

  // googleDriveLogin() {
  //   this.filingService.googleDriveLogin(this.token).subscribe(
  //     (res: any) => {
  //
  //     },
  //     error => {
  //
  //     }
  //   );
  // }

  // dropBoxLogin() {
  //   this.filingService.dropBoxLogin(this.token).subscribe(
  //     (res: any) => {
  //       this.dropBoxFiles();
  //
  //     },
  //     error => {
  //
  //     }
  //   );
  // }

  // dropBoxFiles() {
  //   this.filingService.dropBoxAllFiles(this.token).subscribe(
  //     (res: any) => {
  //
  //     },
  //     error => {
  //
  //     }
  //   );
  // }

  // dropBoxFileDownload(file: string) {
  //   this.filingService.dropboxFileDownload(file, this.orgId, this.filingId, this.token).subscribe(
  //     (res: any) => {
  //
  //     },
  //     error => {
  //
  //     }
  //   );
  // }

  // googleDriveFileDownload(file: string) {
  //   this.filingService.googleDriveFileDownload(file, this.orgId, this.filingId, this.token).subscribe(
  //     (res: any) => {
  //
  //     },
  //     error => {
  //
  //     }
  //   );
  // }
  toggler(ev: any, id: any) {
    document.getElementById(id).classList.toggle('d-n');
  }

  // Google Drive and Dropbox
  ConnectgoogleDrive() {
    this.closeModal();
    // gapi.load('auth', { callback: this.onAuthApiLoad.bind(this) });
    // gapi.load('picker', { callback: this.onPickerApiLoad.bind(this) });
  }
  onAuthApiLoad() {
    gapi.auth.authorize(
      {
        client_id: this.clientId,
        scope: this.scope,
        immediate: false,
      },
      this.handleAuthResult
    );
  }

  onPickerApiLoad() {
    this.pickerApiLoaded = true;
  }

  handleAuthResult(authResult) {
    let src;
    if (authResult && !authResult.error) {
      if (authResult.access_token) {
        let view = new google.picker.View(google.picker.ViewId.DOCS);
        view.setMimeTypes('image/png,image/jpeg,image/jpg,video/mp4');
        let pickerBuilder = new google.picker.PickerBuilder();
        let picker = pickerBuilder
          .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
          .setOAuthToken(authResult.access_token)
          .addView(view)
          .addView(new google.picker.DocsUploadView())
          .setCallback(function (e) {
            // console.log(e)
            if (e[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
              var ddata = JSON.parse(JSON.stringify(e));
              // console.log('google drive files ', ddata);
              // console.log(ddata.docs)
              // console.log(ddata.docs.length)
              this.ddocs = JSON.parse(JSON.stringify(ddata.docs));
              // for(var i=0;i<ddata.docs.length;i++){
              // this.ddocs.push(ddata.docs[i])

              //  console.log(this.ddocs)
              // }
            }

            //   if (e[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
            //     for(var i=0;i<e[google.picker.Response.DOCUMENTS].length;i++){
            //     let doc = e[google.picker.Response.DOCUMENTS][i];
            //     src = doc[google.picker.Document.URL];
            //    // this.ddocs.push(src)
            //     //console.log("Document selected is i", doc,"and URL is ",src)
            //   }
            // }
          })
          .build();
        picker.setVisible(true);
      }
    }
  }

  // Dropbox Connect
  Connectdropbox() {
    this.closeModal();
    // var options = {
    //   success: function(files) {
    //     //console.log('drop box files', files)
    //     for (const file of files) {
    //       const name = file.name;
    //       const url = file.link;
    //       //console.log({ name: name, url: url });
    //     }
    //   },
    //   cancel: function() {},
    //   linkType: 'direct',
    //   multiselect: true,
    //   extensions: ['.pdf', '.doc', '.docx', '.html', '.jpg', '.png']
    // };

    // Dropbox.choose(options);
  }
}
