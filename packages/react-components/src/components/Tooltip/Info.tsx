import { Icon } from '../Icon';
import { Close } from '@livechat/design-system-icons/react/material';
import { getIconType } from './helpers';
import styles from './Tooltip.module.scss';
import { FC, MouseEvent } from 'react';

const baseClass = 'tooltip';

export const Info: FC<{
  header: string;
  text: string;
  closeWithX?: boolean;
  theme?: string;
  handleCloseAction?: (ev: MouseEvent) => void;
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
