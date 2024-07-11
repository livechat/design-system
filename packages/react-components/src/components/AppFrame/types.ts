import * as React from 'react';

export interface IAppFrameProps {
  /**
   * It will display your app in the content area
   */
  children: React.ReactNode;
  /**
   * The CSS class for the app frame
   */
  className?: string;
  /**
   * It will display navigation elements
   */
  navigation: React.ReactNode;
  /**
   * It will display the side navigation bar
   */
  sideNavigation?: React.ReactNode;
  /**
   * It will display the top bar with passed element
   */
  topBar?: React.ReactNode;
  /**
   * The CSS class for the top bar
   */
  topBarClassName?: string;
  /**
   * The CSS class for the sub navigation bar
   */
  sideNavigationClassName?: string;
  /**
   * The CSS class for the content container
   */
  contentClassName?: string;
}

export type {
  INavigationListProps,
  INavigationItemProps,
  INavigationProps,
} from './components/Navigation/types';
export type {
  ISideNavigationProps,
  ISideNavigationListProps,
  ISideNavigationItemProps,
} from './components/SideNavigation/types';
