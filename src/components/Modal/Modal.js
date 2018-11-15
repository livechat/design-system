import * as React from 'react';
import * as PropTypes from 'prop-types';
import ModalBase from './ModalBase';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'action-modal';

const Modal = props => {
  const { title, footer, children, className, ...restProps } = props;

  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}`],
    className
  );

  return (
    <ModalBase className={mergedClassNames} {...restProps}>
      {title && <ModalHeader>{title}</ModalHeader>}
      <ModalBody>{children}</ModalBody>
      <ModalFooter>{footer}</ModalFooter>
    </ModalBase>
  );
};

Modal.propTypes = {
  ...ModalBase.propTypes,
  title: PropTypes.node,
  footer: PropTypes.node.isRequired
};

export default Modal;
