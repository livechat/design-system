import * as React from 'react';

import { ComponentCoreProps } from '../../../../utils/types';

export interface INavigationProps extends ComponentCoreProps {
  /**
   * It will display your navigation elements
   */
  children: React.ReactNode;
}
