import * as React from 'react';
import * as PropTypes from 'prop-types';
import InAppBase from './InAppBase';
import ActionInAppHeading from './ActionInAppHeading';
import ActionInAppActions from './ActionInAppActions';
import ActionInAppContent from './ActionInAppContent';
import ActionInAppIcon from './ActionInAppIcon';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'action-inapp';

const ActionInApp = props => {
  const { heading, actions, icon, children, className, ...restProps } = props;

  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}`],
    className
  );

  return (
    <InAppBase className={mergedClassNames} {...restProps}>
      {icon && <ActionInAppIcon>{icon}</ActionInAppIcon>}
      {heading && <ActionInAppHeading>{heading}</ActionInAppHeading>}
      <ActionInAppContent>{children}</ActionInAppContent>
      {actions && <ActionInAppActions>{actions}</ActionInAppActions>}
    </InAppBase>
  );
};

ActionInApp.propTypes = {
  ...InAppBase.propTypes,
  icon: PropTypes.node,
  heading: PropTypes.node,
  actions: PropTypes.node
};

export default ActionInApp;
