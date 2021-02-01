import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss'],
})
export class OrganizationFormComponent implements OnInit {
  @Input()
  Orgdetails: FormGroup;

  @Input()
  maxDate: Date;

  @Output()
  emitOrganizationInfo = new EventEmitter();

  @Output()
  backToOrganisationCard = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  OrganizationInfo() {
    this.emitOrganizationInfo.emit();
  }

  BackToOrganisationInformation() {
    this.backToOrganisationCard.emit();
  }
}
