import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminClientService } from '@app/law-office-admin/app-layout/clients/client.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AdminSignup } from '@app/models/law-office-admin/AdminSignup';
import { CommonService } from '@app/shared/service/common.service';

@Component({
  selector: 'app-admin-client-import-finish',
  templateUrl: './admin-client-import-finish.component.html',
  styleUrls: ['./admin-client-import-finish.component.scss'],
})
export class AdminClientImportFinishComponent implements OnInit {
  data: any = [];
  choices: any = [];
  token: string;
  admin: AdminSignup = new AdminSignup();
  inviationResponse: any;
  constructor(
    private spinner: NgxSpinnerService,
    private adminClientService: AdminClientService,
    private toaster: ToastrService,
    private route: Router,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.CleintCSVData();
  }

  CleintCSVData() {
    this.data = JSON.parse(sessionStorage.getItem('clientCSVdata'));
  }

  sendInvite() {
    for (let i = 0; i < this.data.length; i++) {
      this.choices.push({
        OrgId: sessionStorage.getItem('OrganisationID'),
        FullName: this.data[i].FirstName + '' + this.data[i].LastName,
        Email: this.data[i].Email1,
      });
    }
    this.spinner.show();
    this.admin.OrgId = sessionStorage.getItem('OrganisationID');
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminClientService.sendInvite(this.choices, this.commonService.getEnvDetails()).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.inviationResponse = data;
        this.toaster.success('Mail sent successfully', 'success');
        sessionStorage.setItem('clientinvitelist', JSON.stringify(this.choices));
        this.route.navigate(['/admin/clients/clientinvitesuccess']);
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }
}
