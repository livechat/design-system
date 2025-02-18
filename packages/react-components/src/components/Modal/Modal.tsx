import * as React from 'react';

import cx from 'clsx';

import { Heading, Text } from '../Typography';

import { ModalBaseProps, ModalBase } from './components/ModalBase';
import { ModalCloseButton } from './components/ModalCloseButton';
import * as styles from './styles';

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

export const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
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
      className={className}
      fullSpaceContent={fullSpaceContent}
      onClose={onClose}
      isLabelled={!!labelHeading}
      {...props}
    >
      {labelHeading && (
        <div className={styles.modalLabelHeader}>
          <Heading size="sm" as="div" className={styles.modalLabelHeading}>
            {labelHeading}
          </Heading>
          <ModalCloseButton
            labelType={!!labelHeading}
            customColor={`var(--color-white)`}
            onClick={onCloseButtonClick}
          />
        </div>
      )}
      {!labelHeading && (
        <div className={styles.modalHeader(!heading)}>
          {heading && (
            <Heading size="sm" as="div" className={styles.modalHeading}>
              {heading}
            </Heading>
          )}
          <ModalCloseButton onClick={onCloseButtonClick} />
        </div>
      )}
      {/* // TODO check contentclassname */}
      <div
        data-testid="modal-body"
        className={cx(styles.modalBody, contentClassName)}
      >
        {isTextContent ? <Text as="div">{children}</Text> : children}
      </div>
      {footer && <div className={styles.modalFooter}>{footer}</div>}
    </ModalBase>
  );
};
