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
  activeOptionKey?: string | null;
  /**
   * Set 'scroll' to disable menu and enable scroll
   */
  type?: 'menu' | 'scroll';
  /**
   * Set the bar buttons verticaly
   */
  vertical?: boolean;
}

export type IActionBarOption = {
  key: string;
  element: React.ReactElement;
  label: string;
  showTooltip?: boolean;
  onClick: () => void;
};

export interface IActionBarItem {
  option: IActionBarOption;
  menuItemsKeys: string[];
  activeOptionKey?: string | null;
  vertical?: boolean;
}
