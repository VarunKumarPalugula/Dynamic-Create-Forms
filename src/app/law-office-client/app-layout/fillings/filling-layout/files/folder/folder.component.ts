import { Component, OnInit } from '@angular/core';
import { FilingsService } from '@app/law-office-admin/app-layout/fillings/filings.service';
import { Http, ResponseContentType } from '@angular/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '@app/law-office-admin/admin.service';
import { AdminClientService } from '@app/law-office-admin/app-layout/clients/client.service';
import { ToastrService } from 'ngx-toastr';
import { ClientFilingsService } from '../../../filings.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RandomColor } from 'angular-randomcolor';
import { ClientpermissionService } from '@app/auth-guard/client-guard/clientpermission.service';
import { CommonService } from '@app/shared/service/common.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent implements OnInit {
  filesList: any = [];
  filingId: any;
  orgId: any;
  token: any;
  fileAccessPath: any;
  filesDiv = false;
  reverse: any;
  folderId: any;
  filesNames: any = [];
  allFiles: any = [];
  selectedFilesList: any = [];
  uploadFilesDiv: boolean;
  key: any;
  fileName: string;
  splittedFile: any;
  filesAll: boolean;
  isViewfile: boolean;
  selectedIds: any = [];
  Files: any = [];
  fileType: any;
  members: any = [];
  fileId: any;
  sortBy: any;
  connectionData: any = [];
  teamMembersList: any = [];
  privacyModel: any;
  DeletefileModel: any;
  Deletefileid: any;
  colors: any = [];
  Subcolors: any = [];
  FileCreatedby: any = '';
  FileCreatedDate: any = '';
  CreatedFileType: any = '';
  username: any;
  FillingPermissions: any;
  isSelectedFiles = true;
  allTeam: boolean;
  allConections: boolean = false;
  searchele: any;
  folderName: any;
  selectAll: boolean = false;
  constructor(
    private filingService: FilingsService,
    private http: Http,
    private modalService: NgbModal,
    private adminService: AdminService,
    private clientfilingService: ClientFilingsService,
    private clientService: AdminClientService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private permissionService: ClientpermissionService,
    private commonService: CommonService
  ) {
    this.filingId = sessionStorage.getItem('FillingId');
    this.orgId = sessionStorage.getItem('ClientOrganisationID');
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    this.username = sessionStorage.getItem('ClientAdminUserName');
    this.FillingPermissions = this.permissionService.FillingPermissions();
    this.getColor();
    for (var i = 0; i < 100; i++) {
      this.Subcolors.push(this.getsubColor());
    }
  }

  ngOnInit() {
    this.folderFilesList();
    this.adminTeamList();
    this.loadTeamList();
    this.sortBy = '1';
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

  selectAllConnectionMembers(event: any, userType: number) {
    if (event.target.checked === true) {
      this.connectionData.forEach((element, index) => {
        this.connectionData[index].selected = true;
      });
    } else {
      this.connectionData.forEach((element, index) => {
        this.connectionData[index].selected = false;
      });
    }
  }

  selectConnectionMembers(event: any, index: any) {
    if (event.target.checked === true) {
      this.connectionData[index].selected = true;
    } else {
      this.connectionData[index].selected = false;
    }
    const selectedClient = this.connectionData.filter((i) => i.selected == true);
    if (selectedClient.length == this.connectionData.length) {
      this.allConections = true;
    } else {
      this.allConections = false;
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
        let index = this.teamMembersList.findIndex((c) => c.LawOfficeClientID == element);
        if (index != -1) {
          this.teamMembersList[index].selected = true;
        }
      });
      if (fileinfo.FileAccessClientMemberIds.length == this.teamMembersList.length) {
        this.allTeam = true;
      }
    }
    if (
      !this.commonService.checkNullorUndefined(fileinfo.FileAccesAdminMemeberIds) &&
      fileinfo.FileAccesAdminMemeberIds.length
    ) {
      fileinfo.FileAccesAdminMemeberIds.forEach((element) => {
        let index = this.connectionData.findIndex((c) => c.AdminID == element);
        if (index != -1) {
          this.connectionData[index].selected = true;
        }
      });
      if (fileinfo.FileAccesAdminMemeberIds.length == this.connectionData.length) {
        this.allConections = true;
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

    this.connectionData.forEach((element, index) => {
      if (this.connectionData[index].selected == true) {
        this.selectedConnectionMembers(index, true);
      } else {
        this.selectedConnectionMembers(index, false);
      }
    });
    setTimeout(() => {
      this.modalService.dismissAll();
    }, 2000);
    this.spinner.show();
    this.filingService.clientFileViewPermissions(this.members, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.toaster.info('Permissions updated to file');
        this.folderFilesList();
      },
      (error) => {}
    );
  }
  private selectedTeamMembers(index: any, CanViewUploadedFile) {
    this.members.push({
      OrganisationID: this.orgId,
      FilingID: this.filingId,
      FileId: this.fileId,
      CDBRespectiveTableId: this.teamMembersList[index].LawOfficeClientID,
      userType: 2,
      CanViewUploadedFile: CanViewUploadedFile,
    });
  }

  private selectedConnectionMembers(index: any, CanViewUploadedFile) {
    this.members.push({
      OrganisationID: this.orgId,
      FilingID: this.filingId,
      FileId: this.fileId,
      CDBRespectiveTableId: this.connectionData[index].AdminID,
      userType: 1,
      CanViewUploadedFile: CanViewUploadedFile,
    });
  }

  adminTeamList() {
    const obj = {
      FilingId: sessionStorage.getItem('FillingId'),
      AdminOrgId: sessionStorage.getItem('ClientAdminOrgId'),
    };
    this.clientfilingService.getAdminTeam(obj).subscribe(
      (res: any) => {
        this.connectionData = res;
      },
      (error) => {}
    );
  }

  loadTeamList() {
    const obj = {
      FilingId: sessionStorage.getItem('FillingId'),
      AdminOrgId: sessionStorage.getItem('ClientAdminOrgId'),
    };
    this.clientfilingService.getClientTeam(obj).subscribe(
      (res: any) => {
        this.teamMembersList = res;
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    );
  }

  emptySelectedFiles(event: any) {
    this.selectedFilesList = [];
    this.filesList = [];
    this.filesNames = [];
    this.allFiles = [];
    for (let j = 0; j < event.target.files.length; j++) {
      this.allFiles.push({ file: event.target.files[j] });
    }
    for (let i = 0; i < this.allFiles.length; i++) {
      this.selectedFilesList.push({ id: i, file: this.allFiles[i].file });
      this.filesList[i] = this.selectedFilesList[i].file;
      this.splittedFile = this.filesList[i].name.split('.');
      this.filesNames.push({ id: i, name: this.filesList[i].name, fileType: this.splittedFile[1] });
    }
    this.folderFileUpload();
  }
  toggler(ev: any, id: any) {
    document.getElementById(id).classList.toggle('d-n');
  }
  removeSelectedFile(i: any) {
    this.filesList = [];
    this.filesNames.splice(i, 1);
    this.selectedFilesList.splice(i, 1);
    for (let i = 0; i < this.selectedFilesList.length; i++) {
      this.filesList[i] = this.selectedFilesList[i].file;
    }

    if (this.selectedFilesList.length == 0) {
      this.isSelectedFiles = true;
    } else {
      this.isSelectedFiles = false;
    }
  }
  folderFileUpload() {
    this.spinner.show();
    const formdata: FormData = new FormData();
    for (let i = 0; i < this.filesList.length; i++) {
      formdata.append('attachments', this.filesList[i]);
    }
    this.clientfilingService
      .postFolderfileupload(this.orgId, this.filingId, sessionStorage.getItem('folderId'), formdata, this.token)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.uploadFilesDiv = false;
          this.filesDiv = true;
          this.toaster.info('file uploaded successfully');
          this.filesList = [];
          this.allFiles = [];
          this.folderFilesList();
        },
        (error) => {
          this.toaster.error('Error Occured');
        }
      );
  }

  SelectedOptionalFiles(fileId: string, fileName: string, fileType: string, event: any) {
    if (event.target.checked === true) {
      this.selectedIds.push({ fileId: fileId, filename: fileName, fileType: fileType });
    } else {
      const index = this.selectedIds.findIndex((file) => file.fileId === fileId);
      this.selectedIds.splice(index, 1);
      this.selectAll = false;
    }
  }

  folderFilesList() {
    this.spinner.show();
    this.clientfilingService.folderFiles(this.orgId, this.filingId, sessionStorage.getItem('folderId')).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.Files = res;
        if (this.Files.length === 0) {
          this.filesDiv = false;
        } else {
          this.filesDiv = true;
          for (let i = 0; i < this.Files.length; i++) {
            this.splittedFile = this.Files[i].FileName.split('.');
            this.Files[i].fileType = this.splittedFile[1];
          }
        }
      },
      (error) => {}
    );
  }

  downloadMultipleFiles() {
    let files = this.Files.filter((i) => i.selected == true);
    if (files.length > 0) {
      this.selectedIds = [];
      for (let i = 0; i < files.length; i++) {
        this.selectedIds.push({
          fileId: files[i].FileId,
          filename: files[i].FileName,
          fileType: files[i].fileType,
        });
      }
      for (let i = 0; i < this.selectedIds.length; i++) {
        this.clientfilingService.viewFile(this.orgId, this.filingId, this.selectedIds[i].fileId, this.token).subscribe(
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

  sort() {
    this.key = this.sortBy;
    if (this.sortBy === 'UploadedOn') {
      this.reverse = true;
    } else {
      this.reverse = false;
    }
  }

  viewFile(fileId: any) {
    this.spinner.show();
    this.clientfilingService.viewFile(this.orgId, this.filingId, fileId, this.token).subscribe(
      (res: any) => {
        // this.fileAccessPath = res.Message;
        // this.isViewfile = true;
        // window.location.href = res.Message;
        this.spinner.hide();
        let Viewres = JSON.parse(JSON.stringify(res));
        if (Viewres.Message == 'Not Authorized to view the file') {
          this.toaster.warning(Viewres.Message);
        } else {
          this.fileAccessPath = Viewres.Message;
          this.isViewfile = true;
          window.open(Viewres.Message, '_blank');
        }
      },
      (error) => {
        this.spinner.hide();
      }
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

  downloadFile(fileId: any, filename: string, filetype: string) {
    this.fileName = filename;
    this.fileType = filetype;
    this.clientfilingService.viewFile(this.orgId, this.filingId, fileId, this.token).subscribe(
      (res: any) => {
        let Viewres = JSON.parse(JSON.stringify(res));
        if (Viewres.Message == 'Not Authorized to view the file') {
          this.toaster.warning('Not Authorized to download the file');
        } else {
          this.DownloadSingleFile(res.Message, res.Message1);
        }
        this.spinner.hide();
        // this.DownloadSingleFile(res.Message, res.Message1);
      },
      (error) => {}
    );
  }
  backToFiles() {
    this.uploadFilesDiv = false;
  }
  selectedFiles(event: any) {
    this.selectedFilesList = [];
    this.isSelectedFiles = false;
    this.filesList = [];
    this.allFiles = [];

    this.filesNames = [];
    for (let j = 0; j < event.target.files.length; j++) {
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
  uploadSection() {
    this.uploadFilesDiv = true;
    this.filesNames = [];
    this.allFiles = [];
    this.selectedFilesList = [];
  }

  selectAllFiles(event: any) {
    if (event.target.checked === true) {
      for (let i = 0; i < this.Files.length; i++) {
        this.Files[i].selected = true;
        this.filesAll = true;
      }
    } else {
      for (let i = 0; i < this.Files.length; i++) {
        this.Files[i].selected = false;
        this.filesAll = false;
        this.selectedIds = [];
      }
    }
  }

  removeFilepopup(item, fid) {
    this.Deletefileid = fid;
    this.DeletefileModel = this.modalService.open(item, {
      centered: true,
      keyboard: false,
      backdrop: 'static',
    });
  }

  removeFile() {
    this.modalService.dismissAll();
    this.spinner.show();
    this.clientfilingService.deleteFiles(this.orgId, this.filingId, this.Deletefileid, this.token).subscribe(
      (res: any) => {
        // this.toaster.info('file deleted');
        this.spinner.hide();
        if (res.Message == 'Not authorized to delete the file') {
          this.toaster.warning(res.Message);
        } else {
          this.toaster.info('file deleted');
        }
        this.folderFilesList();
      },
      (error) => {
        this.spinner.hide();
        this.toaster.error('Error Occured');
      }
    );
  }
  closeModal() {
    this.modalService.dismissAll();
  }

  printFile(fileId: any, filename: string, filetype: string) {
    this.fileName = filename;
    this.fileType = filetype;
    this.clientfilingService.viewFile(this.orgId, this.filingId, fileId, this.token).subscribe(
      (res: any) => {
        //this.PrintSingleFile(res.Message);
        let Viewres = JSON.parse(JSON.stringify(res));
        if (Viewres.Message == 'Not Authorized to view the file') {
          this.toaster.warning('Not Authorized to print the file');
        } else {
          this.PrintSingleFile(res.Message);
        }
      },
      (error) => {}
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

  Modelsent(sent) {
    let msent = this.modalService.open(sent, { centered: true });
  }
  createFolder() {
    this.modalService.dismissAll();
    this.spinner.show();
    this.filingService.createFolder(this.orgId, this.filingId, this.folderName, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.toaster.info('Folder Created Successfully');
        this.folderFilesList();
      },
      (error) => {
        this.spinner.hide();
        this.toaster.error('Folder Creation Failed');
      }
    );
  }
}
