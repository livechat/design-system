import * as React from 'react';

import { Close } from '@livechat/design-system-icons';
import cx from 'clsx';

import { Button, ButtonProps } from '../../Button';
import { Icon } from '../../Icon';
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
    type="button"
    kind="plain"
    aria-label="Close modal"
    title="Close modal"
    className={cx(
      styles['modal-base__close'],
      labelType && styles['modal-base__close--label-type']
    )}
    onClick={onClick}
    icon={<Icon source={Close} size="medium" customColor={customColor} />}
  />
);
