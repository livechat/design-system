import * as React from 'react';
import { Icon } from '../Icon';
import { Close } from '@livechat/design-system-icons/react/material';
import { getIconType } from './helpers';
import styles from './Tooltip.module.scss';

const baseClass = 'tooltip';

export const Info: React.FC<{
  header: string;
  text: string;
  closeWithX?: boolean;
  theme?: string;
  handleCloseAction?: (ev: React.MouseEvent) => void;
}> = ({ header, text, closeWithX, theme, handleCloseAction }) => {
  return (
    <div style={{ position: 'relative' }}>
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
      {header && <div className={styles[`${baseClass}-header`]}>{header}</div>}
      <div className={styles[`${baseClass}-text`]}>{text}</div>
    </div>
  );
};
