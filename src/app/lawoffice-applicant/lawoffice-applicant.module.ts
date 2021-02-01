import { NgModule } from '@angular/core';

import { LawofficeApplicantComponent } from '@app/lawoffice-applicant/lawoffice-applicant.component';
import { LawofficeApplicantRoutingModule } from '@app/lawoffice-applicant/lawoffice-applicant-routing.module';
import { SignupComponent } from '@app/lawoffice-applicant/signup/signup.component';
import { SigninComponent } from '@app/lawoffice-applicant/signin/signin.component';
import { ForgotpasswordComponent } from '@app/lawoffice-applicant/forgotpassword/forgotpassword.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [LawofficeApplicantRoutingModule, SharedModule],
  declarations: [LawofficeApplicantComponent, SignupComponent, SigninComponent, ForgotpasswordComponent],
})
export class LawofficeApplicantModule {}
