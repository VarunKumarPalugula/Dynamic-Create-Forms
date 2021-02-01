import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '@app/shared/service/data.service';
@Component({
  selector: 'app-teaminvitesuccess',
  templateUrl: './teaminvitesuccess.component.html',
  styleUrls: ['./teaminvitesuccess.component.scss'],
})
export class TeaminvitesuccessComponent implements OnInit, OnDestroy {
  public OrganisationName: string = sessionStorage.getItem('OrganisationName');
  responses: any[];
  public EmaiSenderscount: number;
  public SMessage: any;
  constructor(private data: DataService) {}

  ngOnInit() {
    const teamlist = sessionStorage.getItem('invitylist');
    this.responses = JSON.parse(teamlist);
    if (this.responses.length == 1) {
      this.SMessage = 'You’ve invited 1 Member';
    } else {
      this.SMessage = 'You’ve invited ' + this.responses.length + ' Members';
    }
  }

  ngOnDestroy() {
    sessionStorage.removeItem('invitylist');
  }
}
