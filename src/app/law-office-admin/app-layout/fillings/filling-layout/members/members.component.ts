import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AdminService } from '@app/law-office-admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminpermissionService } from '@app/auth-guard/admin/adminpermission.service';
import { ToastrService } from 'ngx-toastr';
import { RandomColor } from 'angular-randomcolor';
import { CommonService } from '@app/shared/service/common.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
  sentModel: any;
  deleteModel: any;
  addModel: any;
  addoffice: any;
  deleteTeamMemberModel: any;
  token: any;
  teamInvitersList: any = [];
  teamMembersList: any = [];
  clientMembersList: any = [];
  allTeamMembers = [];
  response: any = [];
  selectedTeamMembers = [];
  blockedTeamMembersList = [];
  selectedBlockTeamMembers = [];
  editTeam = false;
  editClient = false;
  teamMemberPopup: any;
  successPopupModel: any;
  confirmData: any;
  isAuthorize = true;
  loadSubAdminPermissions: any = {};
  loadPermissions: any = {};
  isSubAdminAcess = true;
  deleteTeamData: any;

  colors: any = [];
  Subcolors: any = [];
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private permissionService: AdminpermissionService,
    private toaster: ToastrService,
    public commonService: CommonService
  ) {}

  ngOnInit() {
    this.getFilingAdminTeammembers();
    this.getFilingClientTeammembers();
    this.isAuthorize = this.permissionService.isGetAcess();
    this.loadSubAdminPermissions = this.permissionService.GenericPermissions();
    this.isSubAdminAcess = this.permissionService.isSubAdminGetAcess();
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
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('');
  }
  // load team members
  getFilingAdminTeammembers() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    let clientobj = {
      FilingId: sessionStorage.getItem('FillingId'),
      AdminOrgId: sessionStorage.getItem('OrganisationID'),
    };
    this.adminService.GetFilingAdminTeammembers(clientobj, this.token).subscribe(
      (res: any[]) => {
        this.spinner.hide();
        if (res != null && res != undefined) {
          let teamMembersList = res;
          this.teamMembersList = teamMembersList.filter((s) => s.Status == true);
          this.blockedTeamMembersList = teamMembersList.filter((s) => s.Status == false);
          this.loadTeamList();
        }
      },
      (err) => {
        this.toaster.error('error occured');
      }
    );
  }

  getFilingClientTeammembers() {
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    let teamobj = {
      FilingId: sessionStorage.getItem('FillingId'),
      AdminOrgId: sessionStorage.getItem('OrganisationID'),
    };
    this.adminService.GetFilingClientTeammembers(teamobj).subscribe(
      (res: any[]) => {
        this.spinner.hide();
        //console.log('client', res)
        if (res != null && res != undefined) {
          this.clientMembersList = res.filter((r) => r.Status == true);
        }
      },
      (err) => {
        this.toaster.error('error occured');
      }
    );
  }

  // load team members
  loadTeamList() {
    this.spinner.show();
    if (sessionStorage.getItem('IsOwner') === 'true') {
      this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
      this.adminService.OrgTeamMembersList(sessionStorage.getItem('OrganisationID'), this.token).subscribe(
        (res: any[]) => {
          this.spinner.hide();
          this.allTeamMembers = res;
          this.selectedTeamMembers = [];
          function comparer(otherArray) {
            return function (current) {
              return (
                otherArray.filter(function (other) {
                  return other.UserName == current.UserName && other.Email == current.Email;
                }).length == 0
              );
            };
          }
          var onlyInA = this.allTeamMembers.filter(comparer(this.teamMembersList));
          var onlyInB = this.teamMembersList.filter(comparer(this.allTeamMembers));
          this.selectedTeamMembers = onlyInA.concat(onlyInB);
          function comparerBlockedTeam(otherArray) {
            return function (current) {
              return (
                otherArray.filter(function (other) {
                  return other.UserName == current.UserName && other.Email == current.Email;
                }).length == 0
              );
            };
          }
          var onlyInTeam = this.selectedTeamMembers.filter(comparerBlockedTeam(this.blockedTeamMembersList));
          var onlyInBlock = this.blockedTeamMembersList.filter(comparerBlockedTeam(this.selectedTeamMembers));
          this.selectedTeamMembers = onlyInTeam.concat(onlyInBlock);
          this.selectedTeamMembers = this.selectedTeamMembers.filter((x) => x.TeamMemId != 0);
        },
        (err) => {
          this.toaster.error('error occured');
        }
      );
    }
  }
  addBlockToFilingAdminTeam(team, ABbit) {
    // let teamData =this.teamMembersList.filter(t=>t.TeamMemberStatus=='3' || t.TeamMemberStatus=='2');
    //if(teamData && teamData.length>1){
    if (ABbit == 0) {
      let teamData = this.teamMembersList.filter((s) => s.Status == true);
      teamData = this.teamMembersList.filter((t) => t.TeamMemberStatus == '3' || t.TeamMemberStatus == '2');
      if (teamData && teamData.length > 1) {
      } else {
        this.toaster.info('Atleast one member required');
        this.closedeleteTeamMember('close click');
        return;
      }
    }
    this.spinner.show();
    let fillingObj = {
      OrgId: sessionStorage.getItem('OrganisationID'),
      FilingId: sessionStorage.getItem('FillingId'),
      AdminId: team ? team.AdminID : this.deleteTeamData.AdminID,
    };
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService.AddBlockUnblockTeamMemberToFilingAdminTeam(fillingObj, this.token, ABbit).subscribe(
      (data: any) => {
        this.spinner.hide();
        let response = data;
        if (response.Status == 1) {
          this.getFilingAdminTeammembers();
          this.closeTeamMembers('close click');
          this.closedeleteTeamMember('close click');
        } else if (response.Status == 0) {
          this.toaster.error(response.Message);
        }
      },
      (error) => {
        this.spinner.hide();
        this.toaster.error('error occured');
      }
    );
    // }
    //else{
    //   this.toaster.info("Atleast one member required");
    //   this.closedeleteTeamMember('close click');
    // }
  }

  editTeamMembers() {
    this.editTeam = !this.editTeam;
  }
  editClientMember() {
    this.editClient = !this.editClient;
  }

  teaMembersListPopup(data: any) {
    this.sentModel = this.modalService.open(data, { centered: true, keyboard: false, backdrop: 'static' });
  }
  closeTeamMembers(value: string) {
    if (this.sentModel != undefined) {
      this.sentModel.close(value);
    }
  }

  teamInvite(data: any) {
    this.teamMemberPopup = this.modalService.open(data, { centered: true, keyboard: false, backdrop: 'static' });
    this.closeTeamMembers('close click');
  }
  closeTeamInvite(value) {
    if (this.teamMemberPopup != undefined) {
      this.teamMemberPopup.close(value);
    }
  }
  confirmationSuccessPopup(data, tempref: any) {
    this.successPopupModel = this.modalService.open(tempref, { centered: true, keyboard: false, backdrop: 'static' });
    this.confirmData = data;
  }

  closeConfirmSuccess(value) {
    if (this.successPopupModel != undefined) {
      this.successPopupModel.close(value);
      this.closeTeamInvite(value);
    }
  }

  Modeldelete(content: any) {
    this.deleteModel = this.modalService.open(content, { centered: true, keyboard: false, backdrop: 'static' });
  }
  Closedelete(content: string) {
    this.deleteModel.close(content);
  }
  Modeladdmember(data: any) {
    this.addModel = this.modalService.open(data, { centered: true, keyboard: false, backdrop: 'static' });
  }
  Closeaddmember(value: string) {
    this.addModel.close(value);
  }
  Modeladdoffice(data: any) {
    this.addoffice = this.modalService.open(data, { centered: true, keyboard: false, backdrop: 'static' });
  }
  Closeaddmeoffice(value: string) {
    this.addoffice.close(value);
  }

  deleteTeamMember(deleteTeamMember: any, teamData: any) {
    this.deleteTeamData = teamData;
    this.deleteTeamMemberModel = this.modalService.open(deleteTeamMember, {
      centered: true,
      keyboard: false,
      backdrop: 'static',
    });
  }
  closedeleteTeamMember(content: string) {
    if (content) {
      this.deleteTeamMemberModel.close(content);
    }
  }
}
