import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  addressDetails:boolean = true
  addAddressModalId:any
  constructor(public modalService: NgbModal) { }

  ngOnInit(): void {
  }
  addAddressDetails(content) {
    this.addAddressModalId = this.modalService.open(content, { centered: false, keyboard: false, size: 'sm', backdrop: 'static' });
  }
  close(){
    this.modalService.dismissAll();
  }

}
