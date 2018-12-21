import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import InAppAvatar from './InAppAvatar';
import InAppCloseButton from './InAppCloseButton';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'inapp';

const InAppHeader = React.forwardRef((props, ref) => {
  const { className, avatar, from, onCloseButtonClick } = props;

  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}__header`],
    className
  );

  return (
    <div className={mergedClassNames} ref={ref}>
      {avatar && <InAppAvatar src={avatar} alt="Avatar" />}
      {from && <div className={styles[`${baseClass}__heading`]}>{from}</div>}
      <InAppCloseButton onClick={onCloseButtonClick} />
    </div>
  );
});

InAppHeader.propTypes = {
  className: PropTypes.string,
  avatar: PropTypes.string,
  from: PropTypes.node,
  onCloseButtonClick: PropTypes.func.isRequired
};

export default InAppHeader;
