import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { SpinnerModule } from './common/spinner-module/spinner.module';
import { HomeModule } from './home/home.module';
import { LayoutComponent } from './layout/layout.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { InvitationModule } from './invitation/invitation.module';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { CommonAppModule } from './common/common-app.module';
import { GuestsModule } from './guests/guests.module';
import { hmrState } from './common/hmr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    /*hmrState.isPersistance ? AngularFirestoreModule : (hmrState.isPersistance = true) && */AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AngularFontAwesomeModule,
    ToastrModule.forRoot(),
    SpinnerModule,
    CommonAppModule,
    HomeModule,
    InvitationModule,
    GuestsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
