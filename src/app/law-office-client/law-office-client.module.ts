import { NgModule } from '@angular/core';
import { LawOfficeClientRoutingModule } from '@app/law-office-client/law-office-client-routing.module';
import { LawOfficeClientComponent } from '@app/law-office-client/law-office-client.component';
import { SignInComponent } from '@app/law-office-client/sign-in/sign-in.component';
import { SignUpComponent } from '@app/law-office-client/sign-up/sign-up.component';
import { ForgotPasswordComponent } from '@app/law-office-client/forgot-password/forgot-password.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/shared/shared.module';
import { AppLayoutComponent } from '@app/law-office-client/app-layout/app-layout.component';
import { SettingsComponent } from '@app/law-office-client/app-layout/settings/settings.component';
import { HomeComponent } from '@app/law-office-client/app-layout/home/home.component';
import { DocumentsComponent } from '@app/law-office-client/app-layout/documents/documents.component';
import { TeamComponent } from '@app/law-office-client/app-layout/team/team.component';
import { MyTeamListComponent } from '@app/law-office-client/app-layout/team/my-team-list/my-team-list.component';
import { TeamInviteComponent } from '@app/law-office-client/app-layout/team/team-invite/team-invite.component';
// tslint:disable-next-line:max-line-length
import { TeamInviteConfirmComponent } from '@app/law-office-client/app-layout/team/team-invite-confirm/team-invite-confirm.component';
// tslint:disable-next-line:max-line-length
import { TeaminvitesuccessComponent } from '@app/law-office-client/app-layout/team/teaminvitesuccess/teaminvitesuccess.component';
// tslint:disable-next-line:max-line-length
import { AdminClientImportUploadComponent } from '@app/law-office-client/app-layout/team/client-team-upload/admin-client-import-upload.component';
// tslint:disable-next-line:max-line-length
import { AdminClientImportMatchCopyComponent } from '@app/law-office-client/app-layout/team/client-team-import-match/admin-client-import-match-copy.component';
// tslint:disable-next-line:max-line-length
import { AdminClientImportFinishComponent } from '@app/law-office-client/app-layout/team/client-import finish/admin-client-import-finish.component';
// tslint:disable-next-line:max-line-length
import { AdminClientImportInviteConfirmComponent } from '@app/law-office-client/app-layout/team/client-import/admin-client-import-invite-confirm.component';
// tslint:disable-next-line:max-line-length
import { NonregisteredclientinvitiesComponent } from '@app/law-office-client/nonregisteredclientinvities/nonregisteredclientinvities.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ConnectionComponent } from '@app/law-office-client/app-layout/connections/connection.component';
// tslint:disable-next-line:max-line-length
import { ConnectionInviteComponent } from '@app/law-office-client/app-layout/connections/connections-invite/connections-invite.component';
// tslint:disable-next-line:max-line-length
import { ConnectionListComponent } from '@app/law-office-client/app-layout/connections/connections-list/connections-list.component';
import { AllfillingsComponent } from '@app/law-office-client/app-layout/fillings/allfillings/allfillings.component';
import { TimelinesComponent } from './app-layout/timelines/timelines.component';
import { FillingsComponent } from '@app/law-office-client/app-layout/fillings/fillings.component';
// tslint:disable-next-line:max-line-length
import { OverviewComponent } from '@app/law-office-client/app-layout/fillings/filling-layout/overview/overview.component';
import { TasksComponent } from '@app/law-office-client/app-layout/fillings/filling-layout/tasks/tasks.component';
import { FilesComponent } from '@app/law-office-client/app-layout/fillings/filling-layout/files/files.component';
// tslint:disable-next-line:max-line-length
import { MessagesComponent } from '@app/law-office-client/app-layout/fillings/filling-layout/messages/messages/messages.component';
// tslint:disable-next-line:max-line-length
import { ViewmessagesComponent } from '@app/law-office-client/app-layout/fillings/filling-layout/messages/viewmessages/viewmessages.component';
import { MembersComponent } from '@app/law-office-client/app-layout/fillings/filling-layout/members/members.component';
import { NewfillingComponent } from '@app/law-office-client/app-layout/fillings/newfilling/newfilling.component';
// tslint:disable-next-line:max-line-length
import { FillingLayoutComponent } from '@app/law-office-client/app-layout/fillings/filling-layout/filling-layout.component';
import { CaseComponent } from '@app/law-office-client/app-layout/fillings/filling-layout/case/case.component';
// tslint:disable-next-line:max-line-length
import { TaskListComponent } from '@app/law-office-client/app-layout/fillings/filling-layout/tasks/task-list/task-list.component';
// tslint:disable-next-line:max-line-length
import { FolderComponent } from '@app/law-office-client/app-layout/fillings/filling-layout/files/folder/folder.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { OrderModule } from 'ngx-order-pipe';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FileUploadModule } from 'ng2-file-upload';
import { NgSelectModule } from '@ng-select/ng-select';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ClientmasterpageComponent } from './clientmasterpage/clientmasterpage.component';
import { ConnectionService } from './app-layout/connections/connection.service';
import { InterceptorService } from '@app/auth-guard/intercepto.service';
import { NonregistredorganisationComponent } from './nonregistredorganisation/nonregistredorganisation.component';
import { ConnectionsSuccessComponent } from './app-layout/connections/connections-success/connections-success.component';
import { OrgProfileDetailsComponent } from './app-layout/settings/org-profile-details/org-profile-details.component';
import { ClientPermissionsComponent } from './app-layout/settings/client-permissions/client-permissions.component';
import { ClientBillingsComponent } from './app-layout/settings/client-billings/client-billings.component';
import { AccountDetailsComponent } from './app-layout/settings/account-details/account-details.component';
import { ApplicantProfileDetailsComponent } from './app-layout/settings/applicant-profile-details/applicant-profile-details.component';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CaseSubmissionsComponent } from './app-layout/fillings/filling-layout/case-submissions/case-submissions.component';
@NgModule({
  imports: [
    LawOfficeClientRoutingModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    TranslateModule,
    OrderModule,
    AngularEditorModule,
    HttpClientModule,
    FileUploadModule,
    TranslateModule,
    OrderModule,
    SharedModule,
    AngularEditorModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    TypeaheadModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    NgCircleProgressModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    NgCircleProgressModule.forRoot(),
  ],
  declarations: [
    LawOfficeClientComponent,
    SignInComponent,
    TeamComponent,
    AdminClientImportUploadComponent,
    MyTeamListComponent,
    AdminClientImportMatchCopyComponent,
    AppLayoutComponent,
    ConnectionInviteComponent,
    ConnectionComponent,
    ConnectionListComponent,
    SettingsComponent,
    AdminClientImportFinishComponent,
    SignUpComponent,
    AdminClientImportInviteConfirmComponent,
    TeamInviteConfirmComponent,
    TeamInviteComponent,
    HomeComponent,
    FillingsComponent,
    OverviewComponent,
    TasksComponent,
    FilesComponent,
    MessagesComponent,
    ViewmessagesComponent,
    TaskListComponent,
    FolderComponent,
    MembersComponent,
    TeaminvitesuccessComponent,
    DocumentsComponent,
    NewfillingComponent,
    FillingLayoutComponent,
    ConnectionsSuccessComponent,
    CaseComponent,
    AllfillingsComponent,
    ForgotPasswordComponent,
    NonregisteredclientinvitiesComponent,
    TimelinesComponent,
    ClientmasterpageComponent,
    NonregistredorganisationComponent,
    OrgProfileDetailsComponent,
    ClientPermissionsComponent,
    ClientBillingsComponent,
    AccountDetailsComponent,
    ApplicantProfileDetailsComponent,
    CaseSubmissionsComponent,
  ],
  
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ConnectionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
})
export class LawOfficeClientModule {}
