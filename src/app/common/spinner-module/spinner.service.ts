import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/**
 * Service to start and stop progress spinner when running long running operation
 */
@Injectable()
export class SpinnerService {

  private internalStatus = new Subject<boolean>();

  /**
   * Subscription for status change (is active or not)
   * @return {Subject<boolean>}
   */
  public get status(): Subject<boolean> {
    return this.internalStatus;
  }

  /**
   * Show spinner
   */
  public start(): void {
    this.setActive(true);
  }

  /**
   * Hide spinner
   */
  public stop(): void {
    this.setActive(false);
  }

  private setActive(value: boolean): void {
    this.internalStatus.next(value);
  }
}
