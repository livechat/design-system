import * as React from 'react';

import AlertIcon from 'react-material-icon-svg/dist/AlertIcon';
import InformationOutlineIcon from 'react-material-icon-svg/dist/InformationOutlineIcon';
import BlockHelperIcon from 'react-material-icon-svg/dist/BlockHelperIcon';
import CheckCircleIcon from 'react-material-icon-svg/dist/CheckCircleIcon';

const baseClass = 'banner__icon';

export const BannerIcon = (props) => {
  const { type } = props;

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
        <AlertIcon
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
  }
};

BannerIcon.propTypes = {
  type: PropTypes.oneOf(['info', 'warning', 'success', 'error']).isRequired,
};
