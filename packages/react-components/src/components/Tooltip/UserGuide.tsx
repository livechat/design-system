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
    <div style={{ width: '270px' }}>
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
      <div className="lc-tooltip-info-text">{text}</div>
      <div style={{ margin: '4px' }}>
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
    </div>
  );
};
