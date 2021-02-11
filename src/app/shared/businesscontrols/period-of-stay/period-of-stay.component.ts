import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../service/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-period-of-stay',
  templateUrl: './period-of-stay.component.html',
  styleUrls: ['./period-of-stay.component.scss'],
})
export class PeriodOfStayComponent implements OnInit {
  @Input() fields: any;
  @Input() applicantKey: any;

  addPeriodModal: any;
  index = 0;

  priorSpouseDetailsArray: any;
  periodArray = [];
  maxPeriod = 3;

  constructor(public dialog: MatDialog, public commonService: CommonService, public modalService: NgbModal) {}

  ngOnInit(): void {
    if (this.finalObj() && Object.keys(this.finalObj()).length) {
      this.counter(Object.keys(this.finalObj()).length);
    } else {
      this.commonService.fileData[this.applicantKey]['period of stay']['finalObj'] = {};
      this.counter(1);
    }
  }

  openPeriodDetails(content, i) {
    this.index = i;
    this.addPeriodModal = this.modalService.open(content, {
      centered: false,
      keyboard: false,
      size: 'lg',
      backdrop: 'static',
    });
  }

  closeModel(value, i) {
    if (value) {
      this.commonService.fileData[this.applicantKey]['period of stay']['finalObj'] = {
        ...this.commonService.fileData[this.applicantKey]['period of stay']['finalObj'],
        [`period${i}`]: value,
      };
      this.commonService.fileData[this.applicantKey]['period of stay'].readOnly = false;
    }
    if (this.addPeriodModal != undefined) {
      this.addPeriodModal.close(value);
    }
  }

  finalObj(i?) {
    return i
      ? this.commonService.fileData[this.applicantKey]['period of stay']['finalObj'][`period${i}`]
      : this.commonService.fileData[this.applicantKey]['period of stay']['finalObj'];
  }

  counter(i: number) {
    this.periodArray = new Array(i);
  }

  incPeriod(i: number) {
    this.periodArray.push(new Array(i));
  }

  deleteCard(key) {
    delete this.commonService.fileData[this.applicantKey]['Martial Status and History']['finalObj']['married'][
      `period${key}`
    ];
    this.commonService.fileData[this.applicantKey]['period of stay'].readOnly = false;
  }
}
