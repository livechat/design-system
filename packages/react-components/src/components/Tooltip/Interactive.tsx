import * as React from 'react';
import { Icon } from '../Icon';
import { Close } from '@livechat/design-system-icons/react/material';
import { Button } from '../Button';
import { getIconType } from './helpers';
import styles from './Tooltip.module.scss';

const baseClass = 'lc-tooltip';

export const Interactive: React.FC<{
  header: string;
  text: string;
  image?: {
    src: string;
    alt: string;
  };
  closeWithX?: boolean;
  theme?: 'invert' | 'important';
  handleClickPrimary: () => void;
  handleClickSecondary: () => void;
  handleCloseOnClick?: () => void;
}> = ({
  header,
  text,
  image,
  closeWithX,
  theme,
  handleCloseOnClick,
  handleClickPrimary,
  handleClickSecondary,
}) => {
  const decoration = theme === 'invert' ? 'underline' : 'none';
  return (
    <div style={{ width: '270px' }}>
      <div
        style={{ position: 'relative', height: '25px', marginBottom: '10px' }}
      >
        {closeWithX && (
          <div className={styles[`${baseClass}-x`]}>
            <div onClick={handleCloseOnClick}>
              <Icon
                source={Close}
                kind={theme ? getIconType(theme) : 'primary'}
              ></Icon>
            </div>
          </div>
        )}
      </div>
      {image && (
        <div style={{ margin: '0 4px' }}>
          <img
            className={styles[`${baseClass}-image`]}
            src={image.src}
            alt={image.alt}
          />
        </div>
      )}
      {header && <div className={styles[`${baseClass}-header`]}>{header}</div>}
      <div className={styles[`${baseClass}-text`]}>{text}</div>
      <div style={{ margin: '4px' }}>
        <Button kind="primary" onClick={handleClickPrimary}>
          Primary button
        </Button>
        <div
          onClick={handleClickSecondary}
          style={{
            cursor: 'pointer',
            display: 'inline-block',
            marginLeft: '16px',
            textDecoration: decoration,
          }}
        >
          Link
        </div>
      </div>
    </div>
  );
};
