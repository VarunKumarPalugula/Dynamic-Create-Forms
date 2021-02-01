import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailVerificationComponent } from '@app/shared/Components/email-verification/email-verification.component';
// tslint:disable-next-line:max-line-length
import { VerifyEmailAddressComponent } from '@app/shared/Components/verify-email-address/verify-email-address.component';

const routes: Routes = [
  { path: '', loadChildren: './law-office-admin/law-office-admin.module#LawOfficeAdminModule' },
  { path: 'client', loadChildren: './law-office-client/law-office-client.module#LawOfficeClientModule' },
  { path: 'applicant', loadChildren: './lawoffice-applicant/lawoffice-applicant.module#LawofficeApplicantModule' },
  { path: 'email/confim/:verify?link&ClientNomanclaturedId&Type', component: VerifyEmailAddressComponent },
  { path: 'emailverify', component: EmailVerificationComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
// Shell.childRoutes([{ path: 'about', loadChildren: 'app/about/about.module#AboutModule' }]) ,
// Fallback when no prior route is matched
