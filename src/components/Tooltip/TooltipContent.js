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
  children
}) => {
  const componentClassNames = `
    ${cx({
      tooltip__content: true,
      [`tooltip__arrow--${arrowPosition}`]: true
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
      {children}
    </div>
  );
};

TooltipContent.propTypes = {
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  fontColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  arrowPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom'])
};

TooltipContent.defaultProps = {
  arrowPosition: 'left',
  fontColor: '#fff',
  backgroundColor: '#3a343c',
  className: ''
};

export default TooltipContent;
