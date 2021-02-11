import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApicallsService } from './apicalls.service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private httpClient: HttpClient, private globalApi: ApicallsService) {}

  getImmigrationFormData(OrgId: any, caseId: any, fillingObj: any) {
    return this.httpClient.post(
      this.globalApi.getImmigrationFormData + '?OrgId=' + OrgId + '&caseId=' + caseId,
      fillingObj
    );
  }
  saveImmigrationFormData(OrgId: any, caseId: any, fillingObj: any) {
    return this.httpClient.post(
      this.globalApi.saveImmigrationFormData + '?OrgId=' + OrgId + '&caseId=' + caseId,
      fillingObj
    );
  }

  previewImmigrationFormData(OrgId: any, fillingObj: any, caseId) {
    return this.httpClient.post(
      this.globalApi.previewImmigrationFormData + '?OrgId=' + OrgId + '&caseId=' + caseId,
      fillingObj
    );
  }
}
