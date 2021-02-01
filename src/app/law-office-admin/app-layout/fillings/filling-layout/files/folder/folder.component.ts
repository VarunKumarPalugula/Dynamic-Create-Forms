import { Component, OnInit } from '@angular/core';
import { FilingsService } from '@app/law-office-admin/app-layout/fillings/filings.service';
import { Http, ResponseContentType } from '@angular/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '@app/law-office-admin/admin.service';
import { AdminClientService } from '@app/law-office-admin/app-layout/clients/client.service';
import { AdminpermissionService } from '@app/auth-guard/admin/adminpermission.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { RandomColor } from 'angular-randomcolor';
import { CommonService } from '@app/shared/service/common.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent implements OnInit {
  filesList: any = [];
  selectAll: boolean = false
  filingId: any;
  orgId: any;
  token: any;
  fileAccessPath: any;
  filesDiv = false;
  members: any = [];
  isSelectedFiles = true;
  fileProgress: any;
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
  fileId: any;
  sortBy: any;
  adminClientsListData: any = [];
  teamMembersList: any = [];
  privacyModel: any;
  FillingPermissions: any = {};
  RemovefileID: number;
  filedeleteModel: any;
  colors: any = [];
  Subcolors: any = [];
  progress: number = 0;
  uploaddeleteModel: any;
  Uploadfileindex: number;
  FileCreatedby: any = '';
  FileCreatedDate: any = '';
  DeletefileModel: any;
  username: any = '';
  CreatedFileType: any = '';
  allTeam: boolean;
  allClients: boolean;
  searchele:any;
  constructor(
    private filingService: FilingsService,
    private http: Http,
    private modalService: NgbModal,
    private adminService: AdminService,
    private clientService: AdminClientService,
    private permissionService: AdminpermissionService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private commonService: CommonService
  ) {
    this.filingId = sessionStorage.getItem('FillingId');
    this.orgId = sessionStorage.getItem('OrganisationID');
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.username = sessionStorage.getItem('AdminUserName');
    this.getColor();

    for (var i = 0; i < 100; i++) {
      this.Subcolors.push(this.getsubColor());
    }
  }

  ngOnInit() {
    this.FillingPermissions = this.permissionService.FillingPermissions();
    this.folderFilesList();
    //this.adminClientsList();
    // this.loadTeamList();
    this.getFilingClientTeammembers();
    this.getFilingAdminTeammembers();
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

  adminClientsList() {
    this.clientService.adminClientsList(this.orgId).subscribe(
      (data: any) => {
        this.adminClientsListData = data;
        console.log(this.adminClientsList);

      },
      (error) => { }
    );
  }

  ModelFiledelete(filedelete, fileId: any) {
    this.RemovefileID = fileId;
    this.filedeleteModel = this.modalService.open(filedelete, { centered: true });
  }


  backToFiles() {
    this.uploadFilesDiv = false;
  }

  emptySelectedFiles(event: any) {
    this.isSelectedFiles = false;
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
    this.folderFileUpload();
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

  folderFileUpload() {
    this.spinner.show();
    this.fileProgress = 99;
    const formdata: FormData = new FormData();
    for (let i = 0; i < this.filesList.length; i++) {
      formdata.append('attachments', this.filesList[i]);
    }
    this.filingService
      .postFolderfileupload(this.orgId, this.filingId, sessionStorage.getItem('folderId'), formdata, this.token)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.fileProgress = 100;
          this.uploadFilesDiv = false;
          this.filesDiv = true;
          this.toaster.success('file uploaded successfully');
          this.folderFilesList();
        },
        (error) => {
          this.toaster.error('error occured');
        }
      );
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
    const selectedClient = this.adminClientsListData.filter(i => i.selected == true);
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
    const selectedTeamList = this.teamMembersList.filter(i => i.selected == true);
    if (selectedTeamList.length == this.teamMembersList.length) {
      this.allTeam = true;
    } else {
      this.allTeam = false;
    }
  }

  Modelprivacy(data: any, fileName: string, fileId: any, fileinfo: any) {
    //console.log(fileinfo)
    if (!this.commonService.checkNullorUndefined(fileinfo.FileAccessClientMemberIds) && fileinfo.FileAccessClientMemberIds.length) {
      fileinfo.FileAccessClientMemberIds.forEach(element => {
        let index = this.adminClientsListData.findIndex(c => c.LawOfficeClientID == element);
        if (index != -1) {
          this.adminClientsListData[index].selected = true;
        }
      });
    }
    if (!this.commonService.checkNullorUndefined(fileinfo.FileAccesAdminMemeberIds) && fileinfo.FileAccesAdminMemeberIds.length) {
      fileinfo.FileAccesAdminMemeberIds.forEach(element => {
        let index = this.teamMembersList.findIndex(c => c.AdminID == element);
        if (index != -1) {
          this.teamMembersList[index].selected = true;
        }
      });
    }
    this.fileName = fileName;
    this.fileId = fileId;
    this.FileCreatedby = fileinfo.CreatedBy;
    this.FileCreatedDate = fileinfo.UploadedOn;
    this.CreatedFileType = fileinfo.fileType;
    this.privacyModel = this.modalService.open(data, { size: 'lg' });
  }
  toggler(ev: any, id: any) {
    document.getElementById(id).classList.toggle('d-n');
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  SelectedOptionalFiles(fileId: string, fileName: string, fileType: string, event: any) {
    if (event.target.checked === true) {
      this.selectedIds.push({ fileId: fileId, filename: fileName, fileType: fileType });
    }else {
      const index = this.selectedIds.findIndex((file) => file.fileId === fileId);
      this.selectedIds.splice(index, 1);
      this.selectAll = false
    }
  }

  folderFilesList() {
    this.spinner.show();
    this.filingService.folderFilesList(this.orgId, this.filingId, sessionStorage.getItem('folderId')).subscribe(
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
      (error) => {
        this.spinner.hide();
      }
    );
  }

  removeFilepopup(item, fid) {
    this.RemovefileID = fid;
    this.DeletefileModel = this.modalService.open(item, {
      centered: true,
      keyboard: false,
      backdrop: 'static',
    });
  }

  Deletefile() {
    this.spinner.show();
    this.filingService.deleteFiles(this.orgId, this.filingId, this.RemovefileID, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.toaster.info('file deleted');
        this.folderFilesList();
        this.modalService.dismissAll();
      },
      (error) => {
        this.toaster.error('error occured');
      }
    );
  }

  downloadMultipleFiles() {
    let files = this.Files.filter(i => i.selected == true);
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
        this.filingService.viewFile(this.orgId, this.filingId, this.selectedIds[i].fileId, this.token).subscribe(
          (res: any) => {
            this.DownloadSingleFile(res.Message, res.Message1);
          },
          (error) => { }
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
    // this.spinner.show();
    this.filingService.viewFile(this.orgId, this.filingId, fileId, this.token).subscribe(
      (res: any) => {
        this.fileAccessPath = res.Message;
        this.isViewfile = true;
        window.location.href = res.Message;
      },
      (error) => { }
    );
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
          this.selectAll = false
        },
        (err) => {
          this.toaster.error('error occured');
        }
      );
  }

  downloadFile(fileId: any, filename: string, filetype: string) {
    this.fileName = filename;
    this.fileType = filetype;
    this.filingService.viewFile(this.orgId, this.filingId, fileId, this.token).subscribe(
      (res: any) => {
        this.DownloadSingleFile(res.Message, res.Message1);
      },
      (error) => {
        this.toaster.error('error occured');
      }
    );
  }

  selectedFiles(event: any) {
    this.fileProgress = 0;
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
  }
  uploadSection() {
    this.uploadFilesDiv = true;
    this.filesNames = [];
    this.allFiles = [];
    this.selectedFilesList = [];
    this.filesList = [];
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

  removeFile() {
    this.modalService.dismissAll();
    this.spinner.show();
    this.filingService.deleteFiles(this.orgId, this.filingId, this.RemovefileID, this.token).subscribe(
      (res: any) => {
        this.folderFilesList();
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        this.toaster.error('error occured');
      }
    );
  }

  printFile(fileId: any, filename: string, filetype: string) {
    this.fileName = filename;
    this.fileType = filetype;
    this.filingService.viewFile(this.orgId, this.filingId, fileId, this.token).subscribe(
      (res: any) => {
        this.PrintSingleFile(res.Message);
      },
      (error) => { }
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
  }
  getFilingClientTeammembers() {
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
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
          console.log(this.adminClientsListData);

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
        if (res != null && res != undefined) {
          this.teamMembersList = res.filter((s) => s.Status == true);
        }
      },
      (err) => {
        this.toaster.error('error occured');
      }
    );
  }
  ModelUploadFiledelete(uploadfiledelete, i) {
    this.uploaddeleteModel = this.modalService.open(uploadfiledelete, { centered: true });
    this.Uploadfileindex = i;
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
    setTimeout(() => {
      this.modalService.dismissAll();
    }, 2000);
    this.spinner.show();
    this.filingService.fileViewPermissions(this.members, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.toaster.info('Permissions updated to file');
        this.folderFilesList();
      },
      (error) => { }
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

}
