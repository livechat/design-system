import * as React from 'react';

import { ComponentCoreProps } from '../../utils/types';

export interface ISystemMessageProps extends ComponentCoreProps {
  /**
   * Children to display in the system message - will be displayed as title
   */
  children: React.ReactNode;

  /**
   * Icon to display in the system message
   */
  icon?: React.ReactNode;

  /**
   * Details text for the system message
   */
  details?: string;

  /**
   * Timestamp for the system message
   */
  timestamp?: string;

  /**
   * Timestamp with seconds for the system message
   */
  timestampWithSeconds?: string;
}
