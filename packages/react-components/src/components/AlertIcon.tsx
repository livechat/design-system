import * as React from 'react';

import { AlertType } from './Alert';
// TODO: remove and use the Icon wrapper with correct icon after migration
import { default as WarningIcon } from 'react-material-icon-svg/dist/AlertIcon';
import InformationOutlineIcon from 'react-material-icon-svg/dist/InformationOutlineIcon';
import BlockHelperIcon from 'react-material-icon-svg/dist/BlockHelperIcon';
import CheckCircleIcon from 'react-material-icon-svg/dist/CheckCircleIcon';

const baseClass = 'alert__icon';

interface IAlertIconProps {
  type: AlertType;
}

export const AlertIcon: React.FC<IAlertIconProps> = ({ type }) => {
  switch (type) {
    case 'info':
      return (
        <InformationOutlineIcon
          fill="#4384f5"
          width="20px"
          height="20px"
          className={baseClass}
        />
      );
    case 'warning':
      return (
        <WarningIcon
          fill="#fb9d01"
          width="20px"
          height="20px"
          className={baseClass}
        />
      );
    case 'success':
      return (
        <CheckCircleIcon
          fill="#38c776"
          width="20px"
          height="20px"
          className={baseClass}
        />
      );
    case 'error':
      return (
        <BlockHelperIcon
          fill="#d64646"
          width="20px"
          height="20px"
          className={baseClass}
        />
      );
    default:
      return (
        <InformationOutlineIcon
          fill="#4384f5"
          width="20px"
          height="20px"
          className={baseClass}
        />
      );
  }
};
