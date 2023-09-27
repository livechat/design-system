import * as React from 'react';

import { Icon } from '@livechat/design-system-icons';
import cx from 'clsx';

import { Button } from '../../Button';
import { getIconType } from '../helpers';
import styles from '../Tooltip.module.scss';
import { TooltipTheme } from '../types';

const baseClass = 'tooltip';

export const Info: React.FC<{
  header?: string;
  text: string;
  closeWithX?: boolean;
  theme?: TooltipTheme;
  handleCloseAction?: (ev: React.MouseEvent) => void;
}> = ({ header, text, closeWithX, theme, handleCloseAction }) => {
  return (
    <div>
      {closeWithX && (
        <Button
          size="compact"
          kind="plain"
          className={styles[`${baseClass}-close`]}
          onClick={handleCloseAction}
          icon={
            <Icon
              set="tabler"
              name="Close"
              kind={theme ? getIconType(theme) : 'primary'}
            />
          }
        />
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
