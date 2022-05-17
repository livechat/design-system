import * as React from 'react';
import cx from 'clsx';

import { InAppMessageHeader } from './InAppMessageHeader';
import { InAppMessageAvatarProps } from './InAppMessageAvatar';
import {
  InAppMessageFooter,
  InAppMessageFooterProps,
} from './InAppMessageFooter';
import { KeyCodes } from '../../utils/keyCodes';

import styles from './InAppMessage.module.scss';

const baseClass = 'in-app-message';

export interface InAppMessageProps {
  className?: string;
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
          <div className={styles[`${baseClass}__content`]}>{children}</div>
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
