import * as React from 'react';

import cx from 'clsx';

import { Heading, Text } from '../Typography';

import { ModalBaseProps, ModalBase } from './components/ModalBase';
import { ModalCloseButton } from './components/ModalCloseButton';

import styles from './Modal.module.scss';

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
  /**
   * Class name for the content container
   */
  contentClassName?: string;
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
  contentClassName,
  ...props
}) => {
  const mergedClassNames = cx(styles[baseClass], className);

  const isTextContent = typeof children === 'string';

  const onCloseButtonClick = (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    onClose();
  };

  return (
    <ModalBase
      className={mergedClassNames}
      fullSpaceContent={fullSpaceContent}
      onClose={onClose}
      isLabelled={!!labelHeading}
      {...props}
    >
      {labelHeading && (
        <div className={styles[`${baseClass}__label-header`]}>
          <Heading
            size="md"
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
            size="md"
            as="div"
            className={styles[`${baseClass}__heading`]}
          >
            {heading}
          </Heading>
          <ModalCloseButton onClick={onCloseButtonClick} />
        </div>
      )}
      <div
        data-testid="modal-body"
        className={cx(styles[`${baseClass}__body`], contentClassName)}
      >
        {isTextContent ? <Text as="div">{children}</Text> : children}
      </div>
      {footer && <div className={styles[`${baseClass}__footer`]}>{footer}</div>}
    </ModalBase>
  );
};
