import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const cx = classNames.bind(styles);

const ModalOverlay = props => {
  const baseClass = 'modal-mask';
  const mergedClassNames = getMergedClassNames(
    cx({
      [`${baseClass}`]: true,
      [`${baseClass}--visible`]: props.isOpen
    }),
    props.className
  );

  return (
    <div className={mergedClassNames} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

ModalOverlay.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  isOpen: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default ModalOverlay;
