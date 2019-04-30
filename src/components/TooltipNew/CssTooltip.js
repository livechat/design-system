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

function buildArrowStyle(offsetTop, offsetBottom, offsetLeft, offsetRight) {
  const style = {};

  if (offsetTop) {
    style.top = offsetTop;
  }

  if (offsetBottom) {
    style.bottom = offsetBottom;
  }
  if (offsetLeft) {
    style.left = offsetLeft;
  }
  if (offsetRight) {
    style.right = offsetRight;
  }
  return style;
}

const getArrowStyle = memoizeOne(buildArrowStyle);

const CssTooltip = props => {
  const {
    children,
    className,
    isVisible,
    placement,
    arrowOffsetTop,
    arrowOffsetBottom,
    arrowOffsetLeft,
    arrowOffsetRight,
    arrowClassName,
    ...restProps
  } = props;

  const arrowStyle = getArrowStyle(
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
};

CssTooltip.defaultProps = {
  onClick: handleTooltipOnClick,
  onFocus: handleTooltipFocus,
  placement: 'bottom'
};

CssTooltip.propTypes = {
  /**
   * Css class name of tooltip arrow.
   * Use this property to extend styles of tooltip arrow, it's a different way to, for instance control position of arrow
   */
  arrowClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
  /**
   * Css class name of tooltip.
   */
  className: PropTypes.string,
  isVisible: PropTypes.bool,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
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
  /**
   * Use `arrowOffsetTop`, `arrowOffsetBottom`, `arrowOffsetLeft` or `arrowOffsetRight`
   * to control offset of arrow from one of the edges of tooltip
   */
  arrowOffsetTop: PropTypes.string,
  arrowOffsetBottom: PropTypes.string,
  arrowOffsetLeft: PropTypes.string,
  arrowOffsetRight: PropTypes.string
};

export default CssTooltip;
