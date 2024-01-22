export type Size = 'compact' | 'medium' | 'large';

export interface ComponentCoreProps {
  /**
   * The CSS class name
   */
  className?: string;
  /**
   * Test id passed to the wrapper element
   */
  'data-testid'?: string;
}
