import { SELECT_ALL_OPTION_KEY } from './constants';
import { IPickerListItem } from './types';

export const findIndicesWhere = <T>(
  array: T[],
  predicate: (item: T) => boolean
): number[] => {
  const indices: number[] = [];
  array.forEach((item, index) => {
    if (predicate(item)) {
      indices.push(index);
    }
  });

  return indices;
};

export const getNormalizedItems = (
  items: IPickerListItem[]
): IPickerListItem[] => {
  return items.filter(
    ({ key, disabled, groupHeader }) =>
      !(key === SELECT_ALL_OPTION_KEY || disabled || groupHeader)
  );
};

export const getPickerListItemKey = ({ key }: IPickerListItem): string => key;

export const getNewIndexes = (prev: string[], key: string): string[] => {
  return prev.includes(key) ? prev.filter((i) => i !== key) : [...prev, key];
};
