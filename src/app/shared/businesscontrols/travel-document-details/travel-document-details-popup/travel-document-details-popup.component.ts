import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../../../../shared/service/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { JsonSectionValidationService } from '@app/shared/service/json-section-validation.service';

@Component({
  selector: 'app-travel-document-details-popup',
  templateUrl: './travel-document-details-popup.component.html',
  styleUrls: ['./travel-document-details-popup.component.css']
})
export class TravelDocumentDetailsPopupComponent implements OnInit {


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


  ngOnInit() { }
  logValidationErrors() {
  }

  formGroupData() {
    this.currentSpouseForm = this.formBuilder.group({
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
