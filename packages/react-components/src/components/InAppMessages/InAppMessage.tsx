import * as React from 'react';
import cx from 'clsx';

import { KeyCodes } from '../../utils/keyCodes';

import styles from './InAppMessage.module.scss';

const baseClass = 'in-app-message';

export interface InAppMessageProps {
  className?: string;
  image?: React.ReactElement;
  header?: React.ReactElement;
  footer?: React.ReactElement;
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
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === KeyCodes.esc) {
        handleCloseInAppMessage();
      }
    };

    if (closeOnEscPress) {
      document.addEventListener('keyup', onKeyDown, true);
    }

    return () => {
      if (closeOnEscPress) {
        document.addEventListener('keyup', onKeyDown, true);
      }
    };
  }, [closeOnEscPress]);

  const handleCloseInAppMessage = () => onClose();

  const handleOnOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseInAppMessage();
    }
  };

  const mergedClassNames = cx(styles[`${baseClass}`], className);

  return (
    <div
      data-testid={`${baseClass}-overlay`}
      className={styles[`${baseClass}__overlay`]}
      onMouseDown={handleOnOverlayClick}
    >
      <div className={styles[`${baseClass}__container`]}>
        <div className={styles[`${baseClass}__container__wrapper`]}>
          {header}
          <div className={mergedClassNames}>
            <div className={styles[`${baseClass}__content`]}>
              {image}
              <div
                className={cx(styles[`${baseClass}__content__body`], {
                  [styles[`${baseClass}__content__body__with-footer`]]: footer,
                })}
              >
                {children}
              </div>
            </div>
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
};
