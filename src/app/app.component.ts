import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { SpinnerService } from './common/spinner-module/spinner.service';

@Component({
  selector: 'app-root',
  template: `
    <app-layout></app-layout>
    <app-spinner></app-spinner>
  `
})
export class AppComponent implements OnInit {

  constructor(private spinner: SpinnerService, private myElement: ElementRef) {
  }

  public ngOnInit(): void {
    this.spinner.start();
    // setTimeout(
    //   () => this.myElement.nativeElement.nextElementSibling && this.myElement.nativeElement.nextElementSibling.remove(),
    //   3000);
  }
}
