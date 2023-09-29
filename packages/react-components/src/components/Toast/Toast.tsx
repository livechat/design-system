import * as React from 'react';

import { Icon, TablerIcon } from '@livechat/design-system-icons';
import cx from 'clsx';

import { Button } from '../Button';
import { Text } from '../Typography';

import styles from './Toast.module.scss';

type ToastKind = 'success' | 'warning' | 'error' | 'info';

type ToastAction = {
  onClick: () => void;
  label: string;
  closesOnClick?: boolean;
};

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  action?: ToastAction;
  className?: string;
  removable?: boolean;
  kind?: ToastKind;
  onClose?: () => void;
}

const iconConfig: Record<ToastKind, { name: string }> = {
  success: {
    name: 'CheckCircle' as TablerIcon,
  },
  warning: {
    name: 'Warning' as TablerIcon,
  },
  error: {
    name: 'Block' as TablerIcon,
  },
  info: {
    name: 'Info' as TablerIcon,
  },
};

const baseClass = 'toast';

export const Toast: React.FC<React.PropsWithChildren<ToastProps>> = ({
  action,
  className,
  children,
  removable,
  kind = 'info',
  onClose,
  ...divProps
}) => {
  const mergedClassNames = cx(
    styles[baseClass],
    styles[`${baseClass}--${kind}`],
    className
  );
  const isTextContent = typeof children === 'string';

  const onActionClick = (action: ToastAction) => {
    if (action && action.closesOnClick && onClose) {
      action.onClick();

      return onClose();
    }

    return action.onClick();
  };

  return (
    <div className={mergedClassNames} {...divProps}>
      <div className={styles[`${baseClass}__icon`]}>
        <Icon
          set="tabler"
          name={iconConfig[kind].name as TablerIcon}
          size="medium"
        />
      </div>
      <div className={styles[`${baseClass}__content`]}>
        {isTextContent ? <Text as="div">{children}</Text> : children}
      </div>
      {(action || removable) && (
        <div className={styles[`${baseClass}__actions`]}>
          {action && (
            <Button
              className={styles[`${baseClass}__actions--custom`]}
              kind="text"
              size="compact"
              onClick={() => onActionClick(action)}
            >
              {action.label}
            </Button>
          )}
          {removable && (
            <Button
              className={cx(
                styles[`${baseClass}__actions__button`],
                styles[`${baseClass}__actions__button--${kind}`]
              )}
              aria-label="Close toast"
              kind="text"
              size="compact"
              onClick={onClose}
              icon={<Icon name="Close" size="medium" />}
            />
          )}
        </div>
      )}
    </div>
  );
};
