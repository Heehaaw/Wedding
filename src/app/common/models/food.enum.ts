import { IOption } from './option.interface';

export enum FoodEnum {
  ALL = 'ALL',
  VEGAN = 'VEGAN'
}

export namespace FoodEnum {
  export const foodOptions: IOption[] = [
    { key: FoodEnum.ALL, value: 'I will eat anything' },
    { key: FoodEnum.VEGAN, value: 'Vegan' }
  ];

  export const foodMap = foodOptions.reduce((prev, curr) => {
    prev[curr.key] = curr.value;
    return prev;
  }, {});
}
