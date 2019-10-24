import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'action-modal__heading';

const ActionModalHeading = props => {
  const { className, children, ...restProps } = props;
  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}`],
    props.className
  );

  return (
    <h2 {...restProps} className={mergedClassNames}>
      {props.children}
    </h2>
  );
};

ActionModalHeading.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default ActionModalHeading;
