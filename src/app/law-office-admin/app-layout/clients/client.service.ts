import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApicallsService } from '@app/shared/service/apicalls.service';

@Injectable({ providedIn: 'root' })
export class AdminClientService {
  constructor(private httpClient: HttpClient, private global: ApicallsService) {}

  sendInvite(client: any, env:any) {
    return this.httpClient.post(this.global.clientInvitation + '?environment=' + env, client);
  }

  adminClientsList(orgID: any) {
    return this.httpClient.get(this.global.adminClientsList + '?OrgID=' + orgID);
  }

  adminInvitedClientsList(orgID: any, token: any) {
    return this.httpClient.get(this.global.clientinviteeslist + '?OrgID=' + orgID, { headers: token });
  }
  GetIncomingClientList(orgID: any, token: any) {
    return this.httpClient.get(this.global.gettingIncomingClientList + '?OrgId=' + orgID, { headers: token });
  }
  acceptRejectIncomingConnection(orgID: any, IncmngConnectionId: any, ARbit: any, token: any) {
    return this.httpClient.get(
      this.global.AcceptRejectAdminIncomingConnection +
        '?OrgId=' +
        orgID +
        '&IncmngClientId=' +
        IncmngConnectionId +
        '&ARbit=' +
        ARbit,
      { headers: token }
    );
  }

  resendAdminClientInvitation(orgID: any, DrBit: any, client: any, token: any, env:any) {
    return this.httpClient.post(
      this.global.AdminClientResendInvitation + '?OrId=' + orgID + '&DRbit=' + DrBit + '?environment=' + env,
      client,
      { headers: token }
    );
  }

  MakeClientInActive(OrgId, clientId, accesstoken: any) {
    return this.httpClient.get(this.global.MakeClientInActive + '?OrgId=' + OrgId + '&ClientId=' + clientId, {
      headers: accesstoken,
    });
  }

  MakeClientActive(OrgId, clientId, accesstoken: any) {
    return this.httpClient.get(this.global.MakeClientActive + '?OrgId=' + OrgId + '&ClientId=' + clientId, {
      headers: accesstoken,
    });
  }

  getCSVClientData(obj: any, token: any) {
    return this.httpClient.post(this.global.getCSVData, obj, { headers: token });
  }

  fileupload(formdata: any, token: any) {
    return this.httpClient.post(this.global.importCSV, formdata, { headers: token });
  }
}
