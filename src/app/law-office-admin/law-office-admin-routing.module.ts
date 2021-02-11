import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from '@app/law-office-admin/sign-in/sign-in.component';
import { LawOfficeAdminComponent } from '@app/law-office-admin/law-office-admin.component';
import { SignUpComponent } from '@app/law-office-admin/sign-up/sign-up.component';
import { ForgotPasswordComponent } from '@app/law-office-admin/forgot-password/forgot-password.component';
import { AccesspanelComponent } from '@app/law-office-admin/accesspanel/accesspanel.component';
import { AppLayoutComponent } from '@app/law-office-admin/app-layout/app-layout.component';
import { SettingsComponent } from '@app/law-office-admin/app-layout/settings/settings.component';
import { FillingsComponent } from '@app/law-office-admin/app-layout/fillings/fillings.component';
import { DocumentsComponent } from '@app/law-office-admin/app-layout/documents/documents.component';
import { TeamComponent } from '@app/law-office-admin/app-layout/team/team.component';
import { TeamInviteComponent } from '@app/law-office-admin/app-layout/team/team-invite/team-invite.component';
// tslint:disable-next-line:max-line-length
import { AdminClientInviteComponent } from '@app/law-office-admin/app-layout/clients/admin-client-invite/admin-client-invite.component';
import { ClientsComponent } from '@app/law-office-admin/app-layout/clients/clients.component';
import { AdminClientListEmptyComponent } from '@app/law-office-admin/app-layout/clients/admin-client-list-empty/admin-client-list-empty.component';
import { AdminClientInviteConfirmComponent } from '@app/law-office-admin/app-layout/clients/admin-client-invite-confirm/admin-client-invite-confirm.component';
import { AdminClientImportUploadComponent } from '@app/law-office-admin/app-layout/clients/admin-client-import-upload/admin-client-import-upload.component';
import { AdminClientImportMatchCopyComponent } from '@app/law-office-admin/app-layout/clients/admin-client-import-match-copy/admin-client-import-match-copy.component';
import { AdminClientImportFinishComponent } from '@app/law-office-admin/app-layout/clients/admin-client-import-finish/admin-client-import-finish.component';
import { AdminClientImportInviteConfirmComponent } from '@app/law-office-admin/app-layout/clients/admin-client-import-invite-confirm/admin-client-import-invite-confirm.component';
import { AdminClientListComponent } from '@app/law-office-admin/app-layout/clients/admin-client-list/admin-client-list.component';
import { MyTeamListComponent } from '@app/law-office-admin/app-layout/team/my-team-list/my-team-list.component';
import { TeaminvitesuccessComponent } from '@app/law-office-admin/app-layout/team/teaminvitesuccess/teaminvitesuccess.component';
import { HomeComponent } from '@app/law-office-admin/app-layout/home/home.component';
import { AllfillingsComponent } from './app-layout/fillings/allfillings/allfillings.component';
import { MembersComponent } from './app-layout/fillings/filling-layout/members/members.component';
import { FillingLayoutComponent } from './app-layout/fillings/filling-layout/filling-layout.component';
import { CaseComponent } from './app-layout/fillings/filling-layout/case/case.component';
import { TasksComponent } from './app-layout/fillings/filling-layout/tasks/tasks.component';
import { OverviewComponent } from './app-layout/fillings/filling-layout/overview/overview.component';
import { NewfillingComponent } from '@app/law-office-admin/app-layout/fillings/newfilling/newfilling.component';
import { MessagesComponent } from '@app/law-office-admin/app-layout/fillings/filling-layout/messages/messages/messages.component';
import { ViewmessagesComponent } from '@app/law-office-admin/app-layout/fillings/filling-layout/messages/viewmessages/viewmessages.component';
import { ClientApplicantSponsorSignupComponent } from '@app/shared/Components/client-applicant-sponsor-signup/client-applicant-sponsor-signup.component';
import { FilesComponent } from '@app/law-office-admin/app-layout/fillings/filling-layout/files/files.component';
import { FolderComponent } from '@app/law-office-admin/app-layout/fillings/filling-layout/files/folder/folder.component';
import { TaskListComponent } from './app-layout/fillings/filling-layout/tasks/task-list/task-list.component';
import { AdminauthGuard } from '@app/auth-guard/admin/adminauth.guard';
import { PermissionGuard } from '@app/auth-guard/admin/permission.guard';
import { AdminTeammemberInvitationSignupComponent } from './admininvities-signup/admin-teammember-invitation-signup/admin-teammember-invitation-signup.component';
import { ConnectionResloveService } from '@app/shared/service/ConnectionResloveService.service';
import { FormsComponent } from './app-layout/fillings/filling-layout/case/forms/forms.component';
import { CasesubmissionsComponent } from './app-layout/fillings/filling-layout/casesubmissions/casesubmissions.component';
import { AddTemplateComponent } from './app-layout/settings/add-template/add-template.component';
import { SettingLayoutComponent } from './app-layout/settings/setting-layout/setting-layout.component';
import { TemplatesComponent } from './app-layout/settings/templates/templates.component';

const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'accespanel', component: AccesspanelComponent },
  // tslint:disable-next-line:max-line-length

  //route for admin invite his own team members
  {
    path: 'admin/nonregistereduserinadminrole/:register?PortOrgId&OrgName&PortInvitedId&Email&TStatus',
    component: AdminTeammemberInvitationSignupComponent,
  },

  //route for admin invite existing lawoffice admin exisitng member which registed in app
  {
    path: 'admin/teaminviteeclearance/:clearance?portfolioId&InvitationId&InvitationId',
    component: AdminTeammemberInvitationSignupComponent,
  },

  {
    path: 'admin/collect/:registeryinformation?PortOrgId&OrgName&PortInvitedId&Email&FullName&SetType',
    component: ClientApplicantSponsorSignupComponent,
  },
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  {
    path: 'admin',
    component: AppLayoutComponent,
    canActivate: [AdminauthGuard],
    children: [
      {
        path: 'settings',
        component: SettingLayoutComponent,
        children: [
          { path: '', component: SettingsComponent },
          { path: 'templates', component: SettingsComponent },
          { path: 'template', component: AddTemplateComponent },
          { path: 'template/:id', component: AddTemplateComponent },
        ],
      },
      { path: 'documents', component: DocumentsComponent },
      {
        path: 'team',
        component: TeamComponent,
        children: [
          { path: '', component: MyTeamListComponent },
          {
            path: 'pendingteammembers',
            component: MyTeamListComponent,
          },
          {
            path: 'teaminvite',
            component: TeamInviteComponent,
            canActivate: [PermissionGuard],
            data: { role: 'TeamMember' },
          },
          {
            path: 'invitesuccess',
            component: TeaminvitesuccessComponent,
            canActivate: [PermissionGuard],
            data: { role: 'TeamMember' },
          },
        ],
      },
      {
        path: 'fillings',
        component: FillingsComponent,
        children: [
          { path: '', component: AllfillingsComponent },
          { path: 'newfilling', component: NewfillingComponent, canActivate: [PermissionGuard] },
          // { path: 'form/:name', component: FormsComponent},
          { path: 'form/:name/:id', component: FormsComponent },
          {
            path: '',
            component: FillingLayoutComponent,
            children: [
              { path: 'overview', component: OverviewComponent },
              { path: 'members', component: MembersComponent },
              { path: 'casesubmission', component: CasesubmissionsComponent },
              { path: 'casesubmission/:id', component: CaseComponent },
              // { path: 'cases', component: CaseComponent },
              { path: 'taskslist', component: TasksComponent },
              { path: 'task/:id', component: TaskListComponent },
              { path: 'messages', component: MessagesComponent },
              {
                path: 'viewmessages',
                component: ViewmessagesComponent,
                resolve: { connection: ConnectionResloveService },
              },
              { path: 'files/folder', component: FolderComponent },
              { path: 'files', component: FilesComponent },
              { path: 'files/folder', component: FolderComponent },
              { path: 'case', component: CaseComponent },
            ],
          },
        ],
      },
      {
        path: 'clients',
        component: ClientsComponent,
        canActivate: [AdminauthGuard],
        children: [
          // { path: 'clientempty', component: AdminClientListEmptyComponent },
          { path: '', component: AdminClientListComponent },
          { path: 'clientinvitelist', component: AdminClientListComponent },
          {
            path: 'pendingclientinvitelist',
            component: AdminClientListComponent,
          },
          { path: 'clientinvite', component: AdminClientInviteComponent, canActivate: [PermissionGuard] },
          { path: 'clientinvitesuccess', component: AdminClientInviteConfirmComponent, canActivate: [PermissionGuard] },
          { path: 'clientimport', component: AdminClientImportUploadComponent, canActivate: [PermissionGuard] },
          { path: 'clientimportmatch', component: AdminClientImportMatchCopyComponent, canActivate: [PermissionGuard] },
          { path: 'clientimportfinsih', component: AdminClientImportFinishComponent, canActivate: [PermissionGuard] },
          {
            path: 'clientimportinviteconfirm',
            component: AdminClientImportInviteConfirmComponent,
            canActivate: [PermissionGuard],
          },
        ],
      },
    ],
  },
];
//  { path: 'dashboard',component: DashboardComponent, canActivate:[AuthGuard]},

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AdminauthGuard],
})
export class LawOfficeAdminRoutingModule {}
