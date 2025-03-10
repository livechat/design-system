import { type FC } from 'react';

import cx from 'clsx';

import { Tooltip } from '../../Tooltip';
import { Text } from '../../Typography';

import styles from './SystemMessageTimestamp.module.scss';

interface ISystemMessageTimestampProps {
  timestamp: string;
  timestampWithSeconds: string;
}

const baseClass = 'system-message-timestamp';

export const SystemMessageTimestamp: FC<ISystemMessageTimestampProps> = ({
  timestamp,
  timestampWithSeconds,
}: ISystemMessageTimestampProps) => (
  <Tooltip
    data-testid="system-message-timestamp"
    placement="top"
    kind="invert"
    withFadeAnimation={true}
    hoverOnDelay={600}
    hoverOffDelay={0}
    className={cx(styles[`${baseClass}__tooltip-wrapper`])}
    triggerRenderer={() => (
      <Text
        size="xs"
        className={styles[`${baseClass}__value`]}
        data-testid="system-message-timestamp-value"
      >
        • {timestamp}
      </Text>
    )}
  >
    <Text
      size="xs"
      className={cx(styles[`${baseClass}__tooltip-text`])}
      data-testid="system-message-timestamp-tooltip-text"
    >
      {timestampWithSeconds}
    </Text>
  </Tooltip>
);
