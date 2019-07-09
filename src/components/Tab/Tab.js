import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const cx = classNames.bind(styles);

const Component = React.forwardRef((props, ref) => {
  if (props.href) {
    return <a ref={ref} {...props} />;;
  }
  return <button ref={ref} {...props} />;;
});;

const Tab = ({
  children,
  className,
  description,
  href,
  isSelected,
  innerRef,
  ...restProps
}) => {
  const mergedClassNames = getMergedClassNames(
    cx({
      tab: true,
      'tab--selected': isSelected
    }),
    className
  );

  const isDescriptionProvided = description !== null;

  return (
    <Component
      {...restProps}
      ref={innerRef}
      href={href}
      className={mergedClassNames}
    >
      {children}
      {isDescriptionProvided && (
        <span className={styles.tab__description}>({description})</span>
      )}
    </Component>
  );
};

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
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

export default React.forwardRef((props, ref) => (
  <Tab innerRef={ref} {...props} />
));
