import * as React from 'react';
import cx from 'classnames';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { IToastProps, Toast } from './Toast';

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

const baseClass = 'lc-toast-wrapper';

export interface IToastsProps extends IToastProps {
  id: string;
  content: React.ReactElement | string;
}

export interface IToastWrapperProps {
  className?: string;
  toasts: IToastsProps[];
  fixed?: boolean;
  block?: boolean;
  animationType?: string;
  verticalPosition?: VerticalPosition;
  horizontalPosition?: HorizontalPosition;
}

export const ToastWrapper: React.FC<IToastWrapperProps> = ({
  className,
  toasts = [],
  fixed = true,
  block = false,
  animationType = 'slide',
  verticalPosition = 'top',
  horizontalPosition = 'center',
}) => {
  const mergedClassNames = cx(
    baseClass,
    {
      [`${baseClass}--fixed`]: fixed,
      [`${baseClass}--block`]: !fixed && block,
      [`${baseClass}--horizontal-${horizontalPosition}`]: horizontalPosition,
      [`${baseClass}--vertical-${verticalPosition}`]: verticalPosition,
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
              enter: `lc-toast-appear--${animationType}`,
              enterActive: `lc-toast-appear-active--${animationType}`,
              exit: `lc-toast-exit--${animationType}`,
              exitActive: `lc-toast-exit-active--${animationType}`,
            }}
            timeout={ANIMATION_TIME}
          >
            <Toast
              variant={variant}
              onClose={onClose}
              removable={removable}
              action={action}
              className="lc-toast__single"
            >
              {content}
            </Toast>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};
