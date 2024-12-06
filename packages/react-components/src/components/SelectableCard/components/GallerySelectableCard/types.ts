import * as React from 'react';

import { ISelectableCardCoreProps } from '../../types';

export interface IGallerySelectableCardProps
  extends Omit<ISelectableCardCoreProps, 'children'> {
  /**
   * The label of the card
   */
  label?: string;
  /**
   * The icon of the card
   */
  icon?: React.ReactNode;
  /**
   * The custom element of the card
   */
  customElement?: React.ReactNode;
}
