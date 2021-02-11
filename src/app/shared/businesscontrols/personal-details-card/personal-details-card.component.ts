import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'personal-details-card',
  templateUrl: './personal-details-card.component.html',
  styleUrls: ['./personal-details-card.component.scss'],
})
export class PersonalDetailsCardComponent implements OnInit {
  constructor() {}
  @Input()
  personalInfo: any;
  @Output()
  emitChangeInfo = new EventEmitter();
  loginUser: any;
  ngOnInit() {
    this.loginUser = sessionStorage.getItem('Login_User');
  }

  changeInfo() {
    this.emitChangeInfo.emit(false);
  }
}
