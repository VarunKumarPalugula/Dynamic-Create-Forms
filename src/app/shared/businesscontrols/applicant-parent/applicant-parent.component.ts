import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-applicant-parent',
  templateUrl: './applicant-parent.component.html',
  styleUrls: ['./applicant-parent.component.css']
})
export class ApplicantParentComponent implements OnInit {
  parentDetails: boolean = true
  addParentModal:any
  
  constructor(public modalService: NgbModal) { }

  ngOnInit(): void {
  }
  addParentDetails(content) {
    this.addParentModal = this.modalService.open(content, { scrollable: true,centered: false, keyboard: false, size: 'lg' });
  }
  close(){
    this.modalService.dismissAll();
  }
}
