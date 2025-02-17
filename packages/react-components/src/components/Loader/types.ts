import * as React from 'react';

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Specify the loader size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Specify the loader label
   */
  label?: string;
  /**
   * Set the loader highlight color
   */
  primaryColor?: string;
  /**
   * Set the loader color
   */
  secondaryColor?: string;
}
