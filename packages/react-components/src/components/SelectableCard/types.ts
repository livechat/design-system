import * as React from 'react';

import { ComponentCoreProps } from '../../utils/types';

export interface ISelectableCardCoreProps extends ComponentCoreProps {
  /**
   * The CSS class name for card content
   */
  contentClassName?: string;
  /**
   * Set the selection type of the card
   */
  selectionType: 'radio' | 'checkbox';
  /**
   * Set the card selection state
   */
  isSelected?: boolean;
  /**
   * Set the card onClick handler
   */
  onClick: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export interface ISelectableCardProps extends ISelectableCardCoreProps {
  /**
   * Set the card type
   */
  kind?: 'thumbnail' | 'gallery' | 'interactive';
}
