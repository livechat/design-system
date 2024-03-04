import * as React from 'react';

import { TagProps } from '../Tag';

export interface TagInputProps<T>
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'onChange'
  > {
  /**
   * Set the id for input
   */
  id?: string;
  /**
   * Set the error message
   */
  error?: string;
  /**
   * Array of defined tags
   */
  tags?: T[];
  /**
   * The event handler for modify tags array
   */
  onChange: (tags: T[]) => void;
  /**
   * Set the input placeholder
   */
  placeholder?: string;
  /**
   * Set the custom validation for provided items
   */
  validator?: (val: string) => boolean;
  /**
   * Specify the input size
   */
  size?: 'medium' | 'large';
  /**
   * Set the input custom class
   */
  inputClassName?: string;
  /**
   * Add Tag on blur
   */
  addOnBlur?: boolean;
}

export type TagInputValues = string | TagProps;
