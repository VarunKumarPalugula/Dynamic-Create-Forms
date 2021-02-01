import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../../../../shared/service/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { JsonSectionValidationService } from '@app/shared/service/json-section-validation.service';

@Component({
  selector: 'app-child-details-popup',
  templateUrl: './child-details-popup.component.html',
  styleUrls: ['./child-details-popup.component.scss']
})
export class ChildDetailsPopupComponent implements OnInit {
  formErrors: any = {};
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
    private commonService: CommonService,
    private dynamicValidationService: JsonSectionValidationService
  ) { }

  ngOnInit() {
    this.childDetailsForm.valueChanges.subscribe(
      value => {
          this.logValidationErrors()
      }
  );
  }
  logValidationErrors() {
    this.formErrors = this.dynamicValidationService.getValidationErrors(this.childDetailsForm, this.dynamicValidationService.validationMessages);
  }

  formGroupData() {
    this.childDetailsForm = this.formBuilder.group({
      AddFirstname: this.dynamicValidationService.dynamicForm.Firstname,
      AddMiddlename: this.dynamicValidationService.dynamicForm.Middlename,
      AddLastName: this.dynamicValidationService.dynamicForm.Lastname,
      AddGender: this.dynamicValidationService.dynamicForm.Gender,
      AddDob: this.dynamicValidationService.dynamicForm.Dob,
      AddCountry: this.dynamicValidationService.dynamicForm.PobCountry,
      AddStateorProvince: this.dynamicValidationService.dynamicForm.PobState,
      AddCityorTown: this.dynamicValidationService.dynamicForm.PobCityorTown,
      AddUSICSnumber: this.dynamicValidationService.dynamicForm.OtherUsicsOnlineNUmber,
      AddANumber: this.dynamicValidationService.dynamicForm.OtherAnumber,
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
