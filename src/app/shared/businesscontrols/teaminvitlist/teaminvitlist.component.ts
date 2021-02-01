import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AdminService } from '@app/law-office-admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RandomColor } from 'angular-randomcolor';
import { CommonService } from '@app/shared/service/common.service';

@Component({
  selector: 'app-teaminvitlist',
  templateUrl: './teaminvitlist.component.html',
  styleUrls: ['./teaminvitlist.component.scss'],
})
export class TeaminvitlistComponent implements OnInit {
  @Input()
  teamInvitersList: any[];

  registrarModel: any;
  CancelModel: any;
  sentModel: any;
  token: any;
  response: any = [];
  searchFilter: string;
  inviteName: string;
  teaminvitity: any;
  p = 1;
  @Output()
  emitTeamInviteList = new EventEmitter();
  colors: any = [];
  Subcolors: any = [];
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.getColor();

    for (var i = 0; i < 100; i++) {
      this.Subcolors.push(this.getsubColor());
    }
  }

  getColor() {
    for (var i = 0; i < 100; i++) {
      const newColor = RandomColor.generateColor();

      this.colors.push(newColor);
    }
  }
  getsubColor() {
    const zeros = '0000000';
    let color = '#' + Math.floor(Math.random() * 0xffffff).toString(16);
    var colorLength = color.length;

    if (colorLength < 90) {
      color += zeros.substring(0, zeros.length - colorLength);
    }

    return color;
  }

  getShortName(fullName) {
    if (fullName) {
      return fullName
        .split(' ')
        .map((n) => n[0])
        .join('');
    } else {
      return '';
    }
  }

  resendDelete(EDStatus: any, popup: any, teaminvitity?: any) {
    this.spinner.show();
    // tslint:disable-next-line:no-unused-expression
    if (!teaminvitity) {
      teaminvitity = this.teaminvitity;
    }
    const obj = {
      OrgId: sessionStorage.getItem('OrganisationID'),
      EDStatus: EDStatus,
      TeamInviteID: teaminvitity.TeamInviteID,
      EmailId: teaminvitity.EmailId,
      FullName: teaminvitity.FullName,
      InvitationId: teaminvitity.InvitationId,
    };
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService.ResendDelete(obj, this.token, this.commonService.getEnvDetails()).subscribe(
      (res: any[]) => {
        this.spinner.hide();
        this.response = res;
        this.emitTeamInviteList.emit();
        if (this.response.Status === 1) {
          this.Close('close click');
        } else if (this.response.Status === 2) {
          this.Modelsent(popup);
          this.inviteName = teaminvitity.FullName;
        } else {
          this.toaster.error(this.response.Message);
        }
      },
      (err) => {
        this.spinner.hide();
        this.toaster.error('Failed');
      }
    );
  }
  deleteModel(content: any, teaminvitity: any) {
    this.teaminvitity = teaminvitity;
    this.registrarModel = this.modalService.open(content, {
      centered: true,
      keyboard: false,
      backdrop: 'static',
    });
  }

  Close(value: string) {
    this.registrarModel.close(value);
  }

  Modelsent(data: any) {
    this.sentModel = this.modalService.open(data, {
      centered: true,
      keyboard: false,
      backdrop: 'static',
    });
  }

  Closesent(value: string) {
    this.sentModel.close(value);
  }
}
