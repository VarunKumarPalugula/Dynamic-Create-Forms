import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../service/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-child-details',
  templateUrl: './child-details.component.html',
  styleUrls: ['./child-details.component.scss'],
})
export class ChildDetailsComponent implements OnInit {
  @Input() fields: any;
  @Input() applicantKey: any;

  addChildModal: any;
  index = 0;

  priorSpouseDetailsArray: any;
  childArray = [];
  maxChild = 3;

  constructor(public dialog: MatDialog, public commonService: CommonService, public modalService: NgbModal) {}

  ngOnInit(): void {
    if (this.finalObj() && Object.keys(this.finalObj()).length) {
      this.counter(Object.keys(this.finalObj()).length);
    } else {
      this.commonService.fileData[this.applicantKey]['Children Information']['finalObj'] = {};
      this.counter(1);
    }
  }

  openChildDetails(content, i) {
    this.index = i;
    this.addChildModal = this.modalService.open(content, {
      centered: false,
      keyboard: false,
      size: 'lg',
      backdrop: 'static',
    });
  }

  closeModel(value, i) {
    if (value) {
      this.commonService.fileData[this.applicantKey]['Children Information']['finalObj'] = {
        ...this.commonService.fileData[this.applicantKey]['Children Information']['finalObj'],
        [`child${i}`]: value,
      };
      this.commonService.fileData[this.applicantKey]['Children Information'].readOnly = false;
    }
    if (this.addChildModal != undefined) {
      this.addChildModal.close(value);
    }
  }

  finalObj(i?) {
    return i
      ? this.commonService.fileData[this.applicantKey]['Children Information']['finalObj'][`child${i}`]
      : this.commonService.fileData[this.applicantKey]['Children Information']['finalObj'];
  }

  counter(i: number) {
    this.childArray = new Array(i);
  }

  incChild(i: number) {
    this.childArray.push(new Array(i));
  }

  deleteCard(key) {
    delete this.commonService.fileData[this.applicantKey]['Children Information']['finalObj'][`child${key}`];
    this.commonService.fileData[this.applicantKey]['Children Information'].readOnly = false;
  }
}
