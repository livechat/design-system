import * as React from 'react';

import { ComponentCoreProps } from '../../utils/types';

export interface IAppFrameProps extends ComponentCoreProps {
  /**
   * It will display your app in the content area
   */
  children: React.ReactNode;
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
  sideNavigationContainerClassName?: string;
  /**
   * The CSS class for the content container
   */
  contentClassName?: string;
}

export type { INavigationProps } from './components/Navigation/types';
export type { INavigationGroupProps } from './components/NavigationGroup/types';
export type { INavigationItemProps } from './components/NavigationItem/types';
export type { ISideNavigationProps } from './components/SideNavigation/types';
export type { ISideNavigationGroupProps } from './components/SideNavigationGroup/types';
export type { ISideNavigationItemProps } from './components/SideNavigationItem/types';
