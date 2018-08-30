import React from 'react';
import PropTypes from 'prop-types';
import CheckCircleIcon from 'react-material-icon-svg/dist/CheckCircleIcon';
import AlertIcon from 'react-material-icon-svg/dist/AlertIcon';
import AlertCircleIcon from 'react-material-icon-svg/dist/AlertCircleIcon';
import InformationIcon from 'react-material-icon-svg/dist/InformationIcon';

export const ToastIcon = props => {
  switch (props.toastType) {
    case 'success':
      return <CheckCircleIcon />;
    case 'warning':
      return <AlertIcon />;
    case 'error':
      return <AlertCircleIcon />;
    default:
      return <InformationIcon />;
  }
};

ToastIcon.propTypes = {
  toastType: PropTypes.string
};
