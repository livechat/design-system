import * as React from 'react';
import { Close } from '@livechat/design-system-icons/dist/material';
import { Icon, IconSizeName } from '../Icon';

export type IModalCloseButtonProps = React.HTMLAttributes<HTMLButtonElement>;

const baseClass = 'lc-modal-base__close';

export const ModalCloseButton: React.FC<IModalCloseButtonProps> = ({
  onClick,
}) => (
  <button
    title="Close modal"
    className={baseClass}
    onClick={onClick}
    type="button"
  >
    <Icon source={Close} size={IconSizeName.Large} />
  </button>
);
