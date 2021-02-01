import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AdminClientService } from '@app/law-office-admin/app-layout/clients/client.service';

@Component({
  selector: 'app-admin-client-import-invite-confirm',
  templateUrl: './admin-client-import-invite-confirm.component.html',
  styleUrls: ['./admin-client-import-invite-confirm.component.scss'],
})
export class AdminClientImportInviteConfirmComponent implements OnInit {
  csvContent: string;
  token: string;
  clientData: any = [];
  headerOne: number;
  headerTwo: number;
  headerThree: number;
  headerFour: number;
  headerFive: number;
  path: string;

  constructor(private router: Router, private clientService: AdminClientService) {}

  ngOnInit() {
    this.importedClientData();
  }

  importedClientData() {
    this.clientData = JSON.parse(sessionStorage.getItem('importedClientData'));
    this.path = this.clientData[0].path;
  }

  selectedRows() {
    const obj = {
      FirstNameindex: this.headerOne,
      LastNameindex: this.headerTwo,
      OrganizationNameindex: this.headerThree,
      Email1index: this.headerFour,
      path: this.path,
    };
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.clientService.getCSVClientData(obj, this.token).subscribe(
      (res: any) => {
        sessionStorage.setItem('clientCSVdata', JSON.stringify(res));
        this.router.navigate(['/admin/clients/clientimportfinsih']);
      },
      (error) => {
        this.router.navigate(['/admin/clients/clientimportfinsih']);
      }
    );
  }
}
