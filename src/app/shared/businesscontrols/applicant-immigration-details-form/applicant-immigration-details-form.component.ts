import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'applicant-immigration-details-form',
  templateUrl: './applicant-immigration-details-form.component.html',
  styleUrls: ['./applicant-immigration-details-form.component.scss'],
})
export class ApplicantImmigrationDetailsFormComponent implements OnInit {
  @Input()
  immiggrationDetails: FormGroup;
  @Output()
  emitImmigrationDetails = new EventEmitter();
  @Input()
  immiggrationDetailsObj: any = {};
  @Input()
  maxDate: Date;
  @Input()
  visaCategory = [];
  @Output()
  emitCancelImg = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  submit() {
    this.emitImmigrationDetails.emit();
  }
  cancel() {
    this.emitCancelImg.emit();
  }
}
