// tslint:disable-next-line:max-line-length
import { AdminMultipleclientInviteComponent } from './app-layout/clients/admin-multipleclient-invite/admin-multipleclient-invite.component';
import { NgModule } from '@angular/core';
import { LawOfficeAdminRoutingModule } from './law-office-admin-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LawOfficeAdminComponent } from './law-office-admin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { AccesspanelComponent } from './accesspanel/accesspanel.component';
import { MasterpageComponent } from './masterpage/masterpage.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { DocumentsComponent } from './app-layout/documents/documents.component';
import { SettingsComponent } from './app-layout/settings/settings.component';
import { FillingsComponent } from './app-layout/fillings/fillings.component';
import { SharedModule } from '@app/shared/shared.module';
import { ClientsComponent } from './app-layout/clients/clients.component';
import { TeamComponent } from './app-layout/team/team.component';
import { TeamInviteComponent } from './app-layout/team/team-invite/team-invite.component';
import { MyTeamListComponent } from './app-layout/team/my-team-list/my-team-list.component';
// tslint:disable-next-line:max-line-length
import { AdminClientListEmptyComponent } from './app-layout/clients/admin-client-list-empty/admin-client-list-empty.component';
// tslint:disable-next-line:max-line-length
import { AdminClientImportInviteConfirmComponent } from './app-layout/clients/admin-client-import-invite-confirm/admin-client-import-invite-confirm.component';
import { AdminClientInviteComponent } from './app-layout/clients/admin-client-invite/admin-client-invite.component';
// tslint:disable-next-line:max-line-length
import { AdminClientInviteConfirmComponent } from './app-layout/clients/admin-client-invite-confirm/admin-client-invite-confirm.component';
// tslint:disable-next-line:max-line-length
import { AdminClientImportMatchCopyComponent } from './app-layout/clients/admin-client-import-match-copy/admin-client-import-match-copy.component';
import { AdminClientListComponent } from './app-layout/clients/admin-client-list/admin-client-list.component';
// tslint:disable-next-line:max-line-length
import { AdminClientImportUploadComponent } from './app-layout/clients/admin-client-import-upload/admin-client-import-upload.component';
// tslint:disable-next-line:max-line-length
import { AdminClientImportFinishComponent } from './app-layout/clients/admin-client-import-finish/admin-client-import-finish.component';
// tslint:disable-next-line:max-line-length
import { TeaminvitesuccessComponent } from '@app/law-office-admin/app-layout/team/teaminvitesuccess/teaminvitesuccess.component';
import { HomeComponent } from './app-layout/home/home.component';
import { AllfillingsComponent } from './app-layout/fillings/allfillings/allfillings.component';
import { NewfillingComponent } from './app-layout/fillings/newfilling/newfilling.component';
import { FillingLayoutComponent } from './app-layout/fillings/filling-layout/filling-layout.component';
import { MembersComponent } from './app-layout/fillings/filling-layout/members/members.component';
import { TasksComponent } from './app-layout/fillings/filling-layout/tasks/tasks.component';
import { FilesComponent } from './app-layout/fillings/filling-layout/files/files.component';
import { CaseComponent } from './app-layout/fillings/filling-layout/case/case.component';
import { OverviewComponent } from './app-layout/fillings/filling-layout/overview/overview.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// tslint:disable-next-line:max-line-length
import { MessagesComponent } from '@app/law-office-admin/app-layout/fillings/filling-layout/messages/messages/messages.component';
// tslint:disable-next-line:max-line-length
import { ViewmessagesComponent } from '@app/law-office-admin/app-layout/fillings/filling-layout/messages/viewmessages/viewmessages.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HttpModule } from '@angular/http';
import { OrderModule } from 'ngx-order-pipe';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
// tslint:disable-next-line:max-line-length
import { FolderComponent } from '@app/law-office-admin/app-layout/fillings/filling-layout/files/folder/folder.component';
import { TaskListComponent } from './app-layout/fillings/filling-layout/tasks/task-list/task-list.component';
import { NoWhitespaceDirective } from '@app/shared/validators/no-whitespace.directive';
import { AdminTeammemberInvitationSignupComponent } from './admininvities-signup/admin-teammember-invitation-signup/admin-teammember-invitation-signup.component';
import { TourNgxPopperModule } from 'ngx-tour-ngx-popper';
import { FormsComponent } from './app-layout/fillings/filling-layout/case/forms/forms.component';
import { CasesubmissionsComponent } from './app-layout/fillings/filling-layout/casesubmissions/casesubmissions.component';
import { AddTemplateComponent } from './app-layout/settings/add-template/add-template.component';
import { SettingLayoutComponent } from './app-layout/settings/setting-layout/setting-layout.component';
import { TemplatesComponent } from './app-layout/settings/templates/templates.component'

@NgModule({
  imports: [
    LawOfficeAdminRoutingModule,
    HttpClientModule,
    FileUploadModule,
    TranslateModule,
    OrderModule,
    HttpModule,
    SharedModule,
    AngularEditorModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    TypeaheadModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    NgCircleProgressModule.forRoot(),
    TourNgxPopperModule
  ],
  declarations: [
    SignUpComponent,
    SignInComponent,
    NoWhitespaceDirective,
    LawOfficeAdminComponent,
    ForgotPasswordComponent,
    AccesspanelComponent,
    MasterpageComponent,
    AppLayoutComponent,
    DocumentsComponent,
    SettingsComponent,
    FillingsComponent,
    ClientsComponent,
    TeamComponent,
    FolderComponent,
    TeamInviteComponent,
    MyTeamListComponent,
    AdminClientListEmptyComponent,
    AdminClientImportInviteConfirmComponent,
    AdminClientInviteComponent,
    AdminClientInviteConfirmComponent,
    AdminClientImportMatchCopyComponent,
    AdminClientListComponent,
    AdminClientImportUploadComponent,
    AdminClientImportFinishComponent,
    TeaminvitesuccessComponent,
    HomeComponent,
    MembersComponent,
    AdminMultipleclientInviteComponent,
    AllfillingsComponent,
    NewfillingComponent,
    FillingLayoutComponent,
    TasksComponent,
    MessagesComponent,
    FilesComponent,
    CaseComponent,
    OverviewComponent,
    ViewmessagesComponent,
    TaskListComponent,
    AdminTeammemberInvitationSignupComponent,
    FormsComponent,
    CasesubmissionsComponent,
    AddTemplateComponent,
    SettingLayoutComponent,
    TemplatesComponent,
  ],
})
export class LawOfficeAdminModule { }
