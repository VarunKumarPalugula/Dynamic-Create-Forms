import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientService } from '../../../law-office-client/law-office-client.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '@app/shared/service/common.service';
import { Http, ResponseContentType } from '@angular/http';

@Component({
  selector: 'app-employement-support-documents',
  templateUrl: './employement-support-documents.component.html',
  styleUrls: ['./employement-support-documents.component.scss'],
})
export class EmployementSupportDocumentsComponent implements OnInit {
  token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');

  @Input() applicantKey: any;

  resume = [];
  recentW2 = [];
  recentPayStubs = [];
  eadCards = [];

  selectDeleteFile = {
    file: null,
    type: '',
  };

  resumeExn = ['pdf']

  constructor(
    public spinner: NgxSpinnerService,
    private clientService: ClientService,
    private toaster: ToastrService,
    public commonService: CommonService,
    public modalService: NgbModal,
    private http: Http
  ) {}

  ngOnInit(): void {}
}
