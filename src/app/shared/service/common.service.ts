import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ApicallsService } from '@app/shared/service/apicalls.service';
import { HelperService } from '@app/shared/helpers/helper.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormService } from './form.service';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { UrlConfig } from '@app/enums/urls-enum';
@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private messageSource = new BehaviorSubject<string>('');
  private roleType = new BehaviorSubject<string>('');
  public emitGetImmigrationFormData = new BehaviorSubject<any>(null);
  public emitSaveImmigrationFormData = new BehaviorSubject<any>(null);
  public emitGetTemplatesDatabyTemplate = new BehaviorSubject<any>(null);
  public emitGetUiTemplateControlSections = new BehaviorSubject<any>(null);
  public emitGetUiControlSectionsWithData = new BehaviorSubject<any>(null);
  public emitGetUIControlTemplateResults = new BehaviorSubject<any>(null);
  public emitGetUITemplateResults = new BehaviorSubject<any>(null);

  organisationlist: any = [];
  currentMessage = this.messageSource.asObservable();
  emailmessage = this.messageSource.asObservable();
  roletype = this.roleType.asObservable();

  isOwner = sessionStorage.getItem('IsOwner');
  loggedUserEmail = sessionStorage.getItem('Email');
  openModelRef: any;
  allCountriesList = [];
  selectedCountryState = [];
  modelRef: any;
  states: any[];
  versionId: any;

  constructor(
    private httpClient: HttpClient,
    private global: ApicallsService,
    private helper: HelperService,
    private modalService: NgbModal,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private formService: FormService,
    private router: Router,
    public appService: AppService
  ) { }

  fileData = {};
  validationMessage: any;

  getEnvDetails() {
    if (window.location.origin == UrlConfig.ENVDOMAIN) {
      return 'Dev'
    } else {
      return 'TEST'
    }
  }

  formObject(fields, initialObj, template, applicantKey) {
    const obj = initialObj.find(el => (el.Section === fields.Section && el.SubSection === fields.SubSection));
    let finalObject = {};
    if(!this.fileData[applicantKey]) {
      this.fileData = {
          [applicantKey]: {}
      }
    }
    Object.keys(fields[template]).forEach(kList => {
      Array.isArray(fields[template][kList]) && fields[template][kList].forEach(ele => {
        if (ele.name) {
          finalObject[ele.name] = {
            value: (obj && obj.TemplateResult[fields.Section] && obj.TemplateResult[fields.Section][fields.SubSection] && obj.TemplateResult[fields.Section][fields.SubSection][ele.name]) ? obj.TemplateResult[fields.Section][fields.SubSection][ele.name] : '',
            message: '',
            required: ele.value && ele.hasOwnProperty('validation') && Object.keys(ele.validation).length ? false : true,
            valid: ele.value && ele.hasOwnProperty('validation') && Object.keys(ele.validation).length ? false : true
          };
        }
        this.fileData[applicantKey][kList] = finalObject;
        if (ele.name) {
          this.changeFormValue(ele, finalObject[ele.name].value, kList, applicantKey);
          this.setChildContrl(ele, kList, obj ? obj.TemplateResult[fields.Section][fields.SubSection] : null, applicantKey);
        }
      });
      this.fileData[applicantKey][kList].finalObj = (obj && obj.TemplateResult[fields.Section] && obj.TemplateResult[fields.Section][fields.SubSection]) ? obj.TemplateResult[fields.Section][fields.SubSection] : {};
      this.fileData[applicantKey][kList].readOnly = obj && obj.IsSaved == 'Y' ? true : false;
    });
  }

  setChildContrl(ele, parent, obj, applicantKey) {
    Object.keys(ele).forEach(kList => {
      if (kList !== 'values' && Array.isArray(ele[kList]) && ele[kList].length) {
        let finalObject = {};
        Array.isArray(ele[kList]) && ele[kList].forEach(el => {
          if (el.name) {
            finalObject[el.name] = {
              value: (obj && obj[kList] && obj[kList][el.name]) ? obj[kList][el.name] : '',
              message: '',
              valid: el.value && el.hasOwnProperty('validation') && Object.keys(el.validation).length ? false : true
            };
          }
          this.fileData[applicantKey][parent][kList] = finalObject;
        });
      }
    });
  }

  changeFormValue(control, value, parent, applicantKey) {
    let obj = { value: this.fileData[applicantKey][parent][control.name].value, message: this.fileData[applicantKey][parent][control.name].message, 
      valid: this.fileData[applicantKey][parent][control.name].valid };
    if (control.hasOwnProperty('validation') && Object.keys(control.validation).length) {
      obj = this.validateTextForm(control, value);
      this.fileData[applicantKey][parent][control.name].valid = obj.valid;
      this.fileData[applicantKey][parent][control.name].message = obj.message;
    }
  }

  validateTextForm(control, value) {
    if (control.validation.hasOwnProperty('required') && control.validation.required) {
      if (!value.length) {
        return { valid: false, message: this.setErrorMessage('required', control.name), value: '' };
      }

      if (control.type == 'textbox') {
        if (control.validation.hasOwnProperty('minLength') && value.length <= control.validation.minLength) {
          return { valid: false, message: this.setErrorMessage('minLength', control.name, control.validation.minLength), value: '' };
        } else if (control.validation.hasOwnProperty('maxLength') && value.length > control.validation.maxLength) {
          return { valid: false, message: this.setErrorMessage('maxLength', control.name, control.validation.maxLength), value: '' };
        }
      }
    }
    return { valid: true, message: '', value: '' };
  }

  setErrorMessage(col, name, dispFlag?) {
    if (this.validationMessage && this.validationMessage.hasOwnProperty(name) && this.validationMessage[name].hasOwnProperty(col) && this.validationMessage[name][col]) {
      return this.customMessage(col, name, dispFlag);
    } else if (this.validationMessage['common'].hasOwnProperty(col) && this.validationMessage['common'][col]) {
      return this.customMessage(col, 'common', dispFlag);
    }
    return '';
  }

  customMessage(col, name, dispFlag) {
    if (dispFlag) {
      return `${this.validationMessage[name][col]} ${dispFlag}`
    }
    return this.validationMessage[name][col];
  }


  validations(): any {
    this.httpClient.get('assets/validations.json').subscribe(
      (data) => {
        this.validationMessage = data;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }


  openModel(template, size?) {
    this.openModelRef = this.modalService.open(template, {
      scrollable: true,
      centered: true,
      keyboard: false,
      backdrop: 'static',
      size: size = size ? size : 'md',
    });
  }
  closeModel(value) {
    if (this.openModelRef) {
      this.openModelRef.close(value);
    }
  }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }
  emailMessage(email: string) {
    this.messageSource.next(email);
  }

  checkNullorUndefined(val) {
    if (val !== null && val !== undefined && val !== '') {
      return false;
    } else {
      return true;
    }
  }

  //Object Comparsion
  IsObjectsMatch(mainObject: any, cloneObject: any) {
    return JSON.stringify(mainObject) === JSON.stringify(cloneObject);
  }

  applyRequired(val: boolean, id: string) {
    if (val) {
      let elem: HTMLElement = document.getElementById(id);
      return elem.setAttribute('style', 'border: 1px solid red;');
    } else {
      let elem: HTMLElement = document.getElementById(id);
      return elem.removeAttribute('style');
    }
  }
  adminVerifymail(VerificationCode: string, ClientNomanclaturedLink: string) {
    let emailtempobj = { VerificationCode: VerificationCode, ClientNomanclaturedLink: ClientNomanclaturedLink };
    return this.httpClient.post(this.global.verifyEmail, emailtempobj);
  }
  clientVerifymail(VerificationCode: string, ClientNomanclaturedLink: string) {
    let emailtempobj = { VerificationCode: VerificationCode, ClientNomanclaturedLink: ClientNomanclaturedLink };
    return this.httpClient.post(this.global.verifyClientAdminEmail, emailtempobj);
  }

  adminReVerifymail(email: string, env: any) {
    return this.httpClient.get(this.global.resendemailverficationlink + '?Email=' + email + '?environment=' + env);
  }
  clientReVerifymail(email: string) {
    return this.httpClient.get(this.global.resendclientemailverficationlink + '?Email=' + email);
  }

  GetClientRoles() {
    return this.httpClient.get(this.global.GetClientRoles);
  }
  getAllCountries(): any {
    this.httpClient.get('./assets/config/allCountries.json').subscribe(
      (res: any) => {
        sessionStorage.setItem('allCountriesList', JSON.stringify(res));
      },
      (error: HttpErrorResponse) => {
        this.toaster.error('Failed to load country config data');
      }
    );
  }

  getCountryStates(): any {
    this.httpClient.get('./assets/config/allStates.json').subscribe(
      (res: any) => {
        sessionStorage.setItem('selectedCountryState', JSON.stringify(res));
      },
      (error: HttpErrorResponse) => {
        this.toaster.error('Failed to load states config data');
      }
    );
  }
  getContries() {
    this.allCountriesList = [];
    if (sessionStorage.getItem('allCountriesList') != null) {
      let countries = JSON.parse(sessionStorage.getItem('allCountriesList'));
      this.allCountriesList = countries.countries;
      // const selectedCountry = countries.filtter(c => c.sortname == 'US');
      // this.allCountriesList = countries;
    }
  }
  getStates() {
    this.selectedCountryState = [];
    if (sessionStorage.getItem('selectedCountryState') != null) {
      let states = JSON.parse(sessionStorage.getItem('selectedCountryState'));
      this.selectedCountryState = states.states;
      this.states = states.states;
    }
  }

  onCountryChange(country) {
    this.states = [];
    let selectedCountry = this.allCountriesList.find((c) => c.name == country);
    if (selectedCountry) {
      this.states = this.selectedCountryState.filter((x) => x.country_id == selectedCountry.id);
    }
  }

  getNonImmigrantInfo() {
    return this.httpClient.get('./assets/config/non-immigrant-visa-info.json');
  }

  getImmigrantInfo(formName, caseId) {
    this.spinner.show();
    let formObj = {
      FilingId: sessionStorage.getItem('FillingId'),
      VersionId: '0',
      FormName: formName,
      FormValues: {},
    };
    this.formService.getImmigrationFormData(sessionStorage.getItem('OrganisationID'), caseId, formObj).subscribe(
      (res: any) => {
        if (!this.checkNullorUndefined(res)) {
          this.emitGetImmigrationFormData.next(res);
          if (!this.checkNullorUndefined(res.ImmigrationResults)) {
            this.versionId = res.ImmigrationResults.VersionId;
          }
        } else {
          this.spinner.hide();
          this.toaster.error('Error Occured');
          this.router.navigate(['/admin/fillings/casesubmission']);
        }
      },
      (err) => {
        this.spinner.hide();
        this.toaster.error('Error Occured');
        this.router.navigate(['/admin/fillings/casesubmission']);
        return null;
      }
    );
  }


  //saveImmigrationFormData
  saveImmigrationFormData(formName, formData, caseId) {
    this.spinner.show();
    let obj = {
      FilingId: sessionStorage.getItem('FillingId'),
      VersionId: this.versionId,
      FormName: formName,
      FormValues: formData,
    };
    this.formService.saveImmigrationFormData(sessionStorage.getItem('OrganisationID'), caseId, obj).subscribe(
      (res: any) => {
        if (res.Status == 1) {
          this.toaster.success(res.Message);
          this.emitSaveImmigrationFormData.next(res);
        } else {
          this.spinner.hide();
          this.toaster.error(res.Message);
        }
      },
      (err) => {
        this.spinner.hide();
        this.toaster.error('error occured');
      }
    );
  }

  printImmigrationFormData(formName) {
    this.spinner.show();
    let formObj = {
      FilingId: sessionStorage.getItem('FillingId'),
      VersionId: '0',
      FormName: formName,
      FormValues: {},
    };
    this.formService.previewImmigrationFormData(sessionStorage.getItem('OrganisationID'), formObj, 1).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (!this.checkNullorUndefined(res)) {
        } else {
          this.toaster.error('Error Occured');
          this.router.navigate(['/admin/fillings/casesubmission']);
        }
      },
      (err) => {
        this.toaster.error('Error Occured');
        this.router.navigate(['/admin/fillings/casesubmission']);
        return null;
      }
    );
  }


  // it will returns the templates(custom and predefined)
  getFilingTemplates(fillingtype, adminId, orgId) {
    this.spinner.show();
    this.appService.getFilingTemplates(fillingtype, adminId, orgId).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (!this.checkNullorUndefined(res)) {
          this.emitGetUITemplateResults.next(res);
        }
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    )
  }

  //template related methods

  //tittle for sections will get from this api
  getUIControlTemplateToShowSections() {
    this.spinner.show();
    this.appService.getUIControlTemplateToShowSections().subscribe(
      (res: any) => {
        if (!this.checkNullorUndefined(res)) {
          this.emitGetUiTemplateControlSections.next(res);
        }
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    );
  }
  //by passing tittle name wil get section data
  getTemplatesForSection(templateName) {
    this.spinner.show();
    this.appService.getTemplatesDatabyTemplate(templateName).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (!this.checkNullorUndefined(res)) {
          this.emitGetTemplatesDatabyTemplate.next(res);
        }
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    );
  }

  //this api returns alll templates with ui configuration
  getAllTemplatesData() {
    this.spinner.show();
    this.appService.getDefaultTemplates().subscribe(
      (res: any) => {
        this.spinner.hide();
        if (!this.checkNullorUndefined(res)) {
          this.emitGetUiControlSectionsWithData.next(res);
        }
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    )
  }

  //this api will give data for sections
  GetUIControlTemplateResults() {
    let reqObj = {
      OrgId: '0',
      AdminId: '0',
      LawOfficeClientId: sessionStorage.getItem('LawOfficeClientID'),
    };
    this.spinner.show();
    this.appService.getUIControlTemplateResults(reqObj).subscribe(
      (res: any) => {
        if (!this.checkNullorUndefined(res)) {
          this.emitGetUIControlTemplateResults.next(res);
        }
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    )
  }

  saveUIControlTemplateResults(title, data, applicantKey) {
    let reqObj = [
      {
        OrgId: '0',
        AdminId: '0',
        LawOfficeClientId: sessionStorage.getItem('LawOfficeClientID'),
        DisplayTemplateTitle: data.DisplayTemplateTitle,
        Section: title,
        SubSection: data.SubSection,
        FilingType: data.FilingType,
        IsCreatedByAdmin: 'true',
        TemplateResult: {
          [title]: {
            [data.SubSection]: this.fileData[applicantKey][data.SubSection.trim()].finalObj,
          },
        },
      },
    ];
    this.spinner.show();
    this.appService.saveUIControlTemplateResults(reqObj).subscribe((res: any) => {
      if (!this.checkNullorUndefined(res)) {
        if (res.Status === 1) {
          this.toaster.success(res.Message);
          this.GetUIControlTemplateResults();
        } else {
          this.toaster.error(res.Message);
        }
      }
    });
  }



  checkFormValid(value) {
    for (const key in value) {
      if (value[key].hasOwnProperty('valid') && !value[key].valid && Object.keys(value[key]).length) {
        return true;
      }
    }
  }

  returnZero() {
    return 0
  }

  trackByFn(index, item) {
    return index;
  }

 


  clearCommonEmitters() {
    this.emitGetImmigrationFormData.next(null);
    this.emitSaveImmigrationFormData.next(null);
    this.emitGetTemplatesDatabyTemplate.next(null);
    this.emitGetUiTemplateControlSections.next(null);
    this.emitGetUiControlSectionsWithData.next(null);
    this.emitGetUIControlTemplateResults.next(null);
    this.emitGetUITemplateResults.next(null);
    this.versionId = null;
  }


  getUiControlSections() {
    return this.httpClient.get(this.global.getUIControlTemplateToShowSections);
  }
  getTeplatesDatabyTemplate(templateName) {
    return this.httpClient.get(this.global.getTemplatesForSection + '?section=' + templateName);
  }
  saveTemplateOptions(isAddMode, data) {
    return this.httpClient.post(this.global.saveTemplateOptions + '?isAddMode=' + isAddMode, data);
  }
  getSavedTemplates(OrgId) {
    return this.httpClient.get(this.global.getSaveTemps + '?orgId=' + OrgId);
  }
  deleteTemplate(orgId: any, templateTitle: any, filingType: any) {
    return this.httpClient.delete(this.global.deleteTemplateUrl + '?orgId=' + orgId + '&templateTitleName=' + templateTitle + '&filingType=' + filingType)
  }
}
