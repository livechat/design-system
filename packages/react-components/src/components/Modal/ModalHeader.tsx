import * as React from 'react';

import { cx } from '@emotion/css';

import { Icon, IconProps } from '../Icon';
import { Text } from '../Typography';

import styles from './ModalHeader.module.scss';

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
        <Text as="div" bold className={styles[`${baseClass}__heading-title`]}>
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
