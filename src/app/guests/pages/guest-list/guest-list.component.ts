import { Component, OnInit } from '@angular/core';
import { GuestService } from '../../services/guest.service';
import { Observable } from 'rxjs/Observable';
import { GuestModel } from '../../../common/models/guest.model';
import { AccomodationEnum } from '../../../common/models/accomodation.enum';
import { AttendEnum } from '../../../common/models/attend.enum';
import { FoodEnum } from '../../../common/models/food.enum';
import { DrinkEnum } from '../../../common/models/drink.enum';
import 'rxjs/add/operator/reduce';


@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.scss']
})
export class GuestListComponent implements OnInit {

  public guests$: Observable<GuestModel[]>;

  public guestSum = 0;
  public plus1Sum = 0;
  public notCommingSum = 0;
  public total = 0;
  public needsRoomSum = 0;

  constructor(private guestService: GuestService) {

    this.guests$ = this.guestService.all().map(gs => {

      this.guestSum = this.plus1Sum = this.notCommingSum = this.total = this.needsRoomSum = 0;

      return gs.map((g: GuestModel) => {

        this.updateSums(g);

        let plus1 = g.willAttend === AttendEnum.WILL_ATTEND_PLUS_1;
        g.willAttend = AttendEnum.attendMap[g.willAttend];
        g.food = FoodEnum.foodMap[g.food];
        g.drink = DrinkEnum.drinkMap[g.drink];
        g.accomodation = AccomodationEnum.accomodationMap[g.accomodation];
        if (plus1) {
          g.food1 = FoodEnum.foodMap[g.food1];
          g.drink1 = DrinkEnum.drinkMap[g.drink1];
        }
        return g;
      });
    });
  }

  private updateSums(g: GuestModel) {
    this.total++;
    if (g.accomodation === AccomodationEnum.ROOM) {
      this.needsRoomSum++;
    }
    if (g.food1) {
      this.guestSum += 2;
      this.plus1Sum++;
    }
    else if (g.willAttend === AttendEnum.WILL_NOT_ATTEND) {
      this.notCommingSum++;
    }
    else {
      this.guestSum++;
    }
  }

  ngOnInit() {
  }

}
