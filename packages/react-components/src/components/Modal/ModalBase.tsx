import * as React from 'react';
import cx from 'clsx';
import { KeyCodes } from '../../utils/keyCodes';

import styles from './Modal.module.scss';

export interface ModalBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The event handler for close button
   */
  onClose(): void;
  /**
   * Triggers the onClose event on `esc` key press
   */
  closeOnEscPress?: boolean;
  /**
   * Triggers the onClose event on overlay click
   */
  closeOnOverlayPress?: boolean;
}

const baseClass = 'modal-base';

export const ModalBase: React.FC<React.PropsWithChildren<ModalBaseProps>> = ({
  children,
  className = '',
  onClose,
  closeOnEscPress = true,
  closeOnOverlayPress = true,
  ...props
}) => {
  const mergedClassNames = cx(styles[baseClass], className);

  React.useEffect(() => {
    if (!closeOnEscPress) {
      return;
    }

    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === KeyCodes.esc) {
        onClose();
      }
    };

    document.addEventListener('keyup', onKeyUp, true);

    return () => document.removeEventListener('keyup', onKeyUp, true);
  }, [closeOnEscPress]);

  const onOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayPress && event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      data-testid="lc-modal-overlay"
      onMouseDown={onOverlayClick}
      className={cx(
        styles[`${baseClass}__overlay`],
        styles[`${baseClass}__overlay--visible`]
      )}
    >
      <div
        role="dialog"
        aria-modal={true}
        className={mergedClassNames}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};
