import { CommonService } from '@app/shared/service/common.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dyamic-layout',
  templateUrl: './dyamic-layout.component.html',
  styleUrls: ['./dyamic-layout.component.css']
})
export class DyamicLayoutComponent implements OnInit {

  @Input() data;
  @Input() applicantKey;

  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
  }

  edit(parent) {
    this.commonService.fileData[this.applicantKey][parent].readOnly = false;
  }

  cancel(parent) {
    this.commonService.fileData[this.applicantKey][parent].readOnly = true;
  }

}
