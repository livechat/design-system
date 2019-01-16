import * as React from 'react';
import * as PropTypes from 'prop-types';
import InAppBase from './InAppBase';
import InAppImage from './InAppImage';
import InAppBody from './InAppBody';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'inapp';

const InApp = props => {
  const { imageSrc, imageAlt, children, className, ...restProps } = props;

  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}`],
    className
  );

  return (
    <InAppBase className={mergedClassNames} {...restProps}>
      {imageSrc && <InAppImage src={imageSrc} alt={imageAlt} />}
      <InAppBody>{children}</InAppBody>
    </InAppBase>
  );
};

InApp.propTypes = {
  ...InAppBase.propTypes,
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string
};

export default InApp;
