import * as React from 'react';

import { IconSource } from '../Icon';

export interface IPickerListItem {
  key: string;
  name: string;
  customElement?: {
    listItemBody: React.ReactElement;
    selectedItemBody: React.ReactElement;
  };
  groupHeader?: boolean;
  disabled?: boolean;
  icon?: IconSource;
  avatarSrc?: string;
  secondaryText?: string;
  showCheckbox?: boolean;
}

export type PickerType = 'single' | 'multi';
