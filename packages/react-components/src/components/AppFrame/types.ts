import * as React from 'react';

export interface INavBarListProps {
  className?: string;
}

export interface INavBarOption {
  label: string;
  icon: React.ReactElement;
  href: string;
  disableTooltip?: boolean;
  disableOpacity?: boolean;
  badge?: 'dot' | 'alert' | number;
  isActive?: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface IAppFrameProps {
  children: React.ReactNode;
  className?: string;
  topNavBarNode?: React.ReactNode;
  bottomNavBarNode?: React.ReactNode;
  subNavBar?: React.ReactNode;
  topBarNode?: React.ReactNode;
  navigationClassName?: string;
  topBarClassName?: string;
  subNavigationClassName?: string;
  contentClassName?: string;
}

export interface INavBarProps {
  className?: string;
  topNavBarNode?: React.ReactNode;
  bottomNavBarNode?: React.ReactNode;
}

export interface ISubNavBarProps {
  title?: string;
  customHeader?: React.ReactNode;
  noGaps?: boolean;
  rightNode?: React.ReactNode;
}

export interface ISubNavBarListProps {
  children: React.ReactNode;
  label?: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
  rightNode?: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
  className?: string;
  isCollapsible?: boolean;
  onItemHover?: () => void;
  // tourStep?: ISideNavigationItem['tourStep'];
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
  // tourStep?: ISideNavigationItem['tourStep'];
}
