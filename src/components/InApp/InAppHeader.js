import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import InAppAvatar from './InAppAvatar';
import InAppCloseButton from './InAppCloseButton';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'inapp';

const InAppHeader = props => {
  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}__header`],
    props.className
  );

  return (
    <div className={mergedClassNames}>
      {props.avatar && <InAppAvatar src={props.avatar} alt="" />}
      {props.from && (
        <div className={styles[`${baseClass}__heading`]}>{props.from}</div>
      )}
      <InAppCloseButton onClick={props.onCloseButtonClick} />
    </div>
  );
};

InAppHeader.propTypes = {
  className: PropTypes.string,
  avatar: PropTypes.string,
  from: PropTypes.node,
  onCloseButtonClick: PropTypes.func.isRequired
};

export default InAppHeader;
