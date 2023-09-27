import * as React from 'react';

import { cx } from '@emotion/css';
import {
  Icon,
  IconSize,
  IconKind,
  Tabler,
} from '@livechat/design-system-icons';

import { Heading, Text } from '../../Typography';

import styles from './ModalHeader.module.scss';

const baseClass = 'modal-header';

export interface IconProps {
  name: Tabler;
  kind?: IconKind;
  size?: IconSize;
  customColor?: string;
}

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
        <Icon
          set="tabler"
          {...iconProps}
          name={iconProps.name}
          className={styles[`${baseClass}__heading-icon`]}
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
