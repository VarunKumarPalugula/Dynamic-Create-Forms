import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ApicallsService } from './apicalls.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {


  constructor(private httpClient: HttpClient,
    private global: ApicallsService) { }


  getUIControlTemplateToShowSections() {
    return this.httpClient.get(this.global.getUIControlTemplateToShowSections);
  }
  getTemplatesDatabyTemplate(templateName) {
    return this.httpClient.get(this.global.getTemplatesForSection + '?parentTemplate=' + templateName);
  }
  getDefaultTemplates() {
    return this.httpClient.get(this.global.getDefaultTemplates);
  }
  getUIControlTemplateResults(reqObj) {
    return this.httpClient.post(
      this.global.getUIControlTemplateResultsUrl, reqObj
    );
  }
  getFilingTemplates(fillingtype, adminId, orgId) {
    return this.httpClient.get(
      this.global.getFilingTemplates + '?filingType=' + fillingtype + '&AdminId=' + adminId + '&orgId=' + orgId
    );
  }

  saveUIControlTemplateResults(data) {
    return this.httpClient.post(this.global.saveUIControlTemplateResults, data);
  }

}
