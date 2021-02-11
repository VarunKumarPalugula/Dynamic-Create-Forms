import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApicallsService } from '@app/shared/service/apicalls.service';
import { ClientSignup } from '@app/models/law-office-client/ClientSignup';
import { ClientSignin } from '@app/models/law-office-client/ClientSignin';
import { HelperService } from '@app/shared/helpers/helper.service';

@Injectable({ providedIn: 'root' })
export class ClientService {
  constructor(private httpClient: HttpClient, private global: ApicallsService, private helper: HelperService) {}

  // Client Registration
  Register(data: ClientSignup, env: any) {
    return this.httpClient.post(this.global.clientregistration + '?environment=' + env, data);
  }

  Login(data: ClientSignin) {
    data.Scope = 'CLIENT';
    const obj = { Scope: data.Scope, username: data.Email, password: data.Password, grant_type: 'password' };
    return this.httpClient.post(this.global.AdminApiGeneration, this.helper.DataEncoding(obj), {
      headers: this.global.headers,
    });
  }

  GetClientClaimsData(token: any) {
    if (sessionStorage.getItem('C_AccessToken') != null) {
      return this.httpClient.get(this.global.clientClaimData, { headers: token });
    }
  }

  // setActualPassword
  setActualPassword(obj: any, acesstoken: any) {
    return this.httpClient.post(this.global.SetClientActualPassword, obj, { headers: acesstoken });
  }

  AddBlockUnblockTeamMemberToFilingClientTeam(fillingObj, accesstoken, ABbit) {
    return this.httpClient.post(
      this.global.AddBlockUnblockTeamMemberToFilingClientTeam + '?ABbit=' + ABbit,
      fillingObj,
      { headers: accesstoken }
    );
  }
  //Client inactive
  MakeTeamMemberInActive(OrgId, TeamMemberid, accesstoken: any) {
    return this.httpClient.get(
      this.global.MakeClientTeamMemberInActive + '?OrgId=' + OrgId + '&TeaMemberId=' + TeamMemberid,
      { headers: accesstoken }
    );
  }

  // make teammemberActive
  MakeTeamMemberActive(OrgId, TeamMemberid, accesstoken: any) {
    return this.httpClient.get(
      this.global.MakeClientTeamMemberActive + '?OrgId=' + OrgId + '&TeaMemberId=' + TeamMemberid,
      { headers: accesstoken }
    );
  }

  //load permissions
  //GetRoleAndPermissionsOfAdmin
  GetRoleAndPermissionsOfClient(acesstoken: any, OrgID) {
    return this.httpClient.get(this.global.GetRoleAndPermissionsOfClient + '?ClientOrgId=' + OrgID, {
      headers: acesstoken,
    });
  }

  IndividalBusineesApplicantAndSponsererDefaultPermissions(acesstoken: any, RoleId) {
    return this.httpClient.get(
      this.global.IndividalBusineesApplicantAndSponsererDefaultPermissions + '?RoleId=' + RoleId,
      {
        headers: acesstoken,
      }
    );
  }

  CheckClientOrganationExistency(organisationName: any) {
    return this.httpClient.get(this.global.clientOrgExistancy + '?OrgName=' + organisationName);
  }

  CheckClientOrgAdminEmailExistancy(email: any) {
    return this.httpClient.get(this.global.clientEmailExistancy + '?email=' + email);
  }

  CheckEmailExistency(email: any) {
    return this.httpClient.get(this.global.clientEmailExistancy + '?email=' + email);
  }

  forgotPassword(data: any) {
    return this.httpClient.post(this.global.SendClientTempPassword, data);
  }

  TeamInvitation(obj: any, env: any) {
    return this.httpClient.post(this.global.clientOrgTeamInvite + '?environment=' + env, obj);
  }

  clientOrgInvitedTeamList(id: any) {
    return this.httpClient.get(this.global.clientOrgInvitedTeamList + '?OrgId=' + id);
  }

  teamlist(id: any) {
    return this.httpClient.get(this.global.clientTeamList + '?OrgId=' + id);
  }

  getCSVClientData(obj: any, token: any) {
    return this.httpClient.post(this.global.getCSVData, obj, { headers: token });
  }

  fileupload(formdata: any, token: any) {
    return this.httpClient.post(this.global.importCSV, formdata, { headers: token });
  }

  getAdminOrganisationAccessPaneldata(token: any) {
    return this.httpClient.get(this.global.clientAdminAccesspanelData, { headers: token });
  }

  getRoles(token: any) {
    return this.httpClient.get(this.global.ClientRoles, { headers: token });
  }

  resendClientAdminTeamInvitation(client: any, token: any, env: any) {
    return this.httpClient.post(this.global.clientAdminTeamResendDelete + '?environment=' + env, client, {
      headers: token,
    });
  }

  clientTeamMemberSignup(clientTeamMember: any, env: any) {
    return this.httpClient.post(this.global.clientTeamMemberSingup + '?environment=' + env, clientTeamMember);
  }

  GetTeambersOnTeamMemberStatus(OrgId, TeamMemStatus, accesstoken) {
    return this.httpClient.get(
      this.global.ClientGetTeambersOnTeamMemberStatus + '?ClientOrgId=' + OrgId + '&TeamMemStatus=' + TeamMemStatus,
      { headers: accesstoken }
    );
  }

  // ****************** Team Member Permissions********/

  GetClientRoles() {
    return this.httpClient.get(this.global.clientRoles);
  }

  // GetPrimaryTeamMemberPermissions
  GetTeamManagementPermissions(OrgId, AdminId, accesstoken) {
    return this.httpClient.get(
      this.global.ClientGetTeamManagementPermissions + '?ClientOrgId=' + OrgId + '&LawOfficeClientId=' + AdminId,
      { headers: accesstoken }
    );
  }
  //SetPrimaryTeamMemberPermissions
  SetTeamManagementPermissions(OrgId, AdminId, teamMembersPermissions, accesstoken) {
    return this.httpClient.post(
      this.global.ClientSetTeamManagementPermissions + '?ClientOrgId=' + OrgId + '&LawOfficeClientId=' + AdminId,
      teamMembersPermissions,
      { headers: accesstoken }
    );
  }
  // ****************** end Team Member Permissions********/
  // ******************Filing Permissions ********/
  // GetPrimaryTeamMemberFilingPermissions
  getFilingPermissions(OrgId, AdminId, accesstoken) {
    return this.httpClient.get(
      this.global.ClientgetFilingPermissions + '?ClientOrgId=' + OrgId + '&LawOfficeClientId=' + AdminId,
      { headers: accesstoken }
    );
  }

  //SetPrimaryTeamMemberPermissions
  SetFilingPermissions(OrgId, AdminId, teamMemberFilingPermissions, accesstoken) {
    return this.httpClient.post(
      this.global.ClientSetFilingPermissions + '?ClientOrgId=' + OrgId + '&LawOfficeClientId=' + AdminId,
      teamMemberFilingPermissions,
      { headers: accesstoken }
    );
  }

  // ****************** end Filing Permissions********/ ****************** Template
  // Permissions ********/ GetPrimaryTeamMemberTemplatePermissions
  GetTemplatePermissions(OrgId, AdminId, accesstoken) {
    return this.httpClient.get(
      this.global.ClientGetTemplatePermissions + '?ClientOrgId=' + OrgId + '&LawOfficeClientId=' + AdminId,
      { headers: accesstoken }
    );
  }
  //SetPrimaryTeamMemberPermissions
  SetTemplatePermissions(OrgId, AdminId, teamMemberTemplatePermissions, accesstoken) {
    return this.httpClient.post(
      this.global.ClientSetTemplatePermissions + '?ClientOrgId=' + OrgId + '&LawOfficeClientId=' + AdminId,
      teamMemberTemplatePermissions,
      { headers: accesstoken }
    );
  }

  // ******************end Template Permissions ********/
  // ******************Document Library Permissions ********/
  // GetPrimaryTeamMemberDocumentLibraryPermissio
  GetDocumentLibraryPermissions(OrgId, AdminId, accesstoken) {
    return this.httpClient.get(
      this.global.ClientGetDocumentLibraryPermissions + '?ClientOrgId=' + OrgId + '&LawOfficeClientId=' + AdminId,
      { headers: accesstoken }
    );
  }

  //SetPrimaryTeamMemberPermissions
  SetDocumentLibraryPermissions(OrgId, AdminId, teamMemberDocumentLibraryPermissions, accesstoken) {
    return this.httpClient.post(
      this.global.ClientSetDocumentLibraryPermissions + '?ClientOrgId=' + OrgId + '&LawOfficeClientId=' + AdminId,
      teamMemberDocumentLibraryPermissions,
      { headers: accesstoken }
    );
  }
  // ******************end Document Library Permissions ********/

  //Mailing Addreess
  mailingAddress(OrgId, contactinformationObj, accesstoken) {
    return this.httpClient.post(this.global.clientMailingAddress + '?ClientOrgId=' + OrgId, contactinformationObj, {
      headers: accesstoken,
    });
  }

  getMailingAddress(OrgId, accesstoken) {
    return this.httpClient.get(this.global.getClientMailingAddress + '?ClientOrgId=' + OrgId, { headers: accesstoken });
  }

  // Address Of Principal Place Of Business
  addressOfPrincipalPlaceOfBusiness(OrgId, addContactFormObj, accesstoken) {
    return this.httpClient.post(this.global.addressOfprincipalPlace + '?ClientOrgId=' + OrgId, addContactFormObj, {
      headers: accesstoken,
    });
  }

  getaddressOfPrincipalPlaceOfBusiness(OrgId, accesstoken) {
    return this.httpClient.get(this.global.getAddressOfprincipalPlace + '?ClientOrgId=' + OrgId, {
      headers: accesstoken,
    });
  }

  //Account

  getaccountdata(accesstoken) {
    return this.httpClient.get(this.global.getclientaccountdata, { headers: accesstoken });
  }

  changeaccountpassword(changeaccountpasswordObj, accesstoken) {
    return this.httpClient.post(this.global.changeclientaccountpassword, changeaccountpasswordObj, {
      headers: accesstoken,
    });
  }
  changeaccountdata(changeaccountdataObj, accesstoken) {
    return this.httpClient.post(this.global.changeclientaccountdata, changeaccountdataObj, { headers: accesstoken });
  }

  // Client->settings->organization
  OrganisationInfo(OIId: any, orgDetails: any, accesstoken: any) {
    return this.httpClient.post(this.global.OrganisationInfo + '?ClientOrgId=' + OIId, orgDetails, {
      headers: accesstoken,
    });
  }
  getOrganisationInfo(orgId: any, token: any) {
    return this.httpClient.get(this.global.getOrganisationInfo + '?ClientOrgId=' + orgId, {
      headers: token,
    });
  }
  // Client->settings->Financials
  Financials(OIId: any, pinfo: any, accesstoken: any) {
    return this.httpClient.post(this.global.financialsInfo + '?ClientOrgId=' + OIId, pinfo, { headers: accesstoken });
  }
  getFinancialInfo(orgId: any, token: any) {
    return this.httpClient.get(this.global.getFinancialInfo + '?ClientOrgId=' + orgId, {
      headers: token,
    });
  }
  // Client->settings->Poc
  pocInformation(OrgID: any, posDetails: any, accesstoken: any) {
    return this.httpClient.post(this.global.pocInformation + '?ClientOrgId=' + OrgID, posDetails, {
      headers: accesstoken,
    });
  }
  getPoc(oId: any, token: any) {
    return this.httpClient.get(this.global.getPocinformation + '?ClientOrgId=' + oId, {
      headers: token,
    });
  }
  // Client->settings->authrized
  authSigntotaryInfo(OrganisationID: any, authSignatoryDetails: any, accesstoken: any) {
    return this.httpClient.post(
      this.global.authSignatoryInfo + '?ClientOrgId=' + OrganisationID,
      authSignatoryDetails,
      {
        headers: accesstoken,
      }
    );
  }
  getauthSigntotaryInfo(orgId: any, token: any) {
    return this.httpClient.get(this.global.getauthSigntotaryInfo + '?ClientOrgId=' + orgId, {
      headers: token,
    });
  }

  //applicant perosnal details
  getApplicantPersonalDetails(token: any, LawOfficeClientID) {
    return this.httpClient.get(this.global.getApplicantPersonalDetails + '?LawOfficeClientId=' + LawOfficeClientID, {
      headers: token,
    });
  }

  //applicant perosnal details
  ApplicantPersonalDetails(personalInfo, accesstoken: any) {
    return this.httpClient.post(this.global.ApplicantPersonalDetails, personalInfo, {
      headers: accesstoken,
    });
  }
  saveImmigrationDetails(immiggrationDetails: any, accesstoken: any) {
    return this.httpClient.post(this.global.immigrationDetails, immiggrationDetails, {
      headers: accesstoken,
    });
  }
  getImmigrationDetails(token: any, LawOfficeClientID) {
    return this.httpClient.get(this.global.getImmigrationDetails + '?LawOfficeClientId=' + LawOfficeClientID, {
      headers: token,
    });
  }
  saveImmigrationTravelDetails(imgTravelDetails: any, accesstoken: any) {
    return this.httpClient.post(this.global.immigrationTravelDetails, imgTravelDetails, {
      headers: accesstoken,
    });
  }
  getImmigrationTravelDetails(token: any, LawOfficeClientID) {
    return this.httpClient.get(this.global.getImmigrationTravelDetails + '?LawOfficeClientId=' + LawOfficeClientID, {
      headers: token,
    });
  }

  //applicant address and contact
  saveApplicantAddressAndContact(contactDetails, accesstoken: any) {
    return this.httpClient.post(this.global.applicantAddressAndContact, contactDetails, {
      headers: accesstoken,
    });
  }

  getApplicantAddressAndContact(token: any, LawOfficeClientID) {
    return this.httpClient.get(this.global.getApplicantAddressAndContact + '?LawOfficeClientId=' + LawOfficeClientID, {
      headers: token,
    });
  }

  //applicant perosnal details
  getApplicantEducationalnfo(token: any, LawOfficeClientID) {
    return this.httpClient.get(this.global.getApplicantEducationalnfo + '?LawOfficeClientId=' + LawOfficeClientID, {
      headers: token,
    });
  }

  //applicant perosnal details
  applicantEducationDetails(educationalInfo, accesstoken: any) {
    return this.httpClient.post(this.global.applicantEducationDetails, educationalInfo, {
      headers: accesstoken,
    });
  }

  uploadFile(formdata: any, accesstoken: any) {
    return this.httpClient.post(this.global.uploadEmployementFiles, formdata, {
      headers: accesstoken,
    });
  }
  getFile(resume: any, token: any, LawOfficeClientID) {
    return this.httpClient.get(
      this.global.getEmployementFiles + '?Type=' + resume + '&LawOfficeClientId=' + LawOfficeClientID,
      {
        headers: token,
      }
    );
  }
  deleteFile(id: number, token: any) {
    return this.httpClient.delete(this.global.deleteEmployementFiles + '?EFileId=' + id, {
      headers: token,
    });
  }

  viewFile(id: number, token: any) {
    return this.httpClient.get(this.global.viewEmployementFile + '?EFileId=' + id, {
      headers: token,
    });
  }

  postPeriodOfStay(posInfo: any, accesstoken: any) {
    return this.httpClient.post(this.global.postPosInfo, posInfo, { headers: accesstoken });
  }

  getPeriodOfStay(token: any, LawOfficeClientID) {
    return this.httpClient.get(this.global.getPosInfo + '?LawOfficeClientId=' + LawOfficeClientID, { headers: token });
  }
  deleteApplicantEduInfo(id: number, accesstoken: any) {
    return this.httpClient.delete(this.global.deleteApplicantEducationInfo + '?EducationDtlId=' + id, {
      headers: accesstoken,
    });
  }
  deleteApplicantPosInfo(id: number, accesstoken: any) {
    return this.httpClient.delete(this.global.deleteApplicantPeriodofStayInfo + '?PSId=' + id, {
      headers: accesstoken,
    });
  }
}
