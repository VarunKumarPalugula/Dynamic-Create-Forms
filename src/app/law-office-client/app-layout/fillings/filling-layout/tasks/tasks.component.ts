import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ValidationService } from '@app/shared/service/validation.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientFilingsService } from '@app/law-office-client/app-layout/fillings/filings.service';
import { ToastrService } from 'ngx-toastr';
import { ClientpermissionService } from '@app/auth-guard/client-guard/clientpermission.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  sentModel: any;
  deleteModel: any;
  token: string;
  taskGroupList = [];
  taskGroupModel: any;
  Tittle: string;
  taskGroup: any;
  taskTitle: string;
  FillingPermissions: any = {};
  isAuthorize: any;
  username: string;
  constructor(
    private modalService: NgbModal,
    private Valid: ValidationService,
    private fb: FormBuilder,
    private clientFilingService: ClientFilingsService,
    private route: Router,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private permissionService: ClientpermissionService
  ) {}

  ngOnInit() {
    this.FillingPermissions = this.permissionService.FillingPermissions();
    this.isAuthorize = this.permissionService.isGetAcess();
    this.username = sessionStorage.getItem('ClientAdminUserName');
    this.getListOfTaskGroups();
  }
  // List Task Groups
  getListOfTaskGroups() {
    //console.log(sessionStorage.getItem('ClientAdminOrgId') + '--' + sessionStorage.getItem('FillingId'));
    this.spinner.show();
    this.clientFilingService
      .GetListOfTaskGroups(sessionStorage.getItem('ClientAdminOrgId'), sessionStorage.getItem('FillingId'))
      .subscribe(
        (res: any[]) => {
          // console.log('task', res);
          if (res != null && res != undefined) {
            this.spinner.hide();
            this.taskGroupList = res;
          }
        },
        (err) => {
          this.toaster.error('Error Occured');
          this.spinner.hide();
        }
      );
  }

  // Add Task Group
  AddTaskGroup(Title: any) {
    this.spinner.show();
    const taskGroupObj = {
      OrgId: sessionStorage.getItem('ClientAdminOrgId'),
      FilingId: sessionStorage.getItem('FillingId'),
      Title: Title,
    };
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.clientFilingService.AddTaskGroup(taskGroupObj, this.token).subscribe(
      (data: any) => {
        this.spinner.hide();
        const response = data;
        if (response.Status == 1) {
          this.Tittle = '';
          this.getListOfTaskGroups();
          this.CloseTaskgroup('close click');
        } else if (response.Status == 0) {
          this.toaster.error(response.Message);
        }
      },
      (error) => {
        this.spinner.hide();
        this.toaster.error('Error Occured');
      }
    );
  }

  deleteTaskGroup() {
    this.spinner.show();
    const taskGroupObj = {
      AdminOrgId: sessionStorage.getItem('ClientAdminOrgId'),
      FilingId: sessionStorage.getItem('FillingId'),
      TaskGroupId: this.taskGroup.TaskGroupId,
    };
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    this.clientFilingService.DeleteTaskGroup(taskGroupObj, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        const response = res;
        console.log(res);

        if (res.Status === 1) {
          this.Tittle = '';
          this.getListOfTaskGroups();
          this.closeConfirmDelete('close click');
        } else if (res.Status == 0) {
          this.toaster.error(response.Message);
        }
      },
      (error) => {
        this.spinner.hide();
        this.toaster.error('Error Occured');
      }
    );
  }

  viewTask(taskGroupId) {}

  openTaskGropPopup(data: any) {
    this.taskGroupModel = this.modalService.open(data, { centered: true, keyboard: false, backdrop: 'static' });
  }
  CloseTaskgroup(value: string) {
    this.taskGroupModel.close(value);
  }

  confirmDeteleteTaskGroup(popup: any, taskGroup: any) {
    this.taskTitle = taskGroup.Title;
    this.taskGroup = taskGroup;
    this.deleteModel = this.modalService.open(popup, { centered: true, keyboard: false, backdrop: 'static' });
  }

  closeConfirmDelete(value: string) {
    this.deleteModel.close(value);
  }
}
