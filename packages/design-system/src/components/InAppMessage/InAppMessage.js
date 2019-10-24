import * as React from 'react';
import * as PropTypes from 'prop-types';
import InAppMessageBase from './InAppMessageBase';
import InAppMessageImage from './InAppMessageImage';
import InAppMessageBody from './InAppMessageBody';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'inapp';

const InAppMessage = props => {
  const { image: imageProps, children, className, ...restProps } = props;

  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}`],
    className
  );

  return (
    <InAppMessageBase className={mergedClassNames} {...restProps}>
      {imageProps && <InAppMessageImage {...imageProps} />}
      <InAppMessageBody>{children}</InAppMessageBody>
    </InAppMessageBase>
  );
};

InAppMessage.propTypes = {
  ...InAppMessageBase.propTypes,
  image: PropTypes.shape({ ...InAppMessageImage.propTypes })
};

export default InAppMessage;
