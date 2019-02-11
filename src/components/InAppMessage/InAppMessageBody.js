import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'inapp__body';

const InAppMessageBody = props => {
  const { className, children, ...restProps } = props;
  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}`],
    className
  );

  return (
    <div {...restProps} className={mergedClassNames}>
      {children}
    </div>
  );
};

InAppMessageBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default InAppMessageBody;
