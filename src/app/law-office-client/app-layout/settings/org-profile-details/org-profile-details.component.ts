import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '@app/shared/service/common.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ValidationService } from '@app/shared/service/validation.service';
import { ClientService } from '@app/law-office-client/law-office-client.service';
import { ClientpermissionService } from '@app/auth-guard/client-guard/clientpermission.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientCommonServiceService } from '@app/law-office-client/client-common-service/client-common-service.service';

@Component({
  selector: 'client-org-profile-details',
  templateUrl: './org-profile-details.component.html',
  styleUrls: ['./org-profile-details.component.scss'],
})
export class OrgProfileDetailsComponent implements OnInit {
  @Input()
  isAuthorize = false;
  @Input()
  isOnlyForApplicant = false;
  @Input()
  isSubAdminAuthorize: any = {};
  prev: boolean;
  next: boolean;
  // contactFormObj: any = {};
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    public commonService: CommonService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private Valid: ValidationService,
    private clientService: ClientService,
    private permissionService: ClientpermissionService,
    public clientCommonService: ClientCommonServiceService
  ) {}

  ngOnInit() {
    // here we are getting role team member/primary admin/sub admin
    this.isAuthorize = this.permissionService.isGetAcess();
    this.isSubAdminAuthorize = this.permissionService.isSubAdminGetAcess();
    if (this.isAuthorize) {
      this.clientCommonService.getcontactinformation();
    }
    this.clientCommonService.getOrganisationInfo();
    this.clientCommonService.getPocInfromation();
    this.clientCommonService.getauthSignatoryInformation();
    this.clientCommonService.getfinancialsInformation();
    this.clientCommonService.getAddressOfPrincipalPlaceOfBusiness();
    this.commonService.getContries();
    this.commonService.getStates();
    this.clientCommonService.OrginationDetials();
    this.clientCommonService.financialsForm();
    this.clientCommonService.mailingAddressBuildForm();
    this.clientCommonService.addressOfPPOfBusiness();
    this.clientCommonService.pocForm();
    this.clientCommonService.authSignatoryForm();
    this.clientCommonService.loadmaxDate();
  }

  // Poc information submit

  navigateTabs(type?: any) {
    const currentActive = document.querySelectorAll('.marketplace-300.active');
    const currentAEId: number = +currentActive[0].id;
    this.tabStateManager(currentAEId);
    let index: any = null;
    if (type === 'prev') {
      index = 'tab-' + (currentAEId - 1);
      this.tabChanger(null, index);
    } else {
      index = 'tab-' + (currentAEId + 1);
      this.tabChanger(null, index);
    }
  }

  tabStateManager(id: number) {
    const allElements = document.querySelectorAll('.marketplace-300');
    this.prev = id !== 0 ? true : false;
    this.next = id === allElements.length - 1 ? false : true;
  }

  tabChanger(ev: any, elem?: any) {
    let id: any;
    let anchorElement: any;
    if (ev === null) {
      id = elem;
      anchorElement = document.getElementById(elem);
    } else {
      id = ev.target.id;
      anchorElement = ev.target;
    }
    this.tabStateManager(id.split('-')[1] - 1);
    this.removeActiveState(['.marketplace-300', '.lo-list .gl-listname']);
    anchorElement.classList.add('active');
    document.getElementById(id.split('-')[1]).classList.add('active');
  }
  removeActiveState(queryElements?: any) {
    for (let index = 0; index < queryElements.length; index++) {
      const elements = document.querySelectorAll(queryElements[index]);
      Object.keys(elements).map((key) => {
        elements[key].classList.remove('active');
      });
    }
  }
}
