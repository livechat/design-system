import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './style.scss';

const TabsWrapper = ({ children, className, ...restProps }) => (
  <div {...restProps} className={cx(styles.tabs, { [className]: className })}>
    {children}
  </div>
);

TabsWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default TabsWrapper;
