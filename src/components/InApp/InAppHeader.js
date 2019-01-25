import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import InAppAvatar from './InAppAvatar';
import InAppCloseButton from './InAppCloseButton';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'inapp';

const InAppHeader = React.forwardRef((props, ref) => {
  const { className, avatarSrc, avatarAlt, text, onCloseButtonClick } = props;
  const altText = avatarAlt || 'Avatar';

  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}__header`],
    className
  );

  return (
    <div className={mergedClassNames} ref={ref}>
      {avatarSrc && <InAppAvatar src={avatarSrc} alt={altText} />}
      {text && <div className={styles[`${baseClass}__heading`]}>{text}</div>}
      <InAppCloseButton onClick={onCloseButtonClick} />
    </div>
  );
});

InAppHeader.propTypes = {
  className: PropTypes.string,
  avatarSrc: PropTypes.string,
  avatarAlt: PropTypes.string,
  text: PropTypes.node,
  onCloseButtonClick: PropTypes.func.isRequired
};

export default InAppHeader;
