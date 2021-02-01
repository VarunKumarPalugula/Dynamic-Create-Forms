import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LawofficeApplicantComponent } from '@app/lawoffice-applicant/lawoffice-applicant.component';
import { SigninComponent } from '@app/lawoffice-applicant/signin/signin.component';
import { SignupComponent } from '@app/lawoffice-applicant/signup/signup.component';
import { ForgotpasswordComponent } from '@app/lawoffice-applicant/forgotpassword/forgotpassword.component';

const routes: Routes = [
  {
    path: '',
    component: LawofficeApplicantComponent,
    children: [
      { path: '', component: SigninComponent },
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'forgotpassword', component: ForgotpasswordComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LawofficeApplicantRoutingModule {}
