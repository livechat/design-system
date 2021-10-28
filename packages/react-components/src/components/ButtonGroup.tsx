import * as React from 'react';
import cx from 'classnames';

import { ButtonSize } from './Button';

import noop from '../utils/noop';

const baseClass = 'lc-btn-group';

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  currentIndex?: number;
  fullWidth?: boolean;
  size?: ButtonSize;
  onIndexChange?: (currentIndex: number, event: React.PointerEvent) => void;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  size = 'medium',
  fullWidth = false,
  onIndexChange = noop,
  className,
  children,
  currentIndex,
  ...restProps
}) => {
  const mergedClassName = cx(baseClass, className);
  const [currentStateIndex, setCurrentStateIndex] = React.useState(-1);

  const isControlled = typeof currentIndex === 'number';

  const _currentIndex = isControlled ? currentIndex : currentStateIndex;

  const handleClick = (index: number, event: React.PointerEvent) => {
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
          onClick: (event: React.PointerEvent) => {
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
