import { IOption } from './option.interface';

export enum AttendEnum {
  WILL_NOT_ATTEND = 'WILL_NOT_ATTEND',
  WILL_ATTEND = 'WILL_ATTEND',
  WILL_ATTEND_PLUS_1 = 'WILL_ATTEND_PLUS_1'
}

export namespace AttendEnum {
  export const attendMap: {} =
    {
      [AttendEnum.WILL_NOT_ATTEND]: 'Nepřijdu',
      [AttendEnum.WILL_ATTEND]: 'Přijdu',
      [AttendEnum.WILL_ATTEND_PLUS_1]: 'Přijdu s +1',
    };

}
