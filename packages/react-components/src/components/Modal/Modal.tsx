import * as React from 'react';
import cx from 'clsx';
import { ModalBaseProps, ModalBase } from './ModalBase';
import { Heading } from '../Typography';
import { ModalHeader } from './ModalHeader';
import { ModalFooter } from './ModalFooter';

import styles from './Modal.module.scss';
import { ModalCloseButton } from './ModalCloseButton';

export interface ModalProps extends ModalBaseProps {
  heading?: React.ReactNode;
  labelHeading?: React.ReactNode;
  fullSpaceContent?: boolean;
  footer?: React.ReactNode;
}

const baseClass = 'modal';

export const Modal: React.FC<ModalProps> = ({
  children,
  className = '',
  heading,
  labelHeading,
  fullSpaceContent,
  footer,
  onClose,
  ...props
}) => {
  const mergedClassNames = cx(styles[baseClass], className);

  const onCloseButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onClose();
  };

  return (
    <ModalBase className={mergedClassNames} onClose={onClose} {...props}>
      <ModalHeader
        labelHeading={labelHeading}
        heading={heading}
        onClose={onClose}
      />
      <div
        data-testid="modal-body"
        className={cx(
          styles[`${baseClass}__body`],
          fullSpaceContent && styles[`${baseClass}__body--full-space`]
        )}
      >
        {children}
      </div>
      {footer && <ModalFooter>{footer}</ModalFooter>}
    </ModalBase>
  );
};
