import * as React from 'react';
import cx from 'clsx';
import { KeyCodes } from '../../utils/keyCodes';

import styles from './Modal.module.scss';

export interface ModalBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose(): void;
  closeOnEscPress?: boolean;
  closeOnOverlayPress?: boolean;
}

const baseClass = 'modal-base';

export const ModalBase: React.FC<ModalBaseProps> = ({
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
      <div className={mergedClassNames} {...props}>
        {children}
      </div>
    </div>
  );
};
