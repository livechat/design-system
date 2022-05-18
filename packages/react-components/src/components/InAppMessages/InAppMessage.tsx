import * as React from 'react';
import cx from 'clsx';

import {
  InAppMessageHeader,
  InAppMessageHeaderProps,
} from './InAppMessageHeader';
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
  header?: InAppMessageHeaderProps;
  footer?: InAppMessageFooterProps;
  closeOnEscPress?: boolean;
  onClose: () => void;
}

export const InAppMessage: React.FC<InAppMessageProps> = ({
  children,
  className,
  closeOnEscPress = true,
  image,
  header,
  footer,
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
      data-testid={`${baseClass}-overlay`}
      className={styles[`${baseClass}__overlay`]}
      onMouseDown={handleOnOverlayClick}
    >
      <div className={styles[`${baseClass}__container`]}>
        <InAppMessageHeader
          avatar={header && header.avatar}
          text={header && header.text}
          onCloseButtonClick={handleOnCloseButtonClick}
        />
        <div className={mergedClassNames}>
          <div className={styles[`${baseClass}__content`]}>
            {image && <InAppMessageImage src={image.src} alt={image.alt} />}
            <div
              className={cx(styles[`${baseClass}__content__body`], {
                [styles[`${baseClass}__content__body__with-footer`]]: footer,
              })}
            >
              {children}
            </div>
          </div>
          {footer && (
            <InAppMessageFooter cta={footer.cta} remind={footer.remind} />
          )}
        </div>
      </div>
    </div>
  );
};
