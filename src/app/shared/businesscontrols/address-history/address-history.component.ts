import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from './../../service/common.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-address-history',
  templateUrl: './address-history.component.html',
  styleUrls: ['./address-history.component.scss']
})
export class AddressHistoryComponent implements OnInit {

  @Input() applicantKey: any;
  
  addrModal: any;
  selectedAddr: any;

  addrArray = [];
  maxAddr = 10;
  showOutsideUSA = false;

  addrOptions = [];
  selectAddrOption: string;

  constructor(
    public commonService: CommonService,
    public modalService: NgbModal) {
  }

  ngOnInit(): void {
    if (this.finalObj() && Object.keys(this.finalObj()).length) {
      this.showOutsideUSA = this.finalObj('outsideUSA') ? false : true;
      this.counter(Object.keys(this.finalObj()).length);
      this.setAddrOpions();
    } else {
      this.commonService.fileData[this.applicantKey]['Address History']['finalObj'] = {};
      this.counter(1);
    }
  }

  setAddrOpions() {
    this.addrOptions = [];
    Object.keys(this.finalObj()).forEach(ele => ele != 'addroutsideUSA' ? this.addrOptions.push(ele) : null);
  }


  finalObj(key?) {
    return key ? this.commonService.fileData[this.applicantKey]['Address History']['finalObj'][`addr${key}`] : this.commonService.fileData[this.applicantKey]['Address History']['finalObj'];
  }

  selAddrOption() {
    this.commonService.fileData[this.applicantKey]['Address History']['finalObj'] = {
      ...this.commonService.fileData[this.applicantKey]['Address History']['finalObj'],
      'addroutsideUSA': this.commonService.fileData[this.applicantKey]['Address History']['finalObj'][this.selectAddrOption]
    }
    this.showOutsideUSA = false;
  }

  deleteCard(key) {
    delete this.commonService.fileData[this.applicantKey]['Address History']['finalObj'][`addr${key}`];
    this.commonService.fileData[this.applicantKey]['Address History'].readOnly = false;
  }


  openAddrDetails(content, key) {
    this.selectedAddr = `addr${key}`;
    this.addrModal = this.modalService.open(content, { centered: false, keyboard: false, backdrop: 'static' });
  }

  optionChang() {
    this.showOutsideUSA = true;
    this.selectAddrOption = '';
    delete this.commonService.fileData[this.applicantKey]['Address History']['finalObj']['addroutsideUSA']
  }


  closeModel(value, key) {
    if (value) {
      this.commonService.fileData[this.applicantKey]['Address History']['finalObj'] = {
        ...this.commonService.fileData[this.applicantKey]['Address History']['finalObj'],
        [key]: value
      }
      this.commonService.fileData[this.applicantKey]['Address History'].readOnly = false;
      if (key == 'addroutsideUSA') {
        this.showOutsideUSA = false;
      } 
      // this.setAddrOpions();
    }
    if (this.addrModal != undefined) {
      this.addrModal.close(value);
    }
  }

  counter(i: number) {
    this.addrArray = new Array(i);
  }

  incAddr(i: number) {
    this.addrArray.push(new Array(i));
  }


}
