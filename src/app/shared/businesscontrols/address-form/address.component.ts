import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonService } from '@app/shared/service/common.service';

@Component({
  selector: 'address-form',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  states = [];
  @Input()
  headerTittle: string;
  @Input()
  contactForm: FormGroup;
  @Input()
  contactFormObj: any = {};

  @Input()
  isAptSteFlrNumberDisabled = true;
  @Output()
  emitChangeAptSteFlr = new EventEmitter();
  @Output()
  emitContactinformation = new EventEmitter();
  selectedCountryState: any;

  constructor(public commonService: CommonService) {}

  ngOnInit() {}

  changeAptSteFlr() {
    this.emitChangeAptSteFlr.emit();
  }

  contactinformation() {
    this.emitContactinformation.emit(this.contactFormObj);
  }

  // onCountryChange(country) {
  //   this.commonService.getStates();
  //   let selectedCountry = this.commonService.allCountriesList.find(c => c.name == country);
  //   if (selectedCountry) {
  //     this.states = this.commonService.selectedCountryState.filter(x => x.country_id == selectedCountry.id);
  //   }
  // }
}
