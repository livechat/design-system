import * as React from 'react';
import Icon, { IconTypeName } from '../Icon';
import { Close } from '@livechat/design-system-icons/dist/material';
import { Button } from '../Button';
import { getIconType } from './helpers';

export const UserGuide: React.FC<{
  header: string;
  text: string;
  image?: {
    src: string;
    alt: string;
  };
  currentStep: number;
  stepMax: number;
  closeWithX?: boolean;
  theme?: string;
  handleClickPrimary: () => void;
  handleCloseOnClick?: () => void;
}> = ({
  header,
  text,
  image,
  currentStep,
  stepMax,
  closeWithX,
  theme,
  handleCloseOnClick,
  handleClickPrimary,
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span className="lc-tooltip-step">
          Step {currentStep} of {stepMax}
        </span>
        <Button kind="primary" onClick={handleClickPrimary}>
          Primary button
        </Button>
      </div>
    </div>
  );
};
