import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from './../../service/common.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-employment-history',
  templateUrl: './employment-history.component.html',
  styleUrls: ['./employment-history.component.scss']
})
export class EmploymentHistoryComponent implements OnInit {

  @Input() applicantKey: any;

  addModal: any;
  selectedEmp: any;

  empArray = [];
  maxEmp = 10;
  showOutsideUSA = false;

  empOptions = [];
  selectEmpOption: string;

  constructor(
    public commonService: CommonService,
    public modalService: NgbModal) {
  }

  ngOnInit(): void {
    if (this.finalObj() && Object.keys(this.finalObj()).length) {
      this.showOutsideUSA = this.finalObj('outsideUSA') ? false : true;
      this.counter(Object.keys(this.finalObj()).length);
      this.setEmpOpions();
    } else {
      this.commonService.fileData[this.applicantKey]['Employment history']['finalObj'] = {};
      this.counter(1);
    }
  }

  setEmpOpions() {
    this.empOptions = [];
    Object.keys(this.finalObj()).forEach(ele => ele != 'employmentoutsideUSA' ? this.empOptions.push(ele) : null);
  }

  finalObj(key?) {
    return key ? this.commonService.fileData[this.applicantKey]['Employment history']['finalObj'][`employment${key}`] : this.commonService.fileData[this.applicantKey]['Employment history']['finalObj'];
  }

  selEmpOption() {
    this.commonService.fileData[this.applicantKey]['Employment history']['finalObj'] = {
      ...this.commonService.fileData[this.applicantKey]['Employment history']['finalObj'],
      'employmentoutsideUSA': this.commonService.fileData[this.applicantKey]['Employment history']['finalObj'][this.selectEmpOption]
    }
    this.showOutsideUSA = false;
  }


  openEmpDetails(content, key) {
    this.selectedEmp = `employment${key}`;
    this.addModal = this.modalService.open(content, { centered: false, keyboard: false, backdrop: 'static' });
  }

  optionChang() {
    this.showOutsideUSA = true;
    this.selectEmpOption = '';
    delete this.commonService.fileData[this.applicantKey]['Employment history']['finalObj']['employmentoutsideUSA']
  }


  closeModel(value, key) {
    if (value) {
      this.commonService.fileData[this.applicantKey]['Employment history']['finalObj'] = {
        ...this.commonService.fileData[this.applicantKey]['Employment history']['finalObj'],
        [key]: value
      }
      this.commonService.fileData[this.applicantKey]['Employment history'].readOnly = false;
      if (key == 'employmentoutsideUSA') {
        this.showOutsideUSA = false;
      } 
      // this.setEmpOpions();
    }
    if (this.addModal != undefined) {
      this.addModal.close(value);
    }
  }

  counter(i: number) {
    this.empArray = new Array(i);
  }

  incEmployment(i: number) {
    this.empArray.push(new Array(i));
  }

}
