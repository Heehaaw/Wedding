import { Component, Input } from '@angular/core';

/**
 * Angular component for displaying validation messages
 * Appears only if {@link validationError} is not empty string
 * @example
 * <app-validation-message [validationError]="form?.someError"></app-validation-message>
 */
@Component({
  selector: 'app-validation-message',
  template: `
    <div class="alert alert-danger pl-2 pr-2 pt-1 pb-1" *ngIf="validationError" >{{validationError}}</div>
  `
})
export class ValidationMessageComponent {

  /**
   * @prop {string} Validation error text to display
   */
  @Input() public validationError: string;
}
