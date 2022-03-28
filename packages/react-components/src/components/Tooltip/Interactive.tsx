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
  const decoration = theme === 'invert' ? 'underline' : 'none';
  return (
    <div style={{ width: '100%' }}>
      <div
        style={{ position: 'relative', height: '25px', marginBottom: '10px' }}
      >
        {closeWithX && (
          <div className="lc-tooltip-x">
            <div onClick={handleCloseOnClick}>
              <Icon
                source={Close}
                iconType={theme ? getIconType(theme) : IconTypeName.Primary}
              ></Icon>
            </div>
          </div>
        )}
      </div>
      {image && (
        <div style={{ margin: '0 4px' }}>
          <img className="lc-tooltip-image" src={image.src} alt={image.alt} />
        </div>
      )}
      {header && <div className="lc-tooltip-header">{header}</div>}
      <div className="lc-tooltip-text">{text}</div>
      <div style={{ margin: '4px' }}>
        <Button kind="primary" onClick={handleClickPrimary}>
          Primary button
        </Button>
        <Button
          kind="plain"
          onClick={handleClickSecondary}
          style={{ marginLeft: '16px', textDecoration: decoration }}
        >
          Link
        </Button>
      </div>
    </div>
  );
};
