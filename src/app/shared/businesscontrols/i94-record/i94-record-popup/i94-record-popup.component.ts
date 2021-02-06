import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../../../../shared/service/common.service';

@Component({
  selector: 'app-i94-record-popup',
  templateUrl: './i94-record-popup.component.html',
  styleUrls: ['./i94-record-popup.component.css']
})
export class I94RecordPopupComponent implements OnInit {

 
  @Output() emitCloseModel = new EventEmitter();
  
  @Input() isCard = false;

  @Input() set data(value: any) {
    this.formGroupData();
    if (value) {
      this.childDetailsForm.patchValue(value);
    }
  }

  childDetailsForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private commonService: CommonService
  ) { }

  ngOnInit() {}
  formGroupData() {
    this.childDetailsForm = this.formBuilder.group({
      AddFirstname: [null],
      AddMiddlename: [null],
      AddLastName: [null],
      AddGender: [null],
      AddDob: [null],
      AddCountry: [null],
      AddStateorProvince: [null],
      AddCityorTown: [null],
      AddUSICSnumber: [null],
      AddANumber: [null]
    });
  }

  formData(contl) {
    return this.childDetailsForm.get(contl).value;
  }

  save() {
    if (this.childDetailsForm.invalid) {
      return;
    }
    this.emitCloseModel.emit(this.childDetailsForm.value)
  }

  cancel(): void {
      this.emitCloseModel.emit(null);
  }

}
