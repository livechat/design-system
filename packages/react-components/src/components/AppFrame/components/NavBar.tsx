import * as React from 'react';

import cx from 'clsx';

import { Badge } from '../../Badge';
import { Button } from '../../Button';
import { Tooltip } from '../../Tooltip';
import { INavBarOption, INavBarProps } from '../types';

import styles from './NavBar.module.scss';

const baseClass = 'nav-bar';
const listBaseClass = `${baseClass}__list`;

export const NavBar: React.FC<INavBarProps> = ({
  className,
  navBarOptions,
  activeOptionKey,
  bottomNavBarOptions,
}) => {
  const getBadge = (badge: 'dot' | 'alert' | number) => {
    if (typeof badge === 'number') {
      return (
        <Badge
          className={styles[`${listBaseClass}__item__badge`]}
          size="compact"
          count={badge}
        />
      );
    }

    return (
      <Badge
        className={styles[`${listBaseClass}__item__badge`]}
        size="compact"
        type={badge}
      />
    );
  };

  const getOption = (o: INavBarOption) => (
    <li className={styles[`${listBaseClass}__item`]}>
      <Tooltip
        key={o.key}
        placement="right"
        kind="invert"
        isVisible={o.disableTooltip ? false : undefined}
        offsetMainAxis={12}
        hoverOnDelay={400}
        triggerRenderer={
          <>
            <Button
              aria-label={o.label}
              className={cx(styles[`${listBaseClass}__item__button`], {
                [styles[`${listBaseClass}__item__button--active`]]:
                  o.key === activeOptionKey,
                [styles[`${listBaseClass}__item__button--opacity`]]:
                  o.disableOpacity,
              })}
              kind="plain"
              icon={o.icon}
              onClick={o.onClick}
              href={o.href}
            />
            {o.badge && getBadge(o.badge)}
          </>
        }
      >
        {o.label}
      </Tooltip>
    </li>
  );

  return (
    <div role="navigation" className={cx(styles[baseClass], className)}>
      <ul className={styles[listBaseClass]}>
        {navBarOptions.map((o) => getOption(o))}
      </ul>
      {bottomNavBarOptions && (
        <ul
          className={cx(
            styles[listBaseClass],
            styles[`${listBaseClass}--bottom`]
          )}
        >
          {bottomNavBarOptions.map((o) => getOption(o))}
        </ul>
      )}
    </div>
  );
};
