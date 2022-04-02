import * as React from 'react';
import cx from 'clsx';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { ToastProps, Toast } from './Toast';

import styles from './Toast.module.scss';

export enum HorizontalPosition {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export enum VerticalPosition {
  Top = 'top',
  Bottom = 'bottom',
}

export const ANIMATION_TIME = 200;

const baseClass = 'toast-wrapper';

interface Toast extends ToastProps {
  id: string;
  content: React.ReactElement | string;
}

export interface ToastWrapperProps {
  className?: string;
  toasts: Toast[];
  fixed?: boolean;
  block?: boolean;
  animationType?: string;
  verticalPosition?: VerticalPosition;
  horizontalPosition?: HorizontalPosition;
}

export const ToastWrapper: React.FC<ToastWrapperProps> = ({
  className,
  toasts = [],
  fixed = true,
  block = false,
  animationType = 'slide',
  verticalPosition = 'top',
  horizontalPosition = 'center',
}) => {
  const mergedClassNames = cx(
    styles[baseClass],
    {
      [styles[`${baseClass}--fixed`]]: fixed,
      [styles[`${baseClass}--block`]]: !fixed && block,
      [styles[`${baseClass}--horizontal-${horizontalPosition}`]]:
        horizontalPosition,
      [styles[`${baseClass}--vertical-${verticalPosition}`]]: verticalPosition,
    },
    className
  );

  return (
    <div className={mergedClassNames}>
      <TransitionGroup component={null}>
        {toasts.map(({ id, variant, content, removable, action, onClose }) => (
          <CSSTransition
            key={id}
            classNames={{
              enter: styles[`toast-appear--${animationType}`],
              enterActive: styles[`toast-appear-active--${animationType}`],
              exit: styles[`toast-exit--${animationType}`],
              exitActive: styles[`toast-exit-active--${animationType}`],
            }}
            timeout={ANIMATION_TIME}
          >
            <Toast
              variant={variant}
              onClose={onClose}
              removable={removable}
              action={action}
            >
              {content}
            </Toast>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};
