import * as React from 'react';

export interface ISubNavBarProps {
  /**
   * It will display the title of the sub navigation bar
   */
  title?: string;
  /**
   * It will display the custom element as title of the sub navigation bar
   */
  customHeader?: React.ReactNode;
  /**
   * Specify whether the gaps between elements should be removed
   */
  noGaps?: boolean;
  /**
   * It will display the custom element on the right side of the sub navigation bar title
   */
  rightNode?: React.ReactNode;
}

export interface ISubNavBarListProps {
  children: React.ReactNode;
  label?: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
  rightNode?: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
  className?: string;
  isCollapsible?: boolean;
  onItemHover?: () => void;
  shouldOpenOnInit?: boolean;
  shouldOpenOnActive?: boolean;
}

export interface ISubNavBarListItemProps {
  label: React.ReactNode;
  rightNode?: React.ReactNode;
  icon?: React.ReactNode;
  shouldKeepIconSpace?: boolean;
  url?: string;
  className?: string;
  isActive?: boolean;
  isMainEntry?: boolean;
  onClick: () => void;
  onItemHover?: () => void;
  isIconHidden?: boolean;
}
