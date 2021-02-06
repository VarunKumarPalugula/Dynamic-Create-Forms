import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../service/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-parent-details',
  templateUrl: './parent-details.component.html',
  styleUrls: ['./parent-details.component.scss']
})
export class ParentDetailsComponent implements OnInit {


  @Input() fields: any;
  @Input() applicantKey: any;

  addParentModal: any;
  index = 0;



  priorSpouseDetailsArray: any;
  parentArray = [];
  maxParent = 2;

  constructor(public dialog: MatDialog,
    public commonService: CommonService,
    public modalService: NgbModal) {
  }

  ngOnInit(): void {
    if (this.finalObj() && Object.keys(this.finalObj()).length) {
      this.counter(Object.keys(this.finalObj()).length);
    } else {
      this.commonService.fileData[this.applicantKey]['Parent Information']['finalObj'] = {};
      this.counter(1);
    }
  }



  openParentDetails(content, i) {
    this.index = i;
    this.addParentModal = this.modalService.open(content, { centered: false, keyboard: false, size: 'lg', backdrop: 'static' });
  }

  closeModel(value, i) {
    if (value) {
        this.commonService.fileData[this.applicantKey]['Parent Information']['finalObj'] = {
          ...this.commonService.fileData[this.applicantKey]['Parent Information']['finalObj'],
          [`parent${i}`]: value
        }
      this.commonService.fileData[this.applicantKey]['Parent Information'].readOnly = false;
    }
    if (this.addParentModal != undefined) {
      this.addParentModal.close(value);
    }
  }

  finalObj(i?) {
    return i ? this.commonService.fileData[this.applicantKey]['Parent Information']['finalObj'][`parent${i}`] : this.commonService.fileData[this.applicantKey]['Parent Information']['finalObj'];
  }

  counter(i: number) {
    this.parentArray = new Array(i);
  }

  incParent(i: number) {
    this.parentArray.push(new Array(i));
  }

  deleteCard(key) {
    delete this.commonService.fileData[this.applicantKey]['Parent Information']['finalObj'][`parent${key}`];
    this.commonService.fileData[this.applicantKey]['Parent Information'].readOnly = false;
  }

}
