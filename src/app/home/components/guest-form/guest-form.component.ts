import { Component, OnDestroy, OnInit } from '@angular/core';
import SingleFormBaseComponent from '../../../common/components/single-form-base.component';
import { FormBuilder, Validators } from '@angular/forms';
import { FoodEnum } from '../../../common/models/food.enum';
import { DrinkEnum } from '../../../common/models/drink.enum';
import { AccomodationEnum } from '../../../common/models/accomodation.enum';
import { GuestModel } from '../../../common/models/guest.model';
import { AttendEnum } from '../../../common/models/attend.enum';
import { Observable } from 'rxjs/Observable';
import { InvitationService } from '../../../common/services/invitation.service';
import { AuthService } from '../../../common/services/auth.service';
import 'rxjs/add/operator/withLatestFrom';
import { GuestService } from '../../../guests/services/guest.service';
import { SpinnerService } from '../../../common/spinner-module/spinner.service';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/empty';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-guest-form',
  templateUrl: './guest-form.component.html',
  styleUrls: ['./guest-form.component.scss']
})
export class GuestFormComponent extends SingleFormBaseComponent implements OnInit, OnDestroy {

  public foods = FoodEnum.foodOptions;
  public drinks = DrinkEnum.drinkOptions;
  public accomodations = AccomodationEnum.accomodationOptions;
  public attendMap = AttendEnum.attendMap;
  public attendEnum = AttendEnum;

  public guest: GuestModel = new GuestModel();
  private guestSubscription: Subscription;

  public plus1Able$: Observable<boolean>;
  public isPlus1: boolean;
  public willCome: boolean;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private guestService: GuestService,
              private spinner: SpinnerService,
              private invitationService: InvitationService,
              private toastr: ToastrService) {

    super();
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      willAttend: [this.guest.willAttend, Validators.required],
      phone: [this.guest.phone, [Validators.required, Validators.pattern(/^(\+\d{12}|\d{9})$/)]],
      food: [this.guest.food, Validators.required],
      drink: [this.guest.drink, Validators.required],
      accomodation: [this.guest.accomodation, Validators.required],
      phone1: [this.guest.phone1, [Validators.required, Validators.pattern(/^(\+\d{12}|\d{9})$/)]],
      food1: [this.guest.food1, Validators.required],
      drink1: [this.guest.drink1, Validators.required]
    });

    this.guestSubscription = this.authService.user$
      .switchMap(u => u ? this.guestService.findByEmail(u.email) : Observable.empty<GuestModel>())
      .withLatestFrom(this.authService.user$)
      .subscribe(([guest, user]) => {
        if (!guest) {
          guest = new GuestModel();
          guest.email = user.email;
          guest.name = user.displayName;
        }
        this.guest = guest;
        this.form.patchValue(guest);
      });

    this.plus1Able$ = this.invitationService.getStoredInvitation().map(i => i && i.plus1Able);

    this.form.valueChanges.subscribe(data => {
      let wasPlus1 = this.isPlus1;
      let wasWillCome1 = this.willCome;
      this.isPlus1 = data['willAttend'] === AttendEnum.WILL_ATTEND_PLUS_1;
      this.willCome = data['willAttend'] !== AttendEnum.WILL_NOT_ATTEND;

      if (wasPlus1 !== this.isPlus1) {
        this.processFields(['phone1', 'food1', 'drink1'], this.isPlus1);
      }
      if (wasWillCome1 !== this.willCome) {
        this.processFields(['phone', 'food', 'drink', 'accomodation'], this.willCome);
      }

      this.updateValidationErrors();
    });

  }

  private processFields(fields: string[], condition) {
    const fnName = condition ? 'enable' : 'disable';
    for (let cn of fields) {
      let c = this.form.controls[cn];
      c[fnName]();
      if (!condition) {
        c.setValue(null);
      }
    }
  }

  public initFormErrors(): any {
    return {
      willAttend: '',
      phone: '',
      food: '',
      drink: '',
      phone1: '',
      food1: '',
      drink1: ''
    };
  }

  public initValidationMessages(): any {
    return {
      willAttend: { required: 'Required' },
      phone: { required: 'Required', pattern: 'Invalid' },
      food: { required: 'Required' },
      drink: { required: 'Required' },
      phone1: { required: 'Required', pattern: 'Invalid' },
      food1: { required: 'Required' },
      drink1: { required: 'Required' }
    };
  }

  public onUpdateGuest() {
    this.spinner.start();
    const g = { ...this.guest, ...this.form.getRawValue() };
    let p: Promise<any> = this.guest.id ? this.guestService.update(g) : this.guestService.add(g);
    p.catch(() => {
      this.spinner.stop();
      this.toastr.error('Něco se pokazilo, zkuste to prosím později...');
    }).then(() => {
      this.spinner.stop();
      this.toastr.success('Změny úspěšně uloženy!');
    });
  }

  ngOnDestroy() {
    this.guestSubscription && this.guestSubscription.unsubscribe();
  }
}
