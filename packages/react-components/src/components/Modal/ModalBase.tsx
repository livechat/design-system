import * as React from 'react';
import cx from 'classnames';
import { ModalCloseButton } from './ModalCloseButton';
import { KeyCodes } from '../../constants/keyCodes';

export interface IModalBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose(): void;
  closeOnEscPress?: boolean;
}

const baseClass = 'lc-modal-base';

export const ModalBase: React.FC<IModalBaseProps> = ({
  children,
  className = '',
  onClose,
  closeOnEscPress = true,
  ...props
}) => {
  const mergedClassNames = cx(baseClass, className);

  React.useEffect(() => {
    addEventListeners();
    return () => {
      removeEventListeners();
    };
  }, []);

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

  const onKeyUp = (event: KeyboardEvent) => {
    if (event.code === KeyCodes.esc) {
      onClose();
    }
  };

  const addEventListeners = () => {
    if (closeOnEscPress) {
      document.addEventListener('keyup', onKeyUp, true);
    }
  };

  const removeEventListeners = () => {
    document.removeEventListener('keyup', onKeyUp, true);
  };

  return (
    <div
      onMouseDown={onOverlayClick}
      className={cx(`${baseClass}__overlay`, `${baseClass}__overlay--visible`)}
    >
      <div className={mergedClassNames} {...props}>
        <ModalCloseButton onClick={onCloseButtonClick} />
        {children}
      </div>
    </div>
  );
};
