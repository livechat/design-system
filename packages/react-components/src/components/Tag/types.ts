import * as React from 'react';

import { kinds, sizes } from './constants';

export type TagKind = (typeof kinds)[number];

export type TagSize = (typeof sizes)[number];

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Specify the tag kind
   */
  kind?: TagKind;
  /**
   * Specify the tag size
   */
  size?: TagSize;
  /**
   * Set the tag custom color
   */
  customColor?: string;
  /**
   * Set to show close icon
   * @deprecated The close icon will be visible by providing the `onRemove` prop and this flag will no longer be needed
   */
  dismissible?: boolean;
  /**
   * Set to show close icon on hover only if the `onRemove` prop is provided
   */
  dismissibleOnHover?: boolean;
  /**
   * Set to hide close icon if the `onRemove` prop is provided
   */
  disabled?: boolean;
  /**
   * Outlined version of tag
   */
  outline?: boolean;
  /**
   * The event handler for close icon click, if provided the close icon will be visible
   */
  onRemove?(e: React.MouseEvent): void;
  /**
   * React node element to show on the left
   */
  leftNode?: React.ReactElement;
  /**
   * React node element to show on the right
   */
  rightNode?: React.ReactElement;
  /**
   * Set to show the tag as square (only if you want use icon without text)
   */
  iconOnly?: boolean;
  /**
   * Set text value for the tag
   */
  value?: string;
}
