import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-applicant-child',
  templateUrl: './applicant-child.component.html',
  styleUrls: ['./applicant-child.component.css'],
})
export class ApplicantChildComponent implements OnInit {
  childDetails: boolean = true;
  addChildModal: any;
  constructor(public modalService: NgbModal) {}

  ngOnInit(): void {}

  addChildDetails(content) {
    this.addChildModal = this.modalService.open(content, {
      centered: false,
      keyboard: false,
      size: 'lg',
      backdrop: 'static',
    });
  }
  close() {
    this.modalService.dismissAll();
  }
}
