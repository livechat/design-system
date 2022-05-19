import * as React from 'react';
import { Icon } from '../Icon';
import { Close } from '@livechat/design-system-icons/react/material';
import { getIconType } from './helpers';
import styles from './Tooltip.module.scss';

const baseClass = 'lc-tooltip';

export const Info: React.FC<{
  header: string;
  text: string;
  closeWithX?: boolean;
  theme?: string;
  handleCloseOnClick?: () => void;
}> = ({ header, text, closeWithX, theme, handleCloseOnClick }) => {
  return (
    <div style={{ position: 'relative' }}>
      {closeWithX && (
        <div className={styles[`${baseClass}-x`]} onClick={handleCloseOnClick}>
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
