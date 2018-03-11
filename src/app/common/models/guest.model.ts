import { BaseModel } from './base.model';

export class GuestModel extends BaseModel {
  id?: string;
  email: string;
  name: string;
  willAttend: string;
  phone: number;
  food: string;
  drink: string;
  accomodation: string;
  phone1: number;
  food1: string;
  drink1: string;
}
