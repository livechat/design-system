import * as React from 'react';
import * as PropTypes from 'prop-types';
import InAppBase from './InAppBase';
import InAppImage from './InAppImage';
import InAppBody from './InAppBody';
import InAppFooter from './InAppFooter';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'inapp';

const InApp = props => {
  const {
    imageSrc,
    imageAlt,
    footer,
    children,
    className,
    ...restProps
  } = props;

  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}`],
    className
  );

  return (
    <InAppBase className={mergedClassNames} {...restProps}>
      {imageSrc && <InAppImage src={imageSrc} alt={imageAlt} />}
      <InAppBody>{children}</InAppBody>
      <InAppFooter>{footer}</InAppFooter>
    </InAppBase>
  );
};

InApp.propTypes = {
  ...InAppBase.propTypes,
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  heading: PropTypes.node,
  footer: PropTypes.node.isRequired
};

export default InApp;
