import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.css';

const cx = classNames.bind(styles);

const TooltipContent = ({
  backgroundColor,
  className,
  fontColor,
  arrowPosition,
  children,
  arrowOffset
}) => {
  const componentClassNames = `
    ${cx({
      tooltip__content: true
    })} ${className}
  `;

  const getArrowOffset = () => {
    if (!arrowOffset) {
      return {};
    }
    if (arrowPosition === 'left' || arrowPosition === 'right') {
      return { top: `${arrowOffset}px` };
    } else if (arrowPosition === 'top' || arrowPosition === 'bottom') {
      return { left: `${arrowOffset}px` };
    }
    return {};
  };

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
        style={getArrowOffset()}
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
  arrowPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  arrowOffset: PropTypes.number
};

TooltipContent.defaultProps = {
  arrowPosition: 'left',
  fontColor: '#fff',
  backgroundColor: '#3a343c',
  className: ''
};

export default TooltipContent;
