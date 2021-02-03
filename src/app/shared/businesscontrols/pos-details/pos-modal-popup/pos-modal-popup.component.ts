import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from '@app/shared/service/common.service';
import { JsonSectionValidationService } from '@app/shared/service/json-section-validation.service';

@Component({
  selector: 'app-pos-modal-popup',
  templateUrl: './pos-modal-popup.component.html',
  styleUrls: ['./pos-modal-popup.component.css']
})
export class PosModalPopupComponent implements OnInit {
  posValidationRules: FormGroup;
  formErrors: any = {}
  constructor(
    private readonly formBuilder: FormBuilder,
    private commonService: CommonService,
    private dynamicValidationService: JsonSectionValidationService
  ) { }

  ngOnInit() {
    debugger
    this.posValidationRules.valueChanges.subscribe(
      value => {
          this.logValidationErrors()
      }
  );
  }
  logValidationErrors() {
    this.formErrors = this.dynamicValidationService.getValidationErrors(this.posValidationRules, this.dynamicValidationService.validationMessages);
  }

  buildPosForm() {
    this.posValidationRules = this.formBuilder.group({
      Firstname: this.dynamicValidationService.dynamicForm.Firstname,
      Dob: this.dynamicValidationService.dynamicForm.Dob,
      Dob2: this.dynamicValidationService.dynamicForm.Dob2,
      ZipCode: this.dynamicValidationService.dynamicForm.ZipCode
    });
  }
}
