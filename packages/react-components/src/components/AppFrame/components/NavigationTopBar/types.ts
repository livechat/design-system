import * as React from 'react';

import { ComponentCoreProps } from 'utils/types';

export type NavigationTopBarKind = 'info' | 'success' | 'warning' | 'error';

export interface INavigationTopBarProps extends ComponentCoreProps {
  /**
   * Contents of the top bar. You can use the `NavigationTopBar.Alert` component to display alerts.
   */
  children: React.ReactNode;

  /**
   * Ńodes placed under the children. Optional
   */
  additionalNodes?: React.ReactNode;
}

export interface ITopBarTitleProps extends ComponentCoreProps {
  /**
   * Content of the title.
   */
  children: React.ReactNode;
}

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
   * Simple on purpose - if you need more complex buttons, you can use the `children` prop.
   * */
  primaryCta?: {
    label: string;
    onClick: () => void;
  };

  /**
   * Secondary CTA button. The button will be rendered if defined.
   * Simple on purpose - if you need more complex buttons, you can use the `children` prop.
   * */
  secondaryCta?: {
    label: string;
    onClick: () => void;
  };

  /**
   * Show or hide the alert, defaults to `true`. Changes to this prop are animated - the alert will enter and leave smoothly.
   * */
  isVisible?: boolean;
}
