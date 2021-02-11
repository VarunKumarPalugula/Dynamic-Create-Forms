import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../../../../shared/service/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { JsonSectionValidationService } from '@app/shared/service/json-section-validation.service';

@Component({
  selector: 'app-prior-spouse-popup',
  templateUrl: './prior-spouse-popup.component.html',
  styleUrls: ['./prior-spouse-popup.component.scss'],
})
export class PriorSpousePopupComponent implements OnInit {
  @Input() isCard = false;
  formErrors: any = {};
  @Output() emitCloseModel = new EventEmitter();

  @Input() set data(value: any) {
    this.formGroupData();
    if (value && value.hasOwnProperty('priorSpouseDetails')) {
      this.priorSpouseForm.patchValue(value['priorSpouseDetails']);
    }
  }

  priorSpouseForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private commonService: CommonService,
    private dynamicValidationService: JsonSectionValidationService
  ) {}

  ngOnInit() {
    this.priorSpouseForm.valueChanges.subscribe((value) => {
      this.logValidationErrors();
    });
  }

  logValidationErrors() {
    this.formErrors = this.dynamicValidationService.getValidationErrors(
      this.priorSpouseForm,
      this.dynamicValidationService.validationMessages
    );
  }
  formGroupData() {
    this.priorSpouseForm = this.formBuilder.group({
      AddFirstname: this.dynamicValidationService.dynamicForm.Firstname,
      AddMiddlename: this.dynamicValidationService.dynamicForm.Middlename,
      AddLastName: this.dynamicValidationService.dynamicForm.Lastname,
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
    return this.priorSpouseForm.get(contl).value;
  }

  save() {
    if (this.priorSpouseForm.invalid) {
      return;
    }
    this.emitCloseModel.emit(this.priorSpouseForm.value);
  }

  cancel(): void {
    this.emitCloseModel.emit(null);
  }
}
