import { Component, OnInit } from '@angular/core';
import { CommonService } from '@app/shared/service/common.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent implements OnInit {
  menuHidden = false;
  roleId: any;
  constructor(public commonService: CommonService) {}

  ngOnInit() {
    this.roleId = sessionStorage.getItem('roleId');
  }
  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }
}
