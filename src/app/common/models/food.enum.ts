import { IOption } from './option.interface';

export enum FoodEnum {
  ALL = 'ALL',
  VEGAN = 'VEGAN',
  OTHER = 'OTHER'
}

export namespace FoodEnum {
  export const foodOptions: IOption[] = [
    { key: FoodEnum.ALL, value: 'Zbaštím cokoli' },
    { key: FoodEnum.VEGAN, value: 'Vegan/vegetarián' },
    { key: FoodEnum.OTHER, value: 'Jiná úchylka' }
  ];

  export const foodMap = foodOptions.reduce((prev, curr) => {
    prev[curr.key] = curr.value;
    return prev;
  }, {});
}
