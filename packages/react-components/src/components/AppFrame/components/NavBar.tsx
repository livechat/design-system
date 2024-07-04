import * as React from 'react';

import cx from 'clsx';

import { Button } from '../../Button';
import { Tooltip } from '../../Tooltip';
import { INavBarProps } from '../types';

import styles from './NavBar.module.scss';

const baseClass = 'nav-bar';

export const NavBar: React.FC<INavBarProps> = ({
  navBarOptions,
  activeOptionKey,
}) => {
  return (
    <ul role="navigation" className={styles[baseClass]}>
      {navBarOptions.map((o) => (
        <Tooltip
          key={o.key}
          placement="right"
          kind="invert"
          isVisible={o.disableTooltip ? false : undefined}
          offsetMainAxis={12}
          hoverOnDelay={400}
          triggerRenderer={
            <li>
              <Button
                aria-label={o.label}
                className={cx(styles[`${baseClass}__button`], {
                  [styles[`${baseClass}__button--active`]]:
                    o.key === activeOptionKey,
                })}
                kind="plain"
                icon={o.icon}
                onClick={o.onClick}
                href={o.href}
              />
            </li>
          }
        >
          {o.label}
        </Tooltip>
      ))}
    </ul>
  );
};
