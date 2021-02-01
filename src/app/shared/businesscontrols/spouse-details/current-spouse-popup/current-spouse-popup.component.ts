import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../../../../shared/service/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { JsonSectionValidationService } from '@app/shared/service/json-section-validation.service';

@Component({
  selector: 'app-current-spouse-popup',
  templateUrl: './current-spouse-popup.component.html',
  styleUrls: ['./current-spouse-popup.component.scss']
})
export class CurrentSpousePopupComponent implements OnInit {
  formErrors: any = {};
  @Output() emitCloseModel = new EventEmitter();
  @Input() isCard = false;

  @Input() set data(value: any) {
    this.formGroupData();
    if (value && value.hasOwnProperty('CurrentSpouseDetails')) {
      this.currentSpouseForm.patchValue(value['CurrentSpouseDetails']);
    }
  }

  currentSpouseForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private commonService: CommonService,
    private dynamicValidationService: JsonSectionValidationService
  ) { }


  ngOnInit() {
    this.currentSpouseForm.valueChanges.subscribe(
      value => {
          this.logValidationErrors()
      }
  );
  }
  logValidationErrors() {
    this.formErrors = this.dynamicValidationService.getValidationErrors(this.currentSpouseForm, this.dynamicValidationService.validationMessages);
  }

  formGroupData() {
    this.currentSpouseForm = this.formBuilder.group({
      AddFirstname: this.dynamicValidationService.dynamicForm.Firstname,
      AddMiddlename: this.dynamicValidationService.dynamicForm.Middlename,
      AddLastName: this.dynamicValidationService.dynamicForm.Lastname,
      AddIsYesorNo: this.dynamicValidationService.dynamicForm.isYesorNo,
      AddANumber: this.dynamicValidationService.dynamicForm.OtherAnumber,
      AddDob: this.dynamicValidationService.dynamicForm.Dob,
      AddDob2: this.dynamicValidationService.dynamicForm.Dob2,
      AddCountry: this.dynamicValidationService.dynamicForm.PobCountry,
      AddStateorProvince: this.dynamicValidationService.dynamicForm.PobState,
      AddCityorTown: this.dynamicValidationService.dynamicForm.PobCityorTown,
      AddCountry1: this.dynamicValidationService.dynamicForm.PobCountry,
      AddStateorProvince1: this.dynamicValidationService.dynamicForm.PobState,
      AddCityorTown1: this.dynamicValidationService.dynamicForm.PobCityorTown,
    });
  }

  formData(contl) {
    return this.currentSpouseForm.get(contl).value;
  }
  save() {
    if (this.currentSpouseForm.invalid) {
      return;
    }
    this.emitCloseModel.emit(this.currentSpouseForm.value)

  }

  cancel(): void {
      this.emitCloseModel.emit(null);
  }
  detailsEmit(value) {
    this.currentSpouseForm.patchValue({
      Country: value.Country,
      State: value.State,
      CityOrTown: value.CityOrTown,
    })
  }

}
