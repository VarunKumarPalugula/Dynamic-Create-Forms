import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-client-invite-confirm',
  templateUrl: './admin-client-invite-confirm.component.html',
  styleUrls: ['./admin-client-invite-confirm.component.scss'],
})
export class AdminClientInviteConfirmComponent implements OnInit, OnDestroy {
  public OrganisationName: string = sessionStorage.getItem('OrganisationName');
  responses: any = [];
  EmaiSenderscount: any;
  constructor() {}

  ngOnInit() {
    const test2 = sessionStorage.getItem('clientinvitelist');
    this.responses = JSON.parse(test2);
  }

  ngOnDestroy() {
    sessionStorage.removeItem('clientinvitelist');
  }
}
