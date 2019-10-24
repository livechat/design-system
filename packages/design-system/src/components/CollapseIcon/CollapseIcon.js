import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const cx = classNames.bind(styles);

const baseClass = 'collapse-icon';

const CollapseIcon = ({ isExpanded, className, ...restProps }) => {
  const mergedClassNames = getMergedClassNames(
    cx({
      [baseClass]: true,
      [`${baseClass}--expanded`]: isExpanded
    }),
    className
  );

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...restProps}
      className={mergedClassNames}
    >
      <path
        className={styles[`${baseClass}__top-arrow`]}
        d="M7 18V16H3.41L7.91 11.5L6.5 10.09L2 14.59V11H0V18H7Z"
      />
      <path
        className={styles[`${baseClass}__bottom-arrow`]}
        d="M11.5001 7.91L16.0001 3.41V7H18.0001V0H11.0001V2H14.5901L10.0901 6.5L11.5001 7.91Z"
      />
    </svg>
  );
};

CollapseIcon.propTypes = {
  className: PropTypes.string,
  isExpanded: PropTypes.bool
};

export default CollapseIcon;
