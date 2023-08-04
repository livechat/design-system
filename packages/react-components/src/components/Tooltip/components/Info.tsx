import * as React from 'react';

import { Close } from '@livechat/design-system-icons/react/material';
import cx from 'clsx';

import { Icon } from '../../Icon';
import { getIconType } from '../helpers';
import styles from '../Tooltip.module.scss';

const baseClass = 'tooltip';

export const Info: React.FC<{
  header?: string;
  text: string;
  closeWithX?: boolean;
  theme?: string;
  handleCloseAction?: (ev: React.MouseEvent) => void;
}> = ({ header, text, closeWithX, theme, handleCloseAction }) => {
  return (
    <div>
      {closeWithX && (
        <div
          className={styles[`${baseClass}-close`]}
          onClick={handleCloseAction}
        >
          <Icon
            source={Close}
            kind={theme ? getIconType(theme) : 'primary'}
          ></Icon>
        </div>
      )}
      {header && (
        <div
          className={cx(
            styles[`${baseClass}-header`],
            styles[`${baseClass}-header--info`]
          )}
        >
          {header}
        </div>
      )}
      <div
        className={cx(
          styles[`${baseClass}-text`],
          styles[`${baseClass}-text--info`]
        )}
      >
        {text}
      </div>
    </div>
  );
};
