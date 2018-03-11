import { FormGroup } from '@angular/forms';


/**
 * Base class for Angular components with single form
 * Designed to simplify and unify work with form and validation messages
 */
abstract class SingleFormBaseComponent {

  /**
   * @property {FormGroup} Form with fields
   */
  public form: FormGroup;
  /**
   * @property {any} Key-value pairs with form property name and current validation message related to this property
   * @example <caption>Object structure example</caption>
   * {
   *  'email': 'Invalid format of email.',
   *  'name': '',
   *  'phone': 'Phone is required. Only digits allowed in phone number.'
   * }
   */
  public formErrors: any;
  /**
   * @property {any} Object with all possible validation messages related to specific form's field
   * @example <caption>Object structure example</caption>
   * {
   *  'email': {
   *   'required': 'Email is required',
   *   'emailFormat': 'Invalid format of email'
   *  },
   *  'name': {
   *   'required': 'Name is required'
   *  },
   *  'phone': {
   *   'required': 'Phone is required',
   *   'phoneFormat': 'Only digits allowed in phone number'
   *  }
   * }
   */
  public validationMessages: [{ [key: string]: any }];

  public constructor() {
    this.validationMessages = this.initValidationMessages();
    this.formErrors = this.initFormErrors();
  }

  /**
   * Method to initialize {@link formErrors} object
   * @abstract
   * @return {any}
   */
  public abstract initFormErrors(): any;

  /**
   * Method to initialize {@link validationMessages} object
   * @abstract
   * @return {any}
   */
  public abstract initValidationMessages(): any;

  /**
   * Method which update {@link formErrors} based on state {@link form}.
   * Need subscribe to valueChanged manually
   * @example
   * this.form.valueChanges.subscribe(data => this.updateValidationErrors());
   */
  public updateValidationErrors(): void {
    if (!this.form) {
      return;
    }

    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = this.form.get(field);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += `${messages[key]} `;
            }
          }
        }
      }
    }
  }
}

export default SingleFormBaseComponent;
