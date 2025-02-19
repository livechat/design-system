import * as React from 'react';

import { ButtonProps, ButtonKind } from '../Button';

type OldButtonProps = {
  handleClick: () => void;
  label: string;
  kind?: ButtonKind;
};

export interface IPromoBannerV2Props {
  /**
   * Specify an optional className to be applied to the main container node
   */
  className?: string;
  /**
   * Element with additional content for second column
   */
  additionalContent?: React.ReactNode;
  /**
   * Shows the primary CTA button
   */
  primaryButton?: OldButtonProps & ButtonProps;
  /**
   * Shows the secondary CTA button
   */
  secondaryButton?: OldButtonProps & ButtonProps;
  /**
   * Set to true to display the banner vertically
   */
  vertical?: boolean;
  /**
   * Specify an optional className to be applied to the content node
   */
  contentClassName?: string;
  /**
   * Specify an optional className to be applied to the additional content node
   */
  additionalContentClassName?: string;
  /**
   * Event handler for close button press
   */
  onClose?: () => void;
  /**
   * Specify the kind of PromoBannerV2
   * @default 'default'
   */
  kind?: 'default' | 'dark';
}
