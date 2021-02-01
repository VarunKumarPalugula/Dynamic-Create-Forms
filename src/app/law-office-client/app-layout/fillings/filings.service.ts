import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApicallsService } from '@app/shared/service/apicalls.service';

@Injectable({ providedIn: 'root' })
export class ClientFilingsService {
  filingName = sessionStorage.getItem('FName');
  constructor(private httpClient: HttpClient, private globalApi: ApicallsService) {}

  createFiling(clientOrgId: any, client: any) {
    return this.httpClient.post(this.globalApi.ClientCreateFiling + '?ClientOrgId=' + clientOrgId, client);
  }

  getFilings(token: any) {
    return this.httpClient.get(this.globalApi.GetClinetFilings, { headers: token });
  }

  getfilingApplicantData(orgId: any, fillingId: any) {
    return this.httpClient.get(this.globalApi.filingApplicantData + '?AdminOrgId=' + orgId + '&FilingId=' + fillingId);
  }

  ShipMentTrackingNumber(OrgId: any, formdata: any, accesstoken: any) {
    return this.httpClient.post(this.globalApi.clientAddShipmentNumber + '?OrgId=' + OrgId, formdata, {
      headers: accesstoken,
    });
  }

  postApproveApplicant(orgId: any, fillingId: any, clientId: any, emptypbj: any) {
    return this.httpClient.post(
      this.globalApi.approveApplicantForFiling +
        '?AdminOrgId=' +
        orgId +
        '&FilingId=' +
        fillingId +
        '&LawOfficeClientId=' +
        clientId,
      emptypbj
    );
  }
  //api/client/AssignApplicantForFiling?AdminOrgId=1&FilingId=1&LawOfficeClientId=2
  AssignApplicantForFiling(orgId: any, fillingId: any, clientId: any, emptypbj) {
    return this.httpClient.post(
      this.globalApi.AssignApplicantForFiling +
        '?AdminOrgId=' +
        orgId +
        '&FilingId=' +
        fillingId +
        '&LawOfficeClientId=' +
        clientId,
      emptypbj
    );
  }

  getApplicantList() {
    return this.httpClient.get(this.globalApi.applicantsList);
  }

  getAdminTeam(obj: any) {
    return this.httpClient.post(this.globalApi.adminTeam, obj);
  }

  getClientTeam(obj: any) {
    return this.httpClient.post(this.globalApi.clientTeam, obj);
  }

  getAllClientTeamList(orgId: any) {}

  getConnectionsTeam(obj: any) {
    return this.httpClient.post(this.globalApi.clientTeam, obj);
  }

  //#region for overview section
  GetApplicantDetails(clientObj: any) {
    return this.httpClient.post(this.globalApi.clientApplicantData, clientObj);
  }

  GetOrganizationDetails(data: any) {
    return this.httpClient.post(this.globalApi.clientSponserData, data);
  }

  GetFilingDetails(orgId: any, filingId: any) {
    return this.httpClient.get(this.globalApi.clientFilingData + '?OrgId=' + orgId + '&FilingId=' + filingId);
  }

  GetActivityinfo(clientObj: any) {
    return this.httpClient.post(this.globalApi.clientActivitis, clientObj);
  }

  GetNote(orgId: any, filingId: any) {
    return this.httpClient.get(this.globalApi.clientNotesList + '?OrgId=' + orgId + '&FilingId=' + filingId);
  }

  Addnote(clientObj: any) {
    return this.httpClient.post(this.globalApi.clientAddNote, clientObj);
  }

  StoreFilingDetails(formdata: any) {
    return this.httpClient.post(this.globalApi.StoreFilingDetails, formdata);
  }

  getShipmentTrackingList(orgId: any, FilingId: any, client: any) {
    return this.httpClient.post(
      this.globalApi.clientShipementData + '?OrgId=' + orgId + '&FilingId=' + FilingId,
      client
    );
  }
  deleteshipmenttrackingnumber(OrgId, FilingId, TrackingNumber, accesstoken) {
    return this.httpClient.get(
      this.globalApi.clientDeleteshipmenttrackingnumber +
        '?OrgId=' +
        OrgId +
        '&FilingId=' +
        FilingId +
        '&TrackingNumber=' +
        TrackingNumber,
      { headers: accesstoken }
    );
  }

  getTasksSummary(orgId: any, FilingId: any) {
    return this.httpClient.get(this.globalApi.clientSummartTasks + '?OrgId=' + orgId + '&FilingId=' + FilingId);
  }

  getUpcomingTasks(orgId: any, filinId: any) {
    return this.httpClient.get(this.globalApi.clientUpcomingTasks + '?OrgId=' + orgId + '&FilingId=' + filinId);
  }
  //#endregion

  //#region for files and folders
  fileUpload(orgId: string, filingId: string, formdata: any, accesstoken: any) {
    return this.httpClient.post(
      this.globalApi.clientFileUpload + '?AdminOrgId=' + orgId + '&FillingId=' + filingId,
      formdata
    );
  }

  getFiles(orgId: string, filingId: string, accesstoken: any) {
    return this.httpClient.get(this.globalApi.clientlistOfFiles + '?AdminOrgId=' + orgId + '&FillingId=' + filingId);
  }

  deleteFiles(orgId: string, filingId: string, fileId: any, accesstoken: any) {
    return this.httpClient.get(
      this.globalApi.Clientdeletefile + '?AdminOrgId=' + orgId + '&FillingId=' + filingId + '&FileId=' + fileId
    );
  }

  deleteFolder(orgId: any, filingId: any, folderId: any, token: any) {
    return this.httpClient.get(
      this.globalApi.Clientfolderdelete + '?AdminOrgId=' + orgId + '&FilingId=' + filingId + '&FolderId=' + folderId,
      {
        headers: token,
      }
    );
  }

  viewFile(orgId: string, filingId: string, fileId: any, accesstoken: any) {
    return this.httpClient.get(
      this.globalApi.clientViewFile + '?AdminOrgId=' + orgId + '&FillingId=' + filingId + '&FileId=' + fileId
    );
  }

  createFolder(orgId: any, filingId: any, folderName: any, token: any) {
    return this.httpClient.get(
      this.globalApi.clientFolderCreation +
        '?AdminOrgId=' +
        orgId +
        '&FilingId=' +
        filingId +
        '&FolderName=' +
        folderName
    );
  }

  getListOfFolders(orgId: any, filingId: any, token: any) {
    return this.httpClient.get(this.globalApi.clientFoldersList + '?AdminOrgId=' + orgId + '&FilingId=' + filingId, {
      headers: token,
    });
  }

  postFolderfileupload(orgId: any, filingId: any, folderId: any, formdata: any, accesstoken: any) {
    return this.httpClient.post(
      this.globalApi.clientFolderFileUpload +
        '?AdminOrgId=' +
        orgId +
        '&fillingId=' +
        filingId +
        '&folderId=' +
        folderId,
      formdata
    );
  }

  folderFiles(orgId: any, filingId: any, folderId: any) {
    return this.httpClient.get(
      this.globalApi.clientFolderFilesList + '?AdminOrgId=' + orgId + '&FilingId=' + filingId + '&FolderId=' + folderId
    );
  }

  fileViewPermissions(data: any, accesstoken: any) {
    return this.httpClient.post(this.globalApi.UploadedFileViewPermission, data, { headers: accesstoken });
  }

  clientFileViewPermissions(data: any, accesstoken: any){
    return this.httpClient.post(this.globalApi.clientUploadedFileViewPermission, data, { headers: accesstoken });
  }
  //#endregion

  //#region for messages
  getClientTopics(orgId: any, filingId: any) {
    return this.httpClient.get(this.globalApi.clientTopics + '?AdminOrgId=' + orgId + '&FilingId=' + filingId);
  }

  GetFilingAdminTeammembers(formdata: any) {
    return this.httpClient.post(this.globalApi.GetFilingAdminTeammembers, formdata);
  }

  GetFilingClientTeammembers(formdata: any) {
    return this.httpClient.post(this.globalApi.GetFilingClientTeammembers, formdata);
  }

  CreateTopicForFiling(formdata: any) {
    return this.httpClient.post(this.globalApi.ClientCreateTopicForFiling, formdata);
  }

  //#endregion

  //#region for tasks
  GetListOfTaskGroups(OrgId: any, FilingId: any) {
    return this.httpClient.get(
      this.globalApi.clientGetListOfTaskGroups + '?AdminOrgId=' + OrgId + '&FilingId=' + FilingId
    );
  }

  AddTaskGroup(taskGroupObj: any, accesstoken: any) {
    return this.httpClient.post(this.globalApi.clientAddTaskGroup, taskGroupObj, { headers: accesstoken });
  }

  GetDetailOfTaskGroup(OrgId: any, FilingId: any, TaskGroupId: any) {
    return this.httpClient.get(
      this.globalApi.clientGetDetailOfTaskGroup +
        '?AdminOrgId=' +
        OrgId +
        '&FilingId=' +
        FilingId +
        '&TaskGroupId=' +
        TaskGroupId
    );
  }

  DeleteTaskGroup(taskObj: any, accesstoken: any) {
    return this.httpClient.post(this.globalApi.clientDeleteTaskGroup, taskObj, { headers: accesstoken });
  }

  GetListofTaskInTaskGroup(OrgId: any, FilingId: any, TaskGroupId: any) {
    return this.httpClient.get(
      this.globalApi.clientGetListofTaskInTaskGroup +
        '?AdminOrgId=' +
        OrgId +
        '&FilingId=' +
        FilingId +
        '&TaskGroupId=' +
        TaskGroupId
    );
  }

  TaskInTaskGroup(taskObj: any, accesstoken: any) {
    return this.httpClient.post(this.globalApi.clientEditTask, taskObj, { headers: accesstoken });
  }

  // delete task
  deletetask(OrgId: any, FilingId: any, TaskGroupId: any, TaskId: any) {
    return this.httpClient.post(
      this.globalApi.clientdeletetask +
        '?OrgId=' +
        OrgId +
        '&FilingId=' +
        FilingId +
        '&TaskGroupId=' +
        TaskGroupId +
        '&TaskId=' +
        TaskId,
      ''
    );
  }
  // mark subtask reviewed
  MarkTaskAsReviewed(OrgId, FilingId, TaskGroupId, TaskId, accesstoken,taskMarkAsReviewed) {
    return this.httpClient.post(
      this.globalApi.clientMarkTaskAsReviewed +
        '?OrgId=' +
        OrgId +
        '&FilingId=' +
        FilingId +
        '&TaskGroupId=' +
        TaskGroupId +
        '&TaskId=' +
        TaskId + '&IsTaskReviewed=' + taskMarkAsReviewed,
      '',
      { headers: accesstoken }
    );
  }
  // mark sub task as completed
  MarkTaskAsCompleted(OrgId: any, FilingId: any, TaskGroupId: any, TaskId: any, IsTaskCompleted) {
    return this.httpClient.post(
      this.globalApi.clientMarkTaskAsCompleted +
        '?AdminOrgId=' +
        OrgId +
        '&FilingId=' +
        FilingId +
        '&TaskGroupId=' +
        TaskGroupId +
        '&TaskId=' +
        TaskId + '&IsTaskCompleted=' + IsTaskCompleted,
      ''
    );
  }

  // get subtasks
  GetSubTasksInTask(OrgId: any, FilingId: any, TaskGroupId: any, TaskId: any,AdminID) {
    return this.httpClient.get(
      this.globalApi.clientGetSubTasksInTask +
        '?AdminOrgId=' +
        OrgId +
        '&FilingId=' +
        FilingId +
        '&TaskGroupId=' +
        TaskGroupId +
        '&TaskId=' + 
        TaskId +'&AdminID=' + AdminID,
    );
  }
  // Add Sub task for tasak
  SubTaskInTask(subtaskObj: any) {
    return this.httpClient.post(this.globalApi.clientEditSubTask, subtaskObj);
  }

  editSubtask(subtaskObj: any) {
    return this.httpClient.post(this.globalApi.clientEditSubTask, subtaskObj);
  }

  // delete task
  deleteSubTask(OrgId, FilingId, TaskGroupId, TaskId, SubTaskId, accesstoken) {
    return this.httpClient.post(
      this.globalApi.clientdeletesubtask +
        '?OrgId=' +
        OrgId +
        '&FilingId=' +
        FilingId +
        '&TaskGroupId=' +
        TaskGroupId +
        '&TaskId=' +
        TaskId +
        '&SubTaskId=' +
        SubTaskId,
      '',
      { headers: accesstoken }
    );
  }

  // mark subtask reviewed
  MarkSubTaskAsReviewed(OrgId, FilingId, TaskGroupId, TaskId, SubTaskId, accesstoken, subtaskReviewed) {
    return this.httpClient.post(
      this.globalApi.MarkClientSubTaskAsReviewed +
        '?AdminOrgId=' +
        OrgId +
        '&FilingId=' +
        FilingId +
        '&TaskGroupId=' +
        TaskGroupId +
        '&TaskId=' +
        TaskId +
        '&SubTaskId=' +
        SubTaskId + '&isSubtaskReviewed=' + subtaskReviewed,
      '',
      { headers: accesstoken }
    );
  }

  // mark sub task as completed
  MarkSubTaskAsCompleted(OrgId: any, FilingId: any, TaskGroupId: any, TaskId: any, SubTaskId: any, subTaskCompleted) {
    return this.httpClient.post(
      this.globalApi.MarkClientSubTaskAsCompleted +
        '?AdminOrgId=' +
        OrgId +
        '&FilingId=' +
        FilingId +
        '&TaskGroupId=' +
        TaskGroupId +
        '&TaskId=' +
        TaskId +
        '&SubTaskId=' +
        SubTaskId + '&IsSubTaskCompleted=' + subTaskCompleted,
      ''
    );
  }

  GetConnectedFilings(accesstoken) {
    return this.httpClient.get(this.globalApi.GetConnectedFilings, { headers: accesstoken });
  }

  GetFilesInSupportingFilesSectionClient(AdminOrgId, FilingId, FolderId, accesstoken) {
    return this.httpClient.get(
      this.globalApi.GetFilesInSupportingFilesSectionClient +
        '?AdminOrgId=' +
        AdminOrgId +
        '&FilingId=' +
        FilingId +
        '&FolderId=' +
        FolderId,
      { headers: accesstoken }
    );
  }

  GetCaseForms(OrgId: any, fillingId: any, caseId:any, accesstoken: any, FilingName: any) {
    return this.httpClient.get(
      this.globalApi.FetchingFormsFiling + '?OrgId=' + OrgId + '&fillingId=' + fillingId + '&caseId=' + caseId + '&FilingName=' + FilingName,
      {
        headers: accesstoken,
      }
    );
    // return this.httpClient.get(
    //   this.globalApi.GetConnectedFilings ,{
    //     headers: accesstoken
    //   }
    // );
  }

  G28viewforfiling(OrgId: any, FilingId: any) {
    return this.httpClient.get(this.globalApi.G28viewforfiling + '?OrgId=' + OrgId + '&FilingId=' + FilingId);
  }

  I129viewforfiling(OrgId: any, FilingId: any) {
    return this.httpClient.get(this.globalApi.I129viewforfiling + '?OrgId=' + OrgId + '&FilingId=' + FilingId);
  }

  Topicarchive(OrgId: any, FilingId: any, accesstoken: any, TopicId: any) {
    return this.httpClient.get(
      this.globalApi.Clienttopicarchive + '?AdminOrgId=' + OrgId + '&FilingId=' + FilingId + '&TopicId=' + TopicId,
      {
        headers: accesstoken,
      }
    );
  }
  Groupmessagearchive(OrgId: any, FilingId: any, accesstoken: any, TopicId: any, GroupMessagingId: any) {
    return this.httpClient.get(
      this.globalApi.Clientroupmessagearchive +
        '?AdminOrgId=' +
        OrgId +
        '&FilingId=' +
        FilingId +
        '&TopicId=' +
        TopicId +
        '&GroupMessagingId=' +
        GroupMessagingId,
      {
        headers: accesstoken,
      }
    );
  }

  Groupsubmessagearchive(
    OrgId: any,
    FilingId: any,
    accesstoken: any,
    TopicId: any,
    GroupMessagingId: any,
    GroupSubMessagingId: any
  ) {
    return this.httpClient.get(
      this.globalApi.Groupsubmessagearchive +
        '?AdminOrgId=' +
        OrgId +
        '&FilingId=' +
        FilingId +
        '&TopicId=' +
        TopicId +
        '&GroupMessagingId=' +
        GroupMessagingId +
        '&GroupSubMessagingId=' +
        GroupSubMessagingId,
      {
        headers: accesstoken,
      }
    );
  }
  getCaseSubs(orgId:any, FilingId:any, filingType: any, token:any) {
    return this.httpClient.get(
      this.globalApi.getCaseSubmissions +
        '?OrgId=' +
        orgId +
        '&FilingId=' +
        FilingId +
        '&filingType=' +
        filingType,
      {
        headers: token,
      }
    );
  }
  //#endregion
}
