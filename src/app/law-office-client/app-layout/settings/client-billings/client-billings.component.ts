import { Component, OnInit, Input } from '@angular/core';
import { ClientpermissionService } from '@app/auth-guard/client-guard/clientpermission.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '@app/law-office-client/law-office-client.service';

@Component({
  selector: 'client-billings',
  templateUrl: './client-billings.component.html',
  styleUrls: ['./client-billings.component.scss'],
})
export class ClientBillingsComponent implements OnInit {
  @Input()
  isAuthorize = false;
  @Input()
  isSubAdminAuthorize: any = {};

  token: string;
  clientMembersRoles = [];
  constructor(
    private permissionService: ClientpermissionService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.isAuthorize = this.permissionService.isGetAcess();
    this.isSubAdminAuthorize = this.permissionService.isSubAdminGetAcess();
    if (this.isAuthorize) {
      this.GetClientRoles();
    }
  }
  GetClientRoles() {
    // getTeamRoles
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
    this.clientService.GetClientRoles().subscribe(
      (res: any[]) => {
        this.spinner.hide();
        let data = res.filter((l) => l.RoleId !== 1);
        if (!this.isSubAdminAuthorize) {
          data = res.filter((l) => l.RoleId !== 4 && l.RoleId !== 1 && l.RoleId !== 2);
        }
        this.clientMembersRoles = data;
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    );
  }
}
