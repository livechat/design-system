import * as React from 'react';
import * as PropTypes from 'prop-types';
import Modal from './Modal';
import PopupModalTitle from './PopupModalTitle';
import PopupModalActions from './PopupModalActions';
import PopupModalContent from './PopupModalContent';
import PopupModalIcon from './PopupModalIcon';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'popup-modal';

const PopupModal = props => {
  const { title, actions, icon, children, className, ...restProps } = props;

  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}`],
    className
  );

  return (
    <Modal className={mergedClassNames} {...restProps}>
      <PopupModalIcon>{icon}</PopupModalIcon>
      <PopupModalTitle>{title}</PopupModalTitle>
      <PopupModalContent>{children}</PopupModalContent>
      <PopupModalActions>{actions}</PopupModalActions>
    </Modal>
  );
};

PopupModal.propTypes = {
  ...Modal.propTypes,
  icon: PropTypes.node,
  title: PropTypes.node,
  actions: PropTypes.node
};

export default PopupModal;
