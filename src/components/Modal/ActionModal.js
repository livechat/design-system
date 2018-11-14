import * as React from 'react';
import * as PropTypes from 'prop-types';
import Modal from './Modal';
import ActionModalHeader from './ActionModalHeader';
import ActionModalBody from './ActionModalBody';
import ActionModalFooter from './ActionModalFooter';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'action-modal';

const ActionModal = props => {
  const { title, footer, children, className, ...restProps } = props;

  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}`],
    className
  );

  return (
    <Modal className={mergedClassNames} {...restProps}>
      {title && <ActionModalHeader>{title}</ActionModalHeader>}
      <ActionModalBody>{children}</ActionModalBody>
      <ActionModalFooter>{footer}</ActionModalFooter>
    </Modal>
  );
};

ActionModal.propTypes = {
  ...Modal.propTypes,
  title: PropTypes.node,
  footer: PropTypes.node.isRequired
};

export default ActionModal;
