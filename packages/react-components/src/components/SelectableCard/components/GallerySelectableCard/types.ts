import * as React from 'react';

import { ISelectableCardCoreProps } from '../../types';

type BaseProps = {
  /**
   * The label of the card
   */
  label?: string;
};

type WithIcon = BaseProps & {
  /**
   * The icon of the card
   */
  icon: React.ReactNode;
  /**
   * The custom element of the card
   */
  customElement?: never;
};

type WithCustomElement = BaseProps & {
  /**
   * The icon of the card
   */
  icon?: never;
  /**
   * The custom element of the card
   */
  customElement: React.ReactNode;
};

export type IGallerySelectableCardProps = (WithIcon | WithCustomElement) &
  Omit<ISelectableCardCoreProps, 'children'>;
