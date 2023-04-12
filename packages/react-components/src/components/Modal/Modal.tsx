import cx from 'clsx';
import { ModalBaseProps, ModalBase } from './ModalBase';
import { Heading } from '../Typography';

import styles from './Modal.module.scss';
import { ModalCloseButton } from './ModalCloseButton';
import { ReactNode, FC, MouseEvent } from 'react';

export interface ModalProps extends ModalBaseProps {
  heading?: ReactNode;
  labelHeading?: ReactNode;
  fullSpaceContent?: boolean;
  footer?: ReactNode;
}

const baseClass = 'modal';

export const Modal: FC<ModalProps> = ({
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

  const onCloseButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
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
        {children}
      </div>
      {footer && <div className={styles[`${baseClass}__footer`]}>{footer}</div>}
    </ModalBase>
  );
};
