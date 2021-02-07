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

  ngOnInit(): void { }


  trackByFn(index, item) {
    return index;
  }

  change(val, fields, parent, parentChild) {
    let obj = { id: '', text: '' };
    if (fields.type === 'dropdown') {
      obj = fields.list.find(res => res.text === val);
      val = { [obj.id]: obj.text };
    }
    if (parentChild) {
      this.commonService.fileData[this.applicantKey][parent.trim()][parentChild][fields.name].value = (fields.type === 'dropdown') ? obj.text : val;
      this.commonService.fileData[this.applicantKey][parent.trim()].finalObj = {
        ...this.commonService.fileData[this.applicantKey][parent.trim()].finalObj,
        [parentChild]: {
          ...this.commonService.fileData[this.applicantKey][parent.trim()].finalObj[parentChild],
          [fields.name]: val
        }
      }
    } else {
      this.commonService.fileData[this.applicantKey][parent.trim()].finalObj[fields.name] = val;
      this.commonService.fileData[this.applicantKey][parent.trim()][fields.name].value = (fields.type === 'dropdown') ? obj.text : val;
      this.commonService.changeFormValue(fields, val, parent, this.applicantKey);
    }
  }


  displayValue(parent, child, name) {
    if (child) {
      return (this.commonService.fileData[this.applicantKey][parent][child][name].value) ? this.commonService.fileData[this.applicantKey][parent][child][name].value : '';
    } else {
      return (this.commonService.fileData[this.applicantKey][parent][name].value) ? this.commonService.fileData[this.applicantKey][parent][name].value : '';
    }
  }

  detailsEmit(data, parent, fields) {
    Object.keys(data.value).forEach(res => this.commonService.fileData[this.applicantKey][parent.trim()].finalObj[res] = data.value[res]);
    this.commonService.fileData[this.applicantKey][parent.trim()][fields.type].valid = data.valid
  }

  readOnlyObj(applicantKey, parent) {
    return this.commonService.fileData[applicantKey][parent].readOnly;
  }

  asteriskObj(applicantKey, parent, parentChild, fields) {
    return parentChild ? !this.commonService.fileData[applicantKey][parent][parentChild][fields.name].required &&
      !this.commonService.fileData[applicantKey][parent].readOnly :
      !this.commonService.fileData[applicantKey][parent][fields.name].required &&
      !this.commonService.fileData[applicantKey][parent].readOnly
  }

}
