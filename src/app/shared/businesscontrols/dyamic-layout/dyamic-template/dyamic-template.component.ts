import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonService } from '@app/shared/service/common.service';


@Component({
  selector: 'app-dyamic-template',
  templateUrl: './dyamic-template.component.html',
  styleUrls: ['./dyamic-template.component.css']
})
export class DyamicTemplateComponent implements OnInit {

  @Input() fields: any;
  @Input() parent: any;
  @Input() readOnly: any;
  @Input() parentChild: any;
  @Input() applicantKey: any;


  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
  }


  trackByFn(index, item) {
    return index;
  }

  change(val, fields, parent, parentChild) {
    if (parentChild) {
      this.commonService.fileData[this.applicantKey][parent.trim()][parentChild][fields.name].value = val;
      this.commonService.fileData[this.applicantKey][parent.trim()].finalObj = {
        ...this.commonService.fileData[this.applicantKey][parent.trim()].finalObj,
        [parentChild]: {
          ...this.commonService.fileData[this.applicantKey][parent.trim()].finalObj[parentChild],
          [fields.name]: val
        }
      }
    } else {
      this.commonService.fileData[this.applicantKey][parent.trim()].finalObj[fields.name] = val;
      this.commonService.fileData[this.applicantKey][parent.trim()][fields.name].value = val;
      this.commonService.changeFormValue(fields, val, parent, this.applicantKey);
    }
  }


  displayValue(parent, child, name) {
    if (child) {
      return (this.commonService.fileData[this.applicantKey] && this.commonService.fileData[this.applicantKey][parent] && this.commonService.fileData[this.applicantKey][parent][child] && this.commonService.fileData[this.applicantKey][parent][child][name] && this.commonService.fileData[this.applicantKey][parent][child][name].value) ? this.commonService.fileData[this.applicantKey][parent][child][name].value : '';
    } else {
      return (this.commonService.fileData[this.applicantKey] && this.commonService.fileData[this.applicantKey][parent]  && this.commonService.fileData[this.applicantKey][parent][name] && this.commonService.fileData[this.applicantKey][parent][name].value) ? this.commonService.fileData[this.applicantKey][parent][name].value : '';
    }
  }

  detailsEmit(data, parent, fields) {
    Object.keys(data.value).forEach(res => this.commonService.fileData[this.applicantKey][parent.trim()].finalObj[res] = data[res]);
    this.commonService.fileData[this.applicantKey][parent.trim()][fields.type].valid = data.valid
  }


}
