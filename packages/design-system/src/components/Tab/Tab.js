import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';

const noop = () => {};
const cx = classNames.bind(styles);

const Tab = ({ onSelect, href, isSelected, children, description }) => {
  const Component = props => (href ? <a {...props} /> : <button {...props} />);

  return (
    <Component
      href={href}
      onClick={onSelect}
      className={cx({
        tab: true,
        'tab--selected': isSelected
      })}
    >
      {children}
      {description && (
        <span className={styles.tab__description}>({description})</span>
      )}
    </Component>
  );
};

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  onSelect: PropTypes.func,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  href: PropTypes.string,
  isSelected: PropTypes.bool
};

Tab.defaultProps = {
  onSelect: noop,
  description: null,
  href: null,
  isSelected: false
};

export default Tab;
