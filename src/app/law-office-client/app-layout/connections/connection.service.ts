import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApicallsService } from '@app/shared/service/apicalls.service';

@Injectable({ providedIn: 'root' })
export class ConnectionService {
  constructor(private httpClient: HttpClient, private global: ApicallsService) {}

  sendInvite(client: any, env: any) {
    return this.httpClient.post(this.global.ConnectionInvite + '?environment=' + env, client);
  }

  connectionSignup(connection: any, env: any) {
    return this.httpClient.post(this.global.ConnectionSignup + '?environment=' + env, connection);
  }

  connectionsList(orgID: any) {
    return this.httpClient.get(this.global.ConnectionsList + '?ClientOrgId=' + orgID);
  }

  invitedByMeConnections(orgID: any) {
    return this.httpClient.get(this.global.InvitedByMeConnections + '?ClientOrgId=' + orgID);
  }

  invitedForMe(orgID: any) {
    return this.httpClient.get(this.global.InvitesForMe + '?ClientOrgId=' + orgID);
  }

  resendConnectionInvitation(orgID: any, DrBit: any, client: any, token: any) {
    return this.httpClient.post(
      this.global.ResendCancelConnectionInvite + '?ClientOrgId=' + orgID + '&DRbit=' + DrBit,
      client
    );
  }

  cancelConnectionInvitation(orgID: any, DrBit: any, client: any) {
    return this.httpClient.post(
      this.global.ResendCancelConnectionInvite + '?OrId=' + orgID + '&DRbit=' + DrBit,
      client
    );
  }
  acceptRejectIncomingConnection(orgID: any, IncmngConnectionId: any, ARbit: any, token: any) {
    return this.httpClient.get(
      this.global.AcceptRejectIncomingConnection +
        '?ClientOrgId=' +
        orgID +
        '&IncmngConnectionId=' +
        IncmngConnectionId +
        '&ARbit=' +
        ARbit,
      { headers: token }
    );
  }
}
