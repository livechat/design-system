import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const noop = () => {};
const cx = classNames.bind(styles);

const Tab = ({
  children,
  className,
  description,
  href,
  isSelected,
  onClick,
  onSelect,
  ...restProps
}) => {
  const Component = props => (href ? <a {...props} /> : <button {...props} />);

  const mergedClassNames = getMergedClassNames(
    cx({
      tab: true,
      'tab--selected': isSelected
    }),
    className
  );

  return (
    <Component
      {...restProps}
      href={href}
      onClick={onSelect || onClick || noop}
      className={mergedClassNames}
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
  className: PropTypes.string,
  onSelect: PropTypes.func,
  onClick: PropTypes.func,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node
  ]),
  href: PropTypes.string,
  isSelected: PropTypes.bool
};

Tab.defaultProps = {
  description: null,
  href: null,
  isSelected: false
};

export default Tab;
