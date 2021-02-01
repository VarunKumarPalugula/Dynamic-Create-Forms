import { Injectable } from '@angular/core';
import { AdminSignin } from '@app/models/law-office-admin/AdminSignin';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApicallsService } from '@app/shared/service/apicalls.service';
import { AdminSignup } from '@app/models/law-office-admin/AdminSignup';
import { HelperService } from '@app/shared/helpers/helper.service';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private httpClient: HttpClient, private global: ApicallsService, private helper: HelperService) {}

  // login
  Login(data: AdminSignin) {
    data.Scope = 'ADMIN';
    const obj = {
      Scope: data.Scope,
      username: data.Email,
      password: data.Password,
      grant_type: 'password',
    };
    return this.httpClient.post(this.global.AdminApiGeneration, this.helper.DataEncoding(obj), {
      headers: this.global.headers,
    });
  }

  // getClaims
  GetAdminClaimsData(token: any) {
    if (sessionStorage.getItem('A_AccessToken') != null) {
      return this.httpClient.get(this.global.GetAdminClaimsData, { headers: token });
    }
  }
  // checkAdminOrganisation
  checkAdminOrganisation(organisationName: string) {
    return this.httpClient.get(this.global.CheckAdminOrganisation + '?OrgName=' + organisationName);
  }
  // checkAdminOrganisationEmailExistency
  checkAdminOrganisationEmailExistency(organisationEmail: string) {
    return this.httpClient.get(this.global.CheckAdminOrganisationEmailExistency + '?email=' + organisationEmail);
  }
  // checkAdminUsernameExistency
  checkAdminUsernameExistency(username: string) {
    return this.httpClient.get(this.global.CheckAdminUsernameExistency + '?UserName=' + username);
  }

  //admin org check from connections
  CheckEmailExistency(organisationEmail: string) {
    return this.httpClient.get(this.global.adminCheckEmailExistency + '?email=' + organisationEmail);
  }

  AddingConnectionToAdminAndClient(data) {
    return this.httpClient.post(this.global.AddingConnectionToAdminAndClient, data);
  }

  // Register Admin
  Register(data: AdminSignup, env:any) {
    return this.httpClient.post(this.global.AdminRegister + '?environment=' + env, data);
  }
  // non-registered team admin in code
  UnregisteredTeamMember(dataobj: any, env:any) {
    return this.httpClient.post(this.global.unregisteredadminjoin + '?environment=' + env, dataobj);
  }
  // TeamClearance api
  TeamClearance(id: string, nomclaturedid: string, TStatus: string) {
    const dataobj = {
      ClientNomanclaturedId: id,
      ClientNomInId: nomclaturedid,
      TStatus: TStatus,
    };
    return this.httpClient.post(this.global.TeamJoiningClearance, dataobj);
  }
  // forgotPassword
  forgotPassword(data: any) {
    return this.httpClient.post(this.global.SendTempPassword, data);
  }
  // getAdminOrganisationAccessPaneldata

  getAdminOrganisationAccessPaneldata(acesstoken: any) {
    return this.httpClient.get(this.global.GetAdminOrganisationsAssociatedList, { headers: acesstoken });
  }

  //GetRoleAndPermissionsOfAdmin
  GetRoleAndPermissionsOfAdmin(acesstoken: any, OrgID) {
    return this.httpClient.get(this.global.GetRoleAndPermissionsOfAdmin + '?OrgId=' + OrgID, { headers: acesstoken });
  }

  // AddingTheOrgIDToclaims
  AddingTheOrgIDToclaims(OrgID: any, token: any) {
    if (sessionStorage.getItem('A_AccessToken') != null) {
      const tempobj = {
        OrgID: OrgID,
      };
      return this.httpClient.post(this.global.StoringOrgId, tempobj, { headers: token });
    }
  }
  // setActualPassword
  setActualPassword(obj: any, acesstoken: any) {
    return this.httpClient.post(this.global.SetActualPassword, obj, { headers: acesstoken });
  }

  // *******team members apis******// teammemberslist
  OrgTeamMembersList(obj: string, accesstoken: any) {
    return this.httpClient.get(this.global.ApiGetTeamList + '?OrgId=' + obj, { headers: accesstoken });
  }
  TeamInviteesList(obj: string, accesstoken: any) {
    return this.httpClient.get(this.global.TeamInviteesList + '?OrgId=' + obj, { headers: accesstoken });
  }
  // sending team member invitation list
  TeamInvitation(obj: any, acesstoken: any, env:any) {
    return this.httpClient.post(this.global.invitetem + '?environment=' + env, obj, { headers: acesstoken });
  }
  ResendDelete(obj: any, acesstoken: any, env:any) {
    return this.httpClient.post(this.global.ResendInvitation + '?environment=' + env, obj, { headers: acesstoken });
  }
  MakeTeamMemberInActive(OrgId, TeamMemberid, accesstoken: any) {
    return this.httpClient.get(
      this.global.MakeTeamMemberInActive + '?OrgId=' + OrgId + '&TeamMemberid=' + TeamMemberid,
      { headers: accesstoken }
    );
  }
  MakeTeamMemberActive(OrgId, TeamMemberid, accesstoken: any) {
    return this.httpClient.get(this.global.MakeTeamMemberActive + '?OrgId=' + OrgId + '&TeamMemberid=' + TeamMemberid, {
      headers: accesstoken,
    });
  }
  // *************//
  ClientJoiningAsPerUserExistency(data: any) {
    return this.httpClient.post(this.global.ClientJoiningAsPerUserExistency, data);
  }

  ClientSetUpByLawofficeOrgLink(data: any, env:any) {
    return this.httpClient.post(this.global.ClientSetUpByLawofficeOrgLink + '?environment=' + env, data);
  }

  //filings service calls
  GetFiledFilings(obj: string) {
    return this.httpClient.get(this.global.GetFiledFilings + '?OrgId=' + obj);
  }
  GetSponserShipTypes() {
    return this.httpClient.get(this.global.GetSponserShipTypes);
  }
  GetFilings() {
    return this.httpClient.get(this.global.GetFilings);
  }
  AddFilingWithOrganisationalSponserShip(OrgId, data, accesstoken) {
    return this.httpClient.post(this.global.AddFilingWithOrganisationalSponserShip + '?OrgId=' + OrgId, data, {
      headers: accesstoken,
    });
  }
  AddFilingWithGuardianOrOtherIndividualSponsership(OrgId, data, accesstoken) {
    return this.httpClient.post(
      this.global.AddFilingWithGuardianOrOtherIndividualSponsership + '?OrgId=' + OrgId,
      data,
      { headers: accesstoken }
    );
  }
  AddFilingWithApplicantAsSponserShip(OrgId, data, accesstoken) {
    return this.httpClient.post(this.global.AddFilingWithApplicantAsSponserShip + '?OrgId=' + OrgId, data, {
      headers: accesstoken,
    });
  }

  GetFilingAdminTeammembers(fillingObj, accesstoken) {
    return this.httpClient.post(this.global.GetFilingAdminTeammembers, fillingObj, { headers: accesstoken });
  }
  GetFilingClientTeammembers(fillingObj) {
    return this.httpClient.post(this.global.GetFilingClientTeammembers, fillingObj);
  }
  AddBlockUnblockTeamMemberToFilingAdminTeam(fillingObj, accesstoken, ABbit) {
    return this.httpClient.post(
      this.global.AddBlockUnblockTeamMemberToFilingAdminTeam + '?ABbit=' + ABbit,
      fillingObj,
      { headers: accesstoken }
    );
  }

  requestfiling(requestData) {
    return this.httpClient.post(this.global.requestfiling, requestData);
  }

  //Tasks
  GetListOfTaskGroups(OrgId, FilingId, accesstoken) {
    return this.httpClient.get(this.global.GetListOfTaskGroups + '?OrgId=' + OrgId + '&FilingId=' + FilingId, {
      headers: accesstoken,
    });
  }

  AddTaskGroup(taskGroupObj, accesstoken) {
    return this.httpClient.post(this.global.AddTaskGroup, taskGroupObj, { headers: accesstoken });
  }

  GetDetailOfTaskGroup(OrgId, FilingId, TaskGroupId, accesstoken) {
    return this.httpClient.get(
      this.global.GetDetailOfTaskGroup + '?OrgId=' + OrgId + '&FilingId=' + FilingId + '&TaskGroupId=' + TaskGroupId,
      { headers: accesstoken }
    );
  }
  DeleteTaskGroup(taskObj, accesstoken) {
    return this.httpClient.post(this.global.DeleteTaskGroup, taskObj, { headers: accesstoken });
  }

  GetListofTaskInTaskGroup(OrgId, FilingId, TaskGroupId, accesstoken) {
    return this.httpClient.get(
      this.global.GetListofTaskInTaskGroup +
        '?OrgId=' +
        OrgId +
        '&FilingId=' +
        FilingId +
        '&TaskGroupId=' +
        TaskGroupId,
      { headers: accesstoken }
    );
  }
  TaskInTaskGroup(taskObj, accesstoken) {
    return this.httpClient.post(this.global.TaskInTaskGroup, taskObj, { headers: accesstoken });
  }

  //delete task
  deletetask(OrgId, FilingId, TaskGroupId, TaskId, accesstoken) {
    return this.httpClient.post(
      this.global.deletetask +
        '?OrgId=' +
        OrgId +
        '&FilingId=' +
        FilingId +
        '&TaskGroupId=' +
        TaskGroupId +
        '&TaskId=' +
        TaskId,
      '',
      { headers: accesstoken }
    );
  }
  //mark subtask reviewed
  MarkTaskAsReviewed(OrgId, FilingId, TaskGroupId, TaskId, accesstoken,IsTaskReviewed) {
    return this.httpClient.post(
      this.global.MarkTaskAsReviewed +
        '?OrgId=' +
        OrgId +
        '&FilingId=' +
        FilingId +
        '&TaskGroupId=' +
        TaskGroupId +
        '&TaskId=' +
        TaskId + '&IsTaskReviewed=' + IsTaskReviewed,
      '',
      { headers: accesstoken }
    );
  }
  //mark sub task as completed
  MarkTaskAsCompleted(OrgId, FilingId, TaskGroupId, TaskId, accesstoken,IsTaskCompleted) {
    return this.httpClient.post(
      this.global.MarkTaskAsCompleted +
        '?OrgId=' +
        OrgId +
        '&FilingId=' +
        FilingId +
        '&TaskGroupId=' +
        TaskGroupId +
        '&TaskId=' +
        TaskId +
        '&IsTaskCompleted=' + IsTaskCompleted,
      '',
      { headers: accesstoken }
    );
  }

  //get subtasks
  GetSubTasksInTask(OrgId, FilingId, TaskGroupId, TaskId, accesstoken, adminId) {
    return this.httpClient.get(
      this.global.GetSubTasksInTask +'?OrgId=' +OrgId +'&FilingId=' + FilingId +
        '&TaskGroupId=' +
        TaskGroupId +
        '&TaskId=' +
        TaskId + '&adminId=' + adminId,
      { headers: accesstoken }
    );
  }
  //Add Sub task for tasak
  SubTaskInTask(subtaskObj, accesstoken) {
    return this.httpClient.post(this.global.SubTaskInTask, subtaskObj, { headers: accesstoken });
  }

  //delete task
  deleteSubTask(OrgId, FilingId, TaskGroupId, TaskId, SubTaskId, accesstoken) {
    return this.httpClient.post(
      this.global.deletesubtask +
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
  //mark subtask reviewed
  MarkSubTaskAsReviewed(OrgId, FilingId, TaskGroupId, TaskId, SubTaskId, accesstoken,isSubtaskReviewed) {
    return this.httpClient.post(
      this.global.MarkSubTaskAsReviewed +
        '?OrgId=' +
        OrgId +
        '&FilingId=' +
        FilingId +
        '&TaskGroupId=' +
        TaskGroupId +
        '&TaskId=' +
        TaskId +
        '&SubTaskId=' +
        SubTaskId + '&isSubtaskReviewed=' + isSubtaskReviewed + 
      '',
      { headers: accesstoken }
    );
  }
  //mark sub task as completed
  MarkSubTaskAsCompleted(OrgId, FilingId, TaskGroupId, TaskId, SubTaskId, accesstoken,IsSubTaskCompleted) {
    return this.httpClient.post(
      this.global.MarkSubTaskAsCompleted +
        '?OrgId=' +
        OrgId +
        '&FilingId=' +
        FilingId +
        '&TaskGroupId=' +
        TaskGroupId +
        '&TaskId=' +
        TaskId +
        '&SubTaskId=' +
        SubTaskId + '&IsSubTaskCompleted=' + IsSubTaskCompleted +
      '',
      { headers: accesstoken }
    );
  }

  //settings api getTeamRoles
  getTeamRoles() {
    return this.httpClient.get(this.global.getTeamRoles);
  }

  GetTeambersOnTeamMemberStatus(OrgId, TeamMemStatus, accesstoken) {
    return this.httpClient.get(
      this.global.GetTeambersOnTeamMemberStatus + '?OrgId=' + OrgId + '&TeamMemStatus=' + TeamMemStatus,
      { headers: accesstoken }
    );
  }

  // ****************** Team Member Permissions********/
  // GetPrimaryTeamMemberPermissions
  GetPrimaryTeamMemberPermissions(OrgId, AdminId, accesstoken) {
    return this.httpClient.get(
      this.global.GetPrimaryTeamMemberPermissions + '?OrgId=' + OrgId + '&AdminId=' + AdminId,
      { headers: accesstoken }
    );
  }
  //SetPrimaryTeamMemberPermissions
  SetPrimaryTeamMemberPermissions(OrgId, AdminId, teamMembersPermissions, accesstoken) {
    return this.httpClient.post(
      this.global.SetPrimaryTeamMemberPermissions + '?OrgId=' + OrgId + '&AdminId=' + AdminId,
      teamMembersPermissions,
      { headers: accesstoken }
    );
  }
  //SetPrimaryTeamMemberDefaultPermissions
  SetPrimaryTeamMemberDefaultPermissions(OrgId, AdminId, accesstoken) {
    return this.httpClient.get(
      this.global.SetPrimaryTeamMemberDefaultPermissions + '?OrgId=' + OrgId + '&AdminId=' + AdminId,
      { headers: accesstoken }
    );
  }
  // ****************** end Team Member Permissions********/
  // ******************Filing Permissions ********/
  // GetPrimaryTeamMemberFilingPermissions
  GetPrimaryTeamMemberFilingPermissions(OrgId, AdminId, accesstoken) {
    return this.httpClient.get(
      this.global.GetPrimaryTeamMemberFilingPermissions + '?OrgId=' + OrgId + '&AdminId=' + AdminId,
      { headers: accesstoken }
    );
  }

  //SetPrimaryTeamMemberPermissions
  SetPrimaryTeamMemberFilingPermissions(OrgId, AdminId, teamMemberFilingPermissions, accesstoken) {
    return this.httpClient.post(
      this.global.SetPrimaryTeamMemberFilingPermissions + '?OrgId=' + OrgId + '&AdminId=' + AdminId,
      teamMemberFilingPermissions,
      { headers: accesstoken }
    );
  }
  SetPrimaryTeamMemberDefaultFilingPermissions(OrgId, AdminId, accesstoken) {
    return this.httpClient.get(
      this.global.SetPrimaryTeamMemberDefaultFilingPermissions + '?OrgId=' + OrgId + '&AdminId=' + AdminId,
      { headers: accesstoken }
    );
  }

  // ****************** end Filing Permissions********/ ****************** Template
  // Permissions ********/ GetPrimaryTeamMemberTemplatePermissions
  GetPrimaryTeamMemberTemplatePermissions(OrgId, AdminId, accesstoken) {
    return this.httpClient.get(
      this.global.GetPrimaryTeamMemberTemplatePermissions + '?OrgId=' + OrgId + '&AdminId=' + AdminId,
      { headers: accesstoken }
    );
  }
  //SetPrimaryTeamMemberPermissions
  SetPrimaryTeamMemberTemplatePermissions(OrgId, AdminId, teamMemberTemplatePermissions, accesstoken) {
    return this.httpClient.post(
      this.global.SetPrimaryTeamMemberTemplatePermissions + '?OrgId=' + OrgId + '&AdminId=' + AdminId,
      teamMemberTemplatePermissions,
      { headers: accesstoken }
    );
  }

  //SetPrimaryTeamMemberDefaultTemplatePermissions
  SetPrimaryTeamMemberDefaultTemplatePermissions(OrgId, AdminId, accesstoken) {
    return this.httpClient.get(
      this.global.SetPrimaryTeamMemberDefaultTemplatePermissions + '?OrgId=' + OrgId + '&AdminId=' + AdminId,
      { headers: accesstoken }
    );
  }

  // ******************end Template Permissions ********/
  // ******************Document Library Permissions ********/
  // GetPrimaryTeamMemberDocumentLibraryPermissio
  GetPrimaryTeamMemberDocumentLibraryPermissions(OrgId, AdminId, accesstoken) {
    return this.httpClient.get(
      this.global.GetPrimaryTeamMemberDocumentLibraryPermissions + '?OrgId=' + OrgId + '&AdminId=' + AdminId,
      { headers: accesstoken }
    );
  }

  //SetPrimaryTeamMemberPermissions
  SetPrimaryTeamMemberDocumentLibraryPermissions(OrgId, AdminId, teamMemberDocumentLibraryPermissions, accesstoken) {
    return this.httpClient.post(
      this.global.SetPrimaryTeamMemberDocumentLibraryPermissions + '?OrgId=' + OrgId + '&AdminId=' + AdminId,
      teamMemberDocumentLibraryPermissions,
      { headers: accesstoken }
    );
  }

  SetPrimaryTeamMemberDefaultDocumentLibraryPermissions(OrgId, AdminId, accesstoken) {
    return this.httpClient.get(
      this.global.SetPrimaryTeamMemberDefaultDocumentLibraryPermissions + '?OrgId=' + OrgId + '&AdminId=' + AdminId,
      { headers: accesstoken }
    );
  }
  // ******************end Document Library Permissions ********/
  // ******************Team member Filing Permissions ********/
  // GetTeamMemberFilingPermissions
  GetTeamMemberFilingPermissions(OrgId, AdminId, accesstoken) {
    return this.httpClient.get(this.global.GetTeamMemberFilingPermissions + '?OrgId=' + OrgId + '&AdminId=' + AdminId, {
      headers: accesstoken,
    });
  }

  //SetTeamMemberFilingPermissions
  SetTeamMemberFilingPermissions(OrgId, AdminId, teamMemberFilingPermissions, accesstoken) {
    return this.httpClient.post(
      this.global.SetTeamMemberFilingPermissions + '?OrgId=' + OrgId + '&AdminId=' + AdminId,
      teamMemberFilingPermissions,
      { headers: accesstoken }
    );
  }

  SetTeamMemberFilingDefaultPermissions(OrgId, AdminId, accesstoken) {
    return this.httpClient.get(
      this.global.SetTeamMemberFilingDefaultPermissions + '?OrgId=' + OrgId + '&AdminId=' + AdminId,
      {
        headers: accesstoken,
      }
    );
  }
  //****************** end Filing Permissions********/ Organisation Details

  primaryattorney(OrgId, primaryattorneyObj, accesstoken) {
    return this.httpClient.post(this.global.primaryattorney + '?OrgId=' + OrgId, primaryattorneyObj, {
      headers: accesstoken,
    });
  }
  getprimaryattorney(OrgId, accesstoken) {
    return this.httpClient.get(this.global.getprimaryattorney + '?OrgId=' + OrgId, { headers: accesstoken });
  }

  contactinformation(OrgId, contactinformationObj, accesstoken) {
    return this.httpClient.post(this.global.contactinformation + '?OrgId=' + OrgId, contactinformationObj, {
      headers: accesstoken,
    });
  }
  getcontactinformation(OrgId, accesstoken) {
    return this.httpClient.get(this.global.getcontactinformation + '?OrgId=' + OrgId, { headers: accesstoken });
  }

  //Account

  getaccountdata(accesstoken) {
    return this.httpClient.get(this.global.getaccountdata, { headers: accesstoken });
  }

  changeaccountpassword(changeaccountpasswordObj, accesstoken) {
    return this.httpClient.post(this.global.changeaccountpassword, changeaccountpasswordObj, { headers: accesstoken });
  }
  changeaccountdata(changeaccountdataObj, accesstoken) {
    return this.httpClient.post(this.global.changeaccountdata, changeaccountdataObj, { headers: accesstoken });
  }
  getContactdata(accesstoken) {
    return this.httpClient.get(this.global.getcontactdata, { headers: accesstoken });
  }
  saveAccountData(orgcontactInformationobj, accesstoken) {
    return this.httpClient.post(this.global.accountDataSave, orgcontactInformationobj, { headers: accesstoken });
  }
}
