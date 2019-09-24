import * as React from 'react';
import * as PropTypes from 'prop-types';
import CheckCircleIcon from 'react-material-icon-svg/dist/CheckCircleIcon';
import AlertIcon from 'react-material-icon-svg/dist/AlertIcon';
import AlertCircleIcon from 'react-material-icon-svg/dist/AlertCircleIcon';
import InformationIcon from 'react-material-icon-svg/dist/InformationIcon';
import { SUCCESS, WARNING, ERROR } from '../../constants/toast';

export const ToastIcon = ({ variant }) => {
  switch (variant) {
    case SUCCESS:
      return <CheckCircleIcon />;
    case WARNING:
      return <AlertIcon />;
    case ERROR:
      return <AlertCircleIcon />;
    default:
      return <InformationIcon />;
  }
};

ToastIcon.propTypes = {
  variant: PropTypes.string
};
