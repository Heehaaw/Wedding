import { IOption } from './option.interface';

export enum DrinkEnum {
  BEER = 'BEER',
  WINE = 'WINE',
  BOOZE = 'BOOZE',
  NOALCO = 'NOALCO'
}

export namespace DrinkEnum {
  export const drinkOptions: IOption[] = [
    { key: DrinkEnum.BEER, value: 'Pivo' },
    { key: DrinkEnum.WINE, value: 'Víno' },
    { key: DrinkEnum.BOOZE, value: 'Kořalka' },
    { key: DrinkEnum.NOALCO, value: 'Nealko' }
  ];

  export const drinkMap = drinkOptions.reduce((prev, curr) => {
    prev[curr.key] = curr.value;
    return prev;
  }, {});
}
