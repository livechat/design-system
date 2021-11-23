import * as React from 'react';
import cx from 'classnames';

import { ButtonSize, ButtonProps } from './Button';

import noop from '../utils/noop';

const baseClass = 'lc-btn-group';

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  currentIndex?: number;
  initialIndex?: number;
  fullWidth?: boolean;
  size?: ButtonSize;
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
  const mergedClassName = cx(baseClass, className);
  const [currentStateIndex, setCurrentStateIndex] =
    React.useState(initialIndex);

  const isControlled = typeof currentIndex === 'number';

  const _currentIndex = isControlled ? currentIndex : currentStateIndex;

  const handleClick = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
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
          onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
            handleClick(i, event);
            if (child.props.onClick) {
              child.props.onClick(event);
            }
          },
          className: cx(i === _currentIndex && 'lc-btn--active'),
        })
      )}
    </div>
  );
};
