import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.scss'],
})
export class AddressCardComponent implements OnInit {
  @Input()
  cardBodyTittle: string;
  @Input()
  addressInfo: any;

  @Output()
  emitChangeInfo = new EventEmitter();
  loginUser: any;
  constructor() { }

  ngOnInit() {
    this.loginUser = sessionStorage.getItem('Login_User');
  }

  changeInfo() {
    this.emitChangeInfo.emit(this.addressInfo);
  }
}
