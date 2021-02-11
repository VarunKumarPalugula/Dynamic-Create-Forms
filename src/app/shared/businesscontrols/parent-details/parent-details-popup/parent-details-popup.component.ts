import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../../../../shared/service/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { JsonSectionValidationService } from '@app/shared/service/json-section-validation.service';

@Component({
  selector: 'app-parent-details-popup',
  templateUrl: './parent-details-popup.component.html',
  styleUrls: ['./parent-details-popup.component.scss'],
})
export class ParentDetailsPopupComponent implements OnInit {
  formErrors: any = {};
  @Output() emitCloseModel = new EventEmitter();
  @Input() isCard = false;

  @Input() set data(value: any) {
    this.formGroupData();
    if (value) {
      this.parentDetailsForm.patchValue(value);
    }
  }

  parentDetailsForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private commonService: CommonService,
    private dynamicValidationService: JsonSectionValidationService
  ) {}

  ngOnInit() {
    this.parentDetailsForm.valueChanges.subscribe((value) => {
      this.logValidationErrors();
    });
  }
  logValidationErrors() {
    this.formErrors = this.dynamicValidationService.getValidationErrors(
      this.parentDetailsForm,
      this.dynamicValidationService.validationMessages
    );
  }
  formGroupData() {
    this.parentDetailsForm = this.formBuilder.group({
      AddFirstname: this.dynamicValidationService.dynamicForm.Firstname,
      AddMiddlename: this.dynamicValidationService.dynamicForm.Middlename,
      AddLastName: this.dynamicValidationService.dynamicForm.Lastname,
      AddFirstname1: this.dynamicValidationService.dynamicForm.Firstname,
      AddMiddlename1: this.dynamicValidationService.dynamicForm.Middlename,
      AddLastName1: this.dynamicValidationService.dynamicForm.Lastname,
      AddChildGender: this.dynamicValidationService.dynamicForm.Gender,
      AddDob: this.dynamicValidationService.dynamicForm.Dob,
      AddCountry: this.dynamicValidationService.dynamicForm.PobCountry,
      AddStateorProvince: this.dynamicValidationService.dynamicForm.PobState,
      AddCityorTown: this.dynamicValidationService.dynamicForm.PobCityorTown,
      AddCountry1: this.dynamicValidationService.dynamicForm.PobCountry,
      AddStateorProvince1: this.dynamicValidationService.dynamicForm.PobState,
      AddCityorTown1: this.dynamicValidationService.dynamicForm.PobCityorTown,
    });
  }

  formData(contl) {
    return this.parentDetailsForm.get(contl).value;
  }

  save() {
    if (this.parentDetailsForm.invalid) {
      return;
    }
    this.emitCloseModel.emit(this.parentDetailsForm.value);
  }

  cancel(): void {
    this.emitCloseModel.emit(null);
  }
}
