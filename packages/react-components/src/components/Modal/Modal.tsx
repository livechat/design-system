import * as React from 'react';
import cx from 'clsx';
import { ModalBaseProps, ModalBase } from './ModalBase';
import { Heading, Text } from '../Typography';

import styles from './Modal.module.scss';
import { ModalCloseButton } from './ModalCloseButton';

export interface ModalProps extends ModalBaseProps {
  /**
   * Header element. For consistent UI use `<ModalHeader/>`
   */
  heading?: React.ReactNode;
  /**
   * Header element outside the main container. For consistent UI use `<ModalHeader/>`
   */
  labelHeading?: React.ReactNode;
  /**
   * Removes the spacing inside the main container
   */
  fullSpaceContent?: boolean;
  /**
   * Footer element
   */
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
      {labelHeading && (
        <div className={styles[`${baseClass}__label-header`]}>
          <Heading
            size="xs"
            as="div"
            className={styles[`${baseClass}__label-heading`]}
          >
            {labelHeading}
          </Heading>
          <ModalCloseButton
            labelType={!!labelHeading}
            customColor={`var(--color-white)`}
            onClick={onCloseButtonClick}
          />
        </div>
      )}
      {!labelHeading && heading && (
        <div className={styles[`${baseClass}__header`]}>
          <Heading
            size="sm"
            as="div"
            className={styles[`${baseClass}__heading`]}
          >
            {heading}
          </Heading>
        </div>
      )}
      {!labelHeading && <ModalCloseButton onClick={onCloseButtonClick} />}
      <div
        data-testid="modal-body"
        className={cx(
          styles[`${baseClass}__body`],
          fullSpaceContent && styles[`${baseClass}__body--full-space`]
        )}
      >
        <Text as="div">{children}</Text>
      </div>
      {footer && <div className={styles[`${baseClass}__footer`]}>{footer}</div>}
    </ModalBase>
  );
};
