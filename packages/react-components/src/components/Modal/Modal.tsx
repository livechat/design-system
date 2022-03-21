import * as React from 'react';
import cx from 'clsx';
import { ModalBaseProps, ModalBase } from './ModalBase';
import { Heading } from '../Typography';

import styles from './Modal.module.scss';

export interface ModalProps extends ModalBaseProps {
  heading?: React.ReactNode;
  footer?: React.ReactNode;
}

const baseClass = 'modal';

export const Modal: React.FC<ModalProps> = ({
  children,
  className = '',
  heading,
  footer,
  ...props
}) => {
  const mergedClassNames = cx(styles[baseClass], className);

  return (
    <ModalBase className={mergedClassNames} {...props}>
      {heading && (
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
      <div className={styles[`${baseClass}__body`]}>{children}</div>
      {footer && <div className={styles[`${baseClass}__footer`]}>{footer}</div>}
    </ModalBase>
  );
};
