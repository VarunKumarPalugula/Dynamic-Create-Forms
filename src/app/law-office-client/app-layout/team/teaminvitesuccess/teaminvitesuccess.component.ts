import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-teaminvitesuccess',
  templateUrl: './teaminvitesuccess.component.html',
  styleUrls: ['./teaminvitesuccess.component.scss'],
})
export class TeaminvitesuccessComponent implements OnInit, OnDestroy {
  public OrganisationName: string = sessionStorage.getItem('OrganisationName');
  responses: any[];
  public EmaiSenderscount: any;
  emitCloseModel: any;
  constructor() {}

  ngOnInit() {
    const teamlist = sessionStorage.getItem('invitylist');
    this.responses = JSON.parse(teamlist);
    this.EmaiSenderscount = this.responses.length;
  }
  Close(value: string) {
    this.emitCloseModel.emit(value);
  }

  ngOnDestroy() {
    sessionStorage.removeItem('invitylist');
  }
}
