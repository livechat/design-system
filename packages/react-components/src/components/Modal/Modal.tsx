import * as React from 'react';
import cx from 'clsx';
import { ModalBaseProps, ModalBase } from './ModalBase';
import { ModalHeader } from './ModalHeader';
import { ModalFooter } from './ModalFooter';
import { ModalCloseButton } from './ModalCloseButton';

import styles from './Modal.module.scss';

export interface ModalProps extends ModalBaseProps {
  fullSpaceContent?: boolean;
}

const baseClass = 'modal';

export const Modal: React.FC<ModalProps> = ({
  children,
  className = '',
  fullSpaceContent,
  onClose,
  ...props
}) => {
  const mergedClassNames = cx(styles[baseClass], className);

  const onCloseButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onClose();
  };

  const modalHeader = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === ModalHeader
  ) as React.ReactElement;

  const modalFooter = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === ModalFooter
  ) as React.ReactElement;

  const hasModalHeader = !!modalHeader;

  return (
    <ModalBase className={mergedClassNames} onClose={onClose} {...props}>
      {modalHeader}
      {!hasModalHeader && <ModalCloseButton onClick={onCloseButtonClick} />}
      <div
        data-testid="modal-body"
        className={cx(
          styles[`${baseClass}__body`],
          fullSpaceContent && styles[`${baseClass}__body--full-space`]
        )}
      >
        {children}
      </div>
      {modalFooter}
    </ModalBase>
  );
};
