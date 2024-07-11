import * as React from 'react';

import cx from 'clsx';

import { Avatar, AvatarProps } from '../../Avatar';
import { Icon, IconProps } from '../../Icon';
import { Heading, Text } from '../../Typography';

import styles from './ModalHeader.module.scss';

const baseClass = 'modal-header';

export interface ModalHeaderProps {
  /**
   * Set the header title
   */
  title?: React.ReactNode;
  /**
   * Set to display the icon
   */
  iconProps?: IconProps;
  /**
   * Set to display avatar
   */
  avatarProps?: AvatarProps;
  /**
   * Children element
   */
  children?: React.ReactNode;
  /**
   * Define class name for container
   */
  className?: string;
}

export const ModalHeader: React.FC<
  React.PropsWithChildren<ModalHeaderProps>
> = ({ title, iconProps, avatarProps, children, className = '' }) => {
  const mergedClassNames = cx(styles[baseClass], className);

  return (
    <div className={mergedClassNames}>
      {iconProps && (
        <Icon
          className={styles[`${baseClass}__heading-left-node`]}
          {...iconProps}
        />
      )}
      {avatarProps && (
        <Avatar
          className={styles[`${baseClass}__heading-left-node`]}
          {...avatarProps}
        />
      )}
      <div className={styles[`${baseClass}__heading-body`]}>
        <Heading as="div" size="sm">
          {title}
        </Heading>

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
