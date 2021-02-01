import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'connection-success',
  templateUrl: './connections-success.component.html',
  styleUrls: ['./connections-success.component.scss'],
})
export class ConnectionsSuccessComponent implements OnInit, OnDestroy {
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
