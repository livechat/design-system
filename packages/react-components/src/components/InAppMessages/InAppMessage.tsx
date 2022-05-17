import * as React from 'react';
import cx from 'clsx';

import { InAppMessageHeader } from './InAppMessageHeader';
import { InAppMessageAvatarProps } from './InAppMessageAvatar';
import { InAppMessageImage, InAppMessageImageProps } from './InAppMessageImage';
import {
  InAppMessageFooter,
  InAppMessageFooterProps,
} from './InAppMessageFooter';
import { KeyCodes } from '../../utils/keyCodes';

import styles from './InAppMessage.module.scss';

const baseClass = 'in-app-message';

export interface InAppMessageProps {
  className?: string;
  image?: InAppMessageImageProps;
  header?: {
    avatar?: InAppMessageAvatarProps;
    text?: React.ReactElement;
  };
  closeOnEscPress?: boolean;
  footerButtons?: InAppMessageFooterProps;
  onClose: () => void;
}

export const InAppMessage: React.FC<InAppMessageProps> = ({
  children,
  className,
  closeOnEscPress = true,
  image,
  header,
  footerButtons,
  onClose,
}) => {
  React.useEffect(() => {
    const onDocumentClick = (e: MouseEvent) => {
      if (e.target === e.currentTarget) {
        handleCloseInAppMessage();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === KeyCodes.esc) {
        handleCloseInAppMessage();
      }
    };

    if (closeOnEscPress) {
      document.addEventListener('keyup', onKeyDown, true);
    }
    document.addEventListener('click', onDocumentClick);

    return () => {
      document.addEventListener('keyup', onKeyDown, true);
      document.addEventListener('click', onDocumentClick);
    };
  }, [closeOnEscPress]);

  const handleCloseInAppMessage = () => onClose();

  const handleOnOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseInAppMessage();
    }
  };

  const handleOnCloseButtonClick = () => handleCloseInAppMessage();

  const mergedClassNames = cx(styles[`${baseClass}`], className);

  return (
    <div
      data-testId={`${baseClass}-overlay`}
      className={styles[`${baseClass}__overlay`]}
      onMouseDown={handleOnOverlayClick}
    >
      <div className={styles[`${baseClass}__container`]}>
        <InAppMessageHeader
          avatar={header && header.avatar}
          text={header && header.text}
          onCloseButtonClick={handleOnCloseButtonClick}
        />
        <div
          className={cx(mergedClassNames, {
            [`${baseClass}__with-footer`]: footerButtons,
          })}
        >
          <div className={styles[`${baseClass}__content`]}>
            {image && <InAppMessageImage src={image.src} alt={image.alt} />}
            <div className={styles[`${baseClass}__content__body`]}>
              {children}
            </div>
          </div>
          {footerButtons && (
            <InAppMessageFooter
              cta={footerButtons.cta}
              remind={footerButtons.remind}
            />
          )}
        </div>
      </div>
    </div>
  );
};
