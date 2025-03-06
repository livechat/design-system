import * as React from 'react';

import cx from 'clsx';

import { Text } from '../Typography';

import { SystemMessageTimestamp } from './components/SystemMessageTimestamp';
import { ISystemMessageProps } from './types';

import styles from './SystemMessage.module.scss';

const baseClass = 'system-message';

export const SystemMessage: React.FC<
  React.PropsWithChildren<ISystemMessageProps>
> = ({ icon, children, details, timestamp, timestampWithSeconds }) => {
  return (
    <div
      data-testid="system-message"
      className={styles[`${baseClass}__wrapper`]}
    >
      <div
        data-testid="system-message-header"
        className={styles[`${baseClass}__header-wrapper`]}
      >
        {icon && (
          <div
            data-testid="system-message-icon"
            className={styles[`${baseClass}__header-wrapper-icon`]}
          >
            {icon}
          </div>
        )}
        {children && (
          <Text
            as="div"
            size="xs"
            data-testid="system-message-title"
            className={cx(styles[`${baseClass}__header-wrapper-title`])}
          >
            {children}
          </Text>
        )}

        {timestamp && timestampWithSeconds && (
          <SystemMessageTimestamp
            timestamp={timestamp}
            timestampWithSeconds={timestampWithSeconds}
          />
        )}
      </div>

      {details && (
        <Text
          as="div"
          size="xs"
          data-testid="system-message-details"
          className={cx(styles[`${baseClass}__details`])}
        >
          {details}
        </Text>
      )}
    </div>
  );
};
