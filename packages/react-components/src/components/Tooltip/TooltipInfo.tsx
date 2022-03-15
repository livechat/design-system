import * as React from 'react';
import Icon from '../Icon';
import { Close } from '@livechat/design-system-icons/dist/material';

export const TooltipInfo: React.FC<{
  header: string;
  text: string;
  closeWithX?: boolean;
  handleCloseOnClick?: () => void;
}> = ({ header, text, closeWithX, handleCloseOnClick }) => {
  return (
    <div style={{ position: 'relative' }}>
      {closeWithX && (
        <div className="lc-tooltip-info-x" onClick={handleCloseOnClick}>
          <Icon source={Close}></Icon>
        </div>
      )}
      {header && <div className="lc-tooltip-info-header">{header}</div>}
      <div className="lc-tooltip-info-text">{text}</div>
    </div>
  );
};
