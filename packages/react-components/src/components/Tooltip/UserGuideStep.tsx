import * as React from 'react';
import { Icon } from '../Icon';
import { Close } from '@livechat/design-system-icons/react/material';
import { Button } from '../Button';
import { getIconType } from './helpers';
import styles from './Tooltip.module.scss';

const baseClass = 'tooltip';

export const UserGuideStep: React.FC<{
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
  handleCloseAction?: (ev: KeyboardEvent | React.MouseEvent) => void;
}> = ({
  header,
  text,
  image,
  currentStep,
  stepMax,
  closeWithX,
  theme,
  handleCloseAction,
  handleClickPrimary,
}) => {
  React.useEffect(() => {
    if (handleCloseAction) {
      document.addEventListener('keydown', handleCloseAction);

      return () => {
        document.removeEventListener('keydown', handleCloseAction);
      };
    }
  }, []);

  return (
    <div style={{ width: '270px' }}>
      <div
        style={{ position: 'relative', height: '25px', marginBottom: '10px' }}
      >
        {closeWithX && (
          <div className={styles[`${baseClass}-close`]}>
            <div onClick={handleCloseAction}>
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span className={styles[`${baseClass}-step`]}>
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
