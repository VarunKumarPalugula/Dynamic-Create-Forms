import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { AdminService } from '@app/law-office-admin/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { StorageService } from '@app/shared/service/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ValidationService } from '@app/shared/service/validation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-accesspanel',
  templateUrl: './accesspanel.component.html',
  styleUrls: ['./accesspanel.component.scss'],
})
export class AccesspanelComponent implements OnInit {
  @ViewChild('popTemplate')
  template: TemplateRef<any>;
  title: string = 'Change Password';
  passwordForm: FormGroup;
  // Modal popup
  modalRef: BsModalRef;
  closeBtnName: string;
  model: any = {};
  isHidden = false;
  constructor(
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private sessionstore: StorageService,
    private route: Router,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private Valid: ValidationService,
    private toaster: ToastrService
  ) {}
  ngOnInit() {
    // this.buildForm();
    // if (sessionStorage.getItem('TempPasswordEnabled') !== "false") {
    //   this.openModal();
    //   // var myInterval = setInterval(function(){
    //   //  },10000);
    //   // setInterval(()=>{
    //   //   clearInterval(myInterval);
    //   // },10001);
    //   // clearInterval(10000)
    //   //setTimeout(this.openModal() , 20000);
    // //  window.setTimeout(this.openModal(), 2000);
    // }
  }

  openModal() {
    this.modalRef = this.modalService.show(this.template, { backdrop: 'static', keyboard: false, class: 'modal-md' });
  }
  //close the modal
  hideModal() {
    this.modalRef.hide();
  }

  // buildForm() {
  //   this.passwordForm = this.fb.group({
  //     Password: this.Valid.validateform.Email,
  //     confirmPassword: this.Valid.TeamSignup.Password
  //   });
  // }
  // showSelected: boolean = true;
  // statusMessage: string = "";
  // public token: string = "";
  // ActivitiesCount: any = [];
  // OrgId: string;
  // Count: any;
  // constructor(
  //   private adminService: AdminService,
  //   private spinner: NgxSpinnerService,
  //   private sessionstore: StorageService,
  //   private route: Router
  // ) { }
  // public name: string = sessionStorage.getItem('AdminUserName');
  // public CaptionFirstLetterOfTheUserName = this.name.charAt(0).toUpperCase();

  // organisationlist: any = [];
  // UpdatedClaimsDaata: any = [];

  // ngOnInit() {
  //   this.spinner.show();
  //   this.token = "Authorization:Bearer " + sessionStorage.getItem('A_AccessToken');
  //   this.adminService.getAdminOrganisationAccessPaneldata(this.token)
  //     .subscribe
  //     (
  //     (data1: any[]) => {
  //
  //       this.spinner.hide();
  //       this.organisationlist = data1;
  //     },
  //     err => {
  //       this.statusMessage = 'Problem with the service. Please try again after sometime';

  //     }

  //     );

  // }
  // AdminSignOut() {
  //   sessionStorage.clear();
  //   this.route.navigate(['/admin/signin']);
  // }
  // OnAccess(OrgID: any, OrganisationName: string, IsOwner: string, TeamMemberStatus: string, TeamMemberId: string) {
  //   this.Count = "";
  //   if (OrgID != null) {
  //     this.token = "Authorization:Bearer " + sessionStorage.getItem('A_AccessToken');
  //     this.adminService.AddingTheOrgIDToclaims(OrgID, this.token)
  //       .subscribe
  //       (
  //       (data1: any[]) => {
  //         this.UpdatedClaimsDaata = data1;
  //         if (this.UpdatedClaimsDaata != null) {
  //           this.sessionstore.StotringAdminUserClaims(this.UpdatedClaimsDaata);
  //           if (sessionStorage.getItem('OrganisationID') != null) {
  //             sessionStorage.setItem('OrganisationName', OrganisationName);
  //             sessionStorage.setItem('TeamMemberStatus', TeamMemberStatus);
  //             sessionStorage.setItem('TeamMemberId', TeamMemberId);
  //             sessionStorage.setItem('IsOwner', IsOwner);
  //             this.route.navigate(['/admin/dashboard']);
  //           } else {
  //             this.route.navigate(['']);
  //           }
  //         } else {
  //           this.route.navigate(['']);
  //         }
  //       },
  //       err => {

  //       }
  //       );
  //   }

  // }
}
