import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home.component';
import { GuestFormComponent } from './components/guest-form/guest-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonAppModule } from '../common/common-app.module';
import { InfoComponent } from './components/info/info.component';
import { NotLoggedInComponent } from './components/not-logged-in/not-logged-in.component';
import { SpinnerModule } from '../common/spinner-module/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonAppModule
  ],
  declarations: [
    HomeComponent,
    GuestFormComponent,
    InfoComponent,
    NotLoggedInComponent]
})
export class HomeModule {
}
