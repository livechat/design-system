import * as React from 'react';

import { ComponentCoreProps } from '../../utils/types';
import { IconSource } from '../Icon';

export type SystemMessageKind =
  | 'info'
  | 'positive'
  | 'warning'
  | 'error'
  | 'default';

export type SystemMessageAction = {
  label: string;
  callback: () => void;
  icon?: IconSource;
};

export interface ISystemMessageProps extends ComponentCoreProps {
  /**
   * Children to display in the system message - will be displayed as title
   * If your title is 60 characters or more, please use a description line.
   */
  children: React.ReactNode;

  /**
   * Alignment of the system message
   */
  alignment?: 'left' | 'right';

  /**
   * Kind of the system message
   */
  kind?: SystemMessageKind;

  /**
   * Icon to display in the system message
   */
  iconSource?: IconSource;

  /**
   * Whether the title should be bold
   */
  titleBold?: boolean;

  /**
   * Source of the message
   */
  source?: string;

  /**
   * Details text for the system message
   */
  details?: string[];

  /**
   * Timestamp for the system message
   */
  timestamp?: string;

  /**
   * Timestamp with seconds for the system message
   */
  timestampWithSeconds?: string;

  /**
   * Actions to display in the system message
   */
  actions?: SystemMessageAction[];
}
