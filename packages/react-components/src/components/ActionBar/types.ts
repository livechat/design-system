import * as React from 'react';

export interface IActionBarProps {
  /**
   * The CSS class for menu container
   */
  className?: string;
  /**
   * The unique id key
   */
  id?: string;
  /**
   * Array of action bar options
   */
  options: IActionBarOption[];
  /**
   * Set the key for active element
   */
  activeOptionKey?: string;
  /**
   * Set 'scroll' to disable menu and enable scroll
   */
  type?: 'menu' | 'scroll';
  /**
   * Set the bar buttons verticaly
   */
  vertical?: boolean;
  /**
   * Optional element that will be placed at the bottom of the menu
   */
  menuFooter?: React.ReactNode;
}

export interface IActionBarOption {
  key: string;
  element: React.ReactElement;
  label: string;
  showTooltip?: boolean;
  hideInMenu?: boolean;
  onClick: () => void;
}

export interface IActionBarItem {
  id: string;
  option: IActionBarOption;
  menuItemsKeys: string[];
  isActive?: boolean;
  vertical?: boolean;
}
