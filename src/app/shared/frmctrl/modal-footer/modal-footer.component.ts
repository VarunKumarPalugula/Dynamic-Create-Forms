import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonService } from '@app/shared/service/common.service';

@Component({
  selector: 'modal-footer',
  templateUrl: './modal-footer.component.html',
  styleUrls: ['./modal-footer.component.scss'],
})
export class ModalFooterComponent implements OnInit {
  @Input()
  isFormValid: any;
  @Input()
  buttonName: string = 'Save Changes';
  @Input()
  isBackBtnRequired = false;
  @Output()
  emitSubmit = new EventEmitter();
  @Output()
  emitCancel = new EventEmitter();
  @Output()
  emitBack = new EventEmitter();
  constructor(public commonService: CommonService) {}

  ngOnInit() {}

  submit() {
    this.emitSubmit.emit();
  }
  cancel() {
    this.emitCancel.emit();
    this.commonService.closeModel('close click');
    this.commonService.getContries();
    this.commonService.getStates();
  }

  back() {
    this.emitBack.emit();
  }
}
