import * as React from 'react';
import cx from 'clsx';
import { ModalCloseButton } from './ModalCloseButton';
import { KeyCodes } from '../../utils/keyCodes';

import styles from './Modal.module.scss';

export interface ModalBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose(): void;
  closeOnEscPress?: boolean;
}

const baseClass = 'modal-base';

export const ModalBase: React.FC<ModalBaseProps> = ({
  children,
  className = '',
  onClose,
  closeOnEscPress = true,
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
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const onCloseButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onClose();
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
        <ModalCloseButton onClick={onCloseButtonClick} />
        {children}
      </div>
    </div>
  );
};
