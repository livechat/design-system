import * as React from 'react';
import cx from 'classnames';
import { IModalBaseProps, ModalBase } from './ModalBase';
import { ActionModalIcon } from './ActionModalIcon';
import { ActionModalHeading } from './ActionModalHeading';
import { ActionModalContent } from './ActionModalContent';
import { ActionModalActions } from './ActionModalActions';

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
      {icon && <ActionModalIcon>{icon}</ActionModalIcon>}
      {heading && <ActionModalHeading>{heading}</ActionModalHeading>}
      <ActionModalContent>{children}</ActionModalContent>
      {actions && <ActionModalActions>{actions}</ActionModalActions>}
    </ModalBase>
  );
};
