import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../../../../shared/service/common.service';

@Component({
  selector: 'app-period-of-stay-popup',
  templateUrl: './period-of-stay-popup.component.html',
  styleUrls: ['./period-of-stay-popup.component.scss']
})
export class PeriodOfStayPopupComponent implements OnInit {

  @Output() emitCloseModel = new EventEmitter();
  
  @Input() isCard = false;

  @Input() set data(value: any) {
    this.formGroupData();
    if (value) {
      this.posValidationRules.patchValue(value);
    }
  }

  posValidationRules: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
  }

  formGroupData() {
    this.posValidationRules = this.formBuilder.group({
      SubjectName: [null],
      StayedFrom: [null],
      StayedTill: [null],
      NoOfDaysOutsideUSA: [null]
    });
  }


  formData(contl) {
    return this.posValidationRules.get(contl).value;
  }

  save() {
    if (this.posValidationRules.invalid) {
      return;
    }
    this.emitCloseModel.emit(this.posValidationRules.value)
  }

  cancel(): void {
      this.emitCloseModel.emit(null);
  }

}
