import * as React from 'react';

import { IUseAnimations } from '../../../../hooks/useAnimations';
import { ComponentCoreProps } from '../../../../utils/types';

interface IOnClickProps {
  toggle: () => void;
}

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
   * Specify whether the label is a link
   */
  isLinkLabel?: boolean;
  /**
   * Specify whether the list label is active
   */
  isActive?: boolean;
  /**
   * Specify whether the list is open
   */
  isOpen?: IUseAnimations['isOpen'];
  /**
   * Specify whether the list is mounted
   */
  isMounted?: IUseAnimations['isMounted'];
  /**
   * Set whether the list should be visible
   */
  setShouldBeVisible?: IUseAnimations['setShouldBeVisible'];
  /**
   * The function to call on list label click
   */
  onClick?: ({ toggle }: IOnClickProps) => void;
  /**
   * The function to call on item hover
   */
  onItemHover?: () => void;
  /**
   * The ref of the list wrapper
   */
  listWrapperRef?: React.RefObject<HTMLDivElement>;
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
  /**
   * The CSS class name for the list wrapper
   */
  listWrapperClassName?: string;
}
