import * as React from 'react';

import { Close } from '@livechat/design-system-icons';
import cx from 'clsx';

import { Icon } from '../../Icon';
import { Heading, Text } from '../../Typography';
import { getIconType } from '../Tooltip.helpers';
import styles from '../Tooltip.module.scss';
import { ITooltipInfoProps } from '../types';

const baseClass = 'tooltip';

export const Info: React.FC<ITooltipInfoProps> = ({
  className,
  header,
  text,
  closeWithX,
  theme,
  handleCloseAction,
}) => {
  return (
    <div className={className}>
      {(closeWithX || handleCloseAction) && (
        <button
          type="button"
          aria-label="Close tooltip"
          className={styles[`${baseClass}-close`]}
          onClick={handleCloseAction}
        >
          <Icon source={Close} kind={theme ? getIconType(theme) : 'primary'} />
        </button>
      )}
      {header && (
        <Heading
          as="div"
          size="xs"
          className={cx(styles[`${baseClass}-header`], {
            [styles[`${baseClass}-header--info`]]: closeWithX,
          })}
        >
          {header}
        </Heading>
      )}
      <Text
        as="div"
        className={cx({
          [styles[`${baseClass}-text`]]: closeWithX,
          [styles[`${baseClass}-text--info`]]: closeWithX,
        })}
      >
        {text}
      </Text>
    </div>
  );
};
