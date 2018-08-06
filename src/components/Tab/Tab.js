import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.css';

const noop = () => {};
const cx = classNames.bind(styles);

const Tab = ({ onSelect, href, isSelected, children, lightText }) => {
  const Component = props => (href ? <a {...props} /> : <button {...props} />);

  return (
    <Component
      href={href}
      onClick={onSelect}
      className={cx({
        tab: true,
        'tab-selected': isSelected
      })}
    >
      {children}
      {lightText && <span className={styles['light-text']}>({lightText})</span>}
    </Component>
  );
};

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  onSelect: PropTypes.func,
  lightText: PropTypes.string,
  href: PropTypes.string,
  isSelected: PropTypes.bool
};

Tab.defaultProps = {
  onSelect: noop,
  lightText: null,
  href: null,
  isSelected: false
};

export default Tab;
