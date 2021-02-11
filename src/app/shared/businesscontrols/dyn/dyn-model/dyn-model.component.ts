import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonService } from '@app/shared/service/common.service';

@Component({
  selector: 'app-dyn-model',
  templateUrl: './dyn-model.component.html',
  styleUrls: ['./dyn-model.component.scss'],
})
export class DynModelComponent implements OnInit {
  @Input() data: any;
  @Output() emitCloseModel = new EventEmitter();

  saveObject = {};

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    // console.log( this.commonService.fileData[this.da], this.data, 'sd')
    // this.commonService.formObject(this.data);
  }

  updateProps(val, name) {
    this.saveObject[name] = val;
    console.log(event, this.saveObject);
  }

  trackByFn(index, item) {
    return index;
  }

  cancel() {
    //this.dialogRef.close();
  }

  save() {
    this.emitCloseModel.emit(this.saveObject);
  }

  returnZero() {
    return 0;
  }
  modalClose() {
    this.emitCloseModel.emit();
  }
}
