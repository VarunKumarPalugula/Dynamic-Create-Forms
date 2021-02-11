import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'organization-card',
  templateUrl: './organization-card.component.html',
  styleUrls: ['./organization-card.component.scss'],
})
export class OrganizationCardComponent implements OnInit {
  @Input()
  orgInfo: any;
  @Output()
  changeOrgInformation = new EventEmitter();
  loginUser: any;
  constructor() {}

  ngOnInit() {
    this.loginUser = sessionStorage.getItem('Login_User');
  }

  changeOrgInfo() {
    this.changeOrgInformation.emit(false);
  }
}
