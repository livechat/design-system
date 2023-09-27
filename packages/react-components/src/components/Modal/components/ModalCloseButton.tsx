import * as React from 'react';

import { Icon } from '@livechat/design-system-icons';
import cx from 'clsx';

import { Button, ButtonProps } from '../../Button';
import styles from '../Modal.module.scss';

export interface ModalCloseButtonProps extends ButtonProps {
  labelType?: boolean;
  customColor?: string;
}

export const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({
  labelType,
  customColor,
  onClick,
}) => (
  <Button
    kind="plain"
    title="Close modal"
    className={cx(
      styles['modal-base__close'],
      labelType && styles['modal-base__close--label-type']
    )}
    onClick={onClick}
    icon={
      <Icon name="Close" set="tabler" size="medium" customColor={customColor} />
    }
  />
);
