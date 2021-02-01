import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'applicant-education-details-form',
  templateUrl: './applicant-education-details-form.component.html',
  styleUrls: ['./applicant-education-details-form.component.scss'],
})
export class ApplicantEducationDetailsFormComponent implements OnInit {
  @Input()
  educationFrom: FormGroup;
  @Output()
  emitEducationalDetails = new EventEmitter();

  @Input()
  maxDate: Date;
  constructor() {}

  ngOnInit() {}

  submit() {
    this.emitEducationalDetails.emit(this.educationFrom);
  }
}
