import { Component, OnInit } from '@angular/core';
import { FilingsService } from '@app/law-office-admin/app-layout/fillings/filings.service';
import { ClientFilingsService } from '@app/law-office-client/app-layout/fillings/filings.service';

@Component({
  selector: 'app-filling-layout',
  templateUrl: './filling-layout.component.html',
  styleUrls: ['./filling-layout.component.scss'],
})
export class FillingLayoutComponent implements OnInit {
  filingName: string;
  isIncompleteFiling: boolean;

  constructor(public filingService: ClientFilingsService) {}
  ngOnInit() {
    this.filingName = sessionStorage.getItem('FName');
    if (this.filingName == 'InComplete') {
      this.isIncompleteFiling = true;
    } else {
      this.isIncompleteFiling = false;
    }
  }
}
