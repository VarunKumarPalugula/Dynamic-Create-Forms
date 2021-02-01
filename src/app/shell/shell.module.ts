import { SharedModule } from '@app/shared/shared.module';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { ShellComponent } from '@app/shell/shell.component';
import { HeaderComponent } from '@app/shell/header/header.component';

@NgModule({
  imports: [ TranslateModule, SharedModule, RouterModule],
  declarations: [HeaderComponent, ShellComponent],
})
export class ShellModule {}
