import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClientFilingsService } from '../../filings.service';

@Component({
  selector: 'app-case-submissions',
  templateUrl: './case-submissions.component.html',
  styleUrls: ['./case-submissions.component.scss'],
})
export class CaseSubmissionsComponent implements OnInit {
  filingId: any;
  orgId: any;
  token: any;
  filingType: string = 'H1';
  getCaseSubmissionsData = [];
  constructor(
    private filingService: ClientFilingsService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.filingId = sessionStorage.getItem('FillingId');
    this.orgId = sessionStorage.getItem('ClientAdminOrgId');
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
  }

  ngOnInit(): void {
    this.getCaseSubMissions();
  }
  getCaseSubMissions() {
    this.spinner.show();
    this.filingService.getCaseSubs(this.orgId, this.filingId, this.filingType, this.token).subscribe((res: any) => {
      this.spinner.hide();
      if (res != null && res.length >= 0) {
        this.getCaseSubmissionsData = res;
      } else {
        this.getCaseSubmissionsData = [];
        this.toaster.info('Failed to load case submissions data');
      }
    });
  }
}
