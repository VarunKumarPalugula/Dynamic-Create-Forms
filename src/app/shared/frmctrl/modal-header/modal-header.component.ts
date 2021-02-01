import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '@app/shared/service/common.service';

@Component({
  selector: 'modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss'],
})
export class ModalHeaderComponent implements OnInit {
  @Input()
  headerTittle: string;
  @Output()
  emitCloseModel = new EventEmitter();

  // closeModel(value) {

  //   //this.emitCloseModel.emit(value);
  // }

  constructor(public commonService: CommonService) {}

  ngOnInit() {}
}
