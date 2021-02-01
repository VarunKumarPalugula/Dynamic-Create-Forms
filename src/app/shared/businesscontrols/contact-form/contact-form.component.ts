import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  @Input()
  contactInfoForm: any;

  @Input()
  contactObj: any = {};
  @Input()
  sameAsContactInfoRequired = false;

  @Input()
  contactValidated = false;
  @Input()
  isCheckBoxChecked = false;

  @Output()
  emitSameContactInfo = new EventEmitter();

  @Output()
  emitSubmitInfo = new EventEmitter();

  @Output()
  emitCancelContact = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  submitContactInfoFormrmation() {
    this.emitSubmitInfo.emit(this.contactObj);
  }

  sameAsContactInfo(isChecked) {
    this.emitSameContactInfo.emit(isChecked);
  }

  cancelContact() {
    this.emitCancelContact.emit();
  }
}
