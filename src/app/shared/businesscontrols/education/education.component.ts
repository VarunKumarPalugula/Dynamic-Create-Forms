import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../service/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {


  @Input() fields: any;
  @Input() applicantKey: any;

  addEducationModal: any;
  index = 0;


  educationFormData = null;
  priorSpouseDetailsArray: any;
  educationArray = [];
  maxEducation = 3;

  constructor(public dialog: MatDialog,
    public commonService: CommonService,
    public modalService: NgbModal) {
  }

  ngOnInit(): void {
    if (this.finalObj() && Object.keys(this.finalObj()).length) {
      this.counter(Object.keys(this.finalObj()).length);
    } else {
      this.commonService.fileData[this.applicantKey]['Education Information']['finalObj'] = {};
      this.counter(1);
    }
  }



  openEducationDetails(content, i) {
    this.educationFormData = null;
    this.index = i;
    this.addEducationModal = this.modalService.open(content, { centered: false, keyboard: false, size: 'lg', backdrop: 'static' });
  }

  backToModel1(content) {
    if (this.addEducationModal != undefined) {
      this.addEducationModal.close();
    }
    this.addEducationModal = this.modalService.open(content, { centered: false, keyboard: false, size: 'lg', backdrop: 'static' });
  }

  closeModel(value, i) {
    if (value) {
      this.educationFormData = { ...this.educationFormData, ...value }
      this.commonService.fileData[this.applicantKey]['Education Information']['finalObj'] = {
        ...this.commonService.fileData[this.applicantKey]['Education Information']['finalObj'],
        [`education${i}`]: this.educationFormData
      }
      this.educationFormData = null;
      this.commonService.fileData[this.applicantKey]['Education Information'].readOnly = false;
    }
    if (this.addEducationModal != undefined) {
      this.addEducationModal.close(value);
    }
  }

  updateFormValues(content, value, i) {
    if (this.addEducationModal != undefined) {
      this.addEducationModal.close(value);
    }
    if (value) {
      this.educationFormData = value;
      this.index = i;
      this.addEducationModal = this.modalService.open(content, { centered: false, keyboard: false, size: 'lg', backdrop: 'static' });
    }
  }

  finalObj(i?) {
    return i ? this.commonService.fileData[this.applicantKey]['Education Information']['finalObj'][`education${i}`] : this.commonService.fileData[this.applicantKey]['Education Information']['finalObj'];
  }

  counter(i: number) {
    this.educationArray = new Array(i);
  }

  incEducation(i: number) {
    this.educationArray.push(new Array(i));
  }

}
