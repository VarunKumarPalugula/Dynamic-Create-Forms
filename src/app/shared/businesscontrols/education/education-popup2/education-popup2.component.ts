import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../../../../shared/service/common.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-education-popup2',
  templateUrl: './education-popup2.component.html',
  styleUrls: ['./education-popup2.component.scss']
})
export class EducationPopup2Component implements OnInit {

  @Output() emitCloseModel = new EventEmitter();
  @Output() emitBackModel = new EventEmitter();
  
  @Input() isCard = false;

  @Input() set data(value: any) {
    this.formGroupData();
    if (value) {
      this.education2DetailsForm.patchValue({
        StreetNumberAndName: value.StreetNumberAndName ? value.StreetNumberAndName : null,
        aptSteFlr: value.aptSteFlr ?  value.aptSteFlr : null,
        AptSteFlrNumber: value.AptSteFlrNumber ? value.AptSteFlrNumber : null,
        Country: value.Country ? value.Country: null,
        State: value.State ? value.State: null,
        CityOrTown: value.CityOrTown ? value.CityOrTown: null,
        ZipCode: value.ZipCode ? value.ZipCode: null,
        Fax: value.Fax ? value.Fax: null,
        DayTimePhone: value.DayTimePhone ? value.DayTimePhone: null,
        MobilePhone: value.MobilePhone ? value.MobilePhone: null,
        Email: value.Email ? value.Email: null
      })
    }
  }

  education2DetailsForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private commonService: CommonService
  ) { }

  ngOnInit() {
  }

  formGroupData() {
    this.education2DetailsForm = this.formBuilder.group({
      StreetNumberAndName: [null],
      aptSteFlr: [null],
      AptSteFlrNumber: [null],
      Country: [null],
      State: [null],
      CityOrTown: [null],
      Province: [null],
      ZipCode: [null],
      Fax: [null],
      DayTimePhone: [null],
      MobilePhone: [null],
      Email: [null]
    });
  }

  formData(contl) {
    return this.education2DetailsForm.get(contl).value;
  }

  save() {
    if (this.education2DetailsForm.invalid) {
      return;
    }
    this.emitCloseModel.emit(this.education2DetailsForm.value)
  }

  cancel(): void {
      this.emitCloseModel.emit(null);
  }

  back() {
    this.emitBackModel.emit();
  }

}