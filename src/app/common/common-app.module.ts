import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessageComponent } from './components/validation-message.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthService } from './services/auth.service';
import { InvitationService } from './services/invitation.service';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';

@NgModule({
  imports: [
    CommonModule,
    AsyncLocalStorageModule
  ],
  providers: [
    AdminGuard,
    AuthService,
    InvitationService
  ],
  declarations: [
    ValidationMessageComponent
  ],
  exports: [
    ValidationMessageComponent
  ]
})
export class CommonAppModule {
}
