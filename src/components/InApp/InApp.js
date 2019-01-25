import * as React from 'react';
import * as PropTypes from 'prop-types';
import InAppBase from './InAppBase';
import InAppImage from './InAppImage';
import InAppBody from './InAppBody';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'inapp';

const InApp = props => {
  const { image: imageProps, children, className, ...restProps } = props;

  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}`],
    className
  );

  return (
    <InAppBase className={mergedClassNames} {...restProps}>
      {imageProps && <InAppImage {...imageProps} />}
      <InAppBody>{children}</InAppBody>
    </InAppBase>
  );
};

InApp.propTypes = {
  ...InAppBase.propTypes,
  image: PropTypes.shape({ ...InAppImage.propTypes })
};

export default InApp;
