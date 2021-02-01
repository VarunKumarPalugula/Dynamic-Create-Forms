import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss'],
})
export class ContactCardComponent implements OnInit {
  @Input()
  cardBodyTittle: string;
  @Input()
  contactInfo: any;

  @Output()
  emitChangeInfo = new EventEmitter();
  loginUser: any
  constructor() { }

  ngOnInit() {
    this.loginUser = sessionStorage.getItem('Login_User');
  }

  changeInfo() {
    this.emitChangeInfo.emit(false);
  }
}
