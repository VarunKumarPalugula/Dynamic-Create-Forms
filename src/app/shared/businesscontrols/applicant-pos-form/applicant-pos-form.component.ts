import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'applicant-pos-form',
  templateUrl: './applicant-pos-form.component.html',
  styleUrls: ['./applicant-pos-form.component.scss'],
})
export class ApplicantPosFormComponent implements OnInit {
  @Input()
  posValidationRules: FormGroup;
  @Input()
  maxDate: Date;

  @Output()
  emitPocInfo = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  submit() {
    this.emitPocInfo.emit(this.posValidationRules);
  }
}
