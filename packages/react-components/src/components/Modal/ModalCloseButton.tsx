import cx from 'clsx';
import { Close } from '@livechat/design-system-icons/react/material';
import { Icon } from '../Icon';

import styles from './Modal.module.scss';
import { HTMLAttributes, FC } from 'react';

export interface ModalCloseButtonProps
  extends HTMLAttributes<HTMLButtonElement> {
  labelType?: boolean;
  customColor?: string;
}

export const ModalCloseButton: FC<ModalCloseButtonProps> = ({
  labelType,
  customColor,
  onClick,
}) => (
  <button
    title="Close modal"
    className={cx(
      styles['modal-base__close'],
      labelType && styles['modal-base__close--label-type']
    )}
    onClick={onClick}
    type="button"
  >
    <Icon source={Close} size="large" customColor={customColor} />
  </button>
);
