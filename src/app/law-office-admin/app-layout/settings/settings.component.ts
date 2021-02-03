import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '@app/shared/service/validation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '@app/law-office-admin/admin.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminClientService } from '../clients/client.service';
import { PasswordValidator } from '@app/shared/helpers/PasswordValidator';
import { AdminpermissionService } from '@app/auth-guard/admin/adminpermission.service';
import { ToastrService } from 'ngx-toastr';
import { RandomColor } from 'angular-randomcolor';
import { CommonService } from '@app/shared/service/common.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  accountForm: FormGroup;
  passwordFormGroup: FormGroup;
  attorneyForm: FormGroup;
  contactForm: FormGroup;
  profileContactForm: FormGroup;
  dropdownSettings = {};
  passwordModel: any;
  data: any;
  sentModel: any;
  token: string;
  teamMembersList = [];
  teamMembersRoles = [];
  tempTeamList = [];
  roleAlertMessage: any;
  teamMemberPermissions: any = {};
  teamFillingsPermissions: any = {};
  teamTemplatePermissions: any = {};
  teamMemberDocumentLibraryPermissions: any = {};
  teamMemberFillingsPermissions: any = {};
  selectedRole: string;
  teamMemberCheck = false;
  AdminID: string;
  adminList = [];
  loadPermissions = false;
  isTeamMember = false;
  primaryattorneyObj: any = {};
  tempPrimaryattorneyObj: any = {};
  orgAccountData: any = {};
  orgContactData: any = {};
  passwordObj: any = {};
  minDate: Date;
  contactFormObj: any = {};
  isAptSteFlrNumberDisabled = true;
  isAuthorize = false;
  isSubAdminAuthorize = false;
  countries = [];
  states = [];
  colors: any = [];
  maxDate: Date;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  templatesData: any;
  options: any = { month: 'numeric', day: 'numeric', year: 'numeric' };
  templateTableDta: any;
  filingTypes: any;
  
  activeid;
  t;
  constructor(
    private modalService: NgbModal,
    private Valid: ValidationService,
    private fb: FormBuilder,
    private adminService: AdminService,
    private route: Router,
    private spinner: NgxSpinnerService,
    private clientService: AdminClientService,
    public permissionService: AdminpermissionService,
    private toaster: ToastrService,
    public commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit() {
    this.accountbuildForm();
    this.contactBuildForm();
    this.attorneybuildForm();
    this.buildPasswordTemplateForm();
    this.getaccountdata();
    this.getContactData();
    this.profileDetailsContactForm();
    this.getTemplates();
    this.maxDate = new Date();
    //here we are getting role team member/primary admin/sub admin
    this.isAuthorize = this.permissionService.isGetAcess();
    this.isSubAdminAuthorize = this.permissionService.isSubAdminGetAcess();
    if (this.isAuthorize) {
      this.getTeamRoles();
      this.getprimaryattorney();
      this.getcontactinformation();
      this.commonService.getContries();
      this.commonService.getStates();
    }
    this.getColor();
    this.commonService.getCountryStates();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.GetFillingTypes();
  }
  ngOnDestroy() {
    var reader = new FileReader();
    this.fileData = null;
    this.previewUrl = null;
    this.fileUploadProgress = null;
    this.uploadedFilePath = null;
  }

  ngAfterViewInit() {
    if (this.router.url == '/admin/settings/templates') {
      this.activeid = 'pendingTeamMembersTab';
    }
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
      console.log(this.previewUrl);
    };
  }

  getColor() {
    for (var i = 0; i < 100; i++) {
      const newColor = RandomColor.generateColor();

      this.colors.push(newColor);
    }
  }
  getShortName(fullName) {
    if (fullName) {
      return fullName
        .split(' ')
        .map((n) => n[0])
        .join('');
    }
  }

  accountbuildForm() {
    this.accountForm = this.fb.group({
      FirstName: this.Valid.validateform.FirstName,
      LastName: this.Valid.validateform.LastName,
    });
  }

  buildPasswordTemplateForm() {
    this.passwordFormGroup = this.fb.group(
      {
        currentpassword: this.Valid.validateform.Password,
        password: this.Valid.validateform.Password,
        confirmPassword: this.Valid.validateform.Password,
      },
      {
        validator: PasswordValidator.validate.bind(this),
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

  attorneybuildForm() {
    this.attorneyForm = this.fb.group({
      NameOfLawFirmOrOrganisation: this.Valid.validateform.NameOfLawFirmOrOrganisation,
      LicenseNumber: this.Valid.validateform.LicenseNumberNotReq,
      BarNumber: this.Valid.validateform.BarNumber,
      LicensingAuthority: this.Valid.validateform.LicensingAuthority,
      NameOfRecognisedOrganisation: this.Valid.validateform.NameOfRecognisedOrganisation,
      DateOfAccredition: ['', Validators.required],
    });
  }
  contactBuildForm() {
    this.contactForm = this.fb.group({
      StreetNumberAndName: this.Valid.validateform.StreetNumberandName,
      CityOrTown: this.Valid.validateform.CityOrTown,
      ZipCode: this.Valid.validateform.ZipCode,
      Country: this.Valid.validateform.Required,
      State: this.Valid.validateform.Required,
      Province: this.Valid.validateform.Province,
      Email: ['', Validators.pattern('[a-z0-9._%+-]+@[a-z0-9-]+\\.[a-z]|\\.[a-z]{2,4}$')],
      DaytimePhone: ['', Validators.pattern('^(?!0+$)((\\+91-?))?(?!0+$)[1-9][0-9]{9}$')],
      MobilePhone: ['', Validators.pattern('^(?!0+$)((\\+91-?))?(?!0+$)[1-9][0-9]{9}$')],
      AptSteFlrNumber: [
        '',
        [
          Validators.minLength(4),
          Validators.maxLength(15),
          // Validators.requiredTrue,
          Validators.pattern('^[a-zA-Z0-9]*$'),
        ],
      ],
      Fax: this.Valid.validateform.Fax,
      aptSteFlr: [''],
      Apt: [],
      Ste: [],
      Flr: [],
      ContactInformationId: [0],
    });
  }

  profileDetailsContactForm() {
    this.profileContactForm = this.fb.group({
      DayTimePhone: this.Valid.validateform.MobileNumber,
      MobilePhone: this.Valid.validateform.MobileNumber,
      PrimaryContactEmail: this.Valid.validateform.Email,
    });
  }

  // getTeamRoles
  getTeamRoles() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService.getTeamRoles().subscribe(
      (res: any[]) => {
        this.spinner.hide();
        let data = res.filter((l) => l.RoleId !== 4 && l.RoleId !== 1);
        if (!this.isSubAdminAuthorize) {
          data = res.filter((l) => l.RoleId !== 4 && l.RoleId !== 1 && l.RoleId !== 2);
        }
        this.teamMembersRoles = data;
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    );
  }

  GetTeambersOnTeamMemberStatus(event) {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService
      .GetTeambersOnTeamMemberStatus(sessionStorage.getItem('OrganisationID'), event.target.value, this.token)
      .subscribe(
        (res: any[]) => {
          this.spinner.hide();
          this.teamMembersList = res;
          this.loadPermissions = false;
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }

  //teamMemberChange
  teamMemberChange(event, AdminID, i) {
    this.AdminID = AdminID;
    // if(event.target.checked){
    //   this.teamMembersList[i].checked = !this.teamMembersList[i].checked;
    //   this.adminList.filter(a=>a.AdminID==AdminID);
    // }
  }

  //viewTeamMember
  viewTeamMember(AdminID, i, teamStatus) {
    this.AdminID = AdminID;
    this.loadPermissions = true;
    if (teamStatus == 3) {
      this.GetTeamMemberFilingPermissions();
      this.isTeamMember = true;
    } else {
      this.GetPrimaryTeamMemberPermissions();
      this.GetPrimaryTeamMemberFilingPermissions();
      this.GetPrimaryTeamMemberTemplatePermissions();
      this.GetPrimaryTeamMemberDocumentLibraryPermissions();
      this.isTeamMember = false;
    }
  }

  //********************** Team Member Permissions   ******************* */
  GetPrimaryTeamMemberPermissions(ev?: any, id?: any) {
    this.spinner.show();
    if (id) {
      document.getElementById(id).classList.toggle('d-n');
    }
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService
      .GetPrimaryTeamMemberPermissions(sessionStorage.getItem('OrganisationID'), this.AdminID, this.token)
      .subscribe(
        (res: any[]) => {
          this.spinner.hide();
          this.teamMemberPermissions = res;
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }

  SetPrimaryTeamMemberPermissions(teamPermissions) {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService
      .SetPrimaryTeamMemberPermissions(
        sessionStorage.getItem('OrganisationID'),
        teamPermissions.AdminId,
        teamPermissions,
        this.token
      )
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.Status == 1) {
            this.GetPrimaryTeamMemberPermissions('', 'one');
          } else if (res.Status == 0) {
            this.toaster.error('Failed to get  Permissions');
          }
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }
  SetPrimaryTeamMemberDefaultPermissions(teamPermissions) {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService
      .SetPrimaryTeamMemberDefaultPermissions(
        sessionStorage.getItem('OrganisationID'),
        teamPermissions.AdminId,
        this.token
      )
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.Status == 1) {
            this.GetPrimaryTeamMemberPermissions('', 'one');
          } else if (res.Status == 0) {
            this.toaster.error('Failed to get  Permissions');
          }
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }

  //********************** Filing Permissions  ******************* */

  GetPrimaryTeamMemberFilingPermissions(ev?: any, id?: any) {
    this.spinner.show();
    if (id) {
      document.getElementById(id).classList.toggle('d-n');
    }
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService
      .GetPrimaryTeamMemberFilingPermissions(sessionStorage.getItem('OrganisationID'), this.AdminID, this.token)
      .subscribe(
        (res: any[]) => {
          this.spinner.hide();
          this.teamFillingsPermissions = res;
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }
  SetPrimaryTeamMemberFilingPermissions(fillingPermissions) {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService
      .SetPrimaryTeamMemberFilingPermissions(
        sessionStorage.getItem('OrganisationID'),
        fillingPermissions.AdminId,
        fillingPermissions,
        this.token
      )
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.Status == 1) {
            this.GetPrimaryTeamMemberFilingPermissions('', '2');
          } else if (res.Status == 0) {
            this.toaster.error('Failed to set  Permissions');
          }
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }

  SetPrimaryTeamMemberDefaultFilingPermissions(fillingPermissions) {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService
      .SetPrimaryTeamMemberDefaultFilingPermissions(
        sessionStorage.getItem('OrganisationID'),
        fillingPermissions.AdminId,
        this.token
      )
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.Status == 1) {
            this.GetPrimaryTeamMemberFilingPermissions('', '2');
          } else if (res.Status == 0) {
            this.toaster.error('Failed to set  Permissions');
          }
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }

  //**********************Template Permissions  ******************* *
  GetPrimaryTeamMemberTemplatePermissions(ev?: any, id?: any) {
    this.spinner.show();
    if (id) {
      document.getElementById(id).classList.toggle('d-n');
    }
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService
      .GetPrimaryTeamMemberTemplatePermissions(sessionStorage.getItem('OrganisationID'), this.AdminID, this.token)
      .subscribe(
        (res: any[]) => {
          this.spinner.hide();
          this.teamTemplatePermissions = res;
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }

  SetPrimaryTeamMemberTemplatePermissions(templatePermissions) {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService
      .SetPrimaryTeamMemberTemplatePermissions(
        sessionStorage.getItem('OrganisationID'),
        templatePermissions.AdminId,
        templatePermissions,
        this.token
      )
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.Status == 1) {
            this.GetPrimaryTeamMemberTemplatePermissions('', '4');
          } else if (res.Status == 0) {
            this.toaster.error('Failed to set  Permissions');
          }
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }

  SetPrimaryTeamMemberDefaultTemplatePermissions(templatePermissions) {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService
      .SetPrimaryTeamMemberDefaultTemplatePermissions(
        sessionStorage.getItem('OrganisationID'),
        templatePermissions.AdminId,
        this.token
      )
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.Status == 1) {
            this.GetPrimaryTeamMemberTemplatePermissions('', '4');
          } else if (res.Status == 0) {
            this.toaster.error('Failed to set  Permissions');
          }
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }
  //**********************Document Library Permissions ******************* */
  GetPrimaryTeamMemberDocumentLibraryPermissions(ev?: any, id?: any) {
    this.spinner.show();
    if (id) {
      document.getElementById(id).classList.toggle('d-n');
    }
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService
      .GetPrimaryTeamMemberDocumentLibraryPermissions(
        sessionStorage.getItem('OrganisationID'),
        this.AdminID,
        this.token
      )
      .subscribe(
        (res: any[]) => {
          this.spinner.hide();
          this.teamMemberDocumentLibraryPermissions = res;
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }
  SetPrimaryTeamMemberDocumentLibraryPermissions(teamMemberDocumentLibraryPermissions) {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService
      .SetPrimaryTeamMemberDocumentLibraryPermissions(
        sessionStorage.getItem('OrganisationID'),
        teamMemberDocumentLibraryPermissions.AdminId,
        teamMemberDocumentLibraryPermissions,
        this.token
      )
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.Status == 1) {
            this.GetPrimaryTeamMemberDocumentLibraryPermissions('', '5');
          } else if (res.Status == 0) {
            this.toaster.error('Failed to set  Permissions');
          }
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }

  SetPrimaryTeamMemberDefaultDocumentLibraryPermissions(teamMemberDocumentLibraryPermissions) {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService
      .SetPrimaryTeamMemberDefaultDocumentLibraryPermissions(
        sessionStorage.getItem('OrganisationID'),
        teamMemberDocumentLibraryPermissions.AdminId,
        this.token
      )
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.Status == 1) {
            this.GetPrimaryTeamMemberDocumentLibraryPermissions('', '5');
          } else if (res.Status == 0) {
            this.toaster.error('Failed to set  Permissions');
          }
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }

  //**********************End Document Library Permissions ******************* */

  //**********************  Team Member Filing Permissions  ******************* */

  GetTeamMemberFilingPermissions(ev?: any, id?: any) {
    this.spinner.show();
    if (id) {
      document.getElementById(id).classList.toggle('d-n');
    }
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService
      .GetTeamMemberFilingPermissions(sessionStorage.getItem('OrganisationID'), this.AdminID, this.token)
      .subscribe(
        (res: any[]) => {
          this.spinner.hide();
          this.teamMemberFillingsPermissions = res;
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }
  SetTeamMemberFilingPermissions(fillingPermissions) {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService
      .SetTeamMemberFilingPermissions(
        sessionStorage.getItem('OrganisationID'),
        fillingPermissions.AdminId,
        fillingPermissions,
        this.token
      )
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.Status == 1) {
            this.GetTeamMemberFilingPermissions('', '6');
          } else if (res.Status == 0) {
            this.toaster.error('Failed to set  Permissions');
          }
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }

  SetTeamMemberFilingDefaultPermissions(fillingPermissions) {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService
      .SetTeamMemberFilingDefaultPermissions(
        sessionStorage.getItem('OrganisationID'),
        fillingPermissions.AdminId,
        this.token
      )
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.Status == 1) {
            this.GetTeamMemberFilingPermissions('', '6');
          } else if (res.Status == 0) {
            this.toaster.error('Failed to set  Permissions');
          }
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }
  //Organisation Details
  getprimaryattorney() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService.getprimaryattorney(sessionStorage.getItem('OrganisationID'), this.token).subscribe(
      (res: any[]) => {
        this.spinner.hide();
        if (res == null) {
          this.primaryattorneyObj = {};
          this.tempPrimaryattorneyObj = Object.assign(this.tempPrimaryattorneyObj, {});
        } else {
          this.primaryattorneyObj = res;
          this.primaryattorneyObj.DateOfAccredition = new Date(this.primaryattorneyObj.DateOfAccredition);
          this.tempPrimaryattorneyObj = Object.assign(this.tempPrimaryattorneyObj, this.primaryattorneyObj);
        }
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    );
  }
  primaryattorney() {
    if (this.commonService.IsObjectsMatch(this.tempPrimaryattorneyObj, this.primaryattorneyObj)) {
      this.toaster.info('No changes to save');
      return;
    }
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    if (!this.primaryattorneyObj.PrimaryAttorneyId) {
      this.primaryattorneyObj.PrimaryAttorneyId = 0;
    }
    let formattedDate = new Date(this.primaryattorneyObj.DateOfAccredition);
    this.primaryattorneyObj.DateOfAccredition = formattedDate.toLocaleDateString("en-US", this.options);
    this.adminService
      .primaryattorney(sessionStorage.getItem('OrganisationID'), this.primaryattorneyObj, this.token)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.Status == 1) {
            this.primaryattorneyObj = {};
            this.tempPrimaryattorneyObj = {};
            this.getprimaryattorney();
            this.attorneyForm.reset();
            this.toaster.success(res.Message);
          } else if (res.Status == 0) {
            this.toaster.error('Failed to set');
          }
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }

  contactinformation() {
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
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.contactForm.get('aptSteFlr').patchValue('');
    this.adminService
      .contactinformation(sessionStorage.getItem('OrganisationID'), this.contactForm.value, this.token)
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.Status == 1) {
            this.toaster.success('Your details updated successfully', 'Success');
            this.getcontactinformation();
          } else if (res.Status == 0) {
            this.toaster.error('Failed to set  contact information');
          }
        },
        (err) => {
          this.toaster.error('Error Occured');
        }
      );
  }

  getcontactinformation() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService.getcontactinformation(sessionStorage.getItem('OrganisationID'), this.token).subscribe(
      (res: any[]) => {
        this.spinner.hide();
        if (res == null) {
          // this.contactFormObj = {};
        } else {
          this.contactForm.patchValue(res);
          if (this.contactForm.value.Apt == true) {
            this.contactForm.get('aptSteFlr').patchValue('Apt');
          } else if (this.contactForm.value.Ste == true) {
            this.contactForm.get('aptSteFlr').patchValue('Ste');
          } else if (this.contactForm.value.Flr == true) {
            this.contactForm.get('aptSteFlr').patchValue('Flr');
          }
          this.changeAptSteFlr();
          // this.contactFormObj = res;
          // console.log(this.contactFormObj);
        }
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    );
  }

  //Account
  getaccountdata() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService.getaccountdata(this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.orgAccountData = res;
        if (this.orgAccountData.Image) {
          sessionStorage.setItem('Image', this.orgAccountData.Image);
        }
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    );
  }

  changeaccountpassword() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService.changeaccountpassword(this.passwordObj, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.Status == 1) {
          this.passwordObj = {};
          this.toaster.success('Password updated successfully');
          this.passwordFormGroup.reset();
          this.closePasswordPop('close click');
        } else if (res.Status == 0) {
          if (res.Message) {
            this.toaster.error(res.Message);
          } else {
            this.toaster.error('Failed to change password');
          }
        }
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    );
  }

  changeaccountdata() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    const formData = new FormData();
    formData.append('file', this.fileData);
    formData.append('FirstName', this.orgAccountData.FirstName);
    formData.append('LastName', this.orgAccountData.LastName);
    this.adminService.changeaccountdata(formData, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.Status == 1) {
          this.toaster.success('Your profile updated successfully', 'success');
          this.getaccountdata();
        } else if (res.Status == 0) {
          this.toaster.error('Failed to change account data');
        }
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    );
  }

  // contact
  getContactData() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService.getContactdata(this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res) {
          this.profileContactForm.patchValue(res);
        }
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    );
  }

  saveContactChanges() {
    this.spinner.show();
    this.token = 'Authorization:Bearer ' + sessionStorage.getItem('A_AccessToken');
    this.adminService.saveAccountData(this.profileContactForm.value, this.token).subscribe(
      (res: any) => {
        this.spinner.hide();
        if (res.Status == 1) {
          this.toaster.success('Contact info updated successfully', 'success');
          this.getContactData();
        } else if (res.Status == 0) {
          this.toaster.error('Failed to change contact info');
        }
      },
      (err) => {
        this.toaster.error('Error Occured');
      }
    );
  }

  selectedItem: any;
  listClick(event, newValue) {
    this.selectedItem = newValue; // don't forget to update the model here
    // ... do other stuff here ...
  }

  toggler(ev: any, id: any) {
    document.getElementById(id).classList.toggle('d-n');
  }
  Modelsent(data: any) {
    this.sentModel = this.modalService.open(data, { centered: true });
  }
  Closesent(value: string) {
    this.sentModel.close(value);
  }

  passwordPop(password: any) {
    this.passwordModel = this.modalService.open(password, { centered: true });
  }
  closePasswordPop(value: string) {
    this.passwordModel.close(value);
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
    //   {
    //"CanAddFilesToFilings": true,
    // "CanEditSubTasks": false,
    // }
  }
  onCountryChange(country) {
    this.commonService.getStates();
    this.countries = this.commonService.allCountriesList;
    let selectedCountry = this.commonService.allCountriesList.find((c) => c.name == country);
    if (selectedCountry) {
      this.states = this.commonService.selectedCountryState.filter((x) => x.country_id == selectedCountry.id);
    }
  }
  getTemplates() {
    this.spinner.hide();
    this.commonService.getSavedTemplates(sessionStorage.getItem('OrganisationID')).subscribe(
      (res: any) => {
        this.templatesData = res;
        let arrays = this.templatesData.reduce(function(a, e) {
          let estKey = (e['DisplayTemplateTitle']); 
          (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
          return a;
        }, {});
      this.templateTableDta =  Object.values(arrays).map(x=> x[0])
      } 
    )
  }
  viewTemplate(templateId:any) {
    this.router.navigate(['/admin/settings/template', templateId]);
  }
  
  
  //Get Fillings
  GetFillingTypes() {
    this.spinner.show();
    this.adminService.GetFilings().subscribe(
      (res: any[]) => {
        this.spinner.hide();
        this.filingTypes = res;
        console.log(this.filingTypes);
      },
      (err) => {
        this.spinner.hide();
        this.toaster.error('Error Occured');
      }
    );
  }
}
