import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/pages/home.component';
import { InvitationListComponent } from './invitation/pages/invitation-list/invitation-list.component';
import { AdminGuard } from './common/guards/admin.guard';
import { GuestListComponent } from './guests/pages/guest-list/guest-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'invitations', component: InvitationListComponent, canActivate: [AdminGuard] },
  { path: 'guests', component: GuestListComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
