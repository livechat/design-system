import * as React from 'react';
import cx from 'clsx';
import { ModalBaseProps, ModalBase } from './ModalBase';
import { IModalFooterProps, NewModalFooter } from './ModalFooter';

import styles from './Modal.module.scss';
import { ModalCloseButton } from './ModalCloseButton';
import { NewModalHeader } from './ModalHeader';
import { IconSource } from 'components/Icon';

export interface ModalProps extends ModalBaseProps {
  headingType?: 'labelHeading' | 'heading';
  heading?: React.ReactNode;
  labelHeading?: React.ReactNode;
  fullSpaceContent?: boolean;
  footer?: React.ReactNode;
  footerButtons?: IModalFooterProps['buttons'];
  footerLabel?: React.ReactNode;
  headerTitle?: string;
  headerDescription?: string;
  icon?: IconSource;
}

const baseClass = 'modal';

export const Modal: React.FC<ModalProps> = ({
  children,
  className = '',
  headingType = 'heading',
  headerTitle = '',
  headerDescription = '',
  fullSpaceContent,
  footerButtons,
  footerLabel,
  icon,
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
      {headingType === 'heading' || headingType === 'labelHeading' ? (
        <NewModalHeader
          headingType={headingType}
          headerTitle={headerTitle}
          headerDescription={headerDescription}
          icon={icon}
          onClose={onClose}
        />
      ) : null}
      {headingType !== 'labelHeading' && (
        <ModalCloseButton onClick={onCloseButtonClick} />
      )}
      <div
        data-testid="modal-body"
        className={cx(
          styles[`${baseClass}__body`],
          fullSpaceContent && styles[`${baseClass}__body--full-space`]
        )}
      >
        {children}
      </div>
      {footerButtons || footerLabel ? (
        <NewModalFooter buttons={footerButtons}>{footerLabel}</NewModalFooter>
      ) : null}
    </ModalBase>
  );
};
