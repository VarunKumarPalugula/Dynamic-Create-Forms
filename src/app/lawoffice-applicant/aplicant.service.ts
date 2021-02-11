import { Injectable } from '@angular/core';
import { AdminSignin } from '@app/models/law-office-admin/AdminSignin';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApicallsService } from '@app/shared/service/apicalls.service';
import { AdminSignup } from '@app/models/law-office-admin/AdminSignup';
import { HelperService } from '@app/shared/helpers/helper.service';

@Injectable({
  providedIn: 'root',
})
export class AplicantService {
  constructor(private httpClient: HttpClient, private global: ApicallsService, private helper: HelperService) {}

  // Register applicant
  Register(data: any, env: any) {
    return this.httpClient.post(this.global.IndividualApplicantRegister + '?environment=' + env, data);
  }
}
