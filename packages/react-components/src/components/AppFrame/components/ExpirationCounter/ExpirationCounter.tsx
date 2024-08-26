import * as React from 'react';

import cx from 'clsx';

import { plural } from '../../../../utils/plural';
import { ComponentCoreProps } from '../../../../utils/types';

import styles from './ExpirationCounter.module.scss';

const baseClass = 'expiration-counter';

export interface IExpirationCounterProps extends ComponentCoreProps {
  /**
   * The ID of the item
   */
  id: string;
  /**
   * The number of days left
   */
  daysLeft: number;
  /**
   * The URL to navigate to
   */
  url?: string;
  /**
   * The function to call on click
   */
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}

export const ExpirationCounter: React.FC<IExpirationCounterProps> = ({
  id,
  daysLeft,
  url,
  onClick,
  className,
  ...props
}) => (
  <li key={id} className={cx(styles[baseClass], className)}>
    <a
      tabIndex={0}
      href={url}
      onClick={(e) => onClick(e, id)}
      className={styles[`${baseClass}__button`]}
      {...props}
    >
      <span className={styles[`${baseClass}__button__number`]}>{daysLeft}</span>
      <span className={styles[`${baseClass}__button__label`]}>
        {plural(daysLeft, 'day', 'days')}
      </span>
    </a>
  </li>
);
