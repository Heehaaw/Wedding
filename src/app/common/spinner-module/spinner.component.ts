import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit{

  public active: boolean;

  constructor(spinnerService: SpinnerService) {
    spinnerService.status.subscribe((active: boolean) => {
      this.active = active;
    });
  }

  public ngOnInit(): void {
    this.active = true;
  }

}
