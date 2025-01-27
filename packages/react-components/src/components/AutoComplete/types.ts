import * as React from 'react';

import { Placement, Strategy } from '@floating-ui/react';

import { IInputProps } from '../Input/types';
import { IPickerListItem } from '../Picker';

// selectedItemBody is unnecessary for AutoCompleteListItem, key should be === name
export type IAutoCompleteListItem = Omit<
  IPickerListItem,
  'key' | 'customElement'
> & {
  customElement?: React.ReactElement;
};

export interface AutoCompleteProps extends Omit<IInputProps, 'type'> {
  /** Options that will be displayed in the picker. If they are strings, they will be converted to `IPickerListItem[]`*/
  options?: string[] | IAutoCompleteListItem[];
  /** If true, disables filtering of the options. Useful for getting options from an external source.*/
  alwaysShowAllOptions?: boolean;
  /** If true, the autocomplete list will be open when the component mounts.*/
  autocompleteOpenOnInit?: boolean;
  /** Minimum height of the list */
  minListHeight?: number;
  /** Maximum height of the list */
  maxListHeight?: number;
  /** Placement of the list */
  placement?: Placement;
  /** Floating strategy */
  floatingStrategy?: Strategy;
  /** Type of the input. If true, only shows one matching item. */
  single?: boolean;
  /** If true, the option list will be hidden if there is only one option and it is an exact match to the input value. */
  hideIfExactMatch?: boolean;
  /** Text to display if there is no data */
  noDataFallbackText?: string;
}
