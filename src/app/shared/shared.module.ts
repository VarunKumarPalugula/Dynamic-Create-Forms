import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { TeammemberslistComponent } from './businesscontrols/teammemberslist/teammemberslist.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeaminvitlistComponent } from './businesscontrols/teaminvitlist/teaminvitlist.component';
import { ClientApplicantSponsorSignupComponent } from './Components/client-applicant-sponsor-signup/client-applicant-sponsor-signup.component';
import { ForgotpasswordComponent } from './Components/forgotpassword/forgotpassword.component';
import { ClientApplicantSponsorSigninComponent } from './Components/client-applicant-sponsor-signin/client-applicant-sponsor-signin.component';
import { TranslateModule } from '@ngx-translate/core';
import { IndivualInviteComponent } from './businesscontrols/indivual-invite/indivual-invite.component';
import { TeamIndividualInviteComponent } from './businesscontrols/team-individual-invite/team-individual-invite.component';
import { ConfirmationNotificationComponent } from './businesscontrols/confirmation-notification/confirmation-notification.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { IsEllipsisActiveDirective } from './directives/is-ellipsis-active-directive.directive';
import { ModalHeaderComponent } from './frmctrl/modal-header/modal-header.component';

import { BeneficiarsTasksComponent } from './businesscontrols/beneficiars-tasks/beneficiars-tasks.component';
import { ModalFooterComponent } from './frmctrl/modal-footer/modal-footer.component';
import { CardHeaderComponent } from './frmctrl/card-header/card-header.component';
import { CardFooterComponent } from './frmctrl/card-footer/card-footer.component';
import { AddressComponent } from './businesscontrols/address-form/address.component';
import { AddressCardComponent } from './businesscontrols/address-card/address-card.component';
import { ContactFormComponent } from './businesscontrols/contact-form/contact-form.component';
import { ContactCardComponent } from './businesscontrols/contact-card/contact-card.component';
import { FinancialsCardComponent } from './businesscontrols/financials-card/financials-card.component';
import { FinancialsFormComponent } from './businesscontrols/financials-form/financials-form.component';
import { OrganizationFormComponent } from './businesscontrols/organization-form/organization-form.component';
import { OrganizationCardComponent } from './businesscontrols/organization-card/organization-card.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PersonalDetailsComponent } from './businesscontrols/personal-details/personal-details.component';
import { ApplicantImmigrationDetailsFormComponent } from './businesscontrols/applicant-immigration-details-form/applicant-immigration-details-form.component';
import { ApplicantImmigrationDetailsCardComponent } from './businesscontrols/applicant-immigration-details-card/applicant-immigration-details-card.component';
import { ApplicantPosCardComponent } from './businesscontrols/applicant-pos-card/applicant-pos-card.component';
import { ApplicantPosFormComponent } from './businesscontrols/applicant-pos-form/applicant-pos-form.component';
import { PersonalDetailsCardComponent } from './businesscontrols/personal-details-card/personal-details-card.component';
import { ApplicantEducationDetailsCardComponent } from './businesscontrols/applicant-education-details-card/applicant-education-details-card.component';
import { ApplicantEducationDetailsFormComponent } from './businesscontrols/applicant-education-details-form/applicant-education-details-form.component';

import { ApplicantImgTraveldocumentDetailsComponent } from './businesscontrols/applicant-img-traveldocument-details/applicant-img-traveldocument-details.component';
import { ImgTraveldocumentDetailsCardComponent } from './businesscontrols/applicant-img-traveldocument-details-card/img-traveldocument-details-card.component';
import { ApplicantEmployementComponent } from './businesscontrols/applicant-employement/applicant-employement.component';
import { SignalRModule } from 'ng2-signalr';
import { SignalRConfiguration } from 'ng2-signalr';
import { UrlConfig } from '@app/enums/urls-enum';
import { DynamicFormComponent } from './businesscontrols/dynamic-form/dynamic-form.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SpouseDetailsComponent } from './businesscontrols/spouse-details/spouse-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DynModelComponent } from './businesscontrols/dyn/dyn-model/dyn-model.component';
import { UploadComponent } from './businesscontrols/upload/upload.component';
import { DialogComponent } from './businesscontrols/dialog/dialog.component';
import { PriorSpousePopupComponent } from './businesscontrols/spouse-details/prior-spouse-popup/prior-spouse-popup.component';
import { CurrentSpousePopupComponent } from './businesscontrols/spouse-details/current-spouse-popup/current-spouse-popup.component';
import { CardModelComponent } from './businesscontrols/dyn/card-model/card-model.component';
import { ApplicantChildComponent } from './businesscontrols/applicant-child/applicant-child.component';
import { ApplicantParentComponent } from './businesscontrols/applicant-parent/applicant-parent.component';
import { ChildDetailsComponent } from './businesscontrols/child-details/child-details.component';
import { ChildDetailsPopupComponent } from './businesscontrols/child-details/child-details-popup/child-details-popup.component';
import { EmploymentComponent } from './employment/employment.component';
import { PriorSpouseComponent } from './businesscontrols/spouse-details/prior-spouse/prior-spouse.component';
import { ParentDetailsComponent } from './businesscontrols/parent-details/parent-details.component';
import { ParentDetailsPopupComponent } from './businesscontrols/parent-details/parent-details-popup/parent-details-popup.component';
import { EmploymentHistoryComponent } from './businesscontrols/employment-history/employment-history.component';
import { EmploymentHistoryPopupComponent } from './businesscontrols/employment-history/employment-history-popup/employment-history-popup.component';
import { CountryStateCityComponent } from './businesscontrols/country-state-city/country-state-city.component';
import { AddressHistoryComponent } from './businesscontrols/address-history/address-history.component';
import { AddressHistoryPopupComponent } from './businesscontrols/address-history/address-history-popup/address-history-popup.component';
import { EducationComponent } from './businesscontrols/education/education.component';
import { EducationPopupComponent } from './businesscontrols/education/education-popup/education-popup.component';
import { EducationPopup2Component } from './businesscontrols/education/education-popup2/education-popup2.component';
import { CountryDetailsComponent } from './businesscontrols/country-details/country-details.component';
import { EmployementSupportDocumentsComponent } from './businesscontrols/employement-support-documents/employement-support-documents.component';
import { DyamicLayoutComponent } from './businesscontrols/dyamic-layout/dyamic-layout.component';
import { DyamicTemplateComponent } from './businesscontrols/dyamic-layout/dyamic-template/dyamic-template.component';
import { PosDetailsComponent } from './businesscontrols/pos-details/pos-details.component';
import { PosModalPopupComponent } from './businesscontrols/pos-details/pos-modal-popup/pos-modal-popup.component';
import { PeriodOfStayComponent } from './businesscontrols/period-of-stay/period-of-stay.component';
import { PeriodOfStayPopupComponent } from './businesscontrols/period-of-stay/period-of-stay-popup/period-of-stay-popup.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    RouterModule,
    Ng2SearchPipeModule,
    NgbModule,
    TranslateModule,
    NgxPaginationModule,
    PdfViewerModule,
    MatTabsModule,
    MatDialogModule,
    BsDatepickerModule.forRoot(),
    SignalRModule.forRoot(createConfig)
  ],
  declarations: [
    ForgotpasswordComponent,
    TeammemberslistComponent,
    TeaminvitlistComponent,
    ClientApplicantSponsorSignupComponent,
    ClientApplicantSponsorSigninComponent,
    IndivualInviteComponent,
    TeamIndividualInviteComponent,
    ConfirmationNotificationComponent,
    IsEllipsisActiveDirective,
    AddressComponent,
    ModalHeaderComponent,
    ModalFooterComponent,
    BeneficiarsTasksComponent,
    CardHeaderComponent,
    CardFooterComponent,
    AddressCardComponent,
    ContactFormComponent,
    ContactCardComponent,
    FinancialsCardComponent,
    FinancialsFormComponent,
    OrganizationFormComponent,
    OrganizationCardComponent,
    PersonalDetailsComponent,
    ApplicantImmigrationDetailsFormComponent,
    ApplicantImmigrationDetailsCardComponent,
    ApplicantPosCardComponent,
    ApplicantPosFormComponent,
    PersonalDetailsCardComponent,
    ApplicantEducationDetailsCardComponent,
    ApplicantEducationDetailsFormComponent,
    ApplicantImgTraveldocumentDetailsComponent,
    ImgTraveldocumentDetailsCardComponent,
    ApplicantEmployementComponent,
    DynamicFormComponent,
    SpouseDetailsComponent,
    SpouseDetailsComponent,
    DynModelComponent,
    UploadComponent,
    DialogComponent,
    PriorSpousePopupComponent,
    CurrentSpousePopupComponent,
    CardModelComponent,
    ApplicantChildComponent,
    ApplicantParentComponent,
    ChildDetailsComponent,
    ChildDetailsPopupComponent,
    EmploymentComponent,
    PriorSpouseComponent,
    ParentDetailsComponent,
    ParentDetailsPopupComponent,
    EmploymentHistoryComponent,
    EmploymentHistoryPopupComponent,
    CountryStateCityComponent,
    AddressHistoryComponent,
    AddressHistoryPopupComponent,
    EducationComponent,
    EducationPopupComponent,
    EducationPopup2Component,
    CountryDetailsComponent,
    EmployementSupportDocumentsComponent,
    DyamicLayoutComponent,
    DyamicTemplateComponent,
    PosDetailsComponent,
    PosModalPopupComponent,
    PeriodOfStayComponent,
    PeriodOfStayPopupComponent,
  ],
  exports: [
    ForgotpasswordComponent,
    TeammemberslistComponent,
    TeaminvitlistComponent,
    ClientApplicantSponsorSignupComponent,
    ClientApplicantSponsorSigninComponent,
    IndivualInviteComponent,
    TeamIndividualInviteComponent,
    ConfirmationNotificationComponent,
    BeneficiarsTasksComponent,
    IsEllipsisActiveDirective,
    ModalHeaderComponent,
    ModalFooterComponent,
    AddressComponent,
    CardHeaderComponent,
    CardFooterComponent,
    AddressCardComponent,
    ContactFormComponent,
    ContactCardComponent,
    FinancialsCardComponent,
    FinancialsFormComponent,
    OrganizationFormComponent,
    OrganizationCardComponent,
    PersonalDetailsComponent,
    ApplicantImmigrationDetailsFormComponent,
    ApplicantImmigrationDetailsCardComponent,
    ApplicantPosCardComponent,
    ApplicantPosFormComponent,
    PersonalDetailsCardComponent,
    ApplicantEducationDetailsCardComponent,
    ApplicantEducationDetailsFormComponent,
    ApplicantImgTraveldocumentDetailsComponent,
    ImgTraveldocumentDetailsCardComponent,
    ApplicantEmployementComponent,
    DynamicFormComponent,
    UploadComponent,
    SpouseDetailsComponent,
    SpouseDetailsComponent,
    DynModelComponent,
    DialogComponent,
    DyamicLayoutComponent,
    DyamicTemplateComponent,
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgbModule,
    NgxPaginationModule,
    PdfViewerModule,
    MatTabsModule,
    MatDialogModule,
  ],
  entryComponents: [DynModelComponent, DialogComponent],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
// >= v2.0.0
export function createConfig(): SignalRConfiguration {

  const c = new SignalRConfiguration();
  c.hubName = 'chatHub';
  //c.qs = { user: 'donald' };
  c.url = UrlConfig.DOMIN + 'signalr';
  c.logging = true;

  // >= v5.0.0
  c.executeEventsInZone = true; // optional, default is true
  c.executeErrorsInZone = false; // optional, default is false
  c.executeStatusChangeInZone = true; // optional, default is true
  return c;
}