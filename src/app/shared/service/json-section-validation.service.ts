import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup  } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class JsonSectionValidationService {

  constructor(private fb: FormBuilder) { }

  reqMsg: string = 'This field is required.'
  maxLength: string = 'Maximum characters allowed '

  dynamicForm = {
    Firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    Middlename: ['', [Validators.minLength(3), Validators.maxLength(50)]],
    Lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    Gender: ['',[Validators.required]],
    Dob: ['',[Validators.required]],
    Dob2: ['',[Validators.required]],
    PobCountry: ['',[Validators.required]],
    PobState: ['', [Validators.required]],
    PobCityorTown: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    OtherUsicsOnlineNUmber: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
    OtherAnumber: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    isYesorNo: ['',[Validators.required]],
    NameOfEmployerOrCompany:['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    StreetNumberAndName:['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    YourOccupation:['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    ZipCode:['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    Province:['', [Validators.required]],
    AptSteFlr:[''],
    Number:['', [Validators.required]],
    FaxNumber:['', [Validators.required]],
    DayTimePhone:['', [Validators.required]],
    MobilePhone:['', [Validators.required]],
    Email:['', [Validators.required]],
  }


  validationMessages = {
    'AddFirstname': {
      'required': this.reqMsg,
      'minlength': 'Atleast 3 charaters are required',
      'maxlength': this.maxLength + 50,
    },
    'AddMiddlename': {
      'minlength': 'Atleast 3 charaters are required',
      'maxlength': this.maxLength + 50
    },
    'AddLastName': {
      'required': this.reqMsg,
      'minlength': 'Atleast 3 charaters are required',
      'maxlength': this.maxLength + 50
    },
    'AddFirstname1': {
      'required': this.reqMsg,
      'minlength': 'Atleast 3 charaters are required',
      'maxlength': this.maxLength + 50,
    },
    'AddMiddlename1': {
      'minlength': 'Atleast 3 charaters are required',
      'maxlength': this.maxLength + 50
    },
    'AddLastName1': {
      'required': this.reqMsg,
      'minlength': 'Atleast 3 charaters are required',
      'maxlength': this.maxLength + 50
    },
    'AddGender': {
      'required': this.reqMsg
    },
    'AddDob': {
      'required': this.reqMsg
    },
    'AddDob2': {
      'required': this.reqMsg
    },
    'AddCountry': {
      'required': this.reqMsg
    },
    'AddStateorProvince': {
      'required': this.reqMsg
    },
    'AddCityorTown': {
      'required': this.reqMsg,
      'minlength': 'Atleast 2 charaters are required',
      'maxlength': this.maxLength + 20
    },
    'AddCountry1': {
      'required': this.reqMsg
    },
    'AddStateorProvince1': {
      'required': this.reqMsg
    },
    'AddCityorTown1': {
      'required': this.reqMsg,
      'minlength': 'Atleast 2 charaters are required',
      'maxlength': this.maxLength + 20
    },
    'AddUSICSnumber': {
      'required': this.reqMsg,
      'minlength': 'Atleast 13 charaters are required',
      'maxlength': this.maxLength + 13
    },
    'AddANumber': {
      'required': this.reqMsg,
      'minlength': 'Atleast 3 charaters are required',
      'maxlength': this.maxLength+ 30
    },
    
    'AddIsYesorNo': {
      'required': this.reqMsg
    },
    'AddNameOfEmployerOrCompany': {
      'required': this.reqMsg,
      'minlength': 'Atleast 5 charaters are required',
      'maxlength': this.maxLength + 20
    },
    'AddStreetNumberAndName': {
      'required': this.reqMsg,
      'minlength': 'Atleast 5 charaters are required',
      'maxlength': this.maxLength + 20
    },
    'AddYourOccupation': {
      'required': this.reqMsg,
      'minlength': 'Atleast 5 charaters are required',
      'maxlength': this.maxLength + 20
    },
    'AddZipCode': {
      'required': this.reqMsg,
      'minlength': 'Atleast 5 charaters are required',
      'maxlength': this.maxLength + 20
    },
    'AddProvince': {
      'required': this.reqMsg
    },
    'AddAptSteFlr':{

    },
    'AddNumber':{
      'required': this.reqMsg
    },
    'AddFaxNumber':{
      'required': this.reqMsg
    },
    'AddDayTimePhone':{
      'required': this.reqMsg
    },
    'AddMobilePhone':{
      'required': this.reqMsg
    },
    'AddEmail':{
      'required': this.reqMsg
    },
  };

  getValidationErrors(group: FormGroup, validationMessages: Object): any {    
    var formErrors = {};   
    Object.keys(group.controls).forEach((key: string) => {    
       const abstractControl = group.get(key);    
       formErrors[key] = '';    
       if (abstractControl && !abstractControl.valid &&    
          (abstractControl.touched || abstractControl.dirty)) {    
          const messages = validationMessages[key];    
          for (const errorKey in abstractControl.errors) {    
             if (errorKey) {    
                formErrors[key] += messages[errorKey] + ' ';    
             }    
          }    
       }  
       if (abstractControl instanceof FormGroup) {    
          let groupError = this.getValidationErrors(abstractControl, validationMessages);    
          formErrors = { ...formErrors, ...groupError }    
       }    
    });    
    return formErrors    
 }

}
