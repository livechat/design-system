import * as React from 'react';

import { IPickerListItem } from '../../Picker';

import { AutoCompleteProps, IAutoCompleteListItem } from './types';

export const areAllOptionsStrings = (
  options: AutoCompleteProps['options']
): options is string[] => typeof options[0] === 'string'; // Assumption (backed by TS): if o[0] is a string, the rest are too.

export const buildOptionsFromStrings = (options: string[]): IPickerListItem[] =>
  options.map((option) => ({ name: option, key: option }));

export const buildOptionsFromAutoCompleteListItems = (
  options: IAutoCompleteListItem[]
): IPickerListItem[] =>
  options.map(({ customElement, name, ...rest }) => ({
    name,
    key: name,
    ...(customElement && {
      customElement: {
        listItemBody: customElement,
        selectedItemBody: <></>,
      },
    }),
    ...rest,
  }));

export const getFilteredPickerItems = (
  items: IPickerListItem[],
  single: boolean,
  hideIfExactMatch: boolean,
  inputValue: string
): IPickerListItem[] => {
  const isExactMatch = items.length === 1 && items[0].name === inputValue;
  const shownItems = single ? items.slice(0, 1) : items;

  return hideIfExactMatch && isExactMatch ? [] : shownItems;
};
