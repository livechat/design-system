import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './style.scss';

const baseClass = 'css-tooltip';

function handleTooltipOnClick(event) {
  event.stopPropagation();
}

function handleTooltipFocus(event) {
  event.stopPropagation();
}

const CssTooltip = props => {
  const {
    children,
    className,
    isVisible,
    placement,
    width,
    style,
    arrowOffsetTop,
    arrowOffsetBottom,
    arrowOffsetLeft,
    arrowOffsetRight,
    arrowClassName,
    offsetTop,
    offsetBottom,
    offsetLeft,
    offsetRight,
    ...restProps
  } = props;

  return (
    <div
      {...restProps}
      data-placement={placement}
      className={cx({
        [styles[baseClass]]: true,
        [styles[`${baseClass}--visible`]]: isVisible,
        [className]: className
      })}
      style={{
        top: offsetTop,
        bottom: offsetBottom,
        left: offsetLeft,
        right: offsetRight,
        width,
        ...(style || {})
      }}
    >
      {children}
      <div
        className={cx({
          [styles[`${baseClass}__arrow`]]: true,
          [arrowClassName]: arrowClassName
        })}
        style={{
          top: arrowOffsetTop,
          bottom: arrowOffsetBottom,
          left: arrowOffsetLeft,
          right: arrowOffsetRight
        }}
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
  style: PropTypes.object,
  isVisible: PropTypes.bool,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  width: PropTypes.string,
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
  arrowOffsetRight: PropTypes.string,
  /**
   * Use `offsetTop`, `offsetBottom`, `offsetLeft` or `offsetRight`
   * to control offset of tooltip from one of the edges of reference element
   */
  offsetTop: PropTypes.string,
  offsetBottom: PropTypes.string,
  offsetLeft: PropTypes.string,
  offsetRight: PropTypes.string
};

export default CssTooltip;
