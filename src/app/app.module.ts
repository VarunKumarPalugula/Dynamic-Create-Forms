import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '@env/environment';
import { ToastrModule } from 'ngx-toastr';
import { ShellModule } from './shell/shell.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminauthGuard } from '@app/auth-guard/admin/adminauth.guard';
import { EmailVerificationComponent } from './shared/Components/email-verification/email-verification.component';
import { RouterModule } from '@angular/router';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '@app/shared/shared.module';
import { LawOfficeAdminModule } from '@app/law-office-admin/law-office-admin.module';
// tslint:disable-next-line:max-line-length
import { VerifyEmailAddressComponent } from '@app/shared/Components/verify-email-address/verify-email-address.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { InterceptorService } from '@app/auth-guard/intercepto.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientauthGuard } from './auth-guard/client-guard/clientauth.guard';
import { UserIdleModule } from 'angular-user-idle';
import { NgxFileDropModule } from 'ngx-file-drop';
import { RandomcolorModule } from 'angular-randomcolor';
import { TourNgxPopperModule } from 'ngx-tour-ngx-popper';
import { UppyAngularModule } from 'uppy-angular';
@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    UppyAngularModule,
    ShellModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
    TourNgxPopperModule.forRoot(),
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
    RouterModule,
    ModalModule.forRoot(),
    SharedModule,
    LawOfficeAdminModule,
    ButtonsModule.forRoot(),
    TypeaheadModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    BrowserAnimationsModule,
    NgxFileDropModule,
    RandomcolorModule,
    UserIdleModule.forRoot({ idle: 900, timeout: 1, ping: 0 }),
  ],
  declarations: [AppComponent, EmailVerificationComponent, VerifyEmailAddressComponent],
  providers: [
    AdminauthGuard,
    ClientauthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
