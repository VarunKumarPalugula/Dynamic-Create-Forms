import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '@app/law-office-admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ClientFilingsService } from '../../../filings.service';
import { FilingsService } from '@app/law-office-admin/app-layout/fillings/filings.service';
import { ToastrService } from 'ngx-toastr';
import { ClientpermissionService } from '@app/auth-guard/client-guard/clientpermission.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '@app/shared/service/validation.service';
import { ClientCommonServiceService } from '@app/law-office-client/client-common-service/client-common-service.service';
import { CommonService } from '@app/shared/service/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  @ViewChild('afterTopicCreate') afterTopicCreatetemplate: TemplateRef<any>;
  taskGroupData: any;
  sentModel: any;
  taskModel: any;
  deleteModel: any;
  topicModel: any;
  conformtaskModel: any;
  editorConfig: AngularEditorConfig;
  token: string;
  tasksList: any = [];
  clientMembersList: any = [];
  teamMembersList: any = [];
  assignMembers: any = [];
  assigneeRespectiveFilingTeamTableID: any;
  assigneeIsFilingClientTeamMember: boolean;
  reviewerRespectiveFilingTeamTableID: any;
  reviewerIsFilingClientTeamMember = false;
  taskMarkAsReview: boolean = true;
  taskGroupId: any;
  taskObj: any = {};
  subTaskObj: any = {};
  minDate: Date;
  taskTitle: any;
  taskGroup: any;
  deleteTaskModel: any;
  taskdata: any;
  taskTittle: any;
  TaskId: any;
  subTasks: any = [];
  taskId: any;
  subTaskModel: any;
  isReviewed: boolean;
  isCompleted: boolean;
  isLoaded: boolean;
  isSubtaskClientReviewed: boolean;
  isSubtaskClientCompleted: boolean;
  assigneeSubTaskRespectiveFilingTeamTableID: any;
  assigneeSubTaskIsFilingClientTeamMember: boolean;
  reviewerSubTaskIsFilingClientTeamMember: boolean;
  reviewerSubTaskRespectiveFilingTeamTableID: any;
  subTaskId: any;
  isClickToggle: boolean;
  subtaskdata: any;
  deleteSubTaskModel: any;
  SubTaskId: any;
  subTaskTittle: any;
  markAsCompleteModel: any;
  markAsSubTaskCompleteModel: any;
  selectedAssigne: string;
  selectedReviewer: string;
  selectedSubTaskAssigne: string;
  selectedSubTaskReviewer: string;
  markAsTaskReviewedModel: any;
  markAsSubTaskReviewedModel: any;
  taskTittleName: string = 'New Task Item';
  subtaskTittleName: string = 'New Sub Task Item';
  IsTaskReviewDone = false;
  IsSubTaskReviewDone = false;
  adminmemberids: any[];
  memberids: any = [];
  selectedadminTeamMembers: any = [];
  selectedTeamMembers: any = [];
  topic: any = '';
  description: any;
  errormessage: any;
  isempty: boolean = false;
  topicData: any = [];
  ADMINID: any;
  adminteamMembersList: any = [];
  adminteamMembersDropsownSettings = {};
  teamMembersDropsownSettings = {};
  clinetteamMembersList: any = [];
  FillingPermissions: any = {};
  isAuthorize: any;
  TaskForm: FormGroup;
  TopicForm: FormGroup;
  isTaskListempty: boolean = false;
  TaskDuseDate: Date;
  username: any = '';
  taskCompleted: boolean = false;
  subtaskCompleted: boolean = false;
  AdminID: any;
  taskMarkasCompleted: boolean;
  IsClientTaskCompleted: boolean = false;
  IsClientTaskReviewed: boolean = false;
  taskMarkAsReviewed: boolean;

  IsSubTaskCompleted: boolean = false;
  subTaskCompleted: boolean;

  IsSubTaskReviewed: boolean = false;
  subtaskReviewed: boolean
  taskMaxDate: any;
  initialObj = [];

  // emitOrgInfoResponse: Subscription;
  // emitMailingAddInfoResponce: Subscription;
  // emitBusinessAddInfoResponce: Subscription;
  // emitFinInfoResponse: Subscription;
  // emitPocInfoResponce: Subscription;
  // emitAuthorizedInfoResponce: Subscription;

  //applicant side
  // emitAptPersonalInfoResponce: Subscription;
  // emitForeginAddInfoResponce: Subscription;
  // emitEducationInfoResponce: Subscription;
  // emitAptEmpResumeFile: Subscription;
  // emitAptRecentW2File: Subscription;
  // emitApt3RecentPayStubsFiles: Subscription;
  // emitAptEadCardFile: Subscription;
  // emitAptImgTravelInfoResponce: Subscription;
  // emitI94TravelInfoResponce;
  // Subscription;
  // emitAptPosInfoResponce: Subscription;
  emitGetUIControlTemplateResults: Subscription;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private clientService: ClientFilingsService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toaster: ToastrService,
    private permissionService: ClientpermissionService,
    private Valid: ValidationService,
    private fb: FormBuilder,
    private filingService: ClientFilingsService,
    public clientCommonService: ClientCommonServiceService,
    public commonService: CommonService
  ) {
    this.emitGetUIControlTemplateResults = this.commonService.emitGetUIControlTemplateResults.subscribe((res) => {
      if (!commonService.checkNullorUndefined(res)) {
        this.initialObj = [];
        this.initialObj = res;
        if (this.taskId) {
          this.getSubTasksInTask();
        }
      }
    });
  }

  ngOnInit() {
    this.commonService.validations();
    const id = this.route.snapshot.paramMap.get('id');
    this.username = sessionStorage.getItem('ClientAdminUserName');
    this.getDetailOfTaskGroup(id);
    this.taskGroupId = id;
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.FillingPermissions = this.permissionService.FillingPermissions();
    this.isAuthorize = this.permissionService.isGetAcess();
    this.TaskCreateForm();
    this.taskMaxDate = new Date();
    this.taskMaxDate.setDate(this.taskMaxDate.getFullYear() + 1000);
    this.commonService.GetUIControlTemplateResults();
    this.commonService.fileData = {};
  }


  createformvalidation() {
    this.TopicForm = this.fb.group({
      topic: ['', Validators.required],
      description: ['', Validators.required],
      adminmembers: ['', Validators.required],
      members: ['', Validators.required],
    });
  }

  TaskCreateForm() {
    this.TaskForm = this.fb.group({
      TaskName: this.Valid.validateform.Taskname,
      Priority: this.Valid.validateform.Required,
      DueDate: this.Valid.validateform.Required,
      TaskType: '',
      Assignee: this.Valid.validateform.Required,
      Reviewer: this.Valid.validateform.NotRequired,
      ReviewerApproval: this.Valid.validateform.NotRequired,
      Notes: this.Valid.validateform.TaskAddNotes,
    });
  }




  // GetDetailOfTaskGroup
  getDetailOfTaskGroup(TaskGroupId: any) {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.clientService
      .GetDetailOfTaskGroup(
        sessionStorage.getItem('ClientAdminOrgId'),
        sessionStorage.getItem('FillingId'),
        TaskGroupId
      )
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.taskGroupData = res;
          this.getListofTaskInTaskGroup(TaskGroupId);
          this.getFilingClientTeammembers();
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }

  // listoftasks in taskgroup
  getListofTaskInTaskGroup(TaskGroupId: any) {
    this.spinner.show();
    this.clientService
      .GetListofTaskInTaskGroup(
        sessionStorage.getItem('ClientAdminOrgId'),
        sessionStorage.getItem('FillingId'),
        TaskGroupId
      )
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          //console.log(res)
          if (res != null && res != undefined) {
            // console.log(res)
            // var numArray = [{taskId: 21, name: 'srinivas'}, {taskId: 19, name: 'kandula'},{taskId: 100, name: 'chowdary'},];
            // numArray.sort((a, b) => b['taskId'] - a['taskId']);
            // console.log(numArray);
            // let sortTaskList = res;
            this.tasksList = res.sort((a, b) => a['TaskId'] - b['TaskId']);
            this.taskCompleted = this.tasksList.IsTaskCompleted && this.tasksList.IsTaskReviewDone ? this.taskCompleted = true : this.taskCompleted = false
          } else {
            this.isTaskListempty = true;
          }
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }

  // loadclienteammembers
  getFilingClientTeammembers() {
    const obj = {
      FilingId: sessionStorage.getItem('FillingId'),
      AdminOrgId: sessionStorage.getItem('ClientAdminOrgId'),
    };
    this.clientService.getClientTeam(obj).subscribe(
      (res: any) => {
        if (res != null && res != undefined) {
          this.clientMembersList = res;
          this.confiGetFilingClientTeammembers(res);
          this.getFilingAdminTeammembers();
        }
      },
      (error) => { }
    );
  }

  getFilingAdminTeammembers() {
    const obj = {
      FilingId: sessionStorage.getItem('FillingId'),
      AdminOrgId: sessionStorage.getItem('ClientAdminOrgId'),
    };
    this.clientService.getAdminTeam(obj).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res != null && res != undefined) {
          const teamMembersList = res;
          this.configGetFilingAdminTeammembers(res);
          this.teamMembersList = teamMembersList.filter((s) => s.Status == true);
          this.assignMembers = [];
          this.assignMembers = this.assignMembers.concat(this.clientMembersList);
          this.assignMembers = this.assignMembers.concat(this.teamMembersList);
        }
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    );
  }

  // typehead assignonSelect
  assignMembersOnSelect(event: any): void {
    if (event.item.LawOfficeClientID) {
      this.assigneeRespectiveFilingTeamTableID = event.item.FilingClientTeamId;
      this.assigneeIsFilingClientTeamMember = true;
    } else {
      this.assigneeRespectiveFilingTeamTableID = event.item.FillingAdminTeamId;
      this.assigneeIsFilingClientTeamMember = false;
    }
    this.selectedAssigne = event.item.Email;
  }

  // typehead reviewerOnSelect
  reviewerOnSelect(event: any): void {
    this.selectedReviewer = event.item.Email;
    if (this.selectedReviewer) {
      this.TaskForm.patchValue({
        ReviewerApproval: true
      })
    }
    if (event.item.FilingClientTeamId) {
      this.reviewerRespectiveFilingTeamTableID = event.item.FilingClientTeamId;
      this.reviewerIsFilingClientTeamMember = true;
    } else {
      this.reviewerRespectiveFilingTeamTableID = event.item.FillingAdminTeamId;
      this.reviewerIsFilingClientTeamMember = false;
    }
  }
  typeHeadSelectFocus() {
    const checkReviewer = this.assignMembers.find(e => e.Email === this.selectedReviewer)
    if (this.commonService.checkNullorUndefined(checkReviewer)) {
      this.selectedReviewer = '';
      this.reviewerRespectiveFilingTeamTableID = ''
      this.TaskForm.patchValue({
        ReviewerApproval: false
      })
    }
  }

  // Edit task
  EditTask() {
    this.spinner.show();
    const taskObj = {
      TaskId: this.taskObj.TaskId == undefined ? 0 : this.taskObj.TaskId,
      OrgId: sessionStorage.getItem('ClientAdminOrgId'),
      FilingId: sessionStorage.getItem('FillingId'),
      TaskGroupId: this.taskGroupId,
      Title: this.taskObj.Title,
      DueDate: this.taskObj.DueDate,
      TaskType: this.taskObj.TaskType,
      Priority: this.taskObj.Priority,
      Description: this.taskObj.Description,
      ReviewerApproval: this.taskObj.ReviewerApproval,
      IsTaskReviewDone: this.taskObj.IsTaskReviewDone == undefined ? false : this.taskObj.IsTaskReviewDone,
      IsTaskCompleted: this.taskObj.IsTaskCompleted == undefined ? false : this.taskObj.IsTaskCompleted,
      status: true,
      Assignee: {
        FilingId: sessionStorage.getItem('FillingId'),
        RespectiveFilingTeamTableID: this.assigneeRespectiveFilingTeamTableID,
        IsFilingClientTeamMember: this.assigneeIsFilingClientTeamMember,
      },
      Reviewer: {
        FilingId: sessionStorage.getItem('FillingId'),
        RespectiveFilingTeamTableID: this.reviewerRespectiveFilingTeamTableID,
        IsFilingClientTeamMember: this.reviewerIsFilingClientTeamMember,
      },
    };

    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.clientService.TaskInTaskGroup(taskObj, this.token).subscribe(
      (data: any) => {
        this.spinner.hide();
        const response = data;
        if (response.Status == 1) {
          this.getDetailOfTaskGroup(this.taskGroupId);
          this.taskObj = {};
          this.selectedAssigne = '';
          this.selectedReviewer = '';
          this.priviousId = '';
          this.closeTask('close click');
        } else if (response.Status == 0) {
          this.toaster.error(response.Message);
        }
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  // Add task in TaskGroup
  taskInTaskGroup() {
    if (this.selectedAssigne) {
      let assignee = this.assignMembers.find((a) => a.Email == this.selectedAssigne);
      if (!assignee) {
        this.toaster.error("Assignee Email doesn't exist");
        return;
      }
    }
    if (this.selectedReviewer) {
      let teamMembersList = this.assignMembers.find((t) => t.Email == this.selectedReviewer);
      if (!teamMembersList) {
        this.toaster.error("Reviewer Email doesn't exist");
        return;
      }
    }
    if (this.selectedAssigne === this.selectedReviewer) {
      this.toaster.info('Assignee and reviewer should not be same');
      return;
    }
    this.spinner.show();
    const taskObj = {
      TaskId: this.taskObj.TaskId == undefined ? 0 : this.taskObj.TaskId,
      OrgId: sessionStorage.getItem('ClientAdminOrgId'),
      FilingId: sessionStorage.getItem('FillingId'),
      TaskGroupId: this.taskGroupId,
      Title: this.taskObj.Title,
      DueDate: this.taskObj.DueDate,
      TaskType: this.taskObj.TaskType,
      Priority: this.taskObj.Priority,
      Description: this.taskObj.Description,
      ReviewerApproval: this.taskObj.ReviewerApproval,
      IsTaskReviewDone: this.taskObj.IsTaskReviewDone == undefined ? false : this.taskObj.IsTaskReviewDone,
      IsTaskCompleted: this.taskObj.IsTaskCompleted == undefined ? false : this.taskObj.IsTaskCompleted,
      status: true,
      Assignee: {
        FilingId: sessionStorage.getItem('FillingId'),
        RespectiveFilingTeamTableID: this.assigneeRespectiveFilingTeamTableID,
        IsFilingClientTeamMember: this.assigneeIsFilingClientTeamMember,
      },
      Reviewer: {
        FilingId: sessionStorage.getItem('FillingId'),
        RespectiveFilingTeamTableID: this.selectedReviewer ? this.reviewerRespectiveFilingTeamTableID : undefined,
        //IsFilingClientTeamMember: this.reviewerIsFilingClientTeamMember,
      },
      ReviewerIsFilingClientTeamMember: this.reviewerIsFilingClientTeamMember
    };

    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.clientService.TaskInTaskGroup(taskObj, this.token).subscribe(
      (data: any) => {
        this.spinner.hide();
        let response = data;
        if (response.Status == 1) {
          this.getDetailOfTaskGroup(this.taskGroupId);
          this.taskObj = {};
          this.selectedAssigne = '';
          this.selectedReviewer = '';
          this.priviousId = '';
          this.closeTask('close click');
        } else if (response.Status == 0) {
          this.toaster.error(response.Message);
        }
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  taskPopup(data: any) {
    this.TaskForm.reset();
    this.taskTittleName = 'New Task Item';
    this.taskObj = {};
    this.selectedAssigne = '';
    this.selectedReviewer = '';
    this.taskModel = this.modalService.open(data, {
      centered: true,
      size: 'lg',
      keyboard: false,
      backdrop: 'static',
    });
  }
  closeTask(value: string) {
    this.getListofTaskInTaskGroup(this.taskGroupId);
    this.taskModel.close(value);
    this.priviousId = '';
  }
  // delete task group
  deleteTaskGroup() {
    this.spinner.show();
    let taskGroupObj = {
      AdminOrgId: sessionStorage.getItem('ClientAdminOrgId'),
      FilingId: sessionStorage.getItem('FillingId'),
      TaskGroupId: this.taskGroup.TaskGroupId,
    };
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.clientService.DeleteTaskGroup(taskGroupObj, this.token).subscribe(
      (data: any) => {
        this.spinner.hide();
        const response = data;
        if (response.Status == 1) {
          this.router.navigate(['client/applayout/fillings/taskslist']);
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

  // confirmDeteleteTaskGroup
  confirmDeteleteTaskGroup(popup: any, taskGroup: any) {
    this.taskTitle = taskGroup.Title;
    this.taskGroup = taskGroup;
    this.deleteModel = this.modalService.open(popup, {
      centered: true,
      keyboard: false,
      backdrop: 'static',
    });
  }

  closeConfirmDelete(value: string) {
    this.deleteModel.close(value);
  }

  // delete task in taskgroup
  deleteTask() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.clientService
      .deletetask(
        sessionStorage.getItem('ClientAdminOrgId'),
        sessionStorage.getItem('FillingId'),
        this.taskGroupId,
        this.TaskId
      )
      .subscribe(
        (data: any) => {
          this.spinner.hide();
          const response = data;
          if (response.Status == 1) {
            this.getDetailOfTaskGroup(this.taskGroupId);
            this.getListofTaskInTaskGroup(this.taskGroupId);
            this.Closedelete('close click');
            this.priviousId = '';
          } else if (response.Status == 0) {
            this.toaster.error(response.Message);
          }
        },
        (error) => {
          this.spinner.hide();
        }
      );
  }

  // popup delete task
  DeleteTaskPopUp(deletePopUpTemp: any, task: any) {
    this.taskdata = task;
    this.TaskId = task.TaskId;
    this.taskTittle = task.Title;
    this.deleteTaskModel = this.modalService.open(deletePopUpTemp, {
      centered: true,
      keyboard: false,
      backdrop: 'static',
    });
  }

  // close delete task
  Closedelete(value: string) {
    this.deleteTaskModel.close(value);
  }


  // Mark as reviewed subtask
  MarkTaskAsReviewed() {
    this.modalService.dismissAll();
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.clientService
      .MarkTaskAsReviewed(
        sessionStorage.getItem('ClientAdminOrgId'),
        sessionStorage.getItem('FillingId'),
        this.taskGroupId,
        this.taskId,
        this.token,
        this.taskMarkAsReviewed = this.IsClientTaskReviewed ? false : true
      )
      .subscribe(
        (data: any) => {
          this.isLoaded = false;
          this.isReviewed = true;
          this.spinner.hide();
          if (data != undefined && data != null) {
            if (data.Status == 1) {
              this.getDetailOfTaskGroup(this.taskGroupId);
              this.getListofTaskInTaskGroup(this.taskGroupId);
              this.taskId = '';
              this.closeMarkAsReviewedCompletePopUp('close click');
            } else if (data.Status == 0) {
              this.toaster.error(data.Message);
            }
          }
        },
        (error) => {
          this.spinner.hide();
        }
      );
  }
  // mark task reviewed as complete popup
  markAsReviewedCompletePopUp(markasreviewed: any, IsTaskCompleted, IsTaskReviewDone) {
    this.IsClientTaskReviewed = IsTaskReviewDone
    if (IsTaskCompleted) {
      this.markAsTaskReviewedModel = this.modalService.open(markasreviewed, {
        centered: true,
        keyboard: false,
      });
    }
  }
  // close mark task reviewed as complete popup
  closeMarkAsReviewedCompletePopUp(value: string) {
    this.modalService.dismissAll();
    //this.markAsTaskReviewedModel.close(value);
  }
  //Mark as complete subtask
  MarkTaskAsCompleted() {
    let eligible = true;
    this.subTasks.forEach((subTask) => {
      if (subTask.IsTaskCompleted == false && !this.IsClientTaskCompleted) {
        this.toaster.warning('Some of the subtasks are still pending');
        eligible = false;
      }
    });
    if (!this.IsClientTaskCompleted && !eligible) {
      this.modalService.dismissAll();
      return;
    }
    this.modalService.dismissAll();
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.clientService
      .MarkTaskAsCompleted(
        sessionStorage.getItem('ClientAdminOrgId'),
        sessionStorage.getItem('FillingId'),
        this.taskGroupId,
        this.taskId,
        this.IsClientTaskCompleted = this.IsClientTaskCompleted ? false : true
      )
      .subscribe(
        (data: any) => {
          this.isLoaded = false;
          this.spinner.hide();
          if (data != undefined && data != null) {
            if (data.Status == 1) {
              this.toaster.show('Task Completed Successfully', 'success');
              this.getDetailOfTaskGroup(this.taskGroupId);
              this.getListofTaskInTaskGroup(this.taskGroupId);
              this.closeMarkAsCompletePopUp('close click');
            } else if (data.Status == 0) {
              this.toaster.error(data.Message);
            }
          }
        },
        (error) => {
          this.spinner.hide();
        }
      );
  }

  // mark as comlete task popup
  markAsCompletePopUp(mark: any, IsTaskCompleted: any) {
    this.IsClientTaskCompleted = IsTaskCompleted
    this.markAsCompleteModel = this.modalService.open(mark, {
      centered: true,
      keyboard: false,
      backdrop: 'static'
    });
  }

  // close mark as complete popup
  closeMarkAsCompletePopUp(value: string) {
    this.modalService.dismissAll();
    // this.markAsCompleteModel.close(value);
  }
  // this.selectedReviewer = event.item.Email;
  // if(this.selectedReviewer) {
  //   this.TaskForm.patchValue({
  //     ReviewerApproval: true
  //   })
  // } else {
  //   this.TaskForm.patchValue({
  //     ReviewerApproval: false
  //   })
  // }
  // if (event.item.FilingClientTeamId) {
  //   this.reviewerRespectiveFilingTeamTableID = event.item.FilingClientTeamId;
  //   this.reviewerIsFilingClientTeamMember = true;
  // } else {
  //   this.reviewerRespectiveFilingTeamTableID = event.item.FillingAdminTeamId;
  //   this.reviewerIsFilingClientTeamMember = false;
  // }
  editTask(task: any, taskpop: any) {
    this.TaskForm.reset();
    if (!task.IsTaskCompleted) {
      this.taskTittleName = 'Edit Task Item';
      this.taskObj = task;
      this.taskObj.DueDate = new Date(task.DueDate);
      this.selectedAssigne = task.Assignee.Email;
      if (task.Reviewer != null) {
        this.TaskForm.patchValue({
          ReviewerApproval: true
        })
        this.selectedReviewer = task.Reviewer.Email;
        this.reviewerRespectiveFilingTeamTableID = task.Reviewer.RespectiveFilingTeamTableID;
        this.reviewerIsFilingClientTeamMember = task.Reviewer.IsFilingClientTeamMember;
      } else {
        this.TaskForm.patchValue({
          ReviewerApproval: false
        })
        this.selectedReviewer = '';
        this.reviewerRespectiveFilingTeamTableID = '';
        this.reviewerIsFilingClientTeamMember = false;

      }

      this.assigneeRespectiveFilingTeamTableID = task.Assignee.RespectiveFilingTeamTableID;
      this.assigneeIsFilingClientTeamMember = task.Assignee.IsFilingClientTeamMember;

      this.taskModel = this.modalService.open(taskpop, {
        centered: true,
        keyboard: false,
        size: 'lg',
        backdrop: 'static',
      });
    } else {
      this.toaster.info('Task not editable');
    }
  }

  //get subtasks
  getSubTasksInTask() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.clientService
      .GetSubTasksInTask(
        sessionStorage.getItem('ClientAdminOrgId'),
        sessionStorage.getItem('FillingId'),
        this.taskGroupId,
        this.taskId,
        this.AdminID = sessionStorage.getItem('ClientAdminOrgId')
      )
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res && res.length) {
            res.forEach((resp) => this.commonService.formObject(resp, this.initialObj, "clientApplicantTaskData"));
            this.subTasks = res.sort((a, b) => a['SubTaskId'] - b['SubTaskId']);
            // if (this.subTasks[0]['Title'] && (this.subTasks[0]['Title'] === 'Foreign Addresses' || this.subTasks[0]['Title'] === 'Foreign Address')) {
            //   this.subTasks[0]['Title'] = 'foreign address';
            //   this.subTasks[0]['Description'] = 'Please Fill in the foreign Address Section in settings'
            // }
          }
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }

  // add subtask popup
  subTaskPopUp(IsTaskCompleted, data: any, taskdata: any) {
    this.TaskForm.reset();
    this.TaskDuseDate = new Date(taskdata.DueDate);
    //this.minDate = new Date();
    this.TaskDuseDate.setDate(this.TaskDuseDate.getDate());
    if (!IsTaskCompleted) {
      this.subtaskTittleName = 'New Sub Task Item';
      this.subTaskModel = this.modalService.open(data, {
        centered: true,
        keyboard: false,
        size: 'lg',
        backdrop: 'static',
      });
    }
  }
  //add subtask close popup
  closeSubTask(value: string) {
    this.getSubTasksInTask();
    this.subTaskModel.close(value);
  }
  //typehead assignMembersSubTaskOnSelect
  assignMembersSubTaskOnSelect(event: any): void {
    if (event.item.LawOfficeClientID) {
      this.assigneeSubTaskRespectiveFilingTeamTableID = event.item.FilingClientTeamId;
      this.assigneeSubTaskIsFilingClientTeamMember = true;
    } else {
      this.assigneeSubTaskRespectiveFilingTeamTableID = event.item.FillingAdminTeamId;
      this.assigneeSubTaskIsFilingClientTeamMember = false;
    }
  }
  //typehead reviewerSubTaskOnSelect
  reviewerSubTaskOnSelect(event: any): void {
    if (event.item.FilingClientTeamId) {
      this.reviewerSubTaskRespectiveFilingTeamTableID = event.item.FilingClientTeamId;
      this.reviewerSubTaskIsFilingClientTeamMember = true;
    } else {
      this.reviewerSubTaskRespectiveFilingTeamTableID = event.item.FillingAdminTeamId;
      this.reviewerSubTaskIsFilingClientTeamMember = false;
    }
    this.selectedSubTaskReviewer = event.item.Email;
    if (this.selectedSubTaskReviewer) {
      this.TaskForm.patchValue({
        ReviewerApproval: true
      })
    }
  }
  typeHeadSelectFocusSubtask() {
    const checkReviewer = this.assignMembers.find(e => e.Email === this.selectedReviewer)
    if (this.commonService.checkNullorUndefined(checkReviewer)) {
      this.selectedReviewer = '';
      this.TaskForm.patchValue({
        ReviewerApproval: false
      })
    }
  }
  //add subtasks
  subTaskInTask() {
    if (this.selectedSubTaskAssigne) {
      let assignee = this.assignMembers.find((a) => a.Email == this.selectedSubTaskAssigne);
      if (!assignee) {
        this.toaster.error("Assignee Email doesn't exist");
        return;
      }
    }
    if (this.selectedSubTaskReviewer) {
      let teamMembersList = this.assignMembers.find((t) => t.Email == this.selectedSubTaskReviewer);
      if (!teamMembersList) {
        this.toaster.error("Reviewer Email doesn't exist");
        return;
      }
    }
    if (this.selectedSubTaskAssigne === this.selectedSubTaskReviewer) {
      this.toaster.info('Assignee and reviewer should not be same');
      return;
    }
    this.spinner.show();
    let subTaskObj = {
      SubTaskId: this.subTaskObj.SubTaskId == undefined ? 0 : this.subTaskObj.SubTaskId,
      TaskId: this.taskId,
      OrgId: sessionStorage.getItem('ClientAdminOrgId'),
      FilingId: sessionStorage.getItem('FillingId'),
      TaskGroupId: this.taskGroupId,
      Title: this.subTaskObj.Title,
      DueDate: this.subTaskObj.DueDate,
      TaskType: this.subTaskObj.TaskType,
      Priority: this.subTaskObj.Priority,
      Description: this.subTaskObj.Description,
      ReviewerApproval: this.subTaskObj.ReviewerApproval,
      IsTaskReviewDone: this.subTaskObj.IsTaskReviewDone == undefined ? false : this.subTaskObj.IsTaskReviewDone,
      IsTaskCompleted: this.subTaskObj.IsTaskCompleted == undefined ? false : this.taskObj.IsTaskCompleted,
      status: true,
      Assignee: {
        FilingId: sessionStorage.getItem('FillingId'),
        RespectiveFilingTeamTableID: this.assigneeSubTaskRespectiveFilingTeamTableID,
        IsFilingClientTeamMember: this.assigneeSubTaskIsFilingClientTeamMember,
      },
      Reviewer: {
        FilingId: sessionStorage.getItem('FillingId'),
        RespectiveFilingTeamTableID: this.selectedSubTaskReviewer ? this.reviewerSubTaskRespectiveFilingTeamTableID : undefined,
        // IsFilingClientTeamMember: this.reviewerSubTaskIsFilingClientTeamMember,
      },
      ReviewerIsFilingClientTeamMember: this.reviewerSubTaskIsFilingClientTeamMember
    };

    // console.log(subTaskObj)
    this.clientService.SubTaskInTask(subTaskObj).subscribe(
      (data: any) => {
        this.spinner.hide();
        //  console.log(data)
        let response = data;
        if (response.Status == 1) {
          this.getListofTaskInTaskGroup(this.taskGroupId);
          this.getDetailOfTaskGroup(this.taskGroupId);
          this.subTaskObj = {};
          this.selectedSubTaskAssigne = '';
          this.selectedSubTaskReviewer = '';
          this.priviousId = '';
          this.closeSubTask('close click');
          this.TaskForm.reset();
        } else if (response.Status == 0) {
          this.toaster.error(response.Message);
        }
      },
      (error) => {
        // console.log(error)
        this.spinner.hide();
      }
    );
  }

  //popup delete subtask
  DeleteSubTaskPopUp(deletePopUpTemp: any, subtask: any) {
    this.subtaskdata = subtask;
    this.SubTaskId = subtask.SubTaskId;
    this.subTaskTittle = subtask.Title;
    this.deleteSubTaskModel = this.modalService.open(deletePopUpTemp, {
      centered: true,
      keyboard: false,
      backdrop: 'static',
    });
  }

  //close delete subtask
  CloseSubTaskPop(value: string) {
    this.deleteSubTaskModel.close(value);
  }

  deleteSubTask() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.clientService
      .deleteSubTask(
        sessionStorage.getItem('ClientAdminOrgId'),
        sessionStorage.getItem('FillingId'),
        this.taskGroupId,
        this.taskId,
        this.SubTaskId,
        this.token
      )
      .subscribe(
        (data: any) => {
          this.spinner.hide();
          if (data != undefined && data != null) this.CloseSubTaskPop('close click');
          this.getSubTasksInTask();
          this.getDetailOfTaskGroup(this.taskGroupId);
          this.getListofTaskInTaskGroup(this.taskGroupId);
        },
        (error) => {
          this.spinner.hide();
        }
      );
  }

  //Mark as reviewed subtask
  MarkSubTaskAsReviewed() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.clientService
      .MarkSubTaskAsReviewed(
        sessionStorage.getItem('ClientAdminOrgId'),
        sessionStorage.getItem('FillingId'),
        this.taskGroupId,
        this.taskId,
        this.subTaskId,
        this.token,
        this.subtaskReviewed = this.IsSubTaskReviewed ? false : true,
      )
      .subscribe(
        (data: any) => {
          // this.isSubtaskClientReviewed = true
          this.spinner.hide();
          if (data != undefined && data != null) {
            if (data.Status == 1) {
              this.getSubTasksInTask();
              this.getDetailOfTaskGroup(this.taskGroupId);
              this.getListofTaskInTaskGroup(this.taskGroupId);
              this.closeMarkAsReviewedSubTaskCompletePopUp('close click');
            } else if (data.Status == 0) {
              this.toaster.error(data.Message);
            }
          }
        },
        (error) => {
          this.spinner.hide();
        }
      );
  }
  // markAsReviewedCompleteSubPopUp
  markAsReviewedCompleteSubPopUp(markassubtaskreviewed, IsTaskCompleted, IssubTaskReviewed) {
    this.IsSubTaskCompleted = IssubTaskReviewed
    if (IsTaskCompleted) {
      this.markAsSubTaskReviewedModel = this.modalService.open(markassubtaskreviewed, {
        centered: true,
        keyboard: false,
      });
    }
  }
  //closeMarkAsReviewedSubTaskCompletePopUp
  closeMarkAsReviewedSubTaskCompletePopUp(value: string) {
    this.modalService.dismissAll();
    // this.markAsSubTaskReviewedModel.close(value);
  }
  //Mark as complete subtask
  MarkSubTaskAsCompleted() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.clientService
      .MarkSubTaskAsCompleted(
        sessionStorage.getItem('ClientAdminOrgId'),
        sessionStorage.getItem('FillingId'),
        this.taskGroupId,
        this.taskId,
        this.subTaskId,
        this.subTaskCompleted = this.IsSubTaskCompleted ? false : true
      )
      .subscribe(
        (data: any) => {
          this.spinner.hide();
          // this.isSubtaskClientCompleted = true;
          if (data != undefined && data != null) {
            if (data.Status == 1) {
              this.toaster.success('mark subtask as completed Successfully', 'success');
              this.getSubTasksInTask();
              this.getDetailOfTaskGroup(this.taskGroupId);
              this.getListofTaskInTaskGroup(this.taskGroupId);
              this.modalService.dismissAll();
            } else if (data.Status == 0) {
              this.toaster.error(data.Message);
            }
          }
        },
        (error) => {
          this.spinner.hide();
        }
      );
  }

  //mark as comlete sub task popup
  markAsCompleteSubPopUp(mark: any, IsTaskCompleted) {
    this.IsSubTaskCompleted = IsTaskCompleted
    this.markAsSubTaskCompleteModel = this.modalService.open(mark, {
      centered: true,
      keyboard: false,
    });
  }

  //close mark as sub task complete popup
  closeMarkAsCompleteSubPopUp(value: string) {
    this.modalService.dismissAll();
  }

  editSubtask(subtask, subtaskpop) {
    this.TaskForm.reset();
    if (!subtask.IsTaskCompleted) {
      this.subTaskObj = subtask;
      this.subTaskObj.DueDate = new Date(subtask.DueDate);
      this.selectedSubTaskAssigne = subtask.Assignee.Email;

      if (subtask.Reviewer != null) {
        this.selectedSubTaskReviewer = subtask.Reviewer.Email;
        this.reviewerSubTaskRespectiveFilingTeamTableID = subtask.Reviewer.RespectiveFilingTeamTableID;
        this.reviewerSubTaskIsFilingClientTeamMember = subtask.Reviewer.IsFilingClientTeamMember;
      } else {
        this.selectedSubTaskReviewer = '';
        this.reviewerSubTaskRespectiveFilingTeamTableID = '';
        this.reviewerSubTaskIsFilingClientTeamMember = false;
      }
      this.assigneeSubTaskRespectiveFilingTeamTableID = subtask.Assignee.RespectiveFilingTeamTableID;
      this.assigneeSubTaskIsFilingClientTeamMember = subtask.Assignee.IsFilingClientTeamMember;

      this.IsSubTaskReviewDone = subtask.IsSubTaskReviewDone;
      this.subtaskTittleName = 'Edit Sub Task Item';
      this.subTaskModel = this.modalService.open(subtaskpop, {
        centered: true,
        keyboard: false,
        size: 'lg',
        backdrop: 'static',
      });
    } else {
      this.toaster.info('Sub task not editable');
    }
  }

  priviousId: string;
  toggler(ev: any, id: any, taskId, taskData: any) {
    if (this.priviousId != undefined && this.priviousId !== '') {
      document.getElementById(this.priviousId).classList.toggle('d-n');
      this.priviousId = '';
    } else {
      id = 'togg' + taskId + id;
      if (this.isLoaded == true) {
        document.getElementById(id).classList.toggle('d-n');
      }
      this.taskId = taskId;
      this.priviousId = id;
      this.getSubTasksInTask();
    }
    this.checkTaskReviwed(taskData);
    this.checkTaskComeplte(taskData);
  }

  checkTaskReviwed(taskData) {
    if (taskData.IsTaskReviewDone == true) {
      this.isReviewed = true;
    } else {
      this.isReviewed = false;
    }
  }
  checkTaskComeplte(taskData) {
    if (taskData.IsTaskCompleted == true) {
      this.isCompleted = true;
    } else {
      this.isCompleted = false;
    }
  }
  togglerSubTask(ev: any, id: any, SubTaskId, subtask: any) {
    this.subTaskId = SubTaskId;
    // this.checkSubtaskReviewedCompleted(subtask);
    id = 'subtogg' + id + SubTaskId;
    document.getElementById(id).classList.toggle('d-n');
  }
  // checkSubtaskReviewedCompleted(subtask: any) {
  //   console.log(subtask.IsTaskCompleted)
  //   if (subtask.IsTaskCompleted == true) {
  //     this.isSubtaskClientCompleted = true;
  //   } else {
  //     this.isSubtaskClientCompleted = false;
  //   }
  //   console.log(subtask.IsTaskReviewDone)
  //   if (subtask.IsTaskReviewDone == true) {
  //     this.isSubtaskClientReviewed = true;
  //   } else {
  //     this.isSubtaskClientReviewed = false;
  //   }
  // }

  CreateTopicModel(content: any) {
    this.TopicForm.reset();
    this.topicModel = this.modalService.open(content, {
      centered: true,
      keyboard: false,
      backdrop: 'static',
    });
  }

  CloseCreatetopic(value: string) {
    this.topicModel.close(value);
  }
  closeCreateTopic(value: string) {
    this.topicModel.close(value);
  }
  // CreateTopic() {
  //   this.adminmemberids = [];
  //   this.memberids = [];

  //   if (this.topic == '' || this.topic.length < 0) {
  //     this.isempty = true;
  //     this.errormessage = 'Topic Name is required.';
  //   } else if (this.description == '' || this.description.length < 0) {
  //     this.isempty = true;
  //     this.errormessage = 'Description is required.';
  //   } else if (this.selectedadminTeamMembers.length <= 0) {
  //     this.isempty = true;
  //     this.errormessage = 'Please select admin team members.';
  //   } else if (this.selectedTeamMembers.length <= 0) {
  //     this.isempty = true;
  //     this.errormessage = 'Please select team members.';
  //   } else {
  //     this.selectedadminTeamMembers.forEach(v => {
  //       this.adminmemberids.push(v.AdminID);
  //     });

  //     this.selectedTeamMembers.forEach(v => {
  //       this.memberids.push(v.LawOfficeClientID);
  //     });

  //     var data = {
  //       OrgId: sessionStorage.getItem('ClientAdminOrgId'),
  //       FilingId: sessionStorage.getItem('FillingId'),
  //       Title: this.topic,
  //       Description: this.description,
  //       AdminIds: this.adminmemberids.toString(),
  //       LawOfficeClientIds: this.memberids.toString()
  //     };
  //     var tokenid = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
  //     this.filingService.CreateTopicForFiling(data, tokenid).subscribe(
  //       (res: any) => {
  //         if (res.Status == 1) {
  //           this.topicModel.close();
  //         }
  //         this.topic = '';
  //         this.description = '';
  //         this.selectedTeamMembers = [];
  //         this.selectedadminTeamMembers = [];
  //         // this.GetTopicsForFilings();
  //       },
  //       err => {
  //       }
  //     );
  //   }
  // }

  CreateTopic() {
    this.spinner.show();
    this.adminmemberids = [];
    this.memberids = [];
    if (this.TopicForm.valid) {
      this.selectedadminTeamMembers.forEach((v) => {
        this.adminmemberids.push(v.AdminID);
      });

      this.selectedTeamMembers.forEach((v) => {
        this.memberids.push(v.LawOfficeClientID);
      });

      var data = {
        OrgId: sessionStorage.getItem('ClientAdminOrgId'),
        FilingId: sessionStorage.getItem('FillingId'),
        Title: this.TopicForm.value.topic,
        Description: this.TopicForm.value.description,
        AdminIds: this.adminmemberids.toString(),
        LawOfficeClientIds: this.memberids.toString(),
      };
      var tokenid = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
      this.filingService.CreateTopicForFiling(data).subscribe(
        (res: any[]) => {
          this.spinner.hide();
          this.toaster.success('Topic Created successfully.');
          this.topicModel.close();
          this.topic = '';
          this.description = '';
          this.selectedTeamMembers = [];
          this.selectedadminTeamMembers = [];
          this.navigateToMessagesPopup()
        },
        (err) => {
          this.spinner.hide();
          this.toaster.error('error occured');
        }
      );
    }
  }

  configGetFilingAdminTeammembers(res) {
    this.adminteamMembersList = res;
    this.adminteamMembersDropsownSettings = {
      singleSelection: false,
      idField: 'AdminID',
      textField: 'Email',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  confiGetFilingClientTeammembers(res) {
    this.clinetteamMembersList = res;

    this.teamMembersDropsownSettings = {
      singleSelection: false,
      idField: 'LawOfficeClientID',
      textField: 'Email',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  onadminmemberSelect(eve) { }
  onadminMemberSelectAll(eve) { }

  onTeamMemberSelect(eve) { }
  onTeamMemberSelectAll(eve) {
    this.memberids = [];
  }
  visitingInput() {
    this.isempty = false;
  }
  some($event) {
    console.log($event);
  }
  navigateToMessages() {
    this.router.navigate(['client/applayout/fillings/messages'])
    this.modalService.dismissAll();
  }
  navigateToMessagesPopup() {
    this.deleteSubTaskModel = this.modalService.open(this.afterTopicCreatetemplate, {
      centered: true,
      keyboard: false,
      backdrop: 'static',
    });
  }
  // ngOnDestroy() {
  //   this.emitOrgInfoResponse.unsubscribe();
  //   this.clientCommonService.clearSubscription();
  //   this.emitMailingAddInfoResponce.unsubscribe();
  //   this.clientCommonService.clearSubscription();
  //   this.emitBusinessAddInfoResponce.unsubscribe();
  //   this.clientCommonService.clearSubscription();
  //   this.emitFinInfoResponse.unsubscribe();
  //   this.clientCommonService.clearSubscription();
  //   this.emitPocInfoResponce.unsubscribe();
  //   this.clientCommonService.clearSubscription();
  //   this.emitAuthorizedInfoResponce.unsubscribe();
  //   this.clientCommonService.clearSubscription();
  //   // applicant side
  //   this.emitAptPersonalInfoResponce.unsubscribe();
  //   this.clientCommonService.clearSubscription();
  //   this.emitForeginAddInfoResponce.unsubscribe();
  //   this.clientCommonService.clearSubscription();

  //   this.emitEducationInfoResponce.unsubscribe();
  //   this.clientCommonService.clearSubscription();
  //   this.emitAptEmpResumeFile.unsubscribe();
  //   this.clientCommonService.clearSubscription();
  //   this.emitAptRecentW2File.unsubscribe();
  //   this.clientCommonService.clearSubscription();
  //   this.emitApt3RecentPayStubsFiles.unsubscribe();
  //   this.clientCommonService.clearSubscription();
  //   this.emitAptEadCardFile.unsubscribe();
  //   this.clientCommonService.clearSubscription();
  //   this.emitI94TravelInfoResponce.unsubscribe();
  //   this.clientCommonService.clearSubscription();
  //   this.emitAptImgTravelInfoResponce.unsubscribe();
  //   this.clientCommonService.clearSubscription();
  //   this.emitAptPosInfoResponce.unsubscribe();
  //   this.clientCommonService.clearSubscription();
  // }

  ngOnDestroy() {
    this.emitGetUIControlTemplateResults.unsubscribe();
    this.commonService.clearCommonEmitters();
  }
}
