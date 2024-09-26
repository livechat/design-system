import * as React from 'react';

export type Size = 'compact' | 'medium' | 'large';

export interface ComponentCoreProps {
  /**
   * Custom style for the avatar
   */
  style?: React.CSSProperties;
  /**
   * The CSS class name
   */
  className?: string;
  /**
   * Test id passed to the wrapper element
   */
  'data-testid'?: string;
}
