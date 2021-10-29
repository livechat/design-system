import * as React from 'react';
import cx from 'classnames';
import { IModalBaseProps, ModalBase } from './ModalBase';

export interface IActionModalProps extends IModalBaseProps {
  icon?: React.ReactNode;
  heading?: React.ReactNode;
  actions?: React.ReactNode;
}

const baseClass = 'lc-action-modal';

export const ActionModal: React.FC<IActionModalProps> = ({
  children,
  className = '',
  icon,
  heading,
  actions,
  ...props
}) => {
  const mergedClassNames = cx(baseClass, className);

  return (
    <ModalBase className={mergedClassNames} {...props}>
      {icon && <div className={`${baseClass}__icon`}>{icon}</div>}
      {heading && <div className={`${baseClass}__heading`}>{heading}</div>}
      <div className={`${baseClass}__content`}>{children}</div>
      {actions && <div className={`${baseClass}__actions`}>{actions}</div>}
    </ModalBase>
  );
};
