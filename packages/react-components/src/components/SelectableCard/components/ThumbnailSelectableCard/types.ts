import * as React from 'react';

import { ISelectableCardCoreProps } from '../../types';

export interface IThumbnailSelectableCardProps
  extends Omit<ISelectableCardCoreProps, 'children'> {
  /**
   * The label of the card
   */
  label: string;
  /**
   * The description of the card
   */
  description?: string;
  /**
   * The icon of the card
   */
  icon?: React.ReactNode;
  /**
   * The custom element of the card
   */
  customElement?: React.ReactNode;
}
