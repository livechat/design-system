import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';
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
    theme,
    zIndex,
    arrowOffsetTop,
    arrowOffsetBottom,
    arrowOffsetLeft,
    arrowOffsetRight,
    arrowClassName,
    offsetTop,
    offsetBottom,
    offsetLeft,
    offsetRight,
    onClose,
    ...restProps
  } = props;

  return (
    <div
      {...restProps}
      data-placement={placement}
      className={cx({
        [styles[baseClass]]: true,
        [styles[`${baseClass}--visible`]]: isVisible,
        [styles[`${baseClass}--${theme}`]]: theme,
        [className]: className
      })}
      style={{
        top: offsetTop,
        bottom: offsetBottom,
        left: offsetLeft,
        right: offsetRight,
        zIndex,
        width,
        ...(style || {})
      }}
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className={styles[`${baseClass}__close`]}
        >
          <CloseIcon width="16px" height="16px" />
        </button>
      )}
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
  /**
   * The theme changes the look of the tooltip.
   */
  theme: PropTypes.oneOf(['invert', 'important']),
  isVisible: PropTypes.bool,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  /**
   * If provided, there will be an X button added to the tooltip that will invoke this callback when clicked.
   */
  onClose: PropTypes.func,
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
  offsetRight: PropTypes.string,
  zIndex: PropTypes.number
};

export default CssTooltip;
