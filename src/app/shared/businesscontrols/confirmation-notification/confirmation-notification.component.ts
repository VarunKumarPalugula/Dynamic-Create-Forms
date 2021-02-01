import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'confirmation-notification',
  templateUrl: './confirmation-notification.component.html',
  styleUrls: ['./confirmation-notification.component.scss'],
})
export class ConfirmationNotificationComponent implements OnInit {
  @Input()
  confirmData: any;
  @Output()
  emitCloseModel = new EventEmitter();
  OrganisationName: any;
  constructor() {}

  ngOnInit() {}
  Close(value: string) {
    this.emitCloseModel.emit(value);
  }
}
