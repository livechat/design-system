import * as React from 'react';

import cx from 'clsx';

import { Heading, Text } from '../../Typography';

import styles from './ActionModalContent.module.scss';

const baseClass = 'action-modal-content';

interface IActionModalProps {
  /**
   * Optional element to render icon or image
   */
  icon?: React.ReactNode;
  /**
   * Set the header text
   */
  heading?: React.ReactNode;
  /**
   * Optional element to render action buttons
   */
  actions?: React.ReactNode;
  /**
   * The CSS class for main container
   */
  className?: string;
  /**
   * The CSS class for header container
   */
  headerClassName?: string;
  /**
   * The CSS class for content container
   */
  contentClassName?: string;
}

export const ActionModalContent: React.FC<IActionModalProps> = ({
  children,
  className,
  icon,
  heading,
  actions,
  headerClassName,
  contentClassName,
}) => {
  const mergedClassNames = cx(styles[baseClass], className);

  return (
    <div className={mergedClassNames}>
      {icon && <div className={styles[`${baseClass}__icon`]}>{icon}</div>}
      {heading && (
        <Heading
          className={cx(styles[`${baseClass}__heading`], headerClassName)}
        >
          {heading}
        </Heading>
      )}
      <Text
        as="div"
        className={cx(styles[`${baseClass}__content`], contentClassName)}
      >
        {children}
      </Text>
      {actions && (
        <div className={styles[`${baseClass}__actions`]}>{actions}</div>
      )}
    </div>
  );
};
