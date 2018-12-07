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
      {props.avatar && (
        <InAppAvatar src={props.avatar} alt={props.who} />
      )}
      {(props.who || props.text) && (
        <div className={styles[`${baseClass}__heading`]}>
          {props.who && (
            <strong>{props.who} </strong>
          )}
          {props.text}
        </div>
      )}
      <InAppCloseButton onClick={props.onCloseButtonClick} />
    </div>
  );
};

InAppHeader.propTypes = {
  className: PropTypes.string,
  avatar: PropTypes.string,
  who: PropTypes.string,
  text: PropTypes.string,
  onCloseButtonClick: PropTypes.func.isRequired
};

export default InAppHeader;
