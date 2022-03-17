import * as React from 'react';
import { Close } from '@livechat/design-system-icons/react/material';
import { Icon, IconSizeName } from '../Icon';

import styles from './Modal.module.scss';

export type ModalCloseButtonProps = React.HTMLAttributes<HTMLButtonElement>;

export const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({
  onClick,
}) => (
  <button
    title="Close modal"
    className={styles['modal-base__close']}
    onClick={onClick}
    type="button"
  >
    <Icon source={Close} size={IconSizeName.Large} />
  </button>
);
