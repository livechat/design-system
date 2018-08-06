import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.css';

const cx = classNames.bind(styles);

const TooltipContent = ({
  backgroundColor,
  className, // eslint-disable-line
  fontColor,
  arrowPosition,
  arrowOffset,
  children
}) => (
  <div
    className={cx({
      'tooltip-content': true,
      [`tooltip-content-arrow-${arrowPosition}`]: true,
      'tooltip-conent-arrow-no-offset': !arrowOffset
    })}
    style={{
      backgroundColor,
      color: fontColor,
      borderColor: backgroundColor,
      top: arrowOffset ? `${arrowOffset}px` : null
    }}
  >
    {children}
  </div>
);

TooltipContent.propTypes = {
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  fontColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  arrowPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  arrowOffset: PropTypes.number
};

TooltipContent.defaultProps = {
  arrowPosition: 'left',
  fontColor: '#fff',
  className: null,
  backgroundColor: '#3a343c',
  arrowOffset: null
};

/** @component */
export default TooltipContent;
