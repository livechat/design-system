import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'action-modal__icon';

const ActionModalIcon = props => {
  const { className, children, ...restProps } = props;
  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}`],
    props.className
  );

  return (
    <div {...restProps} className={mergedClassNames}>
      {props.children}
    </div>
  );
};

ActionModalIcon.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default ActionModalIcon;
