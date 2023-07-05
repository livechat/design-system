import React from 'react';
import { Icon, IconProps } from '../Icon';
import styles from './Modal.module.scss';
import { cx } from '@emotion/css';
import { Text } from '../Typography';

const baseClass = 'modal-header';

export interface ModalHeaderProps {
  title?: React.ReactNode;
  iconProps?: IconProps;
  children?: React.ReactNode;
  className?: 'string';
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  iconProps,
  children,
  className = '',
}) => {
  const mergedClassNames = cx(styles[baseClass], className);

  return (
    <div className={mergedClassNames}>
      {iconProps && (
        <Icon className={styles[`${baseClass}__heading-icon`]} {...iconProps} />
      )}
      <div className={styles[`${baseClass}__heading-body`]}>
        <Text as="div" className={styles[`${baseClass}__heading-title`]}>
          {title}
        </Text>

        {children && (
          <Text
            as="div"
            className={styles[`${baseClass}__heading-description`]}
          >
            {children}
          </Text>
        )}
      </div>
    </div>
  );
};
