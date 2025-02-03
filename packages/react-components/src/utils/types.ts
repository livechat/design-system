import * as React from 'react';

export type Size = 'compact' | 'medium' | 'large';

export interface ComponentCoreProps {
  /**
   * The ID of the component
   */
  id?: string;
  /**
   * The children of the component
   */
  children?: React.ReactNode;
  /**
   * The CSS class name
   */
  className?: string;
  /**
   * The CSS properties for the component
   */
  style?: React.CSSProperties;
  /**
   * Test id passed to the wrapper element
   */
  'data-testid'?: string;
}
