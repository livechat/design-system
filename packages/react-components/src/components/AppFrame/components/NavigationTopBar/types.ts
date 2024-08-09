import * as React from 'react';

import { ButtonProps } from 'components/Button';
import { ComponentCoreProps } from 'utils/types';

export type NavigationTopBarKind = 'info' | 'success' | 'warning' | 'error';

export interface INavigationTopBarProps extends ComponentCoreProps {
  /**
   * Contents of the top bar. You can use the `NavigationTopBar.Alert` component to display alerts.
   */
  children?: React.ReactNode;

  /**
   * Ńodes placed under the children.
   */
  additionalNodes?: React.ReactNode;
}

export interface ITopBarTitleProps extends ComponentCoreProps {
  /**
   * Content of the title.
   */
  children: React.ReactNode;
}

type CTAProps = {
  label: string;
  onClick: () => void;
} & Omit<ButtonProps, 'onClick' | 'children'>;
export interface ITopBarAlertProps extends ComponentCoreProps {
  /**
   * Visual style of the alert. You can also use `className` to style the alert if you need to set a custom background color.
   * Defaults to `info`.
   * */
  kind?: NavigationTopBarKind;
  /**
   * Properties of the close button. If defined, the alert will be closable and the close button will be rendered.
   * aria-label is highly recommended for accessibility.
   * */
  closeButton?: {
    onClick: () => void;
    'data-testid'?: string;
    'aria-label'?: string;
  };
  /**
   * Content of the alert.
   */
  children: React.ReactNode;

  /**
   * Primary CTA button. The button will be rendered if defined.
   * Allows ButtonProps, but `children` is recommended for more complex use-cases.
   * */
  primaryCta?: CTAProps;

  /**
   * Secondary CTA button. The button will be rendered if defined.
   * Allows ButtonProps, but `children` is recommended for more complex use-cases.
   * */
  secondaryCta?: CTAProps;

  /**
   * Show or hide the alert, defaults to `true`. Changes to this prop are animated - the alert will enter and leave smoothly.
   * */
  isVisible?: boolean;
}
