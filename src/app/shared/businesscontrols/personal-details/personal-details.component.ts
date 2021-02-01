import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonService } from '@app/shared/service/common.service';

@Component({
  selector: 'personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
})
export class PersonalDetailsComponent implements OnInit {
  @Input()
  personalForm: FormGroup;

  @Output()
  emitPersonalInfo = new EventEmitter();

  @Output()
  backToPersonalInfoCard = new EventEmitter();

  @Input()
  maxDate = Date;

  @Input()
  usaStatesList: any = [];

  constructor(public commonService: CommonService) {}

  ngOnInit() {
    console.log(this.maxDate);
  }

  personalInfo() {
    this.emitPersonalInfo.emit(this.personalForm.value);
  }

  backToCard() {
    this.backToPersonalInfoCard.emit();
  }
}
