import * as React from 'react';
import * as PropTypes from 'prop-types';
import ModalBase from './ModalBase';
import ActionModalHeading from './ActionModalHeading';
import ActionModalActions from './ActionModalActions';
import ActionModalContent from './ActionModalContent';
import ActionModalIcon from './ActionModalIcon';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'action-modal';

const ActionModal = props => {
  const { heading, actions, icon, children, className, ...restProps } = props;

  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}`],
    className
  );

  return (
    <ModalBase className={mergedClassNames} {...restProps}>
      {icon && <ActionModalIcon>{icon}</ActionModalIcon>}
      {heading && <ActionModalHeading>{heading}</ActionModalHeading>}
      <ActionModalContent>{children}</ActionModalContent>
      {actions && <ActionModalActions>{actions}</ActionModalActions>}
    </ModalBase>
  );
};

ActionModal.propTypes = {
  ...ModalBase.propTypes,
  icon: PropTypes.node,
  heading: PropTypes.node,
  actions: PropTypes.node
};

export default ActionModal;
