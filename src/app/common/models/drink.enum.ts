import { IOption } from './option.interface';

export enum DrinkOptions {
  BEER = 'BEER',
  WINE = 'WINE',
  NOALCO = 'NOALCO'
}

export namespace DrinkEnum {
  export const drinkOptions: IOption[] = [
    { key: 'BEER', value: 'Beer' },
    { key: 'WINE', value: 'Wine' },
    { key: 'NOALCO', value: 'Non-alcoholic' }
  ];

  export const drinkMap = drinkOptions.reduce((prev, curr) => {
    prev[curr.key] = curr.value;
    return prev;
  }, {});
}
