import * as React from 'react';

import { Close } from '@livechat/design-system-icons';
import cx from 'clsx';

import { useAnimations } from '../../../../hooks';
import { Button } from '../../../Button';
import { Icon } from '../../../Icon';

import {
  INavigationTopBarProps,
  ITopBarAlertProps,
  ITopBarTitleProps,
} from './types';

import styles from './NavigationTopBar.module.scss';
const baseClass = 'navigation-top-bar';
const alertClass = `${baseClass}__alert`;

/**
 * NavigationTopBar is used to display a top bar in the app frame - mostly to display alerts, but arbitrary content can be placed there too.
 * @example
 * <NavigationTopBar>
 *     <NavigationTopBar.Alert kind="error">
 *       Something went wrong
 *     </NavigationTopBar.Alert>
 * </NavigationTopBar>
 */
export const NavigationTopBar = ({
  children,
  className,
  additionalNodes,
}: INavigationTopBarProps): React.ReactElement => {
  return (
    <div className={cx(styles[baseClass], className)}>
      {children}
      {additionalNodes}
    </div>
  );
};
/**
 * Title component for the NavigationTopBar. Supposed to be placed in the `additionalNodes` prop of the NavigationTopBar.
 * @example
 * <NavigationTopBar additionalNodes={<NavigationTopBar.Title>Example top bar content</NavigationTopBar.Title>}>
 * </NavigationTopBar>
 */
export const NavigationTopBarTitle: React.FC<ITopBarTitleProps> = ({
  children,
  className,
  'data-testid': dataTestId,
}) => {
  return (
    <div
      className={cx(styles[`${baseClass}__title`], className)}
      data-testid={dataTestId}
    >
      {children}
    </div>
  );
};

/**
 * Alert component for the NavigationTopBar.
 * @example
 * <NavigationTopBar>
 *    <NavigationTopBar.Alert kind="error" show={!!error}>
 *     Something went wrong
 *   </NavigationTopBar.Alert>
 * </NavigationTopBar>
 * @example
 * <NavigationTopBar>
 *     <NavigationTopBarAlert
 *      kind="warning"
 *      primaryCta={{ label: 'Save', onClick: () => console.log('Save clicked') }}
 *      secondaryCta={{ label: 'Discard', onClick: () => console.log('Discard clicked') }}
 *      closeButton={{ onClick: () => console.log('Close clicked') }}
 *      show={!hasUnsavedChanges && !hasClosedAlert}
 *      >
 *      You have unsaved changes
 *     </NavigationTopBarAlert>
 * </NavigationTopBar>
 **/
export const NavigationTopBarAlert: React.FC<ITopBarAlertProps> = ({
  className,
  kind = 'info',
  closeButton,
  children,
  primaryCta,
  secondaryCta,
  isVisible = true,
}) => {
  const alertRef = React.useRef<HTMLDivElement>(null);
  const { isMounted, isOpen } = useAnimations({
    isVisible,
    elementRef: alertRef,
  });

  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  const secondaryCtaKind = kind === 'warning' ? 'link-inverted' : 'text';
  const primaryCtaKind =
    kind === 'warning' ? 'plain-lock-black' : 'high-contrast';

  const Ctas =
    primaryCta || secondaryCta ? (
      <div className={styles[`${alertClass}__cta-wrapper`]}>
        {primaryCta && (
          <Button
            size="compact"
            kind={isMobile ? secondaryCtaKind : primaryCtaKind}
            {...primaryCta}
          >
            {primaryCta.label}
          </Button>
        )}
        {secondaryCta && (
          <Button size="compact" kind={secondaryCtaKind} {...secondaryCta}>
            {secondaryCta.label}
          </Button>
        )}
      </div>
    ) : null;

  const Children = (
    <>
      <div className={styles[`${alertClass}__children-wrapper`]}>
        {children}
        {Ctas}
      </div>
      {closeButton && (
        <button
          className={styles[`${alertClass}__close-button`]}
          {...closeButton}
        >
          <Icon source={Close} />
        </button>
      )}
    </>
  );

  return (
    <>
      {isMounted && (
        <div
          className={cx(
            styles[`${alertClass}__wrapper`],
            {
              [styles[`${alertClass}__wrapper--open`]]: isOpen,
            },
            'lc-dark-theme' // Alerts are forced into dark mode to maintain consistency of the colors
          )}
          ref={alertRef}
          role="status"
        >
          <div
            data-testid="navigation-top-bar-alert"
            className={cx(
              styles[alertClass],
              styles[`${alertClass}--${kind}`],
              {
                [styles[`${alertClass}--open`]]: isOpen,
              },
              className
            )}
          >
            {Children}
          </div>
        </div>
      )}
    </>
  );
};

NavigationTopBar.Alert = NavigationTopBarAlert;
NavigationTopBar.Title = NavigationTopBarTitle;
