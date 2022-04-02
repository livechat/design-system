import * as React from 'react';
import cx from 'clsx';
import { ModalBaseProps, ModalBase } from './ModalBase';

import styles from './Modal.module.scss';

export interface ActionModalProps extends ModalBaseProps {
  icon?: React.ReactNode;
  heading?: React.ReactNode;
  actions?: React.ReactNode;
}

const baseClass = 'action-modal';

export const ActionModal: React.FC<ActionModalProps> = ({
  children,
  className = '',
  icon,
  heading,
  actions,
  ...props
}) => {
  const mergedClassNames = cx(styles[baseClass], className);

  return (
    <ModalBase className={mergedClassNames} {...props}>
      {icon && <div className={styles[`${baseClass}__icon`]}>{icon}</div>}
      {heading && (
        <div className={styles[`${baseClass}__heading`]}>{heading}</div>
      )}
      <div className={styles[`${baseClass}__content`]}>{children}</div>
      {actions && (
        <div className={styles[`${baseClass}__actions`]}>{actions}</div>
      )}
    </ModalBase>
  );
};
