import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ValidationService } from '@app/shared/service/validation.service';
import { FormBuilder } from '@angular/forms';
import { AdminService } from '@app/law-office-admin/admin.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminpermissionService } from '@app/auth-guard/admin/adminpermission.service';
import { ToastrService } from 'ngx-toastr';

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
  isValidTaskGroup: boolean;
  taskGroup: any;
  isTaskGroup = true;
  taskTitle: string;
  FillingPermissions: any = {};
  username: any;
  constructor(
    private modalService: NgbModal,
    private Valid: ValidationService,
    private fb: FormBuilder,
    private adminService: AdminService,
    private route: Router,
    private spinner: NgxSpinnerService,
    private permissionService: AdminpermissionService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.FillingPermissions = this.permissionService.FillingPermissions();
    this.getListOfTaskGroups();
    this.username = sessionStorage.getItem('AdminUserName');
  }

  validateTaskgroup(event: any) {
    this.isTaskGroup = true;
    const taskgroup = event.target.value;
    const value = event.target.value.indexOf(' ');
    if (value == 0) {
      this.isValidTaskGroup = true;
    } else {
      this.isTaskGroup = false;
      this.isValidTaskGroup = false;
      if (taskgroup == '') {
        this.isTaskGroup = true;
      }
    }
  }

  // List Task Groups
  getListOfTaskGroups() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService
      .GetListOfTaskGroups(sessionStorage.getItem('OrganisationID'), sessionStorage.getItem('FillingId'), this.token)
      .subscribe(
        (res: any[]) => {
          if (res != null && res !== undefined) {
            this.spinner.hide();
            this.taskGroupList = res;
          }
        },
        (err) => {
          this.toaster.error('error occured');
          this.spinner.hide();
        }
      );
  }

  //Add Task Group
  AddTaskGroup(Title) {
    this.spinner.show();
    let taskGroupObj = {
      OrgId: sessionStorage.getItem('OrganisationID'),
      FilingId: sessionStorage.getItem('FillingId'),
      Title: Title,
    };
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService.AddTaskGroup(taskGroupObj, this.token).subscribe(
      (data: any) => {
        this.spinner.hide();
        let response = data;
        if (response.Status == 1) {
          this.toaster.success('New Task group created successfully.');
          this.Tittle = '';
          this.getListOfTaskGroups();
          this.CloseTaskgroup('close click');
        } else if (response.Status == 0) {
          this.toaster.error(response.Message);
        }
      },
      (error) => {
        this.spinner.hide();
        this.toaster.error('error occured');
      }
    );
  }

  deleteTaskGroup() {
    this.spinner.show();
    let taskGroupObj = {
      OrgId: sessionStorage.getItem('OrganisationID'),
      FilingId: sessionStorage.getItem('FillingId'),
      TaskGroupId: this.taskGroup.TaskGroupId,
    };
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService.DeleteTaskGroup(taskGroupObj, this.token).subscribe(
      (data: any) => {
        this.spinner.hide();
        let response = data;
        if (response.Status == 1) {
          this.Tittle = '';
          this.getListOfTaskGroups();
          this.closeConfirmDelete('close click');
        } else if (response.Status == 0) {
          this.toaster.error(response.Message);
        }
      },
      (error) => {
        this.spinner.hide();
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
