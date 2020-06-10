import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import getMergedClassNames from '../../utils/getMergedClassNames';
import styles from './style.scss';

const cx = classNames.bind(styles);

export const ButtonIcon = ({ position, children }) => {
  const baseClass = 'btn__icon';
  const classes = getMergedClassNames(
    cx({
      [`${baseClass}`]: true,
      [`${baseClass}-left`]: position === 'left',
      [`${baseClass}-right`]: position === 'right'
    })
  );
  return <i className={classes}>{children}</i>;
};

ButtonIcon.propTypes = {
  position: PropTypes.oneOf(['left', 'right']).isRequired,
  children: PropTypes.node.isRequired
};
