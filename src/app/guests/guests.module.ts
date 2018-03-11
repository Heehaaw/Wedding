import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestListComponent } from './pages/guest-list/guest-list.component';
import { GuestService } from './services/guest.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [GuestService],
  declarations: [GuestListComponent]
})
export class GuestsModule { }
