import { CommonService } from './../../../service/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-address-history-popup',
  templateUrl: './address-history-popup.component.html',
  styleUrls: ['./address-history-popup.component.scss'],
})
export class AddressHistoryPopupComponent implements OnInit {
  isAptSteFlrNumberDisabled = true;
  @Output() emitCloseModel = new EventEmitter();

  @Input() isCard = false;

  @Input() set data(value: any) {
    this.formGroupData();
    if (value && Object.keys(value).length) {
      this.addressDetailsForm.patchValue(value);
    }
  }

  addressDetailsForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder, private commonService: CommonService) {}

  ngOnInit() {}

  formGroupData() {
    this.addressDetailsForm = this.formBuilder.group({
      StreetNumberAndName: [null],
      AptSteFlr: [null],
      AptSteFlrNumber: [null],
      Country: [null],
      State: [null],
      CityOrTown: [null],
      Province: [null],
      ZipCode: [null],
      Fax: [null],
      DayTimePhone: [null],
      MobilePhone: [null],
      Email: [null],
    });
  }

  formData(contl) {
    return this.addressDetailsForm.get(contl).value;
  }

  save() {
    if (this.addressDetailsForm.invalid) {
      return;
    }
    this.emitCloseModel.emit(this.addressDetailsForm.value);
  }

  cancel(): void {
    this.emitCloseModel.emit(null);
  }

  changeAptSteFlr() {
    const selectedroleControl: any = this.addressDetailsForm.get('AptSteFlrNumber');
    if (
      this.addressDetailsForm.value.aptSteFlr == 'Apt' ||
      this.addressDetailsForm.value.aptSteFlr == 'Ste' ||
      this.addressDetailsForm.value.aptSteFlr == 'Flr'
    ) {
      this.isAptSteFlrNumberDisabled = false;
      selectedroleControl.setValidators([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100),
        Validators.pattern('[a-zA-Z0-9]*$'),
      ]);
    } else {
      selectedroleControl.clearValidators();
      selectedroleControl.patchValue('');
      this.isAptSteFlrNumberDisabled = true;
    }
    selectedroleControl.updateValueAndValidity();
  }
}
