import cx from 'clsx';
import { HTMLAttributes, FC, useEffect, MouseEvent } from 'react';
import { KeyCodes } from '../../utils/keyCodes';

import styles from './Modal.module.scss';

export interface ModalBaseProps extends HTMLAttributes<HTMLDivElement> {
  onClose(): void;
  closeOnEscPress?: boolean;
  closeOnOverlayPress?: boolean;
}

const baseClass = 'modal-base';

export const ModalBase: FC<ModalBaseProps> = ({
  children,
  className = '',
  onClose,
  closeOnEscPress = true,
  closeOnOverlayPress = true,
  ...props
}) => {
  const mergedClassNames = cx(styles[baseClass], className);

  useEffect(() => {
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

  const onOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
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
