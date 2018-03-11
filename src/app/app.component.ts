import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SpinnerService } from './common/spinner-module/spinner.service';

@Component({
  selector: 'app-root',
  template: `
    <app-layout></app-layout>
    <app-spinner></app-spinner>
  `
})
export class AppComponent implements OnInit{

  constructor(private spinner: SpinnerService){
  }

  public ngOnInit(): void {
    this.spinner.start();
  }
}
