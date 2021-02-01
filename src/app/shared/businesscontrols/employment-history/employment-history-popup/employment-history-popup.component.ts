import { CommonService } from './../../../service/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { JsonSectionValidationService } from '@app/shared/service/json-section-validation.service';

@Component({
  selector: 'app-employment-history-popup',
  templateUrl: './employment-history-popup.component.html',
  styleUrls: ['./employment-history-popup.component.css']
})
export class EmploymentHistoryPopupComponent implements OnInit {
  formErrors: any = {};
  @Output() emitCloseModel = new EventEmitter();
  
  @Input() isCard = false;

  @Input() set data(value: any) {
    this.formGroupData();
    if (value && Object.keys(value).length) {
      this.employmentDetailsForm.patchValue(value);
    }
  }

  employmentDetailsForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private commonService: CommonService,
    private dynamicValidationService: JsonSectionValidationService
  ) { }

  ngOnInit() {
    this.employmentDetailsForm.valueChanges.subscribe(
      value => {
          this.logValidationErrors()
      }
  );
  }
  logValidationErrors() {
    this.formErrors = this.dynamicValidationService.getValidationErrors(this.employmentDetailsForm, this.dynamicValidationService.validationMessages);
  }

  formGroupData() {
    this.employmentDetailsForm = this.formBuilder.group({
      AddNameOfEmployerOrCompany: this.dynamicValidationService.dynamicForm.NameOfEmployerOrCompany,
      AddStreetNumberAndName:this.dynamicValidationService.dynamicForm.StreetNumberAndName,
      AddAptSteFlr:this.dynamicValidationService.dynamicForm.AptSteFlr,
      AddNumber:this.dynamicValidationService.dynamicForm.Number,
      AddCountry:this.dynamicValidationService.dynamicForm.PobCountry,
      AddStateorProvince:this.dynamicValidationService.dynamicForm.PobState,
      AddProvince:this.dynamicValidationService.dynamicForm.Province,
      AddCityorTown:this.dynamicValidationService.dynamicForm.PobCityorTown,
      AddZipCode:this.dynamicValidationService.dynamicForm.ZipCode,
      AddYourOccupation:this.dynamicValidationService.dynamicForm.YourOccupation,
      AddDob: this.dynamicValidationService.dynamicForm.Dob,
      AddDob1: this.dynamicValidationService.dynamicForm.Dob2,

    });
  }

  formData(contl) {
    return this.employmentDetailsForm.get(contl).value;
  }

  save() {
    if (this.employmentDetailsForm.invalid) {
      return;
    }
    this.emitCloseModel.emit(this.employmentDetailsForm.value)
  }

  cancel(): void {
      this.emitCloseModel.emit(null);
  }

  

}
