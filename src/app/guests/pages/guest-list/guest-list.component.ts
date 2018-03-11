import { Component, OnInit } from '@angular/core';
import { GuestService } from '../../services/guest.service';
import { Observable } from 'rxjs/Observable';
import { GuestModel } from '../../../common/models/guest.model';
import { AccomodationEnum } from '../../../common/models/accomodation.enum';
import { AttendEnum } from '../../../common/models/attend.enum';
import { FoodEnum } from '../../../common/models/food.enum';
import { DrinkEnum } from '../../../common/models/drink.enum';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.scss']
})
export class GuestListComponent implements OnInit {

  public guests$: Observable<({ plus1: string } & GuestModel)[]>;

  constructor(private guestService: GuestService) {
    this.guests$ = this.guestService.all().map(gs => gs.map((g: { plus1: string } & GuestModel) => {
      let willAttend = g.willAttend === AttendEnum.WILL_ATTEND_PLUS_1;
      g.plus1 = willAttend ? 'Yep' : 'Nope';
      g.willAttend = AttendEnum.attendMap[g.willAttend];
      g.food = FoodEnum.foodMap[g.food];
      g.drink = DrinkEnum.drinkMap[g.drink];
      g.accomodation = AccomodationEnum.accomodationMap[g.accomodation];
      if (willAttend) {
        g.food1 = FoodEnum.foodMap[g.food1];
        g.drink1 = DrinkEnum.drinkMap[g.drink1];
      }
      return g;
    }));
  }

  ngOnInit() {
  }

}
