import * as React from 'react';

import cx from 'clsx';

import { useAppFrame } from '../../../../providers';
import { Badge } from '../../../Badge';
import { Tooltip } from '../../../Tooltip';

import { INavigationItemProps } from './types';

import styles from './NavigationItem.module.scss';

const baseClass = 'navigation-item';

const getBadge = (badge: 'dot' | 'alert' | number, id: string) => {
  if (typeof badge === 'number') {
    return (
      <Badge
        data-testid={`${id}-badge-count`}
        className={styles[`${baseClass}__badge`]}
        size="compact"
        count={badge}
      />
    );
  }

  return (
    <Badge
      data-testid={`${id}-badge`}
      className={styles[`${baseClass}__badge`]}
      size="compact"
      type={badge}
    />
  );
};

export const NavigationItem: React.FC<INavigationItemProps> = ({
  id,
  label,
  icon,
  url,
  disableOpacity,
  disabled = false,
  badge,
  isActive,
  onClick,
  className,
  ...props
}) => {
  const { isMobileViewEnabled } = useAppFrame();

  return (
    <li
      key={id}
      className={cx(
        styles[baseClass],
        {
          [styles[`${baseClass}--disabled`]]: disabled,
        },
        className
      )}
    >
      <Tooltip
        floatingStrategy="fixed"
        placement="right"
        kind="invert"
        isVisible={
          isMobileViewEnabled || !label || disabled ? false : undefined
        }
        offsetMainAxis={12}
        hoverOnDelay={400}
        useClickHookProps={{ ignoreMouse: true }}
        useDismissHookProps={{
          referencePress: true,
          referencePressEvent: 'click',
        }}
        triggerRenderer={
          <>
            <a
              tabIndex={disabled ? -1 : 0}
              aria-label={label}
              className={cx(
                styles[`${baseClass}__button`],
                {
                  [styles[`${baseClass}__button--active`]]: isActive,
                  [styles[`${baseClass}__button--opacity`]]: disableOpacity,
                  [styles[`${baseClass}__button--disabled`]]: disabled,
                  [styles[`${baseClass}__button--mobile`]]: isMobileViewEnabled,
                },
                'lc-dark-theme'
              )}
              onClick={(e) => !disabled && onClick(e, id)}
              href={url}
              {...props}
            >
              {icon}
              {isMobileViewEnabled && label}
            </a>
            {badge && getBadge(badge, id)}
          </>
        }
      >
        {label}
      </Tooltip>
    </li>
  );
};
