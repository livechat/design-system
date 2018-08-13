import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { ARROW_POSITION, ALIGMENT } from './constants';
import { getArrowOffsetStyle } from './helpers';
import styles from './style.css';

const cx = classNames.bind(styles);

const TooltipContent = ({
  backgroundColor,
  className,
  fontColor,
  arrowPosition,
  children,
  arrowOffset,
  align
}) => {
  const componentClassNames = `
    ${cx({
      tooltip__content: true
    })} ${className}
  `;

  return (
    <div
      className={componentClassNames}
      style={{
        backgroundColor,
        color: fontColor,
        borderColor: backgroundColor
      }}
    >
      <div
        className={cx({
          tooltip__arrow: true,
          [`tooltip__arrow--${arrowPosition}`]: true
        })}
        style={getArrowOffsetStyle(arrowOffset, arrowPosition, align)}
      />
      {children}
    </div>
  );
};

TooltipContent.propTypes = {
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  fontColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  arrowPosition: PropTypes.oneOf([
    ARROW_POSITION.Left,
    ARROW_POSITION.Right,
    ARROW_POSITION.Top,
    ARROW_POSITION.Bottom
  ]),
  align: PropTypes.oneOf([
    ALIGMENT.Top,
    ALIGMENT.Bottom,
    ALIGMENT.Left,
    ALIGMENT.Right,
    ALIGMENT.Center
  ]),
  arrowOffset: PropTypes.number
};

TooltipContent.defaultProps = {
  arrowPosition: ARROW_POSITION.Left,
  fontColor: '#fff',
  backgroundColor: '#3a343c',
  className: ''
};

export default TooltipContent;
