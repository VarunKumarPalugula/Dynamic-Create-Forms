import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx/types';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ClientService } from '@app/law-office-client/law-office-client.service';
import { Router } from '@angular/router';
// tslint:disable-next-line:max-line-length
import { AdminClientImportFinishComponent } from '@app/law-office-admin/app-layout/clients/admin-client-import-finish/admin-client-import-finish.component';
// tslint:disable-next-line:max-line-length
import { AdminClientImportInviteConfirmComponent } from '@app/law-office-admin/app-layout/clients/admin-client-import-invite-confirm/admin-client-import-invite-confirm.component';
import { AdminClientService } from '@app/law-office-admin/app-layout/clients/client.service';

@Component({
  selector: 'app-admin-client-import-upload',
  templateUrl: './admin-client-import-upload.component.html',
  styleUrls: ['./admin-client-import-upload.component.scss'],
})
export class AdminClientImportUploadComponent implements OnInit {
  selectedFiles: any;
  fileReaded: any;
  token: string;
  filesList: any = [];
  filesNames: any = [];
  attachments: any = [];
  fileName: string;
  fileDiv: boolean;
  headingsList: any = [];
  public rowSelected: number;
  // Modal popup
  modalRef: BsModalRef;
  title: string;
  clientimportedData: any;
  closeBtnName: string;
  userheading: any = 'Users with Role';
  // import
  arrayBuffer: any;
  jsonStr: any[];
  index1 = -1;
  file: File;
  fileUpload = 'File Upload';
  fileExport = 'File Export';
  roleDataList = {};
  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit() {}

  uploadFile(event: any) {
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    this.selectedFiles = event.target.files;
    const formData: FormData = new FormData();
    formData.append('file', this.selectedFiles);
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.fileDiv = true;
      this.fileName = this.selectedFiles[i].name;
      formData.append('uploadedFiles', this.selectedFiles[i], this.selectedFiles[i].name);
    }
    this.clientService.fileupload(formData, this.token).subscribe(
      (data: any) => {
        sessionStorage.setItem('importedClientData', JSON.stringify(data));
      },
      (error) => {}
    );
  }

  removeFile() {
    this.selectedFiles = [];
    this.fileDiv = false;
  }
}
