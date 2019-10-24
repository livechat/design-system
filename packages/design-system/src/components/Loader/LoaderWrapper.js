import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const cx = classNames.bind(styles);

const baseClass = 'loader-wrapper';

export const LoaderWrapper = props => {
  const { className, isLoading, children, ...restProps } = props;

  const mergedClassNames = getMergedClassNames(
    cx({
      [baseClass]: true,
      [`${baseClass}--hidden`]: isLoading !== undefined && !isLoading
    }),
    className
  );

  return (
    <div {...restProps} className={mergedClassNames}>
      {children}
    </div>
  );
};

LoaderWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  className: PropTypes.string,
  isLoading: PropTypes.bool
};
