import * as React from 'react';
import cx from 'classnames';
import { IModalBaseProps, ModalBase } from './ModalBase';
import { Heading } from '../Heading';

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
      {heading && (
        <div className={`${baseClass}__header`}>
          <Heading size="sm" as="div" className={`${baseClass}__heading`}>
            {heading}
          </Heading>
        </div>
      )}
      <div className={`${baseClass}__body`}>{children}</div>
      {footer && <div className={`${baseClass}__footer`}>{footer}</div>}
    </ModalBase>
  );
};
