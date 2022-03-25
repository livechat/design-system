import * as React from 'react';
import Icon, { IconTypeName } from '../Icon';
import { Close } from '@livechat/design-system-icons/dist/material';
import { Button } from '../Button';
import { getIconType } from './helpers';

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
  return (
    <div style={{ width: '245px' }}>
      {closeWithX && (
        <div className="lc-tooltip-interactive-x">
          <div style={{ cursor: 'pointer' }} onClick={handleCloseOnClick}>
            <Icon
              source={Close}
              iconType={theme ? getIconType(theme) : IconTypeName.Primary}
            ></Icon>
          </div>
        </div>
      )}
      {image && (
        <img
          className="lc-tooltip-info-image"
          src={image.src}
          alt={image.alt}
        />
      )}
      {header && <div className="lc-tooltip-info-header">{header}</div>}
      <div className="lc-tooltip-info-text">{text}</div>
      <Button kind="primary" onClick={handleClickPrimary}>
        Primary button
      </Button>
      <Button
        kind="plain"
        onClick={handleClickSecondary}
        style={{ marginLeft: '16px' }}
      >
        Link
      </Button>
    </div>
  );
};
