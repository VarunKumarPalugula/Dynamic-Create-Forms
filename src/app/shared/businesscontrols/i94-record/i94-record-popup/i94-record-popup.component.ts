import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../../../../shared/service/common.service';

@Component({
  selector: 'app-i94-record-popup',
  templateUrl: './i94-record-popup.component.html',
  styleUrls: ['./i94-record-popup.component.css'],
})
export class I94RecordPopupComponent implements OnInit {
  @Output() emitCloseModel = new EventEmitter();

  @Input() isCard = false;

  @Input() set data(value: any) {
    this.formGroupData();
    if (value) {
      this.travelDocumentValidationRules.patchValue(value);
    }
  }

  travelDocumentValidationRules: FormGroup;

  constructor(private readonly formBuilder: FormBuilder, private commonService: CommonService) {}

  ngOnInit() {}
  formGroupData() {
    this.travelDocumentValidationRules = this.formBuilder.group({
      PassportOrTravelDocumentNumber: [null],
      DatePassportOrTravelDocumentIssued: [null],
      DatePassportOrTravelDocumentExpires: [null],
      PassportOrTravelDocumentCountryOfIssuance: [null],
      ExpiryEmailRemainder: [null],
    });
  }

  formData(contl) {
    return this.travelDocumentValidationRules.get(contl).value;
  }

  save() {
    if (this.travelDocumentValidationRules.invalid) {
      return;
    }
    this.emitCloseModel.emit(this.travelDocumentValidationRules.value);
  }

  cancel(): void {
    this.emitCloseModel.emit(null);
  }
}
