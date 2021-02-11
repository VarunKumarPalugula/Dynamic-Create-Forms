import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonService } from '@app/shared/service/common.service';

@Component({
  selector: 'app-dyamic-template',
  templateUrl: './dyamic-template.component.html',
  styleUrls: ['./dyamic-template.component.css'],
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

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }

  change(val, fields, parent, parentChild) {
    let obj = { id: '', text: '' };
    if (fields.type === 'dropdown') {
      obj = fields.list.find((res) => res.text === val);
      val = { [obj.id]: obj.text };
    }
    if (fields.type === 'date') {
      const dateValue = new Date(val);
      const date = dateValue
        ? dateValue.getMonth() + 1 + '/' + dateValue.getDate() + '/' + dateValue.getFullYear()
        : '';
      obj.text = date;
    }
    if (parentChild) {
      this.commonService.fileData[this.applicantKey][parent.trim()][parentChild][fields.name].value =
        fields.type === 'dropdown' ? obj.text : val;
      this.commonService.fileData[this.applicantKey][parent.trim()].finalObj = {
        ...this.commonService.fileData[this.applicantKey][parent.trim()].finalObj,
        [parentChild]: {
          ...this.commonService.fileData[this.applicantKey][parent.trim()].finalObj[parentChild],
          [fields.name]: val,
        },
      };
    } else {
      this.commonService.fileData[this.applicantKey][parent.trim()].finalObj[fields.name] =
        fields.type === 'date' ? obj.text : val;
      this.commonService.fileData[this.applicantKey][parent.trim()][fields.name].value =
        fields.type === 'dropdown' ? obj.text : val;
      this.commonService.changeFormValue(fields, val, parent, this.applicantKey);
    }
  }

  displayValue(parent, child, fields) {
    if (child) {
      return this.commonService.fileData[this.applicantKey][parent][child][fields.name].value
        ? fields.type === 'date'
          ? this.checkDatePicker(this.commonService.fileData[this.applicantKey][parent][child][fields.name].value)
          : this.commonService.fileData[this.applicantKey][parent][child][fields.name].value
        : '';
    } else {
      return this.commonService.fileData[this.applicantKey][parent][fields.name].value
        ? fields.type === 'date'
          ? this.checkDatePicker(this.commonService.fileData[this.applicantKey][parent][fields.name].value)
          : this.commonService.fileData[this.applicantKey][parent][fields.name].value
        : '';
    }
  }

  checkDatePicker(val) {
    const dateValue = new Date(val);
    const date = val ? dateValue.getFullYear() + 1 + '-' + dateValue.getMonth() + 1 + '-' + dateValue.getDate() : '';
    return date;
  }

  detailsEmit(data, parent, fields) {
    Object.keys(data.value).forEach(
      (res) => (this.commonService.fileData[this.applicantKey][parent.trim()].finalObj[res] = data.value[res])
    );
    this.commonService.fileData[this.applicantKey][parent.trim()][fields.type].valid = data.valid;
  }

  readOnlyObj(applicantKey, parent) {
    return this.commonService.fileData[applicantKey][parent].readOnly;
  }

  asteriskObj(applicantKey, parent, parentChild, fields) {
    return parentChild
      ? !this.commonService.fileData[applicantKey][parent][parentChild][fields.name].required &&
      !this.commonService.fileData[applicantKey][parent].readOnly
      : !this.commonService.fileData[applicantKey][parent][fields.name].required &&
      !this.commonService.fileData[applicantKey][parent].readOnly;
  }
}
