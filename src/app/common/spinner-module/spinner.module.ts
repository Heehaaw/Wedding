import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SpinnerService } from './spinner.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFontAwesomeModule
  ],
  providers: [SpinnerService],
  declarations: [SpinnerComponent],
  exports: [SpinnerComponent]
})
export class SpinnerModule {
}
