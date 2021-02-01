import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})

export class CountryDetailsComponent implements OnInit {

  detailsForm: FormGroup;

  @Input() isCard = false;
  @Input() fields: any;
  @Output() detailsEmit = new EventEmitter();

  @Input() set data(value: any) {
    this.formGroupData();
    if (value && Object.keys(value).length) {
      this.detailsForm.patchValue({
        Country: value.Country ? value.Country : null,
        State: value.State ? value.State : null,
        CityOrTown: value.CityOrTown ? value.CityOrTown : null
      }
      );
    }
  }


  constructor(
    private readonly formBuilder: FormBuilder,
    public commonService: CommonService
  ) {
  }

  ngOnInit(): void {
  }

  formGroupData() {
    this.detailsForm = this.formBuilder.group({
      Country: [null],
      State: [null],
      CityOrTown: [null]
    });
  }

  formData(contl) {
    return this.detailsForm.get(contl).value;
  }

  changes() {
    this.detailsEmit.emit(this.detailsForm.value)
  }

}
