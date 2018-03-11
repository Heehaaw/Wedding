import { IOption } from './option.interface';

export enum AccomodationEnum {
  ROOM = 'ROOM',
  TENT = 'TENT'
}

export namespace AccomodationEnum {
  export const accomodationOptions: IOption[] = [
    { key: 'ROOM', value: 'I need a room' },
    { key: 'TENT', value: 'I will bring a tent' }
  ];

  export const accomodationMap = accomodationOptions.reduce((prev, curr) => {
    prev[curr.key] = curr.value;
    return prev;
  }, {});
}
