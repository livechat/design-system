import * as React from 'react';

import { ComponentCoreProps } from '../../../../utils/types';

export interface ISideNavigationGroupProps extends ComponentCoreProps {
  /**
   * It will display your side navigation elements
   */
  children: React.ReactNode;
  /**
   * The label of the side navigation list
   */
  label?: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
  /**
   * The right node of the side navigation list
   */
  rightNode?: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
  /**
   * Specify whether the list should be collapsible
   */
  isCollapsible?: boolean;
  /**
   * The function to call on item hover
   */
  onItemHover?: () => void;
  /**
   * Specify whether the list should be open on the first render
   */
  shouldOpenOnInit?: boolean;
  /**
   * The CSS class name for the label
   */
  labelClassName?: string;
  /**
   * The CSS class name for the label wrapper
   */
  labelWrapperClassName?: string;
}
