import * as React from 'react';
import cx from 'clsx';

import { ButtonSize, ButtonProps } from '../Button';

import styles from './SegmentedControl.module.scss';

import noop from '../../utils/noop';

const baseClass = 'segmented-control';

export type ButtonState =
  | 'active'
  | 'hover'
  | 'enabled'
  | 'disabled'
  | 'loading';

export type SegmentedControlState = { [index: number]: ButtonState };

export interface SegmentedControlProps
  extends React.HTMLAttributes<HTMLDivElement> {
  currentIndex?: number;
  initialIndex?: number;
  fullWidth?: boolean;
  size?: ButtonSize;
  state?: SegmentedControlState;
  children: ReadonlyArray<
    React.ReactElement<React.PropsWithChildren<ButtonProps>>
  >;
  onIndexChange?: (
    currentIndex: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  size = 'medium',
  state,
  fullWidth = false,
  onIndexChange = noop,
  className,
  children,
  currentIndex,
  initialIndex = -1,
  ...restProps
}) => {
  const mergedClassName = cx(styles[baseClass], className);
  const [currentStateIndex, setCurrentStateIndex] =
    React.useState(initialIndex);

  const isControlled = typeof currentIndex === 'number';

  const _currentIndex = isControlled ? currentIndex : currentStateIndex;

  const handleClick = (index: number, event: any) => {
    if (!isControlled) {
      setCurrentStateIndex(index);
    }

    onIndexChange(index, event);
  };

  return (
    <div role="group" className={mergedClassName} {...restProps}>
      {React.Children.map(children, (child, i) =>
        React.cloneElement(child, {
          fullWidth,
          size,
          kind: 'secondary',
          loading: state?.[i] === 'loading' ? true : false,
          type: 'button',
          onClick: (event: any) => {
            handleClick(i, event);
            if (child.props.onClick) {
              child.props.onClick(event);
            }
          },
          className: cx(
            styles['btn'],
            styles[`btn--${size as string}`],
            i === _currentIndex && styles['btn--active'],
            styles[`btn--${state?.[i]}`]
          ),
        })
      )}
    </div>
  );
};