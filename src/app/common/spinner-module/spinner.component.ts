import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements AfterViewInit {

  public active$: Observable<boolean>;

  constructor(private spinnerService: SpinnerService) {
    this.active$ = spinnerService.status;
  }

  public ngAfterViewInit(): void {
    this.spinnerService.start();
  }

}
