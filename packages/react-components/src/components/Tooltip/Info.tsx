import * as React from 'react';
import Icon, { IconTypeName } from '../Icon';
import { Close } from '@livechat/design-system-icons/dist/material';
import { getIconType } from './helpers';

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
        <div className="lc-tooltip-x" onClick={handleCloseOnClick}>
          <Icon
            source={Close}
            iconType={theme ? getIconType(theme) : IconTypeName.Primary}
          ></Icon>
        </div>
      )}
      {header && <div className="lc-tooltip-header">{header}</div>}
      <div className="lc-tooltip-text">{text}</div>
    </div>
  );
};
