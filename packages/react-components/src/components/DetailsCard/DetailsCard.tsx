import * as React from 'react';

import { ChevronRight } from '@livechat/design-system-icons/react/tabler';
import cx from 'clsx';

import { Icon } from '../Icon';
import { Heading } from '../Typography';

import styles from './DetailsCard.module.scss';

export interface IDetailsCardProps {
  /**
   * The CSS class for accordion container
   */
  className?: string;
  /**
   * Set the label
   */
  label: string;
}

const baseClass = 'details-card';

export const DetailsCard: React.FC<IDetailsCardProps> = ({
  children,
  className,
  label,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const mergedClassNames = cx(styles[baseClass], className);

  return (
    <div className={mergedClassNames}>
      <button
        className={styles[`${baseClass}__button`]}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Heading size="xs" className={styles[`${baseClass}__button__title`]}>
          {label}
        </Heading>
        <Icon
          className={cx(
            styles[`${baseClass}__button__icon`],
            isOpen && styles[`${baseClass}__button__icon--open`]
          )}
          source={ChevronRight}
        />
      </button>
      <div
        className={cx(
          styles[`${baseClass}__content`],
          isOpen && styles[`${baseClass}__content--open`]
        )}
      >
        {children}
      </div>
    </div>
  );
};
