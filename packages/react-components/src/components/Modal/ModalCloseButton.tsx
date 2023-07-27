import * as React from 'react';
import cx from 'clsx';
import { Close } from '@livechat/design-system-icons/react/tabler';
import { Icon } from '../Icon';

import styles from './Modal.module.scss';

export interface ModalCloseButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  labelType?: boolean;
  customColor?: string;
}

export const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({
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
    <Icon source={Close} size="medium" customColor={customColor} />
  </button>
);
