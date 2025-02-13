import type { InputHTMLAttributes } from 'react';

export interface ITimePickerProps
  extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * The id of the input element
   */
  id?: string;
  /**
   * The name of the input element
   */
  name?: string;
  /**
   * The minimum time that can be selected (format: hh:mm or hh:mm:ss)
   */
  min?: string;
  /**
   * The minimum time that can be selected (format: hh:mm or hh:mm:ss)
   */
  max?: string;
  /**
   * Whether the input is required
   */
  required?: boolean;
}
