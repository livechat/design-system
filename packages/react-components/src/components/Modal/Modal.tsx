import * as React from 'react';
import cx from 'classnames';
import { IModalBaseProps, ModalBase } from './ModalBase';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';

export interface IModalProps extends IModalBaseProps {
  heading?: React.ReactNode;
  footer?: React.ReactNode;
}

const baseClass = 'lc-modal';

export const Modal: React.FC<IModalProps> = ({
  children,
  className = '',
  heading,
  footer,
  ...props
}) => {
  const mergedClassNames = cx(baseClass, className);

  return (
    <ModalBase className={mergedClassNames} {...props}>
      {heading && <ModalHeader>{heading}</ModalHeader>}
      <ModalBody>{children}</ModalBody>
      {footer && <ModalFooter>{footer}</ModalFooter>}
    </ModalBase>
  );
};
