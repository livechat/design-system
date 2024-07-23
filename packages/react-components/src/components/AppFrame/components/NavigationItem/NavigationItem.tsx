import * as React from 'react';

import cx from 'clsx';

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
  disableTooltip,
  disableOpacity,
  badge,
  isActive,
  onClick,
  className,
  ...props
}) => (
  <li key={id} className={cx(styles[baseClass], className)}>
    <Tooltip
      floatingStrategy="fixed"
      placement="right"
      kind="invert"
      isVisible={disableTooltip ? false : undefined}
      offsetMainAxis={12}
      hoverOnDelay={400}
      triggerRenderer={
        <>
          <a
            aria-label={label}
            className={cx(
              styles[`${baseClass}__button`],
              {
                [styles[`${baseClass}__button--active`]]: isActive,
                [styles[`${baseClass}__button--opacity`]]: disableOpacity,
              },
              'lc-dark-theme'
            )}
            onClick={(e) => onClick(e, id)}
            href={url}
            {...props}
          >
            {icon}
          </a>
          {badge && getBadge(badge, id)}
        </>
      }
    >
      {label}
    </Tooltip>
  </li>
);
