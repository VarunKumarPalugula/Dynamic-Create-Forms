import { Component, Input, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '@app/shared/service/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-travel-document-details',
  templateUrl: './travel-document-details.component.html',
  styleUrls: ['./travel-document-details.component.scss']
})
export class TravelDocumentDetailsComponent implements OnInit {


  @Input() fields: any;
  @Input() applicantKey: any;
  
  addSpouseModal: any;
  
  passportDetails = true;
  
  constructor(public dialog: MatDialog,
    public commonService: CommonService,
    public modalService: NgbModal) {
  }
  
  ngOnInit(): void {
    this.passportDetails = (this.commonService.fileData[this.applicantKey] && this.finalObj() && this.finalObj('passportDetails')) ? false : true;
  }
  
  
  openSpouseDetails(content) {
    this.addSpouseModal = this.modalService.open(content, { centered: false, keyboard: false, size: 'lg', backdrop: 'static' });
  }
  
  closeModel(value, key) {
    if (value) {
      this.commonService.fileData[this.applicantKey]['Martial Status and History']['finalObj']['married'] = {
        ...this.commonService.fileData[this.applicantKey]['Martial Status and History']['finalObj']['married'],
        [key]: value
      }
      this.commonService.fileData[this.applicantKey]['Martial Status and History'].readOnly = false;
      this[key] = false;
    }
    if (this.addSpouseModal != undefined) {
      this.addSpouseModal.close(value);
    }
  }
  
  finalObj(i?) {
    return i ? this.commonService.fileData[this.applicantKey]['Martial Status and History']['finalObj']['married'][i] : this.commonService.fileData[this.applicantKey]['Martial Status and History']['finalObj']['married'];
  }
  
  deleteCard(key) {
    delete this.commonService.fileData[this.applicantKey]['Martial Status and History']['finalObj']['married'][key];
  }
  
  
  
  }