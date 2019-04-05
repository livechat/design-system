import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import memoizeOne from 'memoize-one';
import styles from './style.scss';

const baseClass = 'css-tooltip';

function handleTooltipOnClick(event) {
  event.stopPropagation();
}

function handleTooltipFocus(event) {
  event.stopPropagation();
}

class CssTooltip extends React.PureComponent {
  static buildArrowStyle = (
    arrowOffsetTop,
    arrowOffsetBottom,
    arrowOffsetLeft,
    arrowOffsetRight
  ) => {
    const style = {};

    if (arrowOffsetTop) {
      style.top = arrowOffsetTop;
    }

    if (arrowOffsetBottom) {
      style.bottom = arrowOffsetBottom;
    }
    if (arrowOffsetLeft) {
      style.left = arrowOffsetLeft;
    }
    if (arrowOffsetRight) {
      style.right = arrowOffsetRight;
    }
    return style;
  };

  getArrowStyle = memoizeOne(CssTooltip.buildArrowStyle);

  render() {
    const {
      children,
      className,
      isArrowDisabled,
      isVisible,
      placement,
      arrowOffsetTop,
      arrowOffsetBottom,
      arrowOffsetLeft,
      arrowOffsetRight,
      arrowClassName,
      onClick,
      ...restProps
    } = this.props;

    const arrowStyle = this.getArrowStyle(
      arrowOffsetTop,
      arrowOffsetBottom,
      arrowOffsetLeft,
      arrowOffsetRight
    );

    return (
      <div
        {...restProps}
        data-placement={placement}
        className={cx({
          [styles[baseClass]]: true,
          [styles[`${baseClass}--visible`]]: isVisible,
          [className]: className
        })}
        onFocus={handleTooltipFocus}
        onClick={onClick || handleTooltipOnClick}
      >
        {children}
        <div
          className={cx({
            [styles[`${baseClass}__arrow`]]: true,
            [arrowClassName]: arrowClassName
          })}
          style={arrowStyle}
          data-placement={placement}
        />
      </div>
    );
  }
}

CssTooltip.propTypes = {
  arrowClassName: PropTypes.string,
  isArrowDisabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isVisible: PropTypes.bool,
  onClick: PropTypes.func,
  placement: PropTypes.oneOf([
    'bottom',
    'bottom-end',
    'bottom-start',
    'left',
    'left-end',
    'left-start',
    'right',
    'right-end',
    'right-start',
    'top',
    'top-end',
    'top-start'
  ]),
  arrowOffsetTop: PropTypes.string,
  arrowOffsetBottom: PropTypes.string,
  arrowOffsetLeft: PropTypes.string,
  arrowOffsetRight: PropTypes.string
};

export default CssTooltip;
