import * as React from 'react';
import * as PropTypes from 'prop-types';
import ModalBase from './ModalBase';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'modal';

const Modal = props => {
  const { heading, footer, children, className, ...restProps } = props;

  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}`],
    className
  );

  return (
    <ModalBase className={mergedClassNames} {...restProps}>
      {heading && <ModalHeader>{heading}</ModalHeader>}
      <ModalBody>{children}</ModalBody>
      {footer && <ModalFooter>{footer}</ModalFooter>}
    </ModalBase>
  );
};

Modal.propTypes = {
  ...ModalBase.propTypes,
  heading: PropTypes.node,
  footer: PropTypes.node
};

export default Modal;
