import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import InAppMessageAvatar from './InAppMessageAvatar';
import InAppMessageCloseButton from './InAppMessageCloseButton';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'inapp';

const InAppMessageHeader = React.forwardRef((props, ref) => {
  const { className, avatar: avatarProps, text, onCloseButtonClick } = props;

  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}__header`],
    className
  );

  return (
    <div className={mergedClassNames} ref={ref}>
      {avatarProps && <InAppMessageAvatar {...avatarProps} />}
      {text && <div className={styles[`${baseClass}__heading`]}>{text}</div>}
      <InAppMessageCloseButton onClick={onCloseButtonClick} />
    </div>
  );
});

InAppMessageHeader.propTypes = {
  className: PropTypes.string,
  avatar: PropTypes.shape({ ...InAppMessageAvatar.propTypes }),
  text: PropTypes.node,
  onCloseButtonClick: PropTypes.func.isRequired
};

export default InAppMessageHeader;
