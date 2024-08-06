import * as React from 'react';

import { Close } from '@livechat/design-system-icons';
import cx from 'clsx';

import { Button } from '../../../Button';
import { Icon } from '../../../Icon';
import { useAppFrameAnimations } from '../../hooks/useAppFrameAnimations';

import { INavigationTopBarProps, ITopBarAlertProps } from './types';

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
}: INavigationTopBarProps): React.ReactElement => {
  return <div className={styles[baseClass]}>{children}</div>;
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
  show = true,
}) => {
  const alertRef = React.useRef<HTMLDivElement>(null);
  const { isMounted, isOpen } = useAppFrameAnimations({
    isVisible: show,
    elementRef: alertRef,
  });

  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  const secondaryCtaKind = kind === 'warning' ? 'link-inverted' : 'text';
  const primaryCtaKind = kind === 'warning' ? 'secondary' : 'high-contrast';

  const Ctas =
    primaryCta || secondaryCta ? (
      <div className={styles[`${alertClass}__cta-wrapper`]}>
        {primaryCta && (
          <Button
            size="compact"
            onClick={primaryCta.onClick}
            kind={isMobile ? secondaryCtaKind : primaryCtaKind}
          >
            {primaryCta.label}
          </Button>
        )}
        {secondaryCta && (
          <Button
            size="compact"
            onClick={secondaryCta.onClick}
            kind={secondaryCtaKind}
          >
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
          className={cx(styles[`${alertClass}__wrapper`], {
            [styles[`${alertClass}__wrapper--open`]]: isOpen,
          })}
        >
          <div
            data-testid="navigation-top-bar-alert"
            className={cx(
              className,
              styles[alertClass],
              styles[`${alertClass}--${kind}`],
              {
                [styles[`${alertClass}--open`]]: isOpen,
              }
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
