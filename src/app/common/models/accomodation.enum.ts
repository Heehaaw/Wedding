import { IOption } from './option.interface';

export enum AccomodationEnum {
  ROOM = 'ROOM',
  TEEPEE = 'TEEPEE',
  TENT = 'TENT'
}

export namespace AccomodationEnum {
  export const accomodationOptions: IOption[] = [
    { key: AccomodationEnum.ROOM, value: 'Vyžaduji ubytování' },
    { key: AccomodationEnum.TEEPEE, value: 'Chci spát v teepee' },
    { key: AccomodationEnum.TENT, value: 'Přivezu si stan' }
  ];

  export const accomodationMap = accomodationOptions.reduce((prev, curr) => {
    prev[curr.key] = curr.value;
    return prev;
  }, {});
}
