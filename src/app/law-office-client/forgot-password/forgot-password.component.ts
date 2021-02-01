import { Component, OnInit } from '@angular/core';
import { ClientSignin } from '@app/models/law-office-client/ClientSignin';
import { Router } from '@angular/router';
import { ClientService } from '@app/law-office-client/law-office-client.service';
import { CommonService } from '@app/shared/service/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidationService } from '@app/shared/service/validation.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientSignup } from '@app/models/law-office-client/ClientSignup';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {}
