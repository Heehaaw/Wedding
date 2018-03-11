import { IOption } from './option.interface';

export enum AttendEnum {
  WILL_NOT_ATTEND = 'WILL_NOT_ATTEND',
  WILL_ATTEND = 'WILL_ATTEND',
  WILL_ATTEND_PLUS_1 = 'WILL_ATTEND_PLUS_1'
}

export namespace AttendEnum {
  export const attendMap: {} =
    {
      [AttendEnum.WILL_NOT_ATTEND]: 'I will not attend',
      [AttendEnum.WILL_ATTEND]: 'I will attend',
      [AttendEnum.WILL_ATTEND_PLUS_1]: 'I will attend +1',
    };

}
