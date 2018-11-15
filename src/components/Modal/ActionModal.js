import * as React from 'react';
import * as PropTypes from 'prop-types';
import ModalBase from './ModalBase';
import ActionModalTitle from './ActionModalTitle';
import ActionModalActions from './ActionModalActions';
import ActionModalContent from './ActionModalContent';
import ActionModalIcon from './ActionModalIcon';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'popup-modal';

const ActionModal = props => {
  const { title, actions, icon, children, className, ...restProps } = props;

  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}`],
    className
  );

  return (
    <ModalBase className={mergedClassNames} {...restProps}>
      {icon && <ActionModalIcon>{icon}</ActionModalIcon>}
      {title && <ActionModalTitle>{title}</ActionModalTitle>}
      <ActionModalContent>{children}</ActionModalContent>
      <ActionModalActions>{actions}</ActionModalActions>
    </ModalBase>
  );
};

ActionModal.propTypes = {
  ...ModalBase.propTypes,
  icon: PropTypes.node,
  title: PropTypes.node,
  actions: PropTypes.node.isRequired
};

export default ActionModal;
