import * as React from 'react';
import cx from 'clsx';
import { Close } from '@livechat/design-system-icons/react/material';
import { Icon } from '../Icon';

import styles from './Modal.module.scss';

export interface ModalCloseButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  labelType?: boolean;
}

export const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({
  labelType,
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
    <Icon source={Close} size="large" />
  </button>
);
