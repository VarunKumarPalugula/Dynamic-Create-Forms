import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../service/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-i94-record',
  templateUrl: './i94-record.component.html',
  styleUrls: ['./i94-record.component.scss']
})
export class I94RecordComponent implements OnInit {

 
  @Input() fields: any;
  @Input() applicantKey: any;

  addRecordModal: any;
  index = 0;



  priorSpouseDetailsArray: any;
  recordArray = [];
  maxRecord = 10;

  constructor(public dialog: MatDialog,
    public commonService: CommonService,
    public modalService: NgbModal) {
  }

  ngOnInit(): void {
    if (this.finalObj() && Object.keys(this.finalObj()).length) {
      this.counter(Object.keys(this.finalObj()).length);
    } else {
      this.commonService.fileData[this.applicantKey]['Travel Details']['finalObj']['I94 Record'] = {};
      this.counter(1);
    }
  }



  openRecordDetails(content, i) {
    this.index = i;
    this.addRecordModal = this.modalService.open(content, { centered: false, keyboard: false, size: 'lg', backdrop: 'static' });
  }

  closeModel(value, i) {
    if (value) {
      this.commonService.fileData[this.applicantKey]['Travel Details']['finalObj']['I94 Record'] = {
        ...this.commonService.fileData[this.applicantKey]['Travel Details']['finalObj']['I94 Record'],
        [`I94Record${i}`]: value
      }
      this.commonService.fileData[this.applicantKey]['Travel Details']['I94 Record'].readOnly = false;
    }
    if (this.addRecordModal != undefined) {
      this.addRecordModal.close(value);
    }
  }

  finalObj(i?) {
    return i ? this.commonService.fileData[this.applicantKey]['Travel Details']['finalObj']['I94 Record'][`I94Record${i}`] : this.commonService.fileData[this.applicantKey]['Travel Details']['finalObj']['I94 Record'];
  }

  counter(i: number) {
    this.recordArray = new Array(i);
  }

  incRecord(i: number) {
    this.recordArray.push(new Array(i));
  }

  deleteCard(key) {
    delete this.commonService.fileData[this.applicantKey]['I94 Record']['finalObj'][`I94Record${key}`];
  }


}
