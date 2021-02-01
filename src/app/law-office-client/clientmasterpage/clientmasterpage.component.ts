import { Component, OnInit } from '@angular/core';
import { ClientpermissionService } from '@app/auth-guard/client-guard/clientpermission.service';
import { Router } from '@angular/router';
import { AutotimeoutService } from '@app/shared/service/autotimeout.service';
import { StorageService } from '@app/shared/service/storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-clientmasterpage',
  templateUrl: './clientmasterpage.component.html',
  styleUrls: ['./clientmasterpage.component.scss'],
})
export class ClientmasterpageComponent implements OnInit {
  menuHidden = false;
  roleId: any;
  isAuthorize = false;
  loadSubAdminPermissions: any = {};
  username: string;
  email: string;
  userLogoName: string;
  logOutConfrimation: any;

  constructor(
    public permissionService: ClientpermissionService,
    private router: Router,
    private autoTimeService: AutotimeoutService,
    public sessionImage: StorageService,
    private modalService: NgbModal
  ) {
    this.autoTimeService.autoTimeOut();
  }

  ngOnInit() {
    this.roleId = sessionStorage.getItem('roleId');
    this.email = sessionStorage.getItem('Email');
    this.username = sessionStorage.getItem('ClientAdminUserName');
    if (this.username) {
      this.userLogoName = this.username.slice(0, 1).toUpperCase();
      //console.log('slice',this.userLogoName )
    }

    //here we are getting role team member/primary admin/sub admin
    this.isAuthorize = this.permissionService.isGetAcess();
    this.loadSubAdminPermissions = this.permissionService.GenericPermissions();
  }
  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }
  logout() {
    sessionStorage.clear();
    this.router.navigate(['client']);
    this.closeConfirmDelete('close click');
  }

  logOutConfirmationPopUp(popUp: any) {
    this.logOutConfrimation = this.modalService.open(popUp, { centered: true, keyboard: false, backdrop: 'static' });
  }

  closeConfirmDelete(value: string) {
    this.logOutConfrimation.close(value);
  }
}
