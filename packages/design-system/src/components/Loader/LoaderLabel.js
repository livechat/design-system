import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const cx = classNames.bind(styles);

const baseClass = 'loader-label';

export const LoaderLabel = props => {
  const { className, children, ...restProps } = props;

  const mergedClassNames = getMergedClassNames(cx(baseClass), className);

  return (
    <div className={mergedClassNames} {...restProps}>
      {children}
    </div>
  );
};

LoaderLabel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};
