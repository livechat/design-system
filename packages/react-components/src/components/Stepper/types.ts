import * as React from 'react';

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Current active step (1-based)
   */
  activeStep: number;
  /**
   * Total number of steps
   */
  steps: number;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Optional test id for testing
   */
  'data-testid'?: string;
}
