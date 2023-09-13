import * as React from 'react';

export interface IActionMenuOption {
  key: string;
  element: React.ReactNode;
  groupHeader?: boolean;
  disabled?: boolean;
  withDivider?: boolean;
  onClick?: () => void;
}
