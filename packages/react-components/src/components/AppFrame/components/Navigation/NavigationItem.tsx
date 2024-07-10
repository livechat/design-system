import * as React from 'react';

import cx from 'clsx';

import { Badge } from '../../../Badge';
import { Tooltip } from '../../../Tooltip';

import { INavigationItemProps } from './types';

import styles from './NavigationItem.module.scss';

const baseClass = 'navigation-item';

export const NavigationItem: React.FC<INavigationItemProps> = ({
  id,
  label,
  icon,
  href,
  disableTooltip,
  disableOpacity,
  badge,
  isActive,
  onClick,
  ...props
}) => {
  const getBadge = (badge: 'dot' | 'alert' | number) => {
    if (typeof badge === 'number') {
      return (
        <Badge
          className={styles[`${baseClass}__badge`]}
          size="compact"
          count={badge}
        />
      );
    }

    return (
      <Badge
        className={styles[`${baseClass}__badge`]}
        size="compact"
        type={badge}
      />
    );
  };

  return (
    <li key={id} className={styles[baseClass]}>
      <Tooltip
        placement="right"
        kind="invert"
        isVisible={disableTooltip ? false : undefined}
        offsetMainAxis={12}
        hoverOnDelay={400}
        triggerRenderer={
          <>
            <a
              aria-label={label}
              className={cx(styles[`${baseClass}__button`], {
                [styles[`${baseClass}__button--active`]]: isActive,
                [styles[`${baseClass}__button--opacity`]]: disableOpacity,
              })}
              onClick={(e) => onClick(e, id)}
              href={href}
              {...props}
            >
              {icon}
            </a>
            {badge && getBadge(badge)}
          </>
        }
      >
        {label}
      </Tooltip>
    </li>
  );
};
