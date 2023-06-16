import * as React from 'react';
import cx from 'clsx';
import { ModalBaseProps, ModalBase } from './ModalBase';
import { ModalCloseButton } from './ModalCloseButton';

import styles from './Modal.module.scss';

export interface ModalProps extends ModalBaseProps {
  fullSpaceContent?: boolean;
  heading?: React.ReactNode;
  labelHeading?: React.ReactNode;
  footer?: React.ReactNode;
}

const baseClass = 'modal';

export const Modal: React.FC<ModalProps> = ({
  children,
  className = '',
  fullSpaceContent,
  onClose,
  heading,
  labelHeading,
  footer,
  ...props
}) => {
  const mergedClassNames = cx(styles[baseClass], className);

  const onCloseButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onClose();
  };

  const modalHeader =
    heading || labelHeading ? (
      <div className={styles[`${baseClass}__header`]}>
        {heading && (
          <div className={styles[`${baseClass}__heading`]}>{heading}</div>
        )}
        {labelHeading && (
          <div className={styles[`${baseClass}__label-heading`]}>
            {labelHeading}
          </div>
        )}
      </div>
    ) : (
      <ModalCloseButton onClick={onCloseButtonClick} />
    );

  return (
    <>
      <ModalBase className={mergedClassNames} onClose={onClose} {...props}>
        {modalHeader}
        <div
          data-testid="modal-body"
          className={cx(
            styles[`${baseClass}__body`],
            fullSpaceContent && styles[`${baseClass}__body--full-space`]
          )}
        >
          {children}
        </div>
      </ModalBase>
      {footer && <div className={styles[`${baseClass}__footer`]}>{footer}</div>}
    </>
  );
};
