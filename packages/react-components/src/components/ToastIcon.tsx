import * as React from 'react';

import { Variants } from './Toast';
// TODO: remove and use the Icon wrapper with correct icon after migration
import CheckCircleIcon from 'react-material-icon-svg/dist/CheckCircleIcon';
import AlertIcon from 'react-material-icon-svg/dist/AlertIcon';
import AlertCircleIcon from 'react-material-icon-svg/dist/AlertCircleIcon';
import InformationIcon from 'react-material-icon-svg/dist/InformationIcon';

interface IToastIconProps {
  variant: Variants;
}

export const ToastIcon: React.FC<IToastIconProps> = ({ variant }) => {
  switch (variant) {
    case Variants.Success:
      return <CheckCircleIcon />;
    case Variants.Warning:
      return <AlertIcon />;
    case Variants.Error:
      return <AlertCircleIcon />;
    default:
      return <InformationIcon />;
  }
};
