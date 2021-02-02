import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '@app/shared/service/common.service';
import { FormBuilder } from '@angular/forms';
import { ClientCommonServiceService } from '@app/law-office-client/client-common-service/client-common-service.service';
import { Subscription } from 'rxjs';
import { DialogComponent } from '@app/shared/businesscontrols/dialog/dialog.component';

@Component({
  selector: 'applicant-profile-details',
  templateUrl: './applicant-profile-details.component.html',
  styleUrls: ['./applicant-profile-details.component.scss'],
})
export class ApplicantProfileDetailsComponent implements OnInit {
  prev: boolean;
  next: boolean;
  validationMessage: any;
  sectionTitles: any;
  allSectionConfigs = [];
  emitGetUiTemplateControlSections: Subscription;
  emitGetUiControlSectionsWithData: Subscription;
  emitGetUIControlTemplateResults: Subscription;

  initialObj = [];
  constructor(
    public modalService: NgbModal,
    public fb: FormBuilder,
    public spinner: NgxSpinnerService,
    public clientCommonService: ClientCommonServiceService,
    public commonService: CommonService,
  ) {
    this.commonService.validations();
    this.emitGetUiTemplateControlSections = this.commonService.emitGetUiTemplateControlSections.subscribe((res) => {
      if (!commonService.checkNullorUndefined(res)) {
        this.sectionTitles = res['Templates'];
        this.commonService.GetUIControlTemplateResults();
      }
    });
    this.emitGetUIControlTemplateResults = this.commonService.emitGetUIControlTemplateResults.subscribe((res) => {
      if (!commonService.checkNullorUndefined(res)) {
        this.initialObj = [];
        this.initialObj = res;
        this.commonService.getAllTemplatesData();
      }
    });
    this.emitGetUiControlSectionsWithData = this.commonService.emitGetUiControlSectionsWithData.subscribe((res) => {
      if (!commonService.checkNullorUndefined(res)) {
        res['Templates'][1]['SubSectionTemplateData']['Place And Date Of Birth'][0].validation = {
          Country: {
            required: true
          },
          State: {
            required: true
          }

        }
        res['Templates'][2].SubSectionTemplateData['Contact Details'][0] = {
          Active: false,
          displayName: "Phone Number",
          id: "phoneNumber",
          name: "phoneNumber",
          type: "textbox",
          value: "", 
          validation : {
            required : true,
            // pattern : '/(7|8|9)\d{9}/' 
            // pattern : '/^\d{10}$/' 
            pattern : /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/ 
          }
        }
        res['Templates'][2].SubSectionTemplateData['Contact Details'][2] = {
          Active: false,
          displayName: "Email",
          id: "email",
          name: "email",
          type: "textbox",
          value: "", 
          validation : {
            required : true,
            pattern : /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
          }
        }
        this.allSectionConfigs = res['Templates'];
        res['Templates'].forEach((resp) => this.commonService.formObject(resp, this.initialObj, 'appProfileDetails'));
      }
    });
  }

  ngOnInit() {
    this.commonService.fileData = {};
    this.commonService.getUIControlTemplateToShowSections();
    this.commonService.getStates();
    this.commonService.getContries();
  }

  public openUploadDialog() {
    const addSpouseModal = this.modalService.open(DialogComponent, {
      centered: true,
      keyboard: false,
      size: 'lg',
      backdrop: 'static',
    });
  }




  tabChanger(ev: any, elem?: any) {
    // this.clientCommonService.resetForms();
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
  tabStateManager(id: number) {
    const allElements = document.querySelectorAll('.marketplace-300');
    this.prev = id !== 0 ? true : false;
    this.next = id === allElements.length - 1 ? false : true;
  }
  logdata() {
    console.log(this.clientCommonService.foreginAddressValidationRules.value);
  }

  ngOnDestroy() {
    this.emitGetUiTemplateControlSections.unsubscribe();
    this.emitGetUiControlSectionsWithData.unsubscribe();
    this.emitGetUIControlTemplateResults.unsubscribe();
    this.commonService.clearCommonEmitters();
  }
}
