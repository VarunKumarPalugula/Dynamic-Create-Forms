import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'financials-card',
  templateUrl: './financials-card.component.html',
  styleUrls: ['./financials-card.component.scss'],
})
export class FinancialsCardComponent implements OnInit {
  @Input()
  finInfo: any;
  @Output()
  editFininfo = new EventEmitter();
  loginUser: any
  constructor() { }

  ngOnInit() {
    this.loginUser = sessionStorage.getItem('Login_User');
  }

  changeFinInfo() {
    this.editFininfo.emit(false);
  }
}
