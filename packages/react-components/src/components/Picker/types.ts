import { ReactElement } from 'react';

import { Strategy, UseClickProps, UseDismissProps } from '@floating-ui/react';
import { VirtuosoProps } from 'react-virtuoso';

import { Size } from '../../utils';
import { ComponentCoreProps } from '../../utils/types';
import { IconSource } from '../Icon';

export interface IPickerListItem {
  key: string;
  name: string;
  customElement?: {
    listItemBody: ReactElement;
    selectedItemBody: ReactElement;
  };
  groupHeader?: boolean;
  disabled?: boolean;
  icon?: IconSource;
  avatarSrc?: string;
  secondaryText?: string;
  showCheckbox?: boolean;
}

export type PickerType = 'single' | 'multi';

export interface IPickerProps extends ComponentCoreProps {
  /**
   * Specify the custom id
   */
  id?: string;
  /**
   * The CSS class for picker container
   */
  className?: string;
  /**
   * The CSS class for picker list
   */
  listClassName?: string;
  /**
   * Specify whether the picker should be disabled
   */
  disabled?: boolean;
  /**
   * Specify whether the picker should be in error state
   */
  error?: boolean;
  /**
   * Array of picker options
   */
  options: IPickerListItem[];
  /**
   * Array of picker selected options
   */
  selected?: IPickerListItem[] | null;
  /**
   * Specify the picker size
   */
  size?: Size;
  /**
   * Specify the placeholder for search input
   */
  placeholder?: string;
  /**
   * Specify whether the option select is required
   */
  isRequired?: boolean;
  /**
   * Text if no search result were found
   */
  noSearchResultText?: string;
  /**
   * Text for `select all` option which will be visible if defined in multi select mode
   */
  selectAllOptionText?: string;
  /**
   * Set `multi` to specify whether the picker should allow to multi selection
   */
  type?: PickerType;
  /**
   * Set to disable search input
   */
  searchDisabled?: boolean;
  /**
   * Set to hide clear selection button
   */
  hideClearButton?: boolean;
  /**
   * Will open picker on component initialization
   */
  openedOnInit?: boolean;
  /**
   * Callback called after item selection
   */
  onSelect: (selectedItems: IPickerListItem[] | null) => void;
  /**
   * Clears the search input after item select
   */
  clearSearchAfterSelection?: boolean;
  /**
   * Floating strategy for the picker component from @floating-ui/react
   */
  floatingStrategy?: Strategy;
  /**
   * Set the `floating-ui` useDismiss hook params if you need more control
   * https://floating-ui.com/docs/usedismiss
   */
  useDismissHookProps?: UseDismissProps;
  /**
   * Set the `floating-ui` useClick hook params if you need more control
   * https://floating-ui.com/docs/useclick
   */
  useClickHookProps?: UseClickProps;
  /**
   * Props for the Virtuoso component
   * https://virtuoso.dev/virtuoso-api-reference/
   */
  virtuosoProps?: VirtuosoProps<IPickerListItem, unknown>;
}
