import * as React from 'react';
import cx from 'clsx';

import { ButtonProps } from '../Button';

import styles from './ButtonGroup.module.scss';

import noop from '../../utils/noop';
import { Size } from 'utils';

const baseClass = 'btn-group';

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  currentIndex?: number;
  initialIndex?: number;
  fullWidth?: boolean;
  size?: Size;
  children: ReadonlyArray<
    React.ReactElement<React.PropsWithChildren<ButtonProps>>
  >;
  onIndexChange?: (
    currentIndex: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  size = 'medium',
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
            i === _currentIndex && styles['btn--active']
          ),
        })
      )}
    </div>
  );
};
