import React from 'react';
import PropTypes from 'prop-types';
import MaterialAlertCircleIcon from 'react-material-icon-svg/dist/AlertCircleIcon';

const AlertCircleIcon = ({ fill, height, width, className, ...restProps }) => (
  <MaterialAlertCircleIcon
    {...restProps}
    fill={fill}
    height={height}
    width={width}
    className={className}
  />
);

AlertCircleIcon.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  className: PropTypes.string
};

export default AlertCircleIcon;
