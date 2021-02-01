import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  TemplateRef,
  Input,
  OnDestroy,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AdminService } from '@app/law-office-admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RandomColor } from 'angular-randomcolor';

@Component({
  selector: 'app-teammemberslist',
  templateUrl: './teammemberslist.component.html',
  styleUrls: ['./teammemberslist.component.scss'],
})
export class TeammemberslistComponent implements OnInit {
  @Input()
  teamMembersList: any[];

  @Input()
  isDeleteTeamMember = true;
  @Input()
  isViewTeamMember = true;
  teammemberId: any;
  registrarModel: any;
  token: string;
  @Output()
  emitTeamList = new EventEmitter();
  response: any;
  teamMemberUserName: string;
  colors: any = [];
  Subcolors: any = [];
  username: any
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.getColor();
    this.username = sessionStorage.getItem('AdminUserName');
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
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('');
  }

  deleteTeamMember() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService
      .MakeTeamMemberInActive(sessionStorage.getItem('OrganisationID'), this.teammemberId, this.token)
      .subscribe(
        (res: any[]) => {
          this.spinner.hide();
          this.response = res;
          if (this.response.Status === 1) {
            this.Close('close click');
            this.emitTeamList.emit();
            this.toaster.info('Team member is inactivated');
          } else if (this.response.Status === 0) {
            this.toaster.error('failed to delete');
          }
        },
        (err) => {
          this.toaster.error('Failed');
        }
      );
  }

  activeTeamMember(teammemberId) {
    console.log(teammemberId);
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService
      .MakeTeamMemberActive(sessionStorage.getItem('OrganisationID'), teammemberId, this.token)
      .subscribe(
        (res: any[]) => {
          this.spinner.hide();
          this.response = res;
          if (this.response.Status === 1) {
            this.emitTeamList.emit();
            this.toaster.info('Team member is activated');
          } else if (this.response.Status === 0) {
            this.toaster.error('failed to activate');
          }
        },
        (err) => {
          this.toaster.error('Failed');
        }
      );
  }
  deleteModel(content: any, teammemberdata: any) {
    this.teammemberId = teammemberdata.TeamMemId;
    this.teamMemberUserName = teammemberdata.UserName;
    this.registrarModel = this.modalService.open(content, { centered: true, keyboard: false, backdrop: 'static' });
  }
  Close(value: string) {
    this.registrarModel.close(value);
  }
}
