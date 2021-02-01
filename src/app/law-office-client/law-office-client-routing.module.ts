import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LawOfficeClientComponent } from '@app/law-office-client/law-office-client.component';
import { SignInComponent } from '@app/law-office-client/sign-in/sign-in.component';
import { SignUpComponent } from '@app/law-office-client/sign-up/sign-up.component';
import { ForgotPasswordComponent } from '@app/law-office-client/forgot-password/forgot-password.component';
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
import { NonregisteredclientinvitiesComponent } from '@app/law-office-client/nonregisteredclientinvities/nonregisteredclientinvities.component';
// tslint:disable-next-line:max-line-length
import { ConnectionComponent } from '@app/law-office-client/app-layout/connections/connection.component';
// tslint:disable-next-line:max-line-length
import { ConnectionInviteComponent } from '@app/law-office-client/app-layout/connections/connections-invite/connections-invite.component';
// tslint:disable-next-line:max-line-length
import { ConnectionListComponent } from '@app/law-office-client/app-layout/connections/connections-list/connections-list.component';
import { FillingsComponent } from '@app/law-office-client/app-layout/fillings/fillings.component';
import { AllfillingsComponent } from '@app/law-office-client/app-layout/fillings/allfillings/allfillings.component';
import { TimelinesComponent } from '@app/law-office-client/app-layout/timelines/timelines.component';
import { NewfillingComponent } from '@app/law-office-client/app-layout/fillings/newfilling/newfilling.component';
// tslint:disable-next-line:max-line-length
import { FillingLayoutComponent } from '@app/law-office-client/app-layout/fillings/filling-layout/filling-layout.component';
// tslint:disable-next-line:max-line-length
import { OverviewComponent } from '@app/law-office-client/app-layout/fillings/filling-layout/overview/overview.component';
import { MembersComponent } from '@app/law-office-client/app-layout/fillings/filling-layout/members/members.component';
import { CaseComponent } from '@app/law-office-client/app-layout/fillings/filling-layout/case/case.component';

import { TasksComponent } from '@app/law-office-client/app-layout/fillings/filling-layout/tasks/tasks.component';
// tslint:disable-next-line:max-line-length
import { TaskListComponent } from '@app/law-office-client/app-layout/fillings/filling-layout/tasks/task-list/task-list.component';
// tslint:disable-next-line:max-line-length
import { MessagesComponent } from '@app/law-office-client/app-layout/fillings/filling-layout/messages/messages/messages.component';
// tslint:disable-next-line:max-line-length
import { ViewmessagesComponent } from '@app/law-office-client/app-layout/fillings/filling-layout/messages/viewmessages/viewmessages.component';
// tslint:disable-next-line:max-line-length
import { FolderComponent } from '@app/law-office-client/app-layout/fillings/filling-layout/files/folder/folder.component';
import { FilesComponent } from '@app/law-office-client/app-layout/fillings/filling-layout/files/files.component';
import { ClientauthGuard } from '@app/auth-guard/client-guard/clientauth.guard';
import { ClientpermissionGuard } from '@app/auth-guard/client-guard/clientpermission.guard';
import { NonregistredorganisationComponent } from './nonregistredorganisation/nonregistredorganisation.component';
import { ConnectionsSuccessComponent } from './app-layout/connections/connections-success/connections-success.component';
import { ConnectionResloveService } from '@app/shared/service/ConnectionResloveService.service';
import { CaseSubmissionsComponent } from './app-layout/fillings/filling-layout/case-submissions/case-submissions.component';

const routes: Routes = [
  {
    path: '',
    component: LawOfficeClientComponent,
    children: [
      { path: '', component: SignInComponent },
      { path: 'signin', component: SignInComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'forgotpassword', component: ForgotPasswordComponent },
      {
        path: 'nonregistereduserinadminrole/:register?PortOrgId&OrgName&PortInvitedId&Email&TStatus',
        component: NonregisteredclientinvitiesComponent,
      },
      {
        path: 'collect/:registeryinformation?PortCOrgId&OrgName&PortInvitedId&Email&FullName',
        component: NonregistredorganisationComponent,
      },
      {
        path: 'applayout',
        component: AppLayoutComponent,
        canActivate: [ClientauthGuard],
        children: [
          { path: 'settings', component: SettingsComponent },
          // { path: 'home', component: HomeComponent },
          {
            path: 'fillings',
            component: FillingsComponent,
            children: [
              { path: '', component: AllfillingsComponent },
              { path: 'newfilling', component: NewfillingComponent },
              {
                path: '',
                component: FillingLayoutComponent,
                children: [
                  { path: 'overview', component: OverviewComponent },
                  { path: 'members', component: MembersComponent },
                  { path: 'casesubmission', component: CaseSubmissionsComponent},
                  { path: 'casesubmission/:id', component: CaseComponent},
                  { path: 'case', component: CaseComponent },
                  { path: 'cases', component: CaseComponent },
                  { path: 'taskslist', component: TasksComponent },
                  { path: 'task/:id', component: TaskListComponent },
                  { path: 'messages', component: MessagesComponent },
                  {
                    path: 'viewmessages', component: ViewmessagesComponent,
                    resolve: { connection: ConnectionResloveService }
                  },
                  { path: 'files/folder', component: FolderComponent },
                  { path: 'files', component: FilesComponent },
                  { path: 'files/folder', component: FolderComponent },
                  // { path: 'case', component: CaseComponent },
                ],
              },
            ],
          },
          { path: 'timelines', component: TimelinesComponent },
          { path: 'documents', component: DocumentsComponent },
          {
            path: 'team',
            component: TeamComponent,
            children: [
              { path: '', component: MyTeamListComponent },
              { path: 'pendingteammembers', component: MyTeamListComponent },
              {
                path: 'teaminvite',
                component: TeamInviteComponent,
                canActivate: [ClientpermissionGuard],
                data: { role: 'TeamMember' },
              },
              {
                path: 'teaminviteconfirm',
                component: TeamInviteConfirmComponent,
                canActivate: [ClientpermissionGuard],
                data: { role: 'TeamMember' },
              },
              {
                path: 'invitesuccess',
                component: TeaminvitesuccessComponent,
                canActivate: [ClientpermissionGuard],
                data: { role: 'TeamMember' },
              },
            ],
          },
          {
            path: 'connections',
            component: ConnectionComponent,
            canActivateChild: [ClientauthGuard],
            children: [
              { path: '', component: ConnectionListComponent, canActivate: [ClientpermissionGuard] },
              { path: 'inviteslist', component: ConnectionListComponent, canActivate: [ClientpermissionGuard] },
              //{ path: 'empty', component: ConnectionlistEmptyComponent ,canActivate: [ClientpermissionGuard]},
              { path: 'invite', component: ConnectionInviteComponent, canActivate: [ClientpermissionGuard] },
              { path: 'connectionssuccess', component: ConnectionsSuccessComponent },
            ],
          },
        ],
      },
    ],
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ClientauthGuard],
})
export class LawOfficeClientRoutingModule { }
