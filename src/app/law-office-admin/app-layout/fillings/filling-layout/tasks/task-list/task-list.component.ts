import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '@app/law-office-admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

import { FilingsService } from '../../../filings.service';
import { AdminpermissionService } from '@app/auth-guard/admin/adminpermission.service';
import { ToastrService } from 'ngx-toastr';
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
  taskGroupId: any;
  taskObj: any = {};
  subTaskObj: any = {};
  isSubtaskReviewed: boolean;
  isSubtaskCompleted: boolean;
  minDate: Date;
  taskTitle: any;
  taskGroup: any;
  deleteTaskModel: any;
  topicModal: any;
  @ViewChild('afterTopicCreate') afterTopicCreatetemplate: TemplateRef<any>;
  taskdata: any;
  taskTittle: any;
  isSubtaskLoaded: boolean;
  TaskId: any;
  subTasks: any = [];
  taskId: any;
  subTaskModel: any;
  assigneeSubTaskRespectiveFilingTeamTableID: any;
  assigneeSubTaskIsFilingClientTeamMember: boolean;
  reviewerSubTaskIsFilingClientTeamMember: boolean = false;
  reviewerSubTaskRespectiveFilingTeamTableID: any;
  subTaskId: any;
  isClickToggle: boolean;
  subtaskdata: any;
  isReviewed: boolean;
  isCompleted: boolean;
  deleteSubTaskModel: any;
  SubTaskId: any;
  subTaskTittle: any;
  markAsCompleteModel: any;
  markAsSubTaskCompleteModel: any;
  selectedAssigne: any = [];
  selectedReviewer: any = [];
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
  isLoaded: boolean;
  adminteamMembersList: any = [];
  TaskForm: FormGroup;
  adminteamMembersDropsownSettings = {};
  teamMembersDropsownSettings = {};
  clinetteamMembersList: any = [];
  FillingPermissions: any = {};
  TopicForm: FormGroup;
  isTaskListempty: boolean = false;
  TaskDuseDate: Date;
  TaskDuseDateAdmin: any;
  username: any = '';
  clientShowTittle: string = 'Client has not added any content yet';
  applicantShowTittle: string = 'Applicant has not added any content yet';
  adminId: any;

  taskMarkasCompleted: boolean;
  IsTaskCompleted: boolean = false;
  IsTaskReviewed: boolean = false;
  taskMarkAsReviewed: boolean;

  IsSubTaskCompleted: boolean = false;
  subTaskCompleted: boolean;

  IsSubTaskReviewed: boolean = false;
  subtaskReviewed: boolean;

  selectedSubtaskAdminId: any;
  emitGetUIControlTemplateResults: Subscription;
  initialObj = [];

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private Valid: ValidationService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private fb: FormBuilder,
    private filingService: FilingsService,
    private permissionService: AdminpermissionService,
    private toaster: ToastrService,
    public clientCommonService: ClientCommonServiceService,
    public commonService: CommonService
  ) {
    this.isLoaded = true;
    this.isSubtaskLoaded = true;
    this.emitGetUIControlTemplateResults = this.commonService.emitGetUIControlTemplateResults.subscribe((res) => {
      if (!commonService.checkNullorUndefined(res)) {
        this.initialObj = [];
        this.initialObj = res;
      }
    });
  }

  ngOnInit() {
    this.FillingPermissions = this.permissionService.FillingPermissions();
    this.username = sessionStorage.getItem('AdminUserName');
    // console.log(this.username)
    let id = this.route.snapshot.paramMap.get('id');
    this.getDetailOfTaskGroup(id);
    this.taskGroupId = id;
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.TaskCreateForm();
    this.createformvalidation();
    this.TaskDuseDateAdmin = new Date();
    this.TaskDuseDateAdmin.setDate(this.TaskDuseDateAdmin.getFullYear() + 1000);
    this.commonService.GetUIControlTemplateResults();
    // client and applicant formgroup methods to show patch responce to card
    // this.clientCommonService.OrginationDetials();
    // this.clientCommonService.personalForm();
    // this.clientCommonService.mailingAddressBuildForm();
    // this.clientCommonService.addressOfPPOfBusiness();
    // this.clientCommonService.pocForm();
    // this.clientCommonService.authSignatoryForm();
    // this.clientCommonService.financialsForm();
    // this.clientCommonService.buildPosForm()
    // this.clientCommonService.buildEducationForm();
    // this.clientCommonService.ImmigrationValidatonRules();
    // this.clientCommonService.immigrationTravelDocumentVRules();
    // this.clientCommonService.foreignAddress()
    // this.clientCommonService.currentUsaAddress();
    // end formgroup methods calling
    // if (!this.commonService.checkNullorUndefined(sessionStorage.getItem('ClientOrganisationID'))) {
    //   this.clientCommonService.getOrganisationInfo();
    //   this.clientCommonService.getfinancialsInformation();
    //   this.clientCommonService.getAddressOfPrincipalPlaceOfBusiness();
    //   this.clientCommonService.getPocInfromation();
    //   this.clientCommonService.getauthSignatoryInformation();
    //   this.clientCommonService.getcontactinformation();
    // }
    // if (!this.commonService.checkNullorUndefined(sessionStorage.getItem('LawOfficeClientID'))) {
    //   this.clientCommonService.getResume();
    //   this.clientCommonService.getEadCardfile();
    //   this.clientCommonService.getRecentw2sfile();
    //   this.clientCommonService.getRecentPayStubs();
    //   this.clientCommonService.getForeginAddressAndContact();
    //   this.clientCommonService.getImgTravelFile();
    //   this.clientCommonService.getImgI94File();
    //   this.clientCommonService.getPersonalInfo();
    //   this.clientCommonService.getCurrentUsaAddress();
    //   this.clientCommonService.getEducationalnfo();
    //   this.clientCommonService.getImmigrationDetails();
    //   this.clientCommonService.getImgTravelDetails();
    //   this.clientCommonService.getPosInformation();
    //   this.clientCommonService.getNonImmigrantInfo();
    // }
    // else if (this.commonService.checkNullorUndefined(sessionStorage.getItem('LawOfficeClientID'))) {
    //   this.clientCommonService.getResume();
    //   this.clientCommonService.getEadCardfile();
    //   this.clientCommonService.getRecentw2sfile();
    //   this.clientCommonService.getRecentPayStubs();
    //   this.clientCommonService.getForeginAddressAndContact();
    //   this.clientCommonService.getImgTravelFile();
    //   this.clientCommonService.getImgI94File();
    //   this.clientCommonService.getPersonalInfo();
    //   this.clientCommonService.getCurrentUsaAddress();
    //   this.clientCommonService.getEducationalnfo();
    //   this.clientCommonService.getImmigrationDetails();
    //   this.clientCommonService.getImgTravelDetails();
    //   this.clientCommonService.getPosInformation();
    //   this.clientCommonService.getNonImmigrantInfo();
    // }
  }

  createformvalidation() {
    this.TopicForm = this.fb.group({
      topic: ['', Validators.required],
      description: ['', Validators.required],
      adminmembers: ['', Validators.required],
      members: ['', Validators.required],
    });
  }

  //GetDetailOfTaskGroup
  getDetailOfTaskGroup(TaskGroupId) {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService
      .GetDetailOfTaskGroup(
        sessionStorage.getItem('OrganisationID'),
        sessionStorage.getItem('FillingId'),
        TaskGroupId,
        this.token
      )
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.taskGroupData = res;
          this.getListofTaskInTaskGroup(TaskGroupId);
          this.getFilingClientTeammembers();
        },
        (err) => {
          this.toaster.error('error occured');
        }
      );
  }

  closeModal() {
    this.modalService.dismissAll();
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

  backToTaskGroup() {
    this.router.navigateByUrl('/admin/fillings/taskslist');
  }
  //listoftasks in taskgroup
  getListofTaskInTaskGroup(TaskGroupId) {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService
      .GetListofTaskInTaskGroup(
        sessionStorage.getItem('OrganisationID'),
        sessionStorage.getItem('FillingId'),
        TaskGroupId,
        this.token
      )
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          // console.log(res)
          if (res != null && res != undefined) {
            this.tasksList = res.sort((a, b) => a['TaskId'] - b['TaskId']);
          } else {
            this.isTaskListempty = true;
          }
        },
        (err) => {
          this.toaster.error('error occured');
        }
      );
  }

  // teamMemberOnSelect(event: TypeaheadMatch): void {
  //   let teamMemberId = this.teamMembersList.find(a => a.Email == event);
  //   if (teamMemberId != undefined) {
  //     this.reviewerRespectiveFilingTeamTableID = teamMemberId.LawOfficeClientID;
  //     this.indivualApplicantId = applicant.ClientId;
  //   }
  // }

  //loadclienteammembers
  getFilingClientTeammembers() {
    let teamobj = {
      FilingId: sessionStorage.getItem('FillingId'),
      AdminOrgId: sessionStorage.getItem('OrganisationID'),
    };
    this.adminService.GetFilingClientTeammembers(teamobj).subscribe(
      (res: any[]) => {
        this.spinner.hide();
        if (res != null && res != undefined) {
          // console.log('client', res)
          this.clientMembersList = res;
          this.confiGetFilingClientTeammembers(res);
          this.getFilingAdminTeammembers();
        }
      },
      (err) => {
        this.toaster.error('error occured');
      }
    );
  }

  // load team members
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
          //console.log(res)
          let teamMembersList = res;
          this.configGetFilingAdminTeammembers(res);
          this.teamMembersList = teamMembersList.filter((s) => s.Status == true);
          this.assignMembers = [];
          for (let i = 0; i < this.clientMembersList.length; i++) {}
          this.assignMembers = this.assignMembers.concat(this.clientMembersList);
          this.assignMembers = this.assignMembers.concat(this.teamMembersList);
        }
      },
      (err) => {
        this.toaster.error('error occured');
      }
    );
  }
  //typehead assignonSelect
  assignMembersOnSelect(event: any): void {
    this.selectedAssigne = event.item.Email;
    if (event.item.LawOfficeClientID) {
      this.assigneeRespectiveFilingTeamTableID = event.item.FilingClientTeamId;
      this.assigneeIsFilingClientTeamMember = true;
    } else {
      this.assigneeRespectiveFilingTeamTableID = event.item.FillingAdminTeamId;
      this.assigneeIsFilingClientTeamMember = false;
    }
    // this.assigneeRespectiveFilingTeamTableID = event.item.FilingClientTeamId;
    // this.assigneeIsFilingClientTeamMember = true;
  }

  //typehead reviewerOnSelect
  reviewerOnSelect(event: any): void {
    if (event.item.LawOfficeClientID) {
      this.reviewerRespectiveFilingTeamTableID = event.item.FilingClientTeamId;
      this.reviewerIsFilingClientTeamMember = true;
    } else {
      this.reviewerRespectiveFilingTeamTableID = event.item.FillingAdminTeamId;
      this.reviewerIsFilingClientTeamMember = false;
    }
    this.selectedReviewer = event.item.Email;
    if (this.selectedReviewer) {
      this.TaskForm.patchValue({
        ReviewerApproval: true,
      });
    }
  }
  typeHeadSelectFocus() {
    const checkReviewer = this.assignMembers.find((e) => e.Email === this.selectedReviewer);
    if (this.commonService.checkNullorUndefined(checkReviewer)) {
      this.selectedReviewer = '';
      this.TaskForm.patchValue({
        ReviewerApproval: false,
      });
    }
  }

  //Add task in TaskGroup
  taskInTaskGroup() {
    debugger;
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
    let taskObj = {
      TaskId: this.taskObj.TaskId == undefined ? 0 : this.taskObj.TaskId,
      OrgId: sessionStorage.getItem('OrganisationID'),
      FilingId: sessionStorage.getItem('FillingId'),
      TaskGroupId: this.taskGroupId,
      Title: this.taskObj.Title,
      DueDate: this.taskObj.DueDate,
      TaskType: this.taskObj.TaskType,
      Priority: this.taskObj.Priority,
      Description: this.taskObj.Description,
      ReviewerApproval: this.taskObj.ReviewerApproval ? true : false,
      IsTaskReviewDone: this.taskObj.IsTaskReviewDone == undefined ? false : this.taskObj.IsTaskReviewDone,
      IsTaskCompleted: this.taskObj.IsTaskCompleted == undefined ? false : this.taskObj.IsTaskCompleted,
      status: true,
      Assignee: {
        Email: this.selectedAssigne,
        FilingId: sessionStorage.getItem('FillingId'),
        RespectiveFilingTeamTableID: this.assigneeRespectiveFilingTeamTableID,
        IsFilingClientTeamMember: this.assigneeIsFilingClientTeamMember,
      },
      Reviewer: {
        Email: this.selectedReviewer,
        FilingId: sessionStorage.getItem('FillingId'),
        RespectiveFilingTeamTableID: this.selectedReviewer ? this.reviewerRespectiveFilingTeamTableID : undefined,
        // reviewerIsFilingClientTeamMember: this.reviewerIsFilingClientTeamMember,
      },
      ReviewerIsFilingClientTeamMember: this.reviewerIsFilingClientTeamMember,
    };

    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService.TaskInTaskGroup(taskObj, this.token).subscribe(
      (data: any) => {
        this.spinner.hide();
        let response = data;
        if (response.Status == 1) {
          this.getDetailOfTaskGroup(this.taskGroupId);
          this.taskObj = {};
          this.selectedAssigne = '';
          this.selectedReviewer = '';
          this.priviousId = '';
          this.reviewerRespectiveFilingTeamTableID = '';
          this.assigneeRespectiveFilingTeamTableID = '';
          this.closeTask('close click');
          this.toaster.success('Task added successfully.');
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
      keyboard: false,
      size: 'lg',
      backdrop: 'static',
    });
  }
  closeTask(value: string) {
    this.getListofTaskInTaskGroup(this.taskGroupId);
    this.taskModel.close(value);
    this.priviousId = '';
  }
  //delete task group
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
          this.router.navigate(['/admin/fillings/taskslist']);
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

  //confirmDeteleteTaskGroup
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

  //delete task in taskgroup
  deleteTask() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService
      .deletetask(
        sessionStorage.getItem('OrganisationID'),
        sessionStorage.getItem('FillingId'),
        this.taskGroupId,
        this.TaskId,
        this.token
      )
      .subscribe(
        (data: any) => {
          this.spinner.hide();
          let response = data;
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

  //popup delete task
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

  //close delete task
  Closedelete(value: string) {
    this.deleteTaskModel.close(value);
  }
  //Mark as reviewed subtask
  MarkTaskAsReviewed() {
    this.spinner.show();
    this.closeModal();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService
      .MarkTaskAsReviewed(
        sessionStorage.getItem('OrganisationID'),
        sessionStorage.getItem('FillingId'),
        this.taskGroupId,
        this.taskId,
        this.token,
        (this.IsTaskReviewed = this.taskMarkAsReviewed ? false : true)
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
              this.closeMarkAsReviewedCompletePopUp('close click');
            } else if (data.Status == 0) {
              this.toaster.error(data.Message);
            }
          }
        },
        (error) => {
          this.spinner.hide();
          this.toaster.error('Error occered');
        }
      );
  }
  //mark task reviewed as complete popup
  markAsReviewedCompletePopUp(markasreviewed: any, IsTaskCompleted, IsTaskReviewDone) {
    this.taskMarkAsReviewed = IsTaskReviewDone;
    if (IsTaskCompleted) {
      this.markAsTaskReviewedModel = this.modalService.open(markasreviewed, {
        centered: true,
        keyboard: false,
      });
    }
  }
  //close mark task reviewed as complete popup
  closeMarkAsReviewedCompletePopUp(value: string) {
    this.markAsTaskReviewedModel.close(value);
  }
  //Mark as complete subtask
  MarkTaskAsCompleted() {
    let eligible = true;
    this.subTasks.forEach((subTask) => {
      if (subTask.IsTaskCompleted == false && !this.IsTaskCompleted) {
        this.toaster.warning('Some of the subtasks are still pending');
        eligible = false;
      }
    });
    if (!this.IsTaskCompleted && !eligible) {
      this.closeModal();
      return;
    }
    this.spinner.show();
    this.closeModal();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService
      .MarkTaskAsCompleted(
        sessionStorage.getItem('OrganisationID'),
        sessionStorage.getItem('FillingId'),
        this.taskGroupId,
        this.taskId,
        this.token,
        (this.taskMarkasCompleted = this.IsTaskCompleted ? false : true)
      )
      .subscribe(
        (data: any) => {
          this.isLoaded = false;
          this.spinner.hide();
          if (data != undefined && data != null) {
            if (data.Status == 1) {
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
          this.toaster.error('error occured');
        }
      );
  }

  //mark as comlete task popup

  markAsCompletePopUp(mark: any, IsTaskCompleted) {
    this.IsTaskCompleted = IsTaskCompleted;
    this.markAsCompleteModel = this.modalService.open(mark, {
      centered: true,
      keyboard: false,
    });
  }

  //close mark as complete popup
  closeMarkAsCompletePopUp(value: string) {
    this.markAsCompleteModel.close(value);
  }

  editTask(task, taskpop) {
    this.TaskForm.reset();
    if (!task.IsTaskCompleted) {
      this.taskTittleName = 'Edit Task Item';
      this.taskObj = task;
      this.taskObj.DueDate = new Date(task.DueDate);
      if (task.Assignee.Email) {
        this.selectedAssigne = task.Assignee.Email;
      } else {
        this.selectedAssigne = '';
      }

      if (task.Reviewer != null) {
        this.TaskForm.patchValue({
          ReviewerApproval: true,
        });
        this.selectedReviewer = task.Reviewer.Email;
        this.reviewerRespectiveFilingTeamTableID = task.Reviewer.RespectiveFilingTeamTableID;
        this.reviewerIsFilingClientTeamMember = task.Reviewer.IsFilingClientTeamMember;
      } else {
        this.TaskForm.patchValue({
          ReviewerApproval: false,
        });
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
    this.adminService
      .GetSubTasksInTask(
        sessionStorage.getItem('OrganisationID'),
        sessionStorage.getItem('FillingId'),
        this.taskGroupId,
        this.taskId,
        this.token,
        (this.adminId = sessionStorage.getItem('LoguserId'))
      )
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res && res.length) {
            this.subTasks = res.sort((a, b) => a['SubTaskId'] - b['SubTaskId']);
            if (this.subTasks[0]['Title'] && this.subTasks[0]['Title'] === 'Foreign Addresses') {
              this.subTasks[0]['Title'] = 'foreign address';
              this.subTasks[0]['Description'] = 'Please Fill in the foreign Address Section in settings';
            }
          }
        },
        (err) => {
          this.toaster.error('error occured');
        }
      );
  }
  //typehead assignMembersSubTaskOnSelect
  assignMembersSubTaskOnSelect(event: any): void {
    this.selectedSubTaskAssigne = event.item.Email;
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
    if (event.item.LawOfficeClientID) {
      this.reviewerSubTaskRespectiveFilingTeamTableID = event.item.FilingClientTeamId;
      this.reviewerSubTaskIsFilingClientTeamMember = true;
    } else {
      this.reviewerSubTaskRespectiveFilingTeamTableID = event.item.FillingAdminTeamId;
      this.reviewerSubTaskIsFilingClientTeamMember = false;
    }
    this.selectedSubTaskReviewer = event.item.Email;
    if (this.selectedSubTaskReviewer) {
      this.TaskForm.patchValue({
        ReviewerApproval: true,
      });
    }
  }
  //typehead subtaskreviewerOnSelect
  typeHeadSelectFocusSubTask() {
    const checkSubTaskReviewer = this.assignMembers.find((e) => e.Email === this.selectedSubTaskReviewer);
    if (this.commonService.checkNullorUndefined(checkSubTaskReviewer)) {
      this.selectedSubTaskReviewer = '';
      this.TaskForm.patchValue({
        ReviewerApproval: false,
      });
    }
  }
  // add subtask popup
  subTaskPopUp(IsTaskCompleted, data: any, taskdata: any) {
    //console.log(IsTaskCompleted)
    this.TaskDuseDate = new Date(taskdata.DueDate);
    //this.minDate = new Date();
    this.TaskDuseDate.setDate(this.TaskDuseDate.getDate());
    //console.log(taskdata.DueDate)
    this.TaskForm.reset();
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
      OrgId: sessionStorage.getItem('OrganisationID'),
      FilingId: sessionStorage.getItem('FillingId'),
      TaskGroupId: this.taskGroupId,
      Title: this.subTaskObj.Title,
      DueDate: this.subTaskObj.DueDate,
      TaskType: this.subTaskObj.TaskType,
      Priority: this.subTaskObj.Priority,
      Description: this.subTaskObj.Description,
      ReviewerApproval: this.subTaskObj.ReviewerApproval ? true : false,
      IsTaskReviewDone: this.subTaskObj.IsTaskReviewDone == undefined ? false : this.subTaskObj.IsTaskReviewDone,
      IsTaskCompleted: this.subTaskObj.IsTaskCompleted == undefined ? false : this.taskObj.IsTaskCompleted,
      status: true,
      Assignee: {
        Email: this.selectedSubTaskAssigne,
        FilingId: sessionStorage.getItem('FillingId'),
        RespectiveFilingTeamTableID: this.assigneeSubTaskRespectiveFilingTeamTableID,
        IsFilingClientTeamMember: this.assigneeSubTaskIsFilingClientTeamMember,
      },
      Reviewer: {
        Email: this.selectedSubTaskReviewer,
        FilingId: sessionStorage.getItem('FillingId'),
        RespectiveFilingTeamTableID: this.selectedSubTaskReviewer
          ? this.reviewerSubTaskRespectiveFilingTeamTableID
          : undefined,
        //IsFilingClientTeamMember: this.reviewerSubTaskIsFilingClientTeamMember,
      },
      ReviewerIsFilingClientTeamMember: this.reviewerSubTaskIsFilingClientTeamMember,
    };
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService.SubTaskInTask(subTaskObj, this.token).subscribe(
      (data: any) => {
        this.spinner.hide();
        let response = data;
        if (response.Status == 1) {
          this.getListofTaskInTaskGroup(this.taskGroupId);
          this.getDetailOfTaskGroup(this.taskGroupId);
          this.subTaskObj = {};
          this.selectedSubTaskAssigne = '';
          this.selectedSubTaskReviewer = '';
          this.priviousId = '';
          this.closeSubTask('close click');
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
    this.adminService
      .deleteSubTask(
        sessionStorage.getItem('OrganisationID'),
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
    this.closeModal();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService
      .MarkSubTaskAsReviewed(
        sessionStorage.getItem('OrganisationID'),
        sessionStorage.getItem('FillingId'),
        this.taskGroupId,
        this.taskId,
        this.subTaskId,
        this.token,
        (this.isSubtaskReviewed = this.subtaskReviewed ? false : true)
      )
      .subscribe(
        (data: any) => {
          this.spinner.hide();
          if (data != undefined && data != null) {
            if (data.Status == 1) {
              this.isSubtaskReviewed = true;
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
          this.toaster.error('error occured');
        }
      );
  }
  //markAsReviewedCompleteSubPopUpsubtaskReviewed
  markAsReviewedCompleteSubPopUp(markassubtaskreviewed, IsTaskCompleted, IsTaskReviewDone) {
    this.subtaskReviewed = IsTaskReviewDone;
    if (IsTaskCompleted) {
      this.markAsSubTaskReviewedModel = this.modalService.open(markassubtaskreviewed, {
        centered: true,
        keyboard: false,
      });
    }
  }
  //closeMarkAsReviewedSubTaskCompletePopUp
  closeMarkAsReviewedSubTaskCompletePopUp(value: string) {
    this.markAsSubTaskReviewedModel.close(value);
  }
  //Mark as complete subtask
  MarkSubTaskAsCompleted() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService
      .MarkSubTaskAsCompleted(
        sessionStorage.getItem('OrganisationID'),
        sessionStorage.getItem('FillingId'),
        this.taskGroupId,
        this.taskId,
        this.subTaskId,
        this.token,
        (this.IsSubTaskCompleted = this.subTaskCompleted ? false : true)
      )
      .subscribe(
        (data: any) => {
          this.isSubtaskCompleted = true;
          this.spinner.hide();
          if (data != undefined && data != null) {
            if (data.Status == 1) {
              this.closeMarkAsCompleteSubPopUp('close click');
              this.getSubTasksInTask();
              this.getDetailOfTaskGroup(this.taskGroupId);
              this.getListofTaskInTaskGroup(this.taskGroupId);
            } else if (data.Status == 0) {
              this.toaster.error(data.Message);
            }
          }
        },
        (error) => {
          this.spinner.hide();
          this.toaster.error('error occured');
        }
      );
  }

  //mark as comlete sub task popup
  markAsCompleteSubPopUp(mark: any, IsSubTaskCompleted) {
    this.subTaskCompleted = IsSubTaskCompleted;
    this.markAsSubTaskCompleteModel = this.modalService.open(mark, {
      centered: true,
      keyboard: false,
    });
  }

  //close mark as sub task complete popup
  closeMarkAsCompleteSubPopUp(value: string) {
    this.markAsSubTaskCompleteModel.close(value);
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
      this.toaster.info('Subtask not editable');
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
  togglerSubTask(ev: any, id: any, SubTaskId, subtaskData: any) {
    this.subTaskId = SubTaskId;
    this.checkSubtaskReviewedCompleted(subtaskData);
    id = 'subtogg' + id + SubTaskId;
    document.getElementById(id).classList.toggle('d-n');
  }

  checkSubtaskReviewedCompleted(subtask: any) {
    if (subtask.IsTaskCompleted == true) {
      this.isSubtaskCompleted = true;
    } else {
      this.isSubtaskCompleted = false;
    }

    if (subtask.IsTaskReviewDone == true) {
      this.isSubtaskReviewed = true;
    } else {
      this.isSubtaskReviewed = false;
    }
  }

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
  //       OrgId: sessionStorage.getItem('OrganisationID'),
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
  //         this.toaster.error('error occured');
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
        OrgId: sessionStorage.getItem('OrganisationID'),
        FilingId: sessionStorage.getItem('FillingId'),
        Title: this.TopicForm.value.topic,
        Description: this.TopicForm.value.description,
        AdminIds: this.adminmemberids.toString(),
        LawOfficeClientIds: this.memberids.toString(),
      };
      var tokenid = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
      this.filingService.CreateTopicForFiling(data, tokenid).subscribe(
        (res: any[]) => {
          this.spinner.hide();
          this.topicModel.close();
          this.toaster.success('Topic Created successfully.');
          this.topic = '';
          this.description = '';
          this.selectedTeamMembers = [];
          this.selectedadminTeamMembers = [];
          this.navigateToMessagesPopup();
          // if(res) {
          //   this.topicModal = this.modalService.open(this.modalContent).result.then((result) => {

          //   });
          // }
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
    //console.log('clientmebers=', res);

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

  onadminmemberSelect(eve) {}
  onadminMemberSelectAll(eve) {}

  onTeamMemberSelect(eve) {}
  onTeamMemberSelectAll(eve) {
    this.memberids = [];
  }
  visitingInput() {
    this.isempty = false;
  }
  navigateToMessagesPopup() {
    this.deleteSubTaskModel = this.modalService.open(this.afterTopicCreatetemplate, {
      centered: true,
      keyboard: false,
      backdrop: 'static',
    });
  }
  navigateToMessages() {
    this.router.navigate(['admin/fillings/messages']);
    this.modalService.dismissAll();
  }

  Close() {
    this.topicModel.close();
    this.topic = '';
    this.description = '';
    this.selectedTeamMembers = [];
    this.selectedadminTeamMembers = [];
    this.adminmemberids = [];
    this.memberids = [];
  }

  ngOnDestroy() {
    this.emitGetUIControlTemplateResults.unsubscribe();
    this.commonService.clearCommonEmitters();
  }
}
