import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pos-details',
  templateUrl: './pos-details.component.html',
  styleUrls: ['./pos-details.component.css']
})
export class PosDetailsComponent implements OnInit {
  addPosModel: any;

  @Input() fields: any;
  @Input() applicantKey: any;
  @Input() parent: any
  
  constructor(public modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openPos(content){
    this.addPosModel = this.modalService.open(content, { centered: false, keyboard: false, backdrop: 'static' });
  }

}
