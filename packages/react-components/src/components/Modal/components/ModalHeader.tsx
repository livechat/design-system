import * as React from 'react';

import { cx } from '@emotion/css';
import {
  Icon,
  IconSize,
  IconKind,
  TablerIcon,
} from '@livechat/design-system-icons';

import { Avatar, AvatarProps } from '../../Avatar';
import { Heading, Text } from '../../Typography';

import styles from './ModalHeader.module.scss';

const baseClass = 'modal-header';

export interface IconProps {
  name: TablerIcon;
  kind?: IconKind;
  size?: IconSize;
  customColor?: string;
}

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
  className?: 'string';
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  iconProps,
  avatarProps,
  children,
  className = '',
}) => {
  const mergedClassNames = cx(styles[baseClass], className);

  return (
    <div className={mergedClassNames}>
      {iconProps && (
        <Icon
          className={styles[`${baseClass}__heading-left-node`]}
          set="tabler"
          {...iconProps}
          name={iconProps.name}
        />
      )}
      {avatarProps && (
        <Avatar
          className={styles[`${baseClass}__heading-left-node`]}
          {...avatarProps}
        />
      )}
      <div className={styles[`${baseClass}__heading-body`]}>
        <Heading
          as="div"
          size="md"
          className={styles[`${baseClass}__heading-title`]}
        >
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
