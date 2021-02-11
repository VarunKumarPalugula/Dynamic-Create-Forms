import { Injectable } from '@angular/core';
import { ApicallsService } from '@app/shared/service/apicalls.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FilingsService {
  filingName = sessionStorage.getItem('FName');
  constructor(private httpClient: HttpClient, private globalApi: ApicallsService) {}

  fileUpload(orgId: string, filingId: string, formdata: any, accesstoken: any) {
    return this.httpClient.post(this.globalApi.UploadFiles + '?OrgId=' + orgId + '&FillingId=' + filingId, formdata, {
      headers: accesstoken,
    });
  }

  getFiles(orgId: string, filingId: string, caseId: any, accesstoken: any) {
    return this.httpClient.get(
      this.globalApi.FetechingFiles + '?OrgId=' + orgId + '&FillingId=' + filingId + '&caseId=' + caseId,
      {
        headers: accesstoken,
      }
    );
  }

  getFilesCaseSubmission(orgId: string, filingId: string, caseId: any, accesstoken: any) {
    return this.httpClient.get(
      this.globalApi.FetechingFilesByCaseId + '?OrgId=' + orgId + '&FillingId=' + filingId + '&caseId=' + caseId,
      {
        headers: accesstoken,
      }
    );
  }

  deleteFiles(orgId: string, filingId: string, fileId: any, accesstoken: any) {
    return this.httpClient.get(
      this.globalApi.DeleteFiles + '?OrgId=' + orgId + '&FillingId=' + filingId + '&FileId=' + fileId,
      { headers: accesstoken }
    );
  }

  deleteFolder(orgId: any, filingId: any, folderId: any, token: any) {
    return this.httpClient.get(
      this.globalApi.DeleteFolder + '?OrgId=' + orgId + '&FilingId=' + filingId + '&FolderId=' + folderId,
      {
        headers: token,
      }
    );
  }

  viewFile(orgId: string, filingId: string, fileId: any, accesstoken: any) {
    return this.httpClient.get(
      this.globalApi.ViewFiles + '?OrgId=' + orgId + '&FillingId=' + filingId + '&FileId=' + fileId,
      { headers: accesstoken }
    );
  }

  downloadFile(orgId: string, filingId: string, fileId: any) {
    return this.httpClient.get(
      this.globalApi.DownloadingFiles + '?OrgId=' + orgId + '&FillingId=' + filingId + '&FileId=' + fileId
    );
  }

  googleDriveLogin(accesstoken: any) {
    return this.httpClient.get(this.globalApi.GoogleDriveAuth, { headers: accesstoken });
  }

  googleDriveFileDownload(file: string, orgId: string, filingId: string, accesstoken: any) {
    return this.httpClient.get(
      this.globalApi.GoogleFileDownload + '?file=' + file + '&OrgID=' + orgId + '&filingId=' + filingId,
      { headers: accesstoken }
    );
  }
  fileViewPermissions(client: any, accesstoken: any) {
    return this.httpClient.post(this.globalApi.UploadedFileViewPermission, client, { headers: accesstoken });
  }
  clientFileViewPermissions(client: any, accesstoken: any) {
    return this.httpClient.post(this.globalApi.clientUploadedFileViewPermission, client, { headers: accesstoken });
  }

  createFolder(orgId: any, filingId: any, folderName: any, token: any) {
    return this.httpClient.get(
      this.globalApi.CreateNewFolder + '?OrgId=' + orgId + '&FilingId=' + filingId + '&FolderName=' + folderName,
      { headers: token }
    );
  }

  getListOfFolders(orgId: any, filingId: any, token: any) {
    return this.httpClient.get(this.globalApi.ListOfFolders + '?OrgId=' + orgId + '&FilingId=' + filingId, {
      headers: token,
    });
  }

  postFolderfileupload(orgId: any, filingId: any, folderId: any, formdata: any, accesstoken: any) {
    return this.httpClient.post(
      this.globalApi.FolderFileupload + '?OrgId=' + orgId + '&fillingId=' + filingId + '&folderId=' + folderId,
      formdata,
      { headers: accesstoken }
    );
  }

  dropBoxLogin(accesstoken: any) {
    return this.httpClient.get(this.globalApi.DropboxAuth, { headers: accesstoken });
  }

  dropBoxAllFiles(accesstoken: any) {
    return this.httpClient.get(this.globalApi.DropboxFiles, { headers: accesstoken });
  }

  dropboxFileDownload(file: string, orgId: string, filingId: string, accesstoken: any) {
    return this.httpClient.get(
      this.globalApi.DropboxFilesDownload + '?file=' + file + '&OrgID=' + orgId + '&filingId=' + filingId,
      { headers: accesstoken }
    );
  }
  GetFilingAdminTeammembers(obj: any, accesstoken: any) {
    return this.httpClient.post(this.globalApi.GetFilingAdminTeammembers, obj, { headers: accesstoken });
  }
  GetFilingClientTeammembers(fillingObj, accesstoken) {
    return this.httpClient.post(this.globalApi.GetFilingClientTeammembers, fillingObj, { headers: accesstoken });
  }
  GetTopicsForFilings(orgId: string, filingId: string, accesstoken: any) {
    return this.httpClient.get(this.globalApi.GetTopicsForFilings + '?OrgId=' + orgId + '&FilingId=' + filingId, {
      headers: accesstoken,
    });
  }

  folderFilesList(orgId: any, filingId: any, folderId: any) {
    return this.httpClient.get(
      this.globalApi.FolderFiles + '?OrgId=' + orgId + '&FilingId=' + filingId + '&FolderId=' + folderId
    );
  }

  ApproveFiling(reqObj) {
    return this.httpClient.post(this.globalApi.approveFiling, reqObj);
  }
  CreateTopicForFiling(formdata: any, accesstoken: any) {
    return this.httpClient.post(this.globalApi.CreateTopicForFiling, formdata, {
      headers: accesstoken,
    });
  }

  GetApplicantDetail(formdata: any) {
    return this.httpClient.post(this.globalApi.GetApplicant, formdata);
  }

  getSponserDetail(formdata: any) {
    return this.httpClient.post(this.globalApi.GetSponser, formdata);
  }

  getFilingDetails(orgId: any, filingId: any) {
    return this.httpClient.get(this.globalApi.GetFilingDetails + '?OrgId=' + orgId + '&FilingId=' + filingId);
  }
  getActivityinfo(formdata: any) {
    return this.httpClient.post(this.globalApi.GetActivityinfo, formdata);
  }

  getNote(orgId: any, filingId: any) {
    return this.httpClient.get(this.globalApi.GetNote + '?OrgId=' + orgId + '&FilingId=' + filingId);
  }
  addNote(formdata: any) {
    return this.httpClient.post(this.globalApi.AddNote, formdata);
  }
  StoreFilingDetails(formdata: any) {
    return this.httpClient.post(this.globalApi.StoreFilingDetails, formdata);
  }

  // quick actions services
  addRecieptNumber(obj: any, token: any) {
    return this.httpClient.post(this.globalApi.AddRecieptNumber, obj, {
      headers: token,
    });
  }

  addLcaNumber(obj: any, token: any) {
    return this.httpClient.post(this.globalApi.AddLcaNumber, obj, {
      headers: token,
    });
  }
  addShipmentNumber(orgId: any, obj: any, token: any) {
    return this.httpClient.post(this.globalApi.AddShipment + '?OrgId=' + orgId, obj, {
      headers: token,
    });
  }

  getShipmentTrackingList(orgId: any, filingId: any) {
    return this.httpClient.post(
      this.globalApi.GetShipmentTrackingList + '?OrgId=' + orgId + '&FilingId=' + filingId,
      ''
    );
  }

  ShipMentTrackingNumber(OrgId: any, formdata: any, accesstoken: any) {
    return this.httpClient.post(this.globalApi.ShipMentTrackingNumber + '?OrgId=' + OrgId, formdata, {
      headers: accesstoken,
    });
  }

  AdminUpComingTasks(OrgId: any, FilingId: any, accesstoken: any) {
    return this.httpClient.get(this.globalApi.AdminUpComingTasks + '?OrgId=' + OrgId + '&FilingId=' + FilingId, {
      headers: accesstoken,
    });
  }
  TaskSummary(OrgId: any, FilingId: any) {
    return this.httpClient.get(this.globalApi.TaskSummary + '?OrgId=' + OrgId + '&FilingId=' + FilingId);
  }

  G28FilliOut(OrgId: any, formdata: any, accesstoken: any) {
    return this.httpClient.post(this.globalApi.G28FilliOut + '?OrgId=' + OrgId, formdata, {
      headers: accesstoken,
    });
  }
  G28viewforfiling(OrgId: any, FilingId: any) {
    return this.httpClient.get(this.globalApi.G28viewforfiling + '?OrgId=' + OrgId + '&FilingId=' + FilingId);
  }

  Getg28filingdataonthebasisoffilindid(OrgId: any, FilingId: any) {
    return this.httpClient.get(
      this.globalApi.Getg28filingdataonthebasisoffilindid + '?OrgId=' + OrgId + '&FilingId=' + FilingId
    );
  }
  GetForms(accesstoken: any) {
    return this.httpClient.get(this.globalApi.FetechingForm + '?filingname=H1', {
      headers: accesstoken,
    });
  }
  GetCaseForms(OrgId: any, fillingId: any, caseId: any, accesstoken: any, FilingName: any) {
    return this.httpClient.get(
      this.globalApi.FetchingFormsFiling +
        '?OrgId=' +
        OrgId +
        '&fillingId=' +
        fillingId +
        '&caseId=' +
        caseId +
        '&FilingName=' +
        FilingName,
      {
        headers: accesstoken,
      }
    );
  }

  // case submissions
  getCaseSubmissionsList(orgId: any, filingId: any, filingType: any, accesstoken: any) {
    return this.httpClient.get(
      this.globalApi.getCaseSubmissionsApiUrl +
        '?OrgId=' +
        orgId +
        '&FilingId=' +
        filingId +
        '&filingType=' +
        filingType,
      {
        headers: accesstoken,
      }
    );
  }

  deleteCaseSubmission(orgId: any, formData: any) {
    return this.httpClient.post(this.globalApi.deleteCaseSubmissionsApiUrl + '?OrgId=' + orgId, formData);
  }

  postCaseSubmissions(OrgId: any, formdata: any) {
    return this.httpClient.post(this.globalApi.postCaseSubmissionsApiUrl + '?OrgId=' + OrgId, formdata);
  }
  editIndividualCaseSubmission(orgId: any, formData: any) {
    return this.httpClient.post(this.globalApi.editCaseDetails + '?OrgId=' + orgId, formData);
  }
  caseSubmissionPrivacy(data: any) {
    return this.httpClient.post(this.globalApi.caseSubmissionPrivacy, data);
  }

  AddingToForms(OrgId: any, fillingId: any, caseId: any, accesstoken: any, FilingName: any, formdata) {
    const headersnew = new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage.getItem('A_AccessToken'),
      'Content-Type': 'application/json',
    });

    return this.httpClient.post(
      this.globalApi.AddingToForms +
        '?OrgId=' +
        OrgId +
        '&FilingId=' +
        fillingId +
        '&caseId=' +
        caseId +
        '&FilingName=' +
        FilingName,
      formdata,
      {
        headers: headersnew,
      }
    );
  }

  Getgi129filingdataonthebasisoffilindid(OrgId: any, FilingId: any) {
    return this.httpClient.get(
      this.globalApi.Geti129filingdataonthebasisoffilindid + '?OrgId=' + OrgId + '&FilingId=' + FilingId
    );
  }

  I129illiOut(OrgId: any, formdata: any) {
    return this.httpClient.post(this.globalApi.i129FilliOut + '?OrgId=' + OrgId, formdata, {});
  }

  I129viewforfiling(OrgId: any, FilingId: any) {
    return this.httpClient.get(this.globalApi.I129viewforfiling + '?OrgId=' + OrgId + '&FilingId=' + FilingId);
  }

  relatedfillings(OrgId: any, FilingId: any) {
    return this.httpClient.get(this.globalApi.Relatedfillings + '?OrgId=' + OrgId + '&FilingId=' + FilingId);
  }

  Topicarchive(OrgId: any, FilingId: any, accesstoken: any, TopicId: any) {
    return this.httpClient.get(
      this.globalApi.Topicarchive + '?OrgId=' + OrgId + '&FilingId=' + FilingId + '&TopicId=' + TopicId,
      {
        headers: accesstoken,
      }
    );
  }
  Groupmessagearchive(OrgId: any, FilingId: any, accesstoken: any, TopicId: any, GroupMessagingId: any) {
    return this.httpClient.get(
      this.globalApi.Groupmessagearchive +
        '?OrgId=' +
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
        '?OrgId=' +
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

  GetFilesInSupportingFilesSection(OrgId: any, FilingId: any, caseId: any, accesstoken: any) {
    return this.httpClient.get(
      this.globalApi.GetFilesInSupportingFilesSection +
        '?OrgId=' +
        OrgId +
        '&FilingId=' +
        FilingId +
        '&caseId=' +
        caseId,
      {
        headers: accesstoken,
      }
    );
  }

  GetFoldersInSupportingFilesSection(OrgId: any, FilingId: any, caseId: any, accesstoken: any) {
    return this.httpClient.get(
      this.globalApi.GetFoldersInSupportingFilesSection +
        '?OrgId=' +
        OrgId +
        '&FilingId=' +
        FilingId +
        '&caseId=' +
        caseId,
      {
        headers: accesstoken,
      }
    );
  }
  AddFilesAndFoldersToSupportingFilesSection(
    OrgId: any,
    FilingId: any,
    caseIdzero: any,
    FileIds: any,
    FolderIds: any,
    accesstoken: any
  ) {
    return this.httpClient.get(
      this.globalApi.AddFilesAndFoldersToSupportingFilesSection +
        '?OrgId=' +
        OrgId +
        '&FilingId=' +
        FilingId +
        '&caseId=' +
        caseIdzero +
        '&FileIds=' +
        FileIds +
        '&FolderIds=' +
        FolderIds,
      {
        headers: accesstoken,
      }
    );
  }
  getprimaryattorney(OrgId, accesstoken) {
    return this.httpClient.get(this.globalApi.getprimaryattorney + '?OrgId=' + OrgId, { headers: accesstoken });
  }

  deleteshipmenttrackingnumber(OrgId, FilingId, TrackingNumber, accesstoken) {
    return this.httpClient.get(
      this.globalApi.deleteshipmenttrackingnumber +
        '?OrgId=' +
        OrgId +
        '&FilingId=' +
        FilingId +
        '&TrackingNumber=' +
        TrackingNumber,
      { headers: accesstoken }
    );
  }
}
