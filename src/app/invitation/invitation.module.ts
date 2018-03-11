import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationListComponent } from './pages/invitation-list/invitation-list.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CommonAppModule } from '../common/common-app.module';

@NgModule({
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    CommonAppModule
  ],
  declarations: [InvitationListComponent]
})
export class InvitationModule {
}
