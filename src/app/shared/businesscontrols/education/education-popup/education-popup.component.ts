import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../../../../shared/service/common.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-education-popup',
  templateUrl: './education-popup.component.html',
  styleUrls: ['./education-popup.component.scss'],
})
export class EducationPopupComponent implements OnInit {
  @Output() emitCloseModel = new EventEmitter();

  @Input() isCard = false;

  @Input() set tempData(value: any) {
    this.patchValue(value);
  }

  @Input() set data(value: any) {
    this.formGroupData();
    this.patchValue(value);
  }

  educationDetailsForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder, private commonService: CommonService) {}

  ngOnInit() {}

  patchValue(value) {
    if (value) {
      this.educationDetailsForm.patchValue({
        FieldOfStudy: value.FieldOfStudy ? value.FieldOfStudy : null,
        DegreeAwarded: value.DegreeAwarded ? value.DegreeAwarded : null,
        UniversityType: value.UniversityType ? value.UniversityType : null,
        UniversityName: value.UniversityName ? value.UniversityName : null,
        DateOfDegreeAwarded: value.DateOfDegreeAwarded ? value.DateOfDegreeAwarded : null,
        IsHighestLevelOfEducation: value.IsHighestLevelOfEducation ? value.IsHighestLevelOfEducation : null,
      });
    }
  }

  formGroupData() {
    this.educationDetailsForm = this.formBuilder.group({
      FieldOfStudy: [null],
      DegreeAwarded: [null],
      UniversityType: [null],
      UniversityName: [],
      DateOfDegreeAwarded: [null],
      IsHighestLevelOfEducation: [null],
    });
  }

  formData(contl) {
    return this.educationDetailsForm.get(contl).value;
  }

  save() {
    if (this.educationDetailsForm.invalid) {
      return;
    }
    this.emitCloseModel.emit(this.educationDetailsForm.value);
  }

  cancel(): void {
    this.emitCloseModel.emit(null);
  }
}
