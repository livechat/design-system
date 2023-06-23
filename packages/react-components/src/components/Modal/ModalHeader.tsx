import React from 'react';
import { Icon, IconProps } from '../Icon';
import styles from './Modal.module.scss';
import { cx } from '@emotion/css';

const baseClass = 'modal-header';

interface ModalHeaderProps {
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
      <div className={styles[`${baseClass}__heading-header`]}>
        <div>{title}</div>

        {children && (
          <div className={styles[`${baseClass}__heading-description`]}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
