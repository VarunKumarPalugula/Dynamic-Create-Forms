import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor(private fb: FormBuilder) { }

  validateform = {
    OrganisationName: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z0-9-., _ ]*$'),
      ],
    ],
    JobCardTitle: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z][a-zA-Z0-9 _.-]*$'),
        Validators.minLength(3),
        Validators.maxLength(25),
      ],
    ],
    FullName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*$')],
    ],
    DoingBusinessAsName: [
      '',
      [Validators.minLength(2), Validators.maxLength(200), Validators.pattern('^[a-zA-Z0-9-.,_ ]*$')],
    ],
    AptSteFlrNumber: ['', [Validators.minLength(4), Validators.maxLength(100), Validators.pattern('[a-zA-Z]*$')]],
    NatureOfBusiness: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(100), Validators.pattern('[a-zA-Z ]*$')],
    ],
    Taskname: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$'),
      ],
    ],
    universityName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern('^[a-zA-Z &]+$')],
    ],
    typeOfDegreAwrded: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]+$')],
    ],
    NoOfEmployees: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(6), Validators.pattern('^[0-9]*$')],
    ],
    TaskAddNotes: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(512)]],
    FirstName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*$')],
    ],
    middeleName: ['', [Validators.minLength(3), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*$')]],
    reciptNumber: ['', [Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9() ]*$')]],
    LastName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*$')],
    ],
    TaxNumbers: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(9), Validators.pattern('^[0-9-]*$')],
    ],
    NaicsNumber: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(6), Validators.pattern('^[0-9-]*$')],
    ],
    UserName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z][a-zA-Z0-9_.-]*$'),
      ],
    ],
    MobileNumber: [
      '',
      [Validators.required, Validators.maxLength(10), Validators.pattern('^(?!0+$)((\\+91-?))?(?!0+$)[1-9][0-9]{9}$')],
    ],
    //  MobileNumber:['', [Validators.required,Validators.maxLength(10),Validators.pattern('^[6-9]+[0-9]{9}$')]],
    Email: [
      '',
      [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9-]+\\.[a-z]|\\.[a-z]{2,4}$')],
    ],
    // Password:['', [Validators.required,Validators.minLength(8),Validators.pattern('^([a-zA-Z0-9@*#]{8,15})$')]],
    Password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[$@£!%*#?&^()+_=/-])[A-Za-z0-9$@£!%*#?&^()+_=/-]{8,}$'),
      ],
    ],
    PasswordSignin: ['', [Validators.required]],
    State: ['', [Validators.required]],
    Required: ['', [Validators.required]],
    NotRequired: [''],
    am: ['', [Validators.required]],
    amNot: ['', [Validators.required]],
    aptste: ['', [Validators.required]],
    showpass: [''],
    UserNameorEmail: ['', [Validators.required]],
    StreetNumberandName: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z0-9 .,-/]+$'),
      ],
    ],
    CityOrTown: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('[a-zA-Z-. ]*$')],
    ],
    Country: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('[a-zA-Z ]*$')],
    ],
    ZipCode: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(13), Validators.pattern('^[0-9--]*$')],
    ],
    Fax: ['', [Validators.minLength(4), Validators.maxLength(13), Validators.pattern('^[0-9-()--,]*$')]],
    USSSN: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(11), Validators.pattern('^[0-9--]*$')],
    ],
    ProvinceOfBirth: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-zA-Z- ]*$')],
    ],
    Province: ['', [Validators.minLength(2), Validators.maxLength(18), Validators.pattern('[a-zA-Z- ]*$')]],
    RequiredField: ['', Validators.required],
    PostalCode: ['', [Validators.minLength(5), Validators.maxLength(5), Validators.pattern('^[0-9]*$')]],
    NameOfLawFirmOrOrganisation: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*$')],
    ],
    LicenseNumber: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9 /-]*$')],
    ],
    BarNumber: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9() ]*$')],
    ],
    LicensingAuthority: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('[a-zA-Z ]*$')],
    ],
    NameOfRecognisedOrganisation: [
      '',
      [Validators.minLength(3), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*$')],
    ],
    LicenseNumberNotReq: [
      '',
      [Validators.minLength(5), Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9 /-]*$')],
    ],
    Shipmentnumber: [
      '',
      [Validators.required, Validators.pattern('^[0-9]*$')],
    ],
    Tittle: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z0-9-., _ ]*$'),
      ],
    ],
  };
  newfilingform = {
    FilingName: ['', [Validators.required]],
    query: ['', [Validators.required]],
    applicantquery: ['', [Validators.required]],
    teamquery: ['', [Validators.required]],
  };
  TeamInvite = {
    role: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9-]+\\.[a-z]|\\.[a-z]{2,4}$')]],
    fullname: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*$')],
    ],
  };
  clientinvite = {
    Fullname: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*$')]],
  };

  TaskModule = {
    FilingName: ['', [Validators.required]],
    query: ['', [Validators.required]],
    applicantquery: ['', [Validators.required]],
    teamquery: ['', [Validators.required]],
  };

  TeamSignup = {
    FirstName: ['', [Validators.required]],
    LastName: ['', [Validators.required]],
    UserName: ['', [Validators.required]],
    MobileNumber: [
      '',
      [Validators.required, Validators.maxLength(10), Validators.pattern('^(?!0+$)((\\+91-?))?(?!0+$)[1-9][0-9]{9}$')],
    ],
    Password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[$@£!%*#?&^()+_=/-])[A-Za-z0-9$@£!%*#?&^()+_=/-]{8,}$'),
      ],
    ],
    showpass: [''],
  };
  Clientsignup = {
    FirstName: ['', [Validators.required]],
    LastName: ['', [Validators.required]],
    UserName: ['', [Validators.required]],
    MobileNumber: [
      '',
      [Validators.required, Validators.maxLength(10), Validators.pattern('^(?!0+$)((\\+91-?))?(?!0+$)[1-9][0-9]{9}$')],
    ],
    Password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[$@£!%*#?&^()+_=/-])[A-Za-z0-9$@£!%*#?&^()+_=/-]{8,}$'),
      ],
    ],
    showpass: [''],
  };
  ClientMemberSignup = {
    FirstName: ['', [Validators.required]],
    LastName: ['', [Validators.required]],
    UserName: ['', [Validators.required]],
    MobileNumber: [
      '',
      [Validators.required, Validators.maxLength(10), Validators.pattern('^(?!0+$)((\\+91-?))?(?!0+$)[1-9][0-9]{9}$')],
    ],
    Password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[$@£!%*#?&^()+_=/-])[A-Za-z0-9$@£!%*#?&^()+_=/-]{8,}$'),
      ],
    ],
    showpass: [''],
  };
}
