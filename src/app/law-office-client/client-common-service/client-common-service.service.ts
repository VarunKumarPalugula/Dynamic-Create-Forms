import { Injectable, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ValidationService } from '@app/shared/service/validation.service';
import { ClientService } from '../law-office-client.service';
import { CommonService } from '@app/shared/service/common.service';
import { Http, ResponseContentType } from '@angular/http';
import { BehaviorSubject } from 'rxjs';
// import { forEach } from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class ClientCommonServiceService {
  personalDetailsForm: FormGroup;
  Orgdetails: FormGroup;
  contactForm: FormGroup;
  businessAddress: FormGroup;
  authSignatoryDetails: FormGroup;
  posDetails: FormGroup;
  financials: FormGroup;
  maxDate: Date;
  ImgTravelDocExpiryDate: Date;
  TodayAndOnlyPastDate: Date;
  token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
  // oinfo: any = {};
  showOrgInfoForm = false;
  isCurrentUsaAddress = false;
  uid: any;
  fid: any;
  financialObj: any = {};
  financialInfo: any = {};
  showFinancialInfoForm = false;
  currentYearIncome: any = {};
  previousYearIncome: any = {};

  //aplicant
  periodModal: any;
  foreginAddressValidationRules: FormGroup;
  applicantCurrentUsaAddressValidationRules: FormGroup;
  currentUsaAddreesValidationRules: FormGroup;
  educationDetailsValidationRules: FormGroup;
  posValidationRules: FormGroup;
  travelDocumentValidationRules: FormGroup;
  contactFormObj: any = {};
  posInfoObj: any = [];
  eduInfoObj: any = [];
  IMId: any;
  immiggrationDetailsObj: any = {};
  showImmigrationDetailsForm = false;
  showImgTravelDetails = false;
  immiggrationDetails: FormGroup;
  isAptSteFlrNumberDisabled = true;
  isForignAptSteFlrNumberDisabled = true;
  showPersonalInfoFoorm = false;
  showEducationInfoForm = false;
  showPosForm = false;
  educationInfoList = [];
  educationInfoData: any = {};
  addressInfoData: any = {};
  countriesList: any = [];
  isCurrentAptSteFlrNumberDisabled = true;
  usaStatesList: any = [];
  currentAddress = 'Current U.S.A Address';
  isBackBtnRequired = false;
  splittedFile: any;
  isForginContactInfoShow: boolean;
  foreginAddressInfo: any = {};
  imgTravelDetail: any = {};
  DeletefileModel: any;
  deleteEduInfoPopup: any;
  totalNumberOfDaysOutsideUsa: number;
  getResumeFile: any = {};
  tasklistResume: boolean = false
  EFileId: any;
  recentPyStubViewFile: any = {};
  fileType: string;
  fileName: string;
  filepath: string;
  splittedFileType: any;
  recentw2s: any = [];
  getRecentw2s: any = [];
  getEadCardFile: any = [];
  recentPatStubs: any = [];
  getRecentPaystubfiles: any = [];
  imgTravelDocFile: any = {};
  imgI94DocFile: any = {};

  countries = [];
  clientMembersRoles = [];
  isBussinessAptSteFlrNumberDisabled = true;
  MailingAddressModel: any;
  addeduModel: any;
  // addContactFormObj: any = {};
  sameasPoc = false;
  authSignatoryObj: any = {};
  pocObj: any = {};
  CurrentGrossIncome: any = [];
  // token = 'Authorization:Bearer ' + sessionStorage.getItem('C_AccessToken');
  pocValidated: boolean;
  isChecked = false;
  showPocContactInfo = false;
  showAutoryhSigntContactInfo = false;
  tempAuthSignatoryObj: any = {};
  tempContactInfo: any = {};
  organizationInfo: any = {};
  teamAddContactFormObj: {};
  isContactInfoShow = false;
  addContactFormShow = false;
  getPosFile: any = {};
  getEduFile: any = {};
  getPosFiles = [];
  getEduFiles = [];
  eduInfoForDelete: any;
  posInfoForDelete: any;
  nonImmigrantInfo = [];
  options: any = { month: 'numeric', day: 'numeric', year: 'numeric' };
  // public emitOrgInfoResponse = new BehaviorSubject<any>(null);
  // public emitFinInfoResponse = new BehaviorSubject<any>(null);

  // public emitMailingAddInfoResponce = new BehaviorSubject<any>(null);
  // public emitBusinessAddInfoResponce = new BehaviorSubject<any>(null);
  // public emitPocInfoResponce = new BehaviorSubject<any>(null);
  // public emitAuthorizedInfoResponce = new BehaviorSubject<any>(null);
  // // applicant
  // public emitAptPersonalInfoResponce = new BehaviorSubject<any>(null);
  // public emitForeginAddInfoResponce = new BehaviorSubject<any>(null);
  // public currentUsaAddInfoResponce = new BehaviorSubject<any>(null);

  // public emitEducationInfoResponce = new BehaviorSubject<any>(null);
  // public emitAptEmpResumeFile = new BehaviorSubject<any>(null);
  // public emitAptRecentW2File = new BehaviorSubject<any>(null);
  // public emitApt3RecentPayStubsFiles = new BehaviorSubject<any>(null);
  // public emitAptEadCardFile = new BehaviorSubject<any>(null);
  // public emitAptImgTravelInfoResponce = new BehaviorSubject<any>(null);
  // public emitI94TravelInfoResponce = new BehaviorSubject<any>(null);
  // public emitAptPosInfoResponce = new BehaviorSubject<any>(null);
  constructor(
    public modalService: NgbModal,
    public fb: FormBuilder,
    private toaster: ToastrService,
    public spinner: NgxSpinnerService,
    private Valid: ValidationService,
    private clientService: ClientService,
    public commonService: CommonService,
    private http: Http
  ) { }

  personalForm() {
    this.personalDetailsForm = this.fb.group({
      FirstName: this.Valid.validateform.FirstName,
      MiddleName: this.Valid.validateform.middeleName,
      LastName: this.Valid.validateform.LastName,
      USSSN: this.Valid.validateform.USSSN,
      DateOfBirth: this.Valid.validateform.Required,
      ProvinceOfBirth: this.Valid.validateform.ProvinceOfBirth,
      CountryOfCitizenShip: this.Valid.validateform.Required,
      PDId: [],
      LawOfficeClientId: [],
      Status: []
    });
  }

  // client forms
  OrginationDetials() {
    this.Orgdetails = this.fb.group({
      OrganisationName: this.Valid.validateform.OrganisationName,
      DoingBusinessAsName: this.Valid.validateform.DoingBusinessAsName,
      NatureOfBusiness: this.Valid.validateform.NatureOfBusiness,
      CompanyFormedOn: this.Valid.validateform.am,
      CurrentTotalNumberOfEmployees: this.Valid.validateform.NoOfEmployees,
      TotalFullTimeEmployees: this.Valid.validateform.NoOfEmployees,
      NumberOfEmployeesOnH1B: this.Valid.validateform.NoOfEmployees,
      OIId: []
    });
  }
  mailingAddressBuildForm() {
    this.contactForm = this.fb.group({
      StreetNumberAndName: this.Valid.validateform.StreetNumberandName,
      Province: this.Valid.validateform.Province,
      CityOrTown: this.Valid.validateform.CityOrTown,
      Country: ['USA'],
      State: this.Valid.validateform.Required,
      ZipCode: this.Valid.validateform.ZipCode,
      DayTimePhone: ['', Validators.pattern('^(?!0+$)((\\+91-?))?(?!0+$)[1-9][0-9]{9}$')],
      MobilePhone: ['', Validators.pattern('^(?!0+$)((\\+91-?))?(?!0+$)[1-9][0-9]{9}$')],
      Email:  ['', [Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      Fax: this.Valid.validateform.Fax,
      AptSteFlrNumber: [
        '',
        [
          Validators.minLength(4),
          // Validators.requiredTrue,
          Validators.maxLength(15),
          Validators.pattern('^[a-zA-Z0-9][. /]*$')
        ]
      ],
      aptSteFlr: [],
      Apt: [],
      Ste: [],
      Flr: [],
      MAId: ['']
    });
  }

  // Address Of Principal Place Of Business
  addressOfPPOfBusiness() {
    this.businessAddress = this.fb.group({
      StreetNumberAndName: this.Valid.validateform.StreetNumberandName,
      CityOrTown: this.Valid.validateform.CityOrTown,
      ZipCode: this.Valid.validateform.ZipCode,
      State: this.Valid.validateform.Required,
      Province: this.Valid.validateform.Province,
      Country: ['USA'],
      Email:  ['', [Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      DayTimePhone: ['', Validators.pattern('^(?!0+$)((\\+91-?))?(?!0+$)[1-9][0-9]{9}$')],
      MobilePhone: ['', Validators.pattern('^(?!0+$)((\\+91-?))?(?!0+$)[1-9][0-9]{9}$')],
      AptSteFlrNumber: [
        // '',
        // [
        //   Validators.minLength(4),
        //   // Validators.requiredTrue,
        //   Validators.maxLength(15),
        //   Validators.pattern('^[a-zA-Z0-9]*$')
        // ]
      ],
      Fax: this.Valid.validateform.Fax,
      aptSteFlr: [],
      Apt: [],
      Ste: [],
      Flr: [],
      AOPOBId: []
    });
  }
  pocForm() {
    this.posDetails = this.fb.group({
      FirstName: this.Valid.validateform.FirstName,
      MiddleName: this.Valid.validateform.middeleName,
      LastName: this.Valid.validateform.FirstName,
      JobTitle: this.Valid.validateform.Taskname,
      Email: this.Valid.validateform.Email,
      DayTimePhone: this.Valid.validateform.MobileNumber,
      MobilePhone: this.Valid.validateform.MobileNumber,
      POCId: []
    });
  }

  authSignatoryForm() {
    this.authSignatoryDetails = this.fb.group({
      FirstName: this.Valid.validateform.FirstName,
      MiddleName: this.Valid.validateform.NotRequired,
      LastName: this.Valid.validateform.FirstName,
      JobTitle: this.Valid.validateform.Taskname,
      Email: this.Valid.validateform.Email,
      DayTimePhone: this.Valid.validateform.MobileNumber,
      MobilePhone: this.Valid.validateform.MobileNumber
    });
  }
  financialsForm() {
    this.financials = this.fb.group({
      FEIN: this.Valid.validateform.LicenseNumber,
      individualIRSTaxNo: this.Valid.validateform.USSSN,
      naicsNumber: this.Valid.validateform.NaicsNumber,
      // c-cureent year annual income l-last year annual income
      CGrossAnnualIncome: this.Valid.validateform.ZipCode,
      CNetAnnualIncome: this.Valid.validateform.ZipCode,
      LGrossAnnualIncome: this.Valid.validateform.ZipCode,
      LNetAnnualIncome: this.Valid.validateform.ZipCode
    });
  }
  loadmaxDate() {
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() - 1); //yestarday date
    this.TodayAndOnlyPastDate = new Date();
    this.ImgTravelDocExpiryDate = new Date();
    this.ImgTravelDocExpiryDate.setDate(this.maxDate.getFullYear() - 100);
  }
  // client submit and get data b>=a >=c
  Submit() {
    let totalFullTimeEmps = this.Orgdetails.value.TotalFullTimeEmployees;
    console.log(totalFullTimeEmps);
    if((this.Orgdetails.value.TotalFullTimeEmployees < parseInt(this.Orgdetails.value.CurrentTotalNumberOfEmployees))){
      this.toaster.info('Total number of employees must greater than or equal current number of employees');
      return
    }
    if((this.Orgdetails.value.CurrentTotalNumberOfEmployees < parseInt(this.Orgdetails.value.NumberOfEmployeesOnH1B))){
      this.toaster.info('Total number of current employees must greater than or equal number of employes on H1-B');
      return
    }
    let formattedDate = new Date(this.Orgdetails.value.CompanyFormedOn);
    this.Orgdetails.value.CompanyFormedOn = formattedDate.toLocaleDateString("en-US", this.options);
    this.spinner.show();
    this.clientService
      .OrganisationInfo(sessionStorage.getItem('ClientOrganisationID'), this.Orgdetails.value, this.token)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.Status == 1) {
            this.toaster.success('Your organization details updated successfully', 'Success');
            this.getOrganisationInfo();
            // this.emitOrgInfoResponse.next(true);
          } else if (res.Status == 0) {
            this.toaster.error('Failed to set  contact information');
          }
        },
        err => {
          this.toaster.error('Error Occured');
        }
      );
    } 
    

  getOrganisationInfo() {
    this.spinner.show();
    console.log(sessionStorage.getItem('ClientOrganisationID'));
    this.clientService.getOrganisationInfo(sessionStorage.getItem('ClientOrganisationID'), this.token).subscribe(
      res => {
        this.spinner.hide();
        if (res != null) {
          this.Orgdetails.patchValue(res);
          if (this.Orgdetails && Object.keys(this.Orgdetails).length) {
            this.showOrgInfoForm = true;
          } else {
            this.showOrgInfoForm = false;
          }
        } else {
          this.uid = 0;
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }
  // financial information submit
  financialsInformation() {
    this.spinner.show();
    var data = {
      FederalEmployerIDNumber: this.financials.value.FEIN,
      IndividualTaxNumber: this.financials.value.individualIRSTaxNo,
      NAICSNumber: this.financials.value.naicsNumber,
      Income: [
        {
          Year: 2020,
          GrossAnnualIncome: this.financials.value.CGrossAnnualIncome,
          NetAnnualIncome: this.financials.value.CNetAnnualIncome
        },
        {
          year: 2019,
          GrossAnnualIncome: this.financials.value.LGrossAnnualIncome,
          NetAnnualIncome: this.financials.value.LNetAnnualIncome
        }
      ],
      FIId: this.fid
    };
    this.clientService.Financials(sessionStorage.getItem('ClientOrganisationID'), data, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.Status == 1) {
          this.toaster.success('Your finanical details updated successfully', 'Success');
          this.getfinancialsInformation();
          // this.emitFinInfoResponse.next(true);
        } else if (res.Status == 0) {
          this.toaster.error('Failed to set  contact information');
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }

  // Get financial information
  getfinancialsInformation() {
    this.spinner.show();
    this.clientService.getFinancialInfo(sessionStorage.getItem('ClientOrganisationID'), this.token).subscribe(
      res => {
        this.spinner.hide();
        if (res != null) {
          this.financialInfo = JSON.parse(JSON.stringify(res));
          this.financialObj = res;
          this.currentYearIncome = this.financialObj.Income[0] == undefined ? {} : this.financialObj.Income[0];
          this.previousYearIncome = this.financialObj.Income[1] == undefined ? {} : this.financialObj.Income[1];
          this.fid = this.financialObj.FIId;
          if (this.financialObj && Object.keys(this.financialObj).length) {
            this.showFinancialInfoForm = true;
          } else {
            this.showFinancialInfoForm = false;
          }
        } else {
          this.fid = 0;
          this.financialObj = {};
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }

  buildPosForm() {
    this.posValidationRules = this.fb.group({
      SubjectName: this.Valid.validateform.Taskname,
      StayedFrom: this.Valid.validateform.Required,
      StayedTill: this.Valid.validateform.Required,
      NoOfDaysOutsideUSA: this.Valid.validateform.NoOfEmployees,
      PSId: [],
      LawOfficeClientId: [],
      CreatedOn: [],
      ModifiedOn: [],
      Status: []
    });
  }
  buildEducationForm() {
    this.educationDetailsValidationRules = this.fb.group({
      FieldOfStudy: this.Valid.validateform.Required,
      DegreeAwarded: this.Valid.validateform.typeOfDegreAwrded,
      UniversityType: this.Valid.validateform.Required,
      UniversityName: this.Valid.validateform.universityName,
      DateOfDegreeAwarded: this.Valid.validateform.Required,
      IsHighestLevelOfEducation: [false],
      EducationDetailsId: [],
      LawOfficeClientId: []
    });
  }
  //Immigration Validation rules
  ImmigrationValidatonRules() {
    this.immiggrationDetails = this.fb.group({
      I94ArrivalOrDepartureRecordNumber: this.Valid.validateform.BarNumber,
      DateOfLastArrival: this.Valid.validateform.Required,
      CurrentNonImmigrantStatus: this.Valid.validateform.Required,
      AnyI40PetitionField: this.Valid.validateform.Required,
      ApprovedReciptNumber: this.Valid.validateform.reciptNumber,
      IMId: [],
      LawOfficeClientId: []
    });
  }
  immigrationTravelDocumentVRules() {
    this.travelDocumentValidationRules = this.fb.group({
      PassportOrTravelDocumentNumber: this.Valid.validateform.BarNumber,
      DatePassportOrTravelDocumentIssued: this.Valid.validateform.Required,
      DatePassportOrTravelDocumentExpires: this.Valid.validateform.Required,
      PassportOrTravelDocumentCountryOfIssuance: this.Valid.validateform.Required,
      ExpiryEmailRemainder: this.Valid.validateform.Required,
      IMDPId: [],
      LawOfficeClientId: []
    });
  }

  foreignAddress() {
    this.foreginAddressValidationRules = this.fb.group({
      StreetNumberAndName: this.Valid.validateform.StreetNumberandName,
      CityOrTown: this.Valid.validateform.CityOrTown,
      ZipCode: this.Valid.validateform.ZipCode,
      State: this.Valid.validateform.Required,
      Province: this.Valid.validateform.Province,
      Country: ['USA'],
      Email: ['', Validators.pattern('[a-z0-9._%+-]+@[a-z0-9-]+\\.[a-z]|\\.[a-z]{2,4}$')],
      DayTimePhone: ['', Validators.pattern('^(?!0+$)((\\+91-?))?(?!0+$)[1-9][0-9]{9}$')],
      MobilePhone: ['', Validators.pattern('^(?!0+$)((\\+91-?))?(?!0+$)[1-9][0-9]{9}$')],
      AptSteFlrNumber: [],
      Fax: this.Valid.validateform.Fax,
      Apt: [],
      Ste: [],
      Flr: [],
      aptSteFlr: [],
      AddressId: [],
      LawOfficeClientId: [],
      InUSA: [false]
    });
  }

  currentUsaAddress() {
    this.currentUsaAddreesValidationRules = this.fb.group({
      StreetNumberAndName: this.Valid.validateform.StreetNumberandName,
      CityOrTown: this.Valid.validateform.CityOrTown,
      ZipCode: this.Valid.validateform.ZipCode,
      State: this.Valid.validateform.Required,
      Province: this.Valid.validateform.Province,
      Country: [''],
      Email: ['', Validators.pattern('[a-z0-9._%+-]+@[a-z0-9-]+\\.[a-z]|\\.[a-z]{2,4}$')],
      DayTimePhone: ['', Validators.pattern('^(?!0+$)((\\+91-?))?(?!0+$)[1-9][0-9]{9}$')],
      MobilePhone: ['', Validators.pattern('^(?!0+$)((\\+91-?))?(?!0+$)[1-9][0-9]{9}$')],
      AptSteFlrNumber: [],
      Fax: this.Valid.validateform.Fax,
      aptSteFlr: [],
      Apt: [],
      Ste: [],
      Flr: [],
      InUSA: [true],
      AddressId: []
    });
  }

  changeForginAptSteFlr() {
    const selectedroleControl: any = this.foreginAddressValidationRules.get('AptSteFlrNumber');
    if (
      this.foreginAddressValidationRules.value.aptSteFlr == 'Apt' ||
      this.foreginAddressValidationRules.value.aptSteFlr == 'Ste' ||
      this.foreginAddressValidationRules.value.aptSteFlr == 'Flr'
    ) {
      this.isForignAptSteFlrNumberDisabled = false;
      selectedroleControl.setValidators([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100),
        Validators.pattern('[a-zA-Z0-9]*$')
      ]);
    } else {
      selectedroleControl.clearValidators();
      selectedroleControl.patchValue('');
      this.isForignAptSteFlrNumberDisabled = true;
    }
    selectedroleControl.updateValueAndValidity();
  }

  changeCurrentUsaAddreesValidationRulesAptSteFlr() {
    const selectedroleControl: any = this.currentUsaAddreesValidationRules.get('AptSteFlrNumber');
    if (
      this.currentUsaAddreesValidationRules.value.aptSteFlr == 'Apt' ||
      this.currentUsaAddreesValidationRules.value.aptSteFlr == 'Ste' ||
      this.currentUsaAddreesValidationRules.value.aptSteFlr == 'Flr'
    ) {
      this.isCurrentAptSteFlrNumberDisabled = false;
      selectedroleControl.setValidators([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100),
        Validators.pattern('[a-zA-Z0-9]*$')
      ]);
    } else {
      selectedroleControl.clearValidators();
      selectedroleControl.patchValue('');
      this.isCurrentAptSteFlrNumberDisabled = true;
    }
    selectedroleControl.updateValueAndValidity();
  }




  // Adding and getting address and contact information
  addAddressAndContact(contactFormObj) {
    if (this.foreginAddressValidationRules.value.aptSteFlr == 'Apt') {
      this.foreginAddressValidationRules.get('Apt').patchValue(true);
      this.foreginAddressValidationRules.get('Ste').patchValue(false);
      this.foreginAddressValidationRules.get('Flr').patchValue(false);
    } else if (this.foreginAddressValidationRules.value.aptSteFlr == 'Ste') {
      this.foreginAddressValidationRules.get('Ste').patchValue(true);
      this.foreginAddressValidationRules.get('Apt').patchValue(false);
      this.foreginAddressValidationRules.get('Flr').patchValue(false);
    } else if (this.foreginAddressValidationRules.value.aptSteFlr == 'Flr') {
      this.foreginAddressValidationRules.get('Flr').patchValue(true);
      this.foreginAddressValidationRules.get('Apt').patchValue(false);
      this.foreginAddressValidationRules.get('Ste').patchValue(false);
    }
    this.spinner.show();
    if (!this.foreginAddressValidationRules.value.AddressId) {
      this.foreginAddressValidationRules.value.AddressId = 0;
    }
    this.foreginAddressValidationRules.value.InUSA = false;
    this.foreginAddressValidationRules.get('aptSteFlr').patchValue('');
    this.clientService.saveApplicantAddressAndContact(this.foreginAddressValidationRules.value, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.commonService.closeModel('close click');
        if (res.Status == 1) {
          this.toaster.success('Your details updated successfully', 'Success');
          this.getForeginAddressAndContact();
          // this.emitForeginAddInfoResponce.next(true);
        } else if (res.Status == 0) {
          this.toaster.error('Failed to set  contact information');
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }

  getForeginAddressAndContact() {
    this.spinner.show();
    this.clientService.getApplicantAddressAndContact(this.token, sessionStorage.getItem('LawOfficeClientID')).subscribe((res: any[]) => {
      this.spinner.hide();
      for (let i = 0; i < res.length; i++) {
        if (res == null) {
          this.isForginContactInfoShow = false;
        } else if (res && Object.keys(res).length && res[i].InUSA === false) {
          this.foreginAddressValidationRules.patchValue(res[i]);
          if (this.foreginAddressValidationRules.value.Apt == true) {
            this.foreginAddressValidationRules.get('aptSteFlr').patchValue('Apt');
          } else if (this.foreginAddressValidationRules.value.Ste == true) {
            this.foreginAddressValidationRules.get('aptSteFlr').patchValue('Ste');
          } else if (this.foreginAddressValidationRules.value.Flr == true) {
            this.foreginAddressValidationRules.get('aptSteFlr').patchValue('Flr');
          }
          this.isForginContactInfoShow = true;
        }
        err => {
          this.toaster.error('Error Occured');
        };
      }
    });
  }

  //getOrganisationInfo --to get personal information
  getPersonalInfo() {
    this.spinner.show();
    this.clientService.getApplicantPersonalDetails(this.token, sessionStorage.getItem('LawOfficeClientID')).subscribe(
      res => {
        this.spinner.hide();
        if (res != null) {
          this.personalDetailsForm.patchValue(res);
          // this.selectedCountry = res[0].CountryOfCitizenShip;
          if (res && Object.keys(res).length) {
            this.showPersonalInfoFoorm = true;
          } else {
            this.showPersonalInfoFoorm = false;
          }
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }

  submitPersonalInfo(personalInfo) {
    this.spinner.show();
    let formattedDate = new Date(personalInfo.DateOfBirth);
    personalInfo.DateOfBirth = formattedDate.toLocaleDateString("en-US", this.options);
    this.clientService.ApplicantPersonalDetails(personalInfo, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res != null) {
          this.toaster.success('Your personal details updated successfully', 'Success');
          this.getPersonalInfo();
          // this.emitAptPersonalInfoResponce.next(true);
        } else {
          this.toaster.error('Failed to update perosnal information');
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }
  backToEducationInfo(educationDetails) {
    this.commonService.closeModel('close click');
    this.commonService.openModel(educationDetails);
  }

  //getOrganisationInfo --to get personal information
  getEducationalnfo() {
    this.spinner.show();
    this.clientService.getApplicantEducationalnfo(this.token, sessionStorage.getItem('LawOfficeClientID')).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res != null) {
          if (res) {
            res = res.sort((a, b) => {
              return <any>new Date(b.DateOfDegreeAwarded) - <any>new Date(a.DateOfDegreeAwarded);
            });
            this.getEduDocumentFile();
            this.educationInfoList = res;
            console.log(this.educationInfoList);
            this.showEducationInfoForm = true;
            this.commonService.closeModel('close click');
            this.getCurrentUsaAddress();
          } else {
            this.showEducationInfoForm = false;
          }
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }

  educationAddressInfo(educationData) {
    this.educationDetailsValidationRules.patchValue(educationData);
    this.currentUsaAddreesValidationRules.patchValue(educationData);
  }

  log(posInfo) {
    this.posValidationRules.patchValue(posInfo);
  }
  changeimgTravel(imgTravelDetail) {
    this.travelDocumentValidationRules.patchValue(imgTravelDetail);
  }

  checkUSAAddress() {
    this.isBackBtnRequired = false;
    this.currentAddress = 'Current U.S.A Address';
  }

  checkHighestLevelOfEducation(addCurrentUsaAddress) {
    let IsHighestLevelOfEducationInfo = this.educationInfoList.find(e => e.IsHighestLevelOfEducation == true);
    if (
      IsHighestLevelOfEducationInfo &&
      this.educationDetailsValidationRules.get('EducationDetailsId').value !=
      IsHighestLevelOfEducationInfo.EducationDetailsId &&
      this.educationDetailsValidationRules.get('IsHighestLevelOfEducation').value == true
    ) {
      this.toaster.info('Already highest level of education selected, please change');
      return;
    }
    this.isBackBtnRequired = true;
    this.commonService.closeModel('close click');
    this.currentAddress = 'Step 2 - Institute Address';

    if (this.educationDetailsValidationRules.value.EducationDetailsId) {

    } else {
      this.currentUsaAddreesValidationRules.reset();
    }
    this.commonService.openModel(addCurrentUsaAddress);
  }

  submitEducationalInfo() {
    let formattedDate = new Date(this.educationDetailsValidationRules.value.DateOfDegreeAwarded);
    this.educationDetailsValidationRules.value.DateOfDegreeAwarded = formattedDate.toLocaleDateString("en-US", this.options);
    let educationalInfo = {
      EducationDetailsId:
        this.educationDetailsValidationRules.value.EducationDetailsId != undefined &&
          this.educationDetailsValidationRules.value.EducationDetailsId != 0
          ? this.educationDetailsValidationRules.value.EducationDetailsId
          : 0,
      LawOfficeClientId: this.educationDetailsValidationRules.value.LawOfficeClientId,
      FieldOfStudy: this.educationDetailsValidationRules.value.FieldOfStudy,
      DegreeAwarded: this.educationDetailsValidationRules.value.DegreeAwarded,
      UniversityType: this.educationDetailsValidationRules.value.UniversityType,
      UniversityName: this.educationDetailsValidationRules.value.UniversityName,
      DateOfDegreeAwarded: this.educationDetailsValidationRules.value.DateOfDegreeAwarded,
      IsHighestLevelOfEducation: this.educationDetailsValidationRules.value.IsHighestLevelOfEducation
        ? this.educationDetailsValidationRules.value.IsHighestLevelOfEducation
        : false,
      StreetNumberAndName: this.currentUsaAddreesValidationRules.value.StreetNumberAndName,
      Apt: this.currentUsaAddreesValidationRules.value.Apt ? this.currentUsaAddreesValidationRules.value.Apt : false,
      Ste: this.currentUsaAddreesValidationRules.value.Ste ? this.currentUsaAddreesValidationRules.value.Ste : false,
      Flr: this.currentUsaAddreesValidationRules.value.Flr ? this.currentUsaAddreesValidationRules.value.Flr : false,
      AptSteFlrNumber: this.currentUsaAddreesValidationRules.value.AptSteFlrNumber,
      CityOrTown: this.currentUsaAddreesValidationRules.value.CityOrTown,
      State: this.currentUsaAddreesValidationRules.value.State,
      Zipcode: this.currentUsaAddreesValidationRules.value.ZipCode,
      Province: this.currentUsaAddreesValidationRules.value.Province,
      Country: this.currentUsaAddreesValidationRules.value.Country,
      Fax: this.currentUsaAddreesValidationRules.value.Fax,
      DayTimePhone: this.currentUsaAddreesValidationRules.value.DayTimePhone,
      MobilePhone: this.currentUsaAddreesValidationRules.value.MobilePhone,
      Email: this.currentUsaAddreesValidationRules.value.Email,
      // "CreatedOn": this.educationInfoData.CreatedOn ? this.educationInfoData.CreatedOn: "",
      // "ModifiedOn": "2020-03-10T15:59:51.846Z",
      Status: true
    };
    this.spinner.show();
    this.clientService.applicantEducationDetails(educationalInfo, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res != null) {
          this.toaster.success('Your education details updated successfully', 'Success');
          this.educationDetailsValidationRules.reset();
          this.currentUsaAddreesValidationRules.reset();
          this.getEducationalnfo();
          this.getEduDocumentFile();
          this.getCurrentUsaAddress();
          // this.emitEducationInfoResponce.next(true);
        } else {
          this.toaster.error('Failed to update education details');
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }

  resetForms() {
    // this.personalDetailsForm.reset();
    this.posValidationRules.reset();
    this.educationDetailsValidationRules.reset();
    //this.immiggrationDetails.reset();
    this.travelDocumentValidationRules.reset();
    this.foreginAddressValidationRules.reset();
    this.currentUsaAddreesValidationRules.reset();
  }

  PostImmigrationDetails() {
    // console.log(this.immiggrationDetails.value);
    let formattedDate = new Date(this.immiggrationDetails.value.DateOfLastArrival);
    this.immiggrationDetails.value.DateOfLastArrival = formattedDate.toLocaleDateString("en-US", this.options);
    this.spinner.show();
    this.clientService.saveImmigrationDetails(this.immiggrationDetails.value, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.Status == 1) {
          this.getImmigrationDetails();
          // this.emitI94TravelInfoResponce.next(true);
          this.toaster.success('Your immigration details updated successfully', 'Success');
        } else if (res.Status == 0) {
          this.toaster.error('Failed to set  contact information');
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }

  getImmigrationDetails() {
    this.clientService.getImmigrationDetails(this.token, sessionStorage.getItem('LawOfficeClientID')).subscribe(res => {
      this.spinner.hide();
      if (res != null) {
        let immiggrationDetails = res;
        this.immiggrationDetails.patchValue(res);
        if (immiggrationDetails && Object.keys(immiggrationDetails).length) {
          this.showImmigrationDetailsForm = true;
        } else {
          this.showImmigrationDetailsForm = false;
        }
      } else {
        this.IMId = 0;
      }
    }),
      err => {
        this.toaster.error('Error Occured');
      };
  }
  ngOnDestroy(): void {
    this.commonService.getStates();
    this.commonService.closeModel('close click');
  }

  postPosInfo() {
    // console.log(this.posValidationRules.value);
    if (new Date(this.posValidationRules.value.StayedFrom) >= new Date(this.posValidationRules.value.StayedTill)) {
      this.toaster.info("stayed till date accepts only stayed from after date", "info");
      return;
    }
    this.commonService.closeModel('close click');
    let formattedDate = new Date(this.posValidationRules.value.StayedFrom);
    this.posValidationRules.value.StayedFrom = formattedDate.toLocaleDateString("en-US", this.options);
    let formattedDate1 = new Date(this.posValidationRules.value.StayedTill);
    this.posValidationRules.value.StayedTill = formattedDate1.toLocaleDateString("en-US", this.options);
    this.spinner.show();
    this.clientService.postPeriodOfStay(this.posValidationRules.value, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res !== null) {
          this.toaster.success('period of stay information saved successfully', 'Success');
          this.posValidationRules.reset();
          this.getPosInformation();
          // this.emitAptPosInfoResponce.next(true);
        } else {
          this.toaster.error('Failed to update period of stay details');
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }

  getPosInformation() {
    this.spinner.show();
    this.clientService.getPeriodOfStay(this.token, sessionStorage.getItem('LawOfficeClientID')).subscribe(res => {
      this.spinner.hide();
      if (res !== null) {
        this.posInfoObj = res;
        this.getPosDocumentFile();
        this.totalNumberOfDaysOutsideUsa = this.posInfoObj.reduce((a, b) => a + parseInt(b['NoOfDaysOutsideUSA']), 0);
        this.showPosForm = true;
        // console.log(this.posInfoObj);
      } else {
        this.showPosForm = false;
      }
    }),
      err => {
        this.toaster.error('Error Occured');
      };
  }

  uploadResumeFile(uploadResumeFile) {
    this.spinner.show();
    const formdata: FormData = new FormData();
    formdata.append('Resume', uploadResumeFile), formdata.append('Type', 'Resume');
    this.clientService.uploadFile(formdata, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res != null) {
          this.toaster.success('your resume uploaded successfulley', 'Success');
          this.getResume();
          // this.emitAptEmpResumeFile.next(true);
        } else {
          this.toaster.error('Failed to update education details');
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }
  getResume() {
    this.spinner.show();
    this.clientService.getFile('Resume', this.token, sessionStorage.getItem('LawOfficeClientID')).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res !== null) {
          this.getResumeFile = res[res.length - 1];
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }

  uploadRecentw2s(uploadRecentW2s) {
    this.spinner.show();
    const formdata: FormData = new FormData();
    for (let i = 0; i < uploadRecentW2s.length; i++) {
      formdata.append('W2', uploadRecentW2s[i]);
    }
    formdata.append('W2', uploadRecentW2s);
    formdata.append('Type', 'W2');
    this.clientService.uploadFile(formdata, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res != null) {
          this.toaster.success('your recent w2s are uploaded successfulley', 'Success');
          this.getRecentw2sfile();
          // this.emitAptRecentW2File.next(true);
        } else {
          this.toaster.error('Failed to update education details');
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }

  getRecentw2sfile() {
    this.spinner.show();
    this.clientService.getFile('W2', this.token, sessionStorage.getItem('LawOfficeClientID')).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res !== null) {
          this.getRecentw2s = res;
        } else {
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }

  uploadRecentPaystubs(filesList) {
    this.spinner.show();
    const formdata: FormData = new FormData();
    for (let i = 0; i < filesList.length; i++) {
      formdata.append('PayStubs', filesList[i]);
    }
    formdata.append('Type', 'PayStubs');
    this.clientService.uploadFile(formdata, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res != null) {
          this.toaster.success('your are recent pay stubs uploaded successfulley', 'Success');
          this.getRecentPayStubs();
          // this.emitApt3RecentPayStubsFiles.next(true);
        } else {
          this.toaster.error('Failed to update education details');
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }

  getRecentPayStubs() {
    this.spinner.show();
    this.clientService.getFile('PayStubs', this.token, sessionStorage.getItem('LawOfficeClientID')).subscribe((res: any) => {
      this.spinner.hide();
      if (res !== null && res !== undefined) {
        this.getRecentPaystubfiles = res;
        for (let i = 0; i < this.recentPatStubs.length; i++) {
          this.splittedFile = this.recentPatStubs[i].FileName.split('.');
          this.recentPatStubs[i].fileType = this.splittedFile[1];
        }
      }
      error => { };
    });
  }

  uploadEadCard(uploadEadcardFile) {
    this.spinner.show();
    const formdata: FormData = new FormData();
    for (let i = 0; i < uploadEadcardFile.length; i++) {
      formdata.append('EAD', uploadEadcardFile[i]);
    }
    formdata.append('EAD', uploadEadcardFile);
    formdata.append('Type', 'EAD');
    this.clientService.uploadFile(formdata, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res != null) {
          this.toaster.success('your ead cards are uploaded successfulley', 'Success');
          this.getEadCardfile();
          // this.emitAptEadCardFile.next(true);
        } else {
          this.toaster.error('Failed to update education details');
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }

  getEadCardfile() {
    this.spinner.show();
    this.clientService.getFile('EAD', this.token, sessionStorage.getItem('LawOfficeClientID')).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res !== null) {
          this.getEadCardFile = res;
          // console.log(this.getEadCardFile);
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }

  addMorePeriods(periodOfStay) {
    if (this.posInfoObj.length < 7) {
      this.commonService.openModel(periodOfStay);
    } else {
      this.toaster.info('Please contact your atterny for more period of stays');
    }
  }

  removeFilepopup(popup: any, $event) {
    this.EFileId = $event.fileId;
    this.fileType = $event.fileType;
    this.DeletefileModel = this.modalService.open(popup, {
      centered: true,
      keyboard: false,
      backdrop: 'static'
    });
  }

  deleteEducationPopup(popup: any, $event) {
    this.eduInfoForDelete = $event;
    this.posInfoForDelete = $event;
    this.deleteEduInfoPopup = this.modalService.open(popup, {
      centered: true,
      keyboard: false,
      backdrop: 'static'
    });
  }
  deletePosPopup(popup: any, $event) {
    this.posInfoForDelete = $event;
    this.deleteEduInfoPopup = this.modalService.open(popup, {
      centered: true,
      keyboard: false,
      backdrop: 'static'
    });
  }

  deleteEmployementFiles() {
    this.spinner.show();
    this.clientService.deleteFile(this.EFileId, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.Status == 1) {
          this.closeModal();
          this.toaster.error('Your file deleted successfully', 'File Delete');
          if (this.fileType === 'resume') {
            this.getResume();
          } else if (this.fileType === 'recentW2s') {
            this.getRecentw2sfile();
          } else if (this.fileType === '3recentPayStubs') {
            this.getRecentPayStubs();
          } else if (this.fileType === 'eadCards') {
            this.getEadCardfile();
          } else if (this.fileType === 'travelDocument') {
            this.getImgTravelFile();
          } else if (this.fileType === 'Education') {
            this.getEduDocumentFile();
          } else if (this.fileType === 'POS') {
            this.getPosInformation();
          } else {
            this.getImgI94File();
          }
        } else if (res.Status == 0) {
          this.toaster.error('Failed to delete your file');
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }
  printEmployementFiles($event) {
    this.EFileId = $event.fileId;
    this.fileType = $event.fileType;
    this.fileName = $event.fileName;
    if (this.fileType === 'resume') {
      this.EFileId = this.getResumeFile;
      this.filepath = this.EFileId.S3Path;
      this.printSpecificFile(this.filepath, this.fileName);
    } else if (this.fileType === 'recentW2s') {
      let printRecentW2s = this.getRecentw2s.filter(x => x.EFileId === this.EFileId);
      this.filepath = printRecentW2s[0].S3Path;
      this.printSpecificFile(this.filepath, this.fileName);
    } else if (this.fileType === '3recentPayStubs') {
      let print3RecentPayStubs = this.getRecentPaystubfiles.filter(x => x.EFileId === this.EFileId);
      this.filepath = print3RecentPayStubs[0].S3Path;
      this.printSpecificFile(this.filepath, this.fileName);
    } else if (this.fileType === 'eadCards') {
      let printEadCard = this.getEadCardFile.filter(x => x.EFileId === this.EFileId);
      this.filepath = printEadCard[0].S3Path;
      this.printSpecificFile(this.filepath, this.fileName);
    } else if (this.fileType === 'travelDocument') {
      let printTravelDoc = this.imgTravelDocFile.filter(x => x.EFileId === this.EFileId);
      this.filepath = printTravelDoc[0].S3Path;
      this.printSpecificFile(this.filepath, this.fileName);
    } else if (this.fileType === 'Education') {
      let printEduFile = this.getEduFiles.filter(x => x.EFileId === this.EFileId);
      this.filepath = printEduFile[0].S3Path;
      this.printSpecificFile(this.filepath, this.fileName);
    } else if (this.fileType === 'POS') {
      let printPosFile = this.getPosFiles.filter(x => x.EFileId === this.EFileId);
      this.filepath = printPosFile[0].S3Path;
      this.printSpecificFile(this.filepath, this.fileName);
    } else {
      let printImg94DocFile = this.imgI94DocFile.filter(x => x.EFileId === this.EFileId);
      this.filepath = printImg94DocFile[0].S3Path;
      this.printSpecificFile(this.filepath, this.fileName);
    }
  }

  printSpecificFile(filepath: any, fileName: any) {
    this.splittedFile = fileName.split('.');
    this.splittedFileType = this.splittedFile[1];
    this.http
      .get(filepath, {
        responseType: ResponseContentType.Blob
      })
      .subscribe((response: any) => {
        var mediaType = response._body.type;
        if (this.splittedFileType == 'pdf') {
          var blob = new Blob([response.blob()], { type: 'application/pdf' });
          const blobUrl = URL.createObjectURL(blob);
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = blobUrl;
          document.body.appendChild(iframe);
          iframe.contentWindow.print();
        }
        if (
          this.splittedFileType == 'jpg' ||
          this.splittedFileType == 'jpeg' ||
          this.splittedFileType == 'JPG' ||
          this.splittedFileType == 'JPEG' ||
          this.splittedFileType == 'png' ||
          this.splittedFileType == 'PNG'
        ) {
          var blob = new Blob([response.blob()], { type: 'image/jpeg' });
          const blobUrl = URL.createObjectURL(blob);
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = blobUrl;
          document.body.appendChild(iframe);
          iframe.contentWindow.print();
        }
      });
  }
  viewEmployementFiles($event) {
    this.EFileId = $event.fileId;
    this.fileType = $event.fileType;
    if (this.fileType === 'resume') {
      this.EFileId = this.getResumeFile;
      window.open(this.EFileId.S3Path, '_blank');
    } else if (this.fileType === 'recentW2s') {
      let viewRecentWrsFile = this.getRecentw2s.filter(x => x.EFileId === this.EFileId);
      window.open(viewRecentWrsFile[0].S3Path, '_blank');
    } else if (this.fileType === '3recentPayStubs') {
      let view3RecentPaystubs = this.getRecentPaystubfiles.filter(x => x.EFileId === this.EFileId);
      window.open(view3RecentPaystubs[0].S3Path, '_blank');
    } else if (this.fileType === 'eadCards') {
      let viewEadCards = this.getEadCardFile.filter(x => x.EFileId === this.EFileId);
      window.open(viewEadCards[0].S3Path, '_blank');
    } else if (this.fileType === 'Education') {
      let viewEduFiles = this.getEduFiles.filter(x => x.EFileId === this.EFileId);
      window.open(viewEduFiles[0].S3Path, '_blank');
    } else if (this.fileType === 'travelDocument') {
      let viewimgTravelDocFile = this.imgTravelDocFile.filter(x => x.EFileId === this.EFileId);
      window.open(viewimgTravelDocFile[0].S3Path, '_blank');
    } else if (this.fileType === 'POS') {
      let viewPosFile = this.getPosFiles.filter(x => x.EFileId === this.EFileId);
      window.open(viewPosFile[0].S3Path, '_blank');
    } else {
      let viewImg94DocFile = this.imgI94DocFile.filter(x => x.EFileId === this.EFileId);
      window.open(viewImg94DocFile[0].S3Path, '_blank');
    }
  }
  downloadEmployementFiles($event) {
    this.EFileId = $event.fileId;
    this.fileType = $event.fileType;
    this.fileName = $event.fileName;
    if (this.fileType === 'resume') {
      this.EFileId = this.getResumeFile;
      this.filepath = this.EFileId.S3Path;
      const mediaType = this.fileType;
      const blob = new Blob([this.filepath], { type: mediaType });
      saveAs(blob, this.fileName);
      err => {
        this.toaster.error('error occured');
      };
    } else if (this.fileType === 'recentW2s') {
      let downloadRecentW2s = this.getRecentw2s.filter(x => x.EFileId === this.EFileId);
      this.filepath = downloadRecentW2s[0].S3Path;
      const mediaType = this.fileType;
      const blob = new Blob([this.filepath], { type: mediaType });
      saveAs(blob, this.fileName);
      err => {
        this.toaster.error('error occured');
      };
    } else if (this.fileType === '3recentPayStubs') {
      let download3RecentPaystubs = this.getRecentPaystubfiles.filter(x => x.EFileId === this.EFileId);
      this.filepath = download3RecentPaystubs[0].S3Path;
      const mediaType = this.fileType;
      const blob = new Blob([this.filepath], { type: mediaType });
      saveAs(blob, this.fileName);
      err => {
        this.toaster.error('error occured');
      };
    } else if (this.fileType === 'eadCards') {
      let downloadEadcardFile = this.getEadCardFile.filter(x => x.EFileId === this.EFileId);
      this.filepath = downloadEadcardFile[0].S3Path;
      const mediaType = this.fileType;
      const blob = new Blob([this.filepath], { type: mediaType });
      saveAs(blob, this.fileName);
      err => {
        this.toaster.error('error occured');
      };
    } else if (this.fileType === 'travelDocument') {
      let downloadTravelDoc = this.imgTravelDocFile.filter(x => x.EFileId === this.EFileId);
      this.filepath = downloadTravelDoc[0].S3Path;
      const mediaType = this.fileType;
      const blob = new Blob([this.filepath], { type: mediaType });
      saveAs(blob, this.fileName);
      err => {
        this.toaster.error('error occured');
      };
    } else if (this.fileType === 'Education') {
      let downloadEducationFile = this.getEduFiles.filter(x => x.EFileId === this.EFileId);
      this.filepath = downloadEducationFile[0].S3Path;
      const mediaType = this.fileType;
      const blob = new Blob([this.filepath], { type: mediaType });
      saveAs(blob, this.fileName);
      err => {
        this.toaster.error('error occured');
      };
    } else if (this.fileType === 'POS') {
      let downloadPosFile = this.getPosFiles.filter(x => x.EFileId === this.EFileId);
      this.filepath = downloadPosFile[0].S3Path;
      const mediaType = this.fileType;
      const blob = new Blob([this.filepath], { type: mediaType });
      saveAs(blob, this.fileName);
      err => {
        this.toaster.error('error occured');
      };
    }
    else {
      let downloadImgDocFile = this.imgI94DocFile.filter(x => x.EFileId === this.EFileId);
      this.filepath = downloadImgDocFile[0].S3Path;
      const mediaType = this.fileType;
      const blob = new Blob([this.filepath], { type: mediaType });
      saveAs(blob, this.fileName);
      err => {
        this.toaster.error('error occured');
      };
    }
  }

  imgTravelDetails() {
    // console.log(this.travelDocumentValidationRules.value.DatePassportOrTravelDocumentIssued);
    let dateOfTravelDocIssued = new Date(this.travelDocumentValidationRules.value.DatePassportOrTravelDocumentIssued);
    let dateOfTravelDocExpires = new Date(this.travelDocumentValidationRules.value.DatePassportOrTravelDocumentExpires);
    dateOfTravelDocIssued.setFullYear(dateOfTravelDocIssued.getFullYear() + 100)
    if (!(dateOfTravelDocIssued >= dateOfTravelDocExpires)) {
      this.toaster.info("Date Passport Or Travel Document Expires not exceed 100 years of Date Passport Or Travel Document Issued");
      return
    }
    let formattedDate = new Date(this.travelDocumentValidationRules.value.DatePassportOrTravelDocumentIssued);
    this.travelDocumentValidationRules.value.DatePassportOrTravelDocumentIssued = formattedDate.toLocaleDateString("en-US", this.options);
    let formattedDate1 = new Date(this.travelDocumentValidationRules.value.DatePassportOrTravelDocumentExpires);
    this.travelDocumentValidationRules.value.DatePassportOrTravelDocumentExpires = formattedDate1.toLocaleDateString("en-US", this.options);
    this.travelDocumentValidationRules.value.LawOfficeClientId = sessionStorage.getItem('LawOfficeClientID')
    this.spinner.show();
    this.clientService.saveImmigrationTravelDetails(this.travelDocumentValidationRules.value, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.Status == 1) {
          this.commonService.closeModel('close click');
          this.toaster.success('Your immigration details updated successfully', 'Success');
          this.getImgTravelDetails();
          // this.emitAptImgTravelInfoResponce.next(true);
        } else if (res.Status == 0) {
          this.toaster.error('Failed to set  contact information');
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }
  getImgTravelDetails() {
    this.spinner.show();
    this.clientService.getImmigrationTravelDetails(this.token, sessionStorage.getItem('LawOfficeClientID')).subscribe(
      res => {
        this.spinner.hide();
        if (res != null) {
          this.imgTravelDetail = res;
          let travelDocumentValidationRules = res;
          this.travelDocumentValidationRules.patchValue(res);
          if (travelDocumentValidationRules && Object.keys(travelDocumentValidationRules).length) {
            this.showImgTravelDetails = true;
          } else {
            this.showImgTravelDetails = false;
          }
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }
  closeModal() {
    this.modalService.dismissAll();
  }

  uploadImgTravelDocumentFile(imgTravelDocument) {
    this.spinner.show();
    const formdata: FormData = new FormData();
    for (let i = 0; i < imgTravelDocument.length; i++) {
      formdata.append('Passport', imgTravelDocument[i]);
    }
    formdata.append('Passport', imgTravelDocument), formdata.append('Type', 'Passport');
    this.clientService.uploadFile(formdata, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res != null) {
          this.toaster.success('your passport or travel document uploaded successfulley', 'Success');
          this.getImgTravelFile();
        } else {
          this.toaster.error('Failed to update education details');
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }
  getImgTravelFile() {
    this.spinner.show();
    this.clientService.getFile('Passport', this.token, sessionStorage.getItem('LawOfficeClientID')).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res !== null) {
          this.imgTravelDocFile = res;
          // console.log(this.imgTravelDocFile);
        } else {
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }
  uploadImgI94DocumentFile(imgI94Document) {
    // console.log(imgTravelDocument);
    this.spinner.show();
    const formdata: FormData = new FormData();
    for (let i = 0; i < imgI94Document.length; i++) {
      formdata.append('PayStubs', imgI94Document[i]);
    }
    formdata.append('ImmigrationFiles', imgI94Document), formdata.append('Type', 'ImmigrationFiles');
    this.clientService.uploadFile(formdata, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res != null) {
          this.toaster.success('your I94 document uploaded successfulley', 'Success');
          this.getImgI94File();
        } else {
          this.toaster.error('Failed to update education details');
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }
  getImgI94File() {
    this.spinner.show();
    this.clientService.getFile('ImmigrationFiles', this.token, sessionStorage.getItem('LawOfficeClientID')).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res !== null) {
          this.imgI94DocFile = res;
          // console.log(this.imgTravelDocFile);
        } else {
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }

  pocInformation(pocObj) {
    this.pocObj = pocObj;
    if (!this.pocObj.POCId) {
      this.pocObj.POCId = 0;
    }
    this.spinner.show();
    this.clientService.pocInformation(sessionStorage.getItem('ClientOrganisationID'), this.pocObj, this.token).subscribe(
      (res: any) => {
        if (res.Status == 1) {
          this.spinner.hide();
          this.toaster.success('Your poc details updated successfully', 'Success');
          this.getPocInfromation();
          // this.emitPocInfoResponce.next(true);
        } else if (res.Status == 0) {
          this.toaster.error('Failed updated set poc information');
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }
  getPocInfromation() {
    this.spinner.show();
    this.clientService.getPoc(sessionStorage.getItem('ClientOrganisationID'), this.token).subscribe(res => {
      this.spinner.hide();
      if (res != null) {
        this.pocObj = res;
        if (this.pocObj && Object.keys(this.pocObj).length) {
          this.pocValidated = true;
          this.showPocContactInfo = true;

        } else {
          this.showPocContactInfo = false;
        }
        this.sameasPoc = true;
      } else {
      }
    });
  }

  // Authrized signatory info
  authSignatoryInformation(authSignatoryObj) {
    this.authSignatoryObj = authSignatoryObj;
    this.authSignatoryObj['ASId'] = this.tempAuthSignatoryObj['ASId'];
    this.authSignatoryObj['Status'] = this.tempAuthSignatoryObj['Status'];
    if (!this.authSignatoryObj.ASId) {
      this.pocObj.ASId = 0;
    }
    this.spinner.show();
    this.clientService
      .authSigntotaryInfo(sessionStorage.getItem('ClientOrganisationID'), this.authSignatoryObj, this.token)
      .subscribe(
        (res: any) => {
          if (res.Status == 1) {
            this.spinner.hide();
            this.toaster.success('Your Authorized Signatory details updated successfully', 'Success');
            this.getauthSignatoryInformation();
            // this.emitAuthorizedInfoResponce.next(true);
          } else if (res.Status == 0) {
            this.toaster.error('Failed updated set poc information');
          }
        },
        err => {
          this.toaster.error('Error Occured');
        }
      );
  }

  //get authrized signatory info
  getauthSignatoryInformation() {
    this.spinner.show();
    this.clientService.getauthSigntotaryInfo(sessionStorage.getItem('ClientOrganisationID'), this.token).subscribe(res => {
      this.spinner.hide();
      if (res != null) {
        this.authSignatoryObj = res;
        this.tempAuthSignatoryObj = res;
        if (this.authSignatoryObj && Object.keys(this.authSignatoryObj).length) {
          this.showAutoryhSigntContactInfo = true;
        } else {
          this.showAutoryhSigntContactInfo = false;
        }
      }
      err => {
        this.toaster.error('Error Occured');
      };
    });
  }

  sameeAsPOCAuthorizedSignatory(val) {
    if (!val) {
      let tempPocObj = this.pocObj;
      delete tempPocObj['POCId'];
      delete tempPocObj['Status'];
      this.authSignatoryObj = JSON.parse(JSON.stringify(tempPocObj));
    } else {
      this.authSignatoryObj = {};
    }
  }
  // storeContactInformation(contactFormObj) {
  //   this.contactFormObj = JSON.parse(JSON.stringify(contactFormObj));
  // }
  // storeAddressPrincipal(addContactFormObj) {
  //   this.addContactFormObj = JSON.parse(JSON.stringify(addContactFormObj));
  // }

  mailingAddress(contactFormObj) {
    this.spinner.show();
    this.contactForm.value.Country = 'USA';
    if (!this.contactForm.value.MAId) {
      this.contactForm.value.MAId = 0;
    }
    if (this.contactForm.value.aptSteFlr == 'Apt') {
      this.contactForm.get('Apt').patchValue(true);
      this.contactForm.get('Ste').patchValue(false);
      this.contactForm.get('Flr').patchValue(false);
    } else if (this.contactForm.value.aptSteFlr == 'Ste') {
      this.contactForm.get('Ste').patchValue(true);
      this.contactForm.get('Apt').patchValue(false);
      this.contactForm.get('Flr').patchValue(false);
    } else if (this.contactForm.value.aptSteFlr == 'Flr') {
      this.contactForm.get('Flr').patchValue(true);
      this.contactForm.get('Apt').patchValue(false);
      this.contactForm.get('Ste').patchValue(false);
    }
    this.contactForm.get('aptSteFlr').patchValue('');
    this.clientService
      .mailingAddress(sessionStorage.getItem('ClientOrganisationID'), this.contactForm.value, this.token)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.commonService.closeModel('close click');
          if (res.Status == 1) {
            this.toaster.success('Your details updated successfully', 'Success');
            this.getcontactinformation();
            // this.emitMailingAddInfoResponce.next(true);
          } else if (res.Status == 0) {
            this.toaster.error('Failed to set  contact information');
          }
        },
        err => {
          this.toaster.error('Error Occured');
        }
      );
  }

  addressOfPrincipalPlaceOfBusiness() {
    if (this.businessAddress.value.aptSteFlr == 'Apt') {
      this.businessAddress.get('Apt').patchValue(true);
      this.businessAddress.get('Ste').patchValue(false);
      this.businessAddress.get('Flr').patchValue(false);
    } else if (this.businessAddress.value.aptSteFlr == 'Ste') {
      this.businessAddress.get('Ste').patchValue(true);
      this.businessAddress.get('Apt').patchValue(false);
      this.businessAddress.get('Flr').patchValue(false);
    } else if (this.businessAddress.value.aptSteFlr == 'Flr') {
      this.businessAddress.get('Flr').patchValue(true);
      this.businessAddress.get('Apt').patchValue(false);
      this.businessAddress.get('Ste').patchValue(false);
    }
    this.businessAddress.get('aptSteFlr').patchValue('');
    this.spinner.show();
    this.clientService
      .addressOfPrincipalPlaceOfBusiness(
        sessionStorage.getItem('ClientOrganisationID'),
        this.businessAddress.value,
        this.token
      )
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.commonService.closeModel('close click');
          if (res.Status == 1) {
            this.toaster.success('Your address of principal place of business updated successfully', 'Success');
            this.getAddressOfPrincipalPlaceOfBusiness();
            // this.emitMailingAddInfoResponce.next(true);
          } else if (res.Status == 0) {
            this.toaster.error('Failed to set  contact information');
          }
        },
        err => {
          this.toaster.error('Error Occured');
        }
      );
  }

  getcontactinformation() {
    this.spinner.show();
    this.clientService.getMailingAddress(sessionStorage.getItem('ClientOrganisationID'), this.token).subscribe(
      (res: any[]) => {
        this.spinner.hide();
        this.contactForm.reset();
        if (res !== null && res !== undefined) {
          this.contactForm.patchValue(res);
          if (this.contactForm.value.Apt == true) {
            this.contactForm.get('aptSteFlr').patchValue('Apt');
          } else if (this.contactForm.value.Ste == true) {
            this.contactForm.get('aptSteFlr').patchValue('Ste');
          } else if (this.contactForm.value.Flr == true) {
            this.contactForm.get('aptSteFlr').patchValue('Flr');
          }
          this.isContactInfoShow = true;
          // this.contactFormObj = res;
          // this.tempContactInfo = JSON.parse(JSON.stringify(res));
          this.changeAptSteFlr();
        } else {
          // this.contactFormObj = {};
          this.isContactInfoShow = false;
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }

  addCurrentUsaAddress(addContactFormObj) {
    if (this.educationDetailsValidationRules.valid && this.currentUsaAddreesValidationRules.valid) {
      this.submitEducationalInfo();
      return;
    }
    this.spinner.show();
    (this.currentUsaAddreesValidationRules.value.AOPOBId =
      this.currentUsaAddreesValidationRules.value.AOPOBId != undefined &&
        this.currentUsaAddreesValidationRules.value.AOPOBId != 0
        ? this.currentUsaAddreesValidationRules.value.AOPOBId
        : 0),
      (this.currentUsaAddreesValidationRules.value.InUSA = true);
    if (this.currentUsaAddreesValidationRules.value.aptSteFlr == 'Apt') {
      this.currentUsaAddreesValidationRules.get('Apt').patchValue(true);
      this.currentUsaAddreesValidationRules.get('Ste').patchValue(false);
      this.currentUsaAddreesValidationRules.get('Flr').patchValue(false);
    } else if (this.currentUsaAddreesValidationRules.value.aptSteFlr == 'Ste') {
      this.currentUsaAddreesValidationRules.get('Ste').patchValue(true);
      this.currentUsaAddreesValidationRules.get('Apt').patchValue(false);
      this.currentUsaAddreesValidationRules.get('Flr').patchValue(false);
    } else if (this.currentUsaAddreesValidationRules.value.aptSteFlr == 'Flr') {
      this.currentUsaAddreesValidationRules.get('Flr').patchValue(true);
      this.currentUsaAddreesValidationRules.get('Apt').patchValue(false);
      this.currentUsaAddreesValidationRules.get('Ste').patchValue(false);
    }
    this.currentUsaAddreesValidationRules.get('aptSteFlr').patchValue('');
    this.clientService
      .saveApplicantAddressAndContact(this.currentUsaAddreesValidationRules.value, this.token)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          this.commonService.closeModel('close click');
          if (res.Status == 1) {
            this.toaster.success('Your current usa address details updated successfully', 'Success');
            this.getCurrentUsaAddress();
          } else if (res.Status == 0) {
            this.toaster.error('Failed to set  contact information');
          }
        },
        err => {
          this.toaster.error('Error Occured');
        }
      );
  }

  getAddressOfPrincipalPlaceOfBusiness() {
    this.spinner.show();
    this.clientService
      .getaddressOfPrincipalPlaceOfBusiness(sessionStorage.getItem('ClientOrganisationID'), this.token)
      .subscribe(
        (res: any[]) => {
          this.spinner.hide();
          if (res == null) {
            this.addContactFormShow = false;
          } else {
            this.businessAddress.patchValue(res);
            if (this.businessAddress.value.Apt == true) {
              this.businessAddress.get('aptSteFlr').patchValue('Apt');
            } else if (this.businessAddress.value.Ste == true) {
              this.businessAddress.get('aptSteFlr').patchValue('Ste');
            } else if (this.businessAddress.value.Flr == true) {
              this.businessAddress.get('aptSteFlr').patchValue('Flr');
            }
            this.addContactFormShow = true;
            // this.teamAddContactFormObj = JSON.parse(JSON.stringify(res));
          }
        },
        err => {
          this.toaster.error('Error Occured');
        }
      );
  }
  getCurrentUsaAddress() {
    this.spinner.show();
    this.clientService.getApplicantAddressAndContact(this.token, sessionStorage.getItem('LawOfficeClientID')).subscribe((res: any[]) => {
      this.spinner.hide();
      for (let i = 0; i < res.length; i++) {
        if (res == null) {
          this.isCurrentUsaAddress = false;
        } else if (res && Object.keys(res).length && res[i].InUSA === true) {
          this.currentUsaAddreesValidationRules.patchValue(res[i]);
          if (this.currentUsaAddreesValidationRules.value.Apt == true) {
            this.currentUsaAddreesValidationRules.get('aptSteFlr').patchValue('Apt');
          } else if (this.currentUsaAddreesValidationRules.value.Ste == true) {
            this.currentUsaAddreesValidationRules.get('aptSteFlr').patchValue('Ste');
          } else if (this.currentUsaAddreesValidationRules.value.Flr == true) {
            this.currentUsaAddreesValidationRules.get('aptSteFlr').patchValue('Flr');
          }
          this.isCurrentUsaAddress = true;
        }
        err => {
          this.toaster.error('Error Occured');
        };
      }
    });
  }

  uploadPosDocumentFile($event) {
    this.spinner.show();
    const formdata: FormData = new FormData();
    for (let i = 0; i < $event.posImages.length; i++) {
      formdata.append('PayStubs', $event.posImages[i]);
    }
    formdata.append('Type', 'POS');
    formdata.append('TypeId', $event.posId);
    formdata.getAll('POS')
    this.clientService.uploadFile(formdata, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res != null) {
          this.toaster.success('your Pos File uploaded successfulley', 'Success');
          this.getPosInformation();
          this.getPosDocumentFile();
          // this.emitAptEmpResumeFile.next(true);
        } else {
          this.toaster.error('Failed to update education details');
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }

  getPosDocumentFile() {
    this.spinner.show();
    this.clientService.getFile('POS', this.token, sessionStorage.getItem('LawOfficeClientID')).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res !== null) {
          // this.getPosFile = res[res.length - 1];
          this.getPosFiles = res;
          // console.log(this.getPosFiles);
          let that = this;
          this.posInfoObj.forEach(function (posItem, index) {
            posItem['posFileObj'] = [];
            that.getPosFiles.forEach(function (fileItem, index) {
              if (fileItem.TypeId == posItem.PSId) {
                posItem['posFileObj'].push(fileItem);
              }
            });
          });
        } else {
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }

  uploadEduDocumentFile($event) {
    this.spinner.show();
    const formdata: FormData = new FormData();
    for (let i = 0; i < $event.eduImages.length; i++) {
      formdata.append('Education', $event.eduImages[i]);
    }
    formdata.append('Type', 'Education');
    formdata.append('TypeId', $event.educationDetailsId);
    formdata.getAll('Education')
    this.clientService.uploadFile(formdata, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res != null) {
          this.toaster.success('your education File uploaded successfulley', 'Success');
          this.getEducationalnfo();
          this.getEduDocumentFile();
        } else {
          this.toaster.error('Failed to update education details');
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }

  getEduDocumentFile() {
    this.spinner.show();
    this.clientService.getFile('Education', this.token, sessionStorage.getItem('LawOfficeClientID')).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res !== null) {
          this.getEduFile = res;
          this.getEduFiles = res;
          let that = this;
          this.educationInfoList.forEach(function (eduItem, index) {
            eduItem['eduFileObj'] = [];
            that.getEduFiles.forEach(function (fileItem, index) {
              if (fileItem.TypeId == eduItem.EducationDetailsId) {
                eduItem['eduFileObj'].push(fileItem);
              }
            });
          });
        } else {
        }
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }

  changeAptSteFlr() {
    const selectedroleControl: any = this.contactForm.get('AptSteFlrNumber');
    if (
      this.contactForm.value.aptSteFlr == 'Apt' ||
      this.contactForm.value.aptSteFlr == 'Ste' ||
      this.contactForm.value.aptSteFlr == 'Flr'
    ) {
      console.log(this.contactForm.value.aptSteFlr);
      this.isAptSteFlrNumberDisabled = false;
      selectedroleControl.setValidators([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100),
        Validators.pattern('[a-zA-Z0-9]*$')
      ]);
    } else {
      selectedroleControl.clearValidators();
      selectedroleControl.patchValue('');
      this.isAptSteFlrNumberDisabled = true;
    }
    selectedroleControl.updateValueAndValidity();
  }
  changeBussinessAptSteFlrNumber() {
    const selectedroleControl: any = this.businessAddress.get('AptSteFlrNumber');
    if (
      this.businessAddress.value.aptSteFlr == 'Apt' ||
      this.businessAddress.value.aptSteFlr == 'Ste' ||
      this.businessAddress.value.aptSteFlr == 'Flr'
    ) {
      this.isBussinessAptSteFlrNumberDisabled = false;
      selectedroleControl.setValidators([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100),
        Validators.pattern('[a-zA-Z0-9]*$')
      ]);
    } else {
      selectedroleControl.clearValidators();
      selectedroleControl.patchValue('');
      this.isBussinessAptSteFlrNumberDisabled = true;
    }
    selectedroleControl.updateValueAndValidity();
  }

  deleteEducationInfo() {
    this.spinner.show();
    let that = this;
    let deleteEduFiles = [];
    this.educationInfoList.forEach(function (eduInfoItem, index) {
      eduInfoItem.eduFileObj.forEach(function (eduFileItem, index) {
        if (that.eduInfoForDelete == eduFileItem.TypeId) {
          deleteEduFiles.push(eduFileItem);
        }
      });
    });
    this.getEducationalnfo();
    this.clientService.deleteApplicantEduInfo(this.eduInfoForDelete, this.token).subscribe(
      (res: any) => {
        deleteEduFiles.forEach(function (eduFileId) {
          that.clientService.deleteFile(eduFileId.EFileId, that.token).subscribe(
            (res: any) => {

            }
          )
        });
        this.spinner.hide();
        this.closeModal();
        this.toaster.info('Education info deleted successfully along with files');
        this.getEducationalnfo();
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );

  }
  deletePosInfo() {
    this.spinner.show();
    let that = this;
    let deletePosFiles = [];
    this.posInfoObj.forEach(function (posInfoItem, index) {
      posInfoItem.posFileObj.forEach(function (posFileItem, index) {
        if (that.posInfoForDelete == posFileItem.TypeId) {
          deletePosFiles.push(posFileItem);
        }
      });
    });
    this.getPosInformation();
    this.clientService.deleteApplicantPosInfo(this.posInfoForDelete, this.token).subscribe(
      (res: any) => {
        deletePosFiles.forEach(function (eduFileId) {
          that.clientService.deleteFile(eduFileId.EFileId, that.token).subscribe(
            (res: any) => {

            }
          )
        });
        this.spinner.hide();
        this.closeModal();
        this.toaster.info('Period of stay info deleted successfully along with files');
        this.getPosInformation();
      },
      err => {
        this.toaster.error('Error Occured');
      }
    );
  }
  // clearSubscription() {
  //   this.emitOrgInfoResponse.next(null);
  //   this.emitMailingAddInfoResponce.next(null);
  //   this.emitBusinessAddInfoResponce.next(null);
  //   this.emitFinInfoResponse.next(null);
  //   this.emitPocInfoResponce.next(null);
  //   this.emitAuthorizedInfoResponce.next(null);
  //   // applicant
  //   this.emitAptPersonalInfoResponce.next(null);
  //   this.emitForeginAddInfoResponce.next(null);
  //   this.emitEducationInfoResponce.next(null);
  //   this.emitAptEmpResumeFile.next(null);
  //   this.emitAptRecentW2File.next(null);
  //   this.emitApt3RecentPayStubsFiles.next(null);
  //   this.emitAptEadCardFile.next(null);
  //   this.emitAptImgTravelInfoResponce.next(null);
  //   this.emitI94TravelInfoResponce.next(null);
  //   this.emitAptPosInfoResponce.next(null);
  // }
  getNonImmigrantInfo() {
    this.commonService.getNonImmigrantInfo().subscribe((res: any) => {
      this.nonImmigrantInfo = res.nonImmigrantVisaInfos;
    });
  }
}