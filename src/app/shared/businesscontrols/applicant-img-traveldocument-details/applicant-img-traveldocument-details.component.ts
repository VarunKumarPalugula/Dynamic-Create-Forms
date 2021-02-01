import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonService } from '@app/shared/service/common.service';

@Component({
  selector: 'applicant-img-traveldocument-details',
  templateUrl: './applicant-img-traveldocument-details.component.html',
  styleUrls: ['./applicant-img-traveldocument-details.component.scss'],
})
export class ApplicantImgTraveldocumentDetailsComponent implements OnInit {
  @Input()
  travelDocumentValidationRules: FormGroup;
  @Input()
  maxDate: Date;

  @Input()
  minDate: Date;

  @Output()
  emitImgTravelDetailsInfo = new EventEmitter();
  constructor(public commonService: CommonService) {}

  ngOnInit() {
    console.log(this.minDate);
  }

  submit() {}
}
